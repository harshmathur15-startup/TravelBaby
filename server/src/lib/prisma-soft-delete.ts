import { Prisma, PrismaClient } from '@prisma/client'

/**
 * Prisma client extension for universal soft-delete.
 * - `delete` → sets `deletedAt` instead of removing the row
 * - `deleteMany` → sets `deletedAt` on matching rows
 * - `findMany` / `findFirst` → auto-filters where `deletedAt` is null
 *
 * To query soft-deleted records, use `$allOperations` bypass or raw queries.
 * RefreshToken is excluded (ephemeral, no `deletedAt` field).
 */

const SOFT_DELETE_MODELS = new Set(['Organization', 'User', 'Membership'])

type ModelName = Prisma.ModelName

function hasSoftDelete(model: string): boolean {
  return SOFT_DELETE_MODELS.has(model)
}

export function withSoftDelete(client: PrismaClient) {
  return client.$extends({
    query: {
      $allModels: {
        async delete({ model, args, query }) {
          if (!hasSoftDelete(model as string)) return query(args)

          const modelClient = client[
            uncapitalize(model as ModelName) as keyof typeof client
          ] as Record<string, CallableFunction>
          return modelClient.update({
            ...args,
            data: { deletedAt: new Date() },
          })
        },

        async deleteMany({ model, args, query }) {
          if (!hasSoftDelete(model as string)) return query(args)

          const modelClient = client[
            uncapitalize(model as ModelName) as keyof typeof client
          ] as Record<string, CallableFunction>
          return modelClient.updateMany({
            ...args,
            data: { deletedAt: new Date() },
          })
        },

        async findMany({ model, args, query }) {
          if (!hasSoftDelete(model as string)) return query(args)

          args.where = { ...args.where, deletedAt: null }
          return query(args)
        },

        async findFirst({ model, args, query }) {
          if (!hasSoftDelete(model as string)) return query(args)

          args.where = { ...args.where, deletedAt: null }
          return query(args)
        },

        async findUnique({ model, args, query }) {
          if (!hasSoftDelete(model as string)) return query(args)

          // findUnique doesn't support arbitrary where — run it and check deletedAt on the result
          const result = (await query(args)) as Record<string, unknown> | null
          if (result && result.deletedAt != null) return null
          return result
        },

        async count({ model, args, query }) {
          if (!hasSoftDelete(model as string)) return query(args)

          args.where = { ...args.where, deletedAt: null }
          return query(args)
        },
      },
    },
  })
}

function uncapitalize(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

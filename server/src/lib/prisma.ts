import { PrismaClient } from '@prisma/client'
import { env } from '../env'
import { withSoftDelete } from './prisma-soft-delete'

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof withSoftDelete> | undefined
}

const baseClient = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
})

export const prisma = globalForPrisma.prisma ?? withSoftDelete(baseClient)

if (env.NODE_ENV === 'development') {
  globalForPrisma.prisma = prisma
}

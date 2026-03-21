import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const BCRYPT_ROUNDS = 12

async function main() {
  const passwordHash = await bcrypt.hash('password123', BCRYPT_ROUNDS)

  const organization = await prisma.organization.upsert({
    where: { slug: 'demo-company' },
    update: {},
    create: {
      name: 'Demo Company',
      slug: 'demo-company',
    },
  })

  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
    },
  })

  const membership = await prisma.membership.upsert({
    where: {
      userId_organizationId: {
        userId: user.id,
        organizationId: organization.id,
      },
    },
    update: {},
    create: {
      role: 'OWNER',
      userId: user.id,
      organizationId: organization.id,
    },
  })

  console.log('Seeded organization:', organization.name)
  console.log('Seeded user:', user.email)
  console.log('Seeded membership:', membership.role, 'in', organization.slug)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

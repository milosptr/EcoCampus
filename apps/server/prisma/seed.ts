import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seed = async () => {
  console.info('🌱 Starting seed placeholder...')

  // TODO: Seed initial universities, action categories, and default users.
  // This placeholder exists so developers can iterate safely.
}

seed()
  .then(async () => {
    await prisma.$disconnect()
    console.info('✅ Seed finished (placeholder).')
  })
  .catch(async (error) => {
    console.error('❌ Seed failed', error)
    await prisma.$disconnect()
    process.exit(1)
  })

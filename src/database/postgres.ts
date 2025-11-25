import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient as PrismaClientDb1 } from "../generated/prisma/generate-client-db1/client";
import { PrismaClient as PrismaClientDb2 } from "../generated/prisma/generate-client-db2/client";
import { PrismaClient as PrismaClientDb3 } from "../generated/prisma/generate-client-db3/client";

const globalForPrisma1 = globalThis as unknown as { prisma: PrismaClientDb1 }
const globalForPrisma2 = globalThis as unknown as { prisma: PrismaClientDb2 }
const globalForPrisma3 = globalThis as unknown as { prisma: PrismaClientDb3 }

const connectionString1 = `${process.env.DATABASE_URL_1}`
const connectionString2 = `${process.env.DATABASE_URL_2}`
const connectionString3 = `${process.env.DATABASE_URL_3}`

const adapter1 = new PrismaPg({ connectionString: connectionString1 })
const adapter2 = new PrismaPg({ connectionString: connectionString2 })
const adapter3 = new PrismaPg({ connectionString: connectionString3 })

const prismaDb1 = new PrismaClientDb1({ adapter: adapter1 })
const prismaDb2 = new PrismaClientDb2({ adapter: adapter2 })
const prismaDb3 = new PrismaClientDb3({ adapter: adapter3 })

if (process.env.NODE_ENV !== 'production') globalForPrisma1.prisma = prismaDb1
if (process.env.NODE_ENV !== 'production') globalForPrisma2.prisma = prismaDb2
if (process.env.NODE_ENV !== 'production') globalForPrisma3.prisma = prismaDb3

export { prismaDb1, prismaDb2 , prismaDb3}
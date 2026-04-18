import { env } from "@/env";
import { PrismaClient } from "../../generated/prisma";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const createPrismaClient = () => {
  const connectionString = env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  
  return new PrismaClient({
    adapter,
    log:
      env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

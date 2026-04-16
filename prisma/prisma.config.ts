/**
 * Prisma configuration file for migrations
 * https://pris.ly/d/config-datasource
 */

export const config = {
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
};

export default config;
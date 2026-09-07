import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-side environment variables schema.
   * NEVER exposed to client-side code.
   */
  server: {
    DATABASE_URL: z.string().url("DATABASE_URL must be a valid PostgreSQL connection URL"),
    DIRECT_URL: z.string().url().optional(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

    // Nylas Credentials & Configuration
    NYLAS_CLIENT_ID: z.string().min(1, "NYLAS_CLIENT_ID is required"),
    NYLAS_API_KEY: z.string().min(1, "NYLAS_API_KEY is required"),
    NYLAS_API_URI: z.string().url("NYLAS_API_URI must be a valid URL").default("https://api.us.nylas.com"),

    // OpenAI Credentials & Configuration
    OPENAI_API_KEY: z.string().optional(),
    OPENAI_MODEL: z.string().default("gpt-4o-mini"),

    // Svix Credentials & Webhook Secrets
    SVIX_TOKEN: z.string().optional(),
    SVIX_APP_ID: z.string().optional(),
    SVIX_WEBHOOK_SECRET: z.string().optional(),

    SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  },

  /**
   * Client-side environment variables schema.
   * MUST be prefixed with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),
    NEXT_PUBLIC_APP_URL: z.string().url("NEXT_PUBLIC_APP_URL must be a valid URL").optional(),
  },

  /**
   * Destructure process.env for client/edge runtimes.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    NODE_ENV: process.env.NODE_ENV,

    NYLAS_CLIENT_ID: process.env.NYLAS_CLIENT_ID,
    NYLAS_API_KEY: process.env.NYLAS_API_KEY,
    NYLAS_API_URI: process.env.NYLAS_API_URI,

    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_MODEL: process.env.OPENAI_MODEL,

    SVIX_TOKEN: process.env.SVIX_TOKEN,
    SVIX_APP_ID: process.env.SVIX_APP_ID,
    SVIX_WEBHOOK_SECRET: process.env.SVIX_WEBHOOK_SECRET,

    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,

    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  /**
   * Fail fast with a clear configuration error when required variables are invalid or missing.
   */
  onValidationError: (errors) => {
    console.error(
      "❌ Invalid environment variables configuration:\n",
      JSON.stringify(errors, null, 2)
    );
    throw new Error(
      "Invalid environment variables configuration. Please verify your .env file or server environment settings."
    );
  },

  /**
   * Security guard: Prevents accidental client-side exposure of secret server environment variables.
   */
  onInvalidAccess: (variable) => {
    throw new Error(
      `❌ Security Violation: Attempted to access server-side environment variable "${variable}" on the client-side!`
    );
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});

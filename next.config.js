/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

// NEXT_PUBLIC_* values are baked into the browser bundle at build time, so they must exist in the
// build environment (local .env, or Vercel → Project → Settings → Environment Variables).
const isBuild = process.argv.includes("build") || process.env.npm_lifecycle_event === "build";
if (isBuild && !process.env.SKIP_ENV_VALIDATION) {
    const missing = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"].filter(
        (name) => !process.env[name]
    );
    if (missing.length > 0) {
        throw new Error(
            `Missing build-time variables: ${missing.join(", ")}. Add them under Vercel → ` +
                "Project → Settings → Environment Variables.",
        );
    }
}

/** @type {import("next").NextConfig} */
const config = {
    // `next dev` writes to its own folder so a production build can never wipe the
    // files of a running dev server (which shows up as a 500 on every page).
    distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        // Import only the modules actually used from these large packages, instead of compiling
        // their whole barrel files on every dev compile.
        optimizePackageImports: ["lucide-react", "radix-ui", "recharts", "date-fns", "@base-ui/react"],
    },
};

export default config;

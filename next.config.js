/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    // Prisma ships a dedicated workerd build; keep it external so OpenNext bundles the right one.
    serverExternalPackages: ["@prisma/client", ".prisma/client"],
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

// Gives `next dev` access to Cloudflare bindings (getCloudflareContext) like production.
if (process.env.NODE_ENV === "development") {
    const { initOpenNextCloudflareForDev } = await import("@opennextjs/cloudflare");
    initOpenNextCloudflareForDev();
}

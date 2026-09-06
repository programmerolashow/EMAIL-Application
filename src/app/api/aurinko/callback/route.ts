import { exchangeCodeForAccessToken, getAccount } from "@/lib/aurinko"; // Import from aurinko helpers
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get("status");

    if (status !== "success") {
        return NextResponse.json({ error: "Aurinko connection failed" }, { status: 400 });
    }

    const code = searchParams.get("code");
    if (!code) {
        return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    try {
        const token = await exchangeCodeForAccessToken(code);
        const account = await getAccount(token.accessToken);

        const expiresAt = token.expiresIn ? new Date(Date.now() + token.expiresIn * 1000) : undefined;

        await db.account.upsert({
            where: { id: account.id },
            update: {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                email: account.email,
                name: account.name,
                expiresAt,
            },
            create: {
                id: account.id,
                userId,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                email: account.email,
                name: account.name,
                providerAccountId: account.id,
                expiresAt,
            },
        });

        // Redirect back to home as requested
        return NextResponse.redirect(new URL("/", req.url));
    } catch (error) {
        console.error("Aurinko callback error:", error);
        return NextResponse.json({ error: "Failed to exchange code" }, { status: 500 });
    }
};

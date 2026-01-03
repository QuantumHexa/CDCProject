import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized: ({ token }) => {
            // Return true if there is a token (user logged in)
            return !!token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_dev_only",
});

export const config = {
    matcher: ["/admin/:path*"],
};

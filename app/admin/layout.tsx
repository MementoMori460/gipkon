
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

import fs from "fs";
import path from "path";

async function getSettings() {
    try {
        const filePath = path.join(process.cwd(), "data/settings.json");
        const jsonData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(jsonData);
    } catch (error) {
        return null;
    }
}

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    const settings = await getSettings();

    return (
        <NextAuthProvider>
            <AdminShell
                userName={session?.user?.name || "Admin"}
                logoUrl={settings?.branding?.logo}
            >
                {children}
            </AdminShell>
        </NextAuthProvider>
    );
}

import { NextResponse } from "next/server";
import AdmZip from "adm-zip";
import path from "path";
import fs from "fs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const dataPath = path.join(process.cwd(), "data");
        const uploadsPath = path.join(process.cwd(), "public/uploads");

        const zip = new AdmZip();

        // Update last backup timestamp in settings.json
        const settingsPath = path.join(process.cwd(), "data/settings.json");
        if (fs.existsSync(settingsPath)) {
            try {
                const settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
                if (!settings.system) settings.system = {};
                settings.system.lastBackup = new Date().toISOString();
                fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
            } catch (err) {
                console.error("Failed to update last backup time:", err);
            }
        }

        // Re-read data folder to include the updated settings
        if (fs.existsSync(dataPath)) {
            zip.addLocalFolder(dataPath, "data");
        }

        // Include 'public/uploads' in backup
        if (fs.existsSync(uploadsPath)) {
            zip.addLocalFolder(uploadsPath, "public/uploads");
        }

        const buffer = zip.toBuffer();
        const date = new Date().toISOString().split('T')[0];

        return new NextResponse(buffer as any, {
            status: 200,
            headers: {
                "Content-Type": "application/zip",
                "Content-Disposition": `attachment; filename=gipkon-backup-${date}.zip`,
            },
        });
    } catch (error) {
        console.error("Backup error:", error);
        return NextResponse.json({ error: "Backup failed" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const zip = new AdmZip(buffer);
        const zipEntries = zip.getEntries();

        // Basic validation: Check if it contains 'data/' folder structure or root JSONs
        // We added folder as 'data' prefix in GET.
        // So we expect entries like 'data/settings.json'.

        const hasData = zipEntries.some(entry => entry.entryName.startsWith("data/"));

        if (!hasData) {
            return NextResponse.json({ error: "Invalid backup file format" }, { status: 400 });
        }

        const extractPath = process.cwd(); // Extract to root so 'data' overwrites 'data'
        zip.extractAllTo(extractPath, true);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Restore error:", error);
        return NextResponse.json({ error: "Restore failed" }, { status: 500 });
    }
}

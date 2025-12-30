import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
    try {
        const { filename } = await request.json();

        if (!filename) {
            return NextResponse.json({ error: "Filename is required" }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), "public", filename);

        // Security check: ensure file is within public directory
        if (!filePath.startsWith(path.join(process.cwd(), "public"))) {
            return NextResponse.json({ error: "Invalid file path" }, { status: 403 });
        }

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

    } catch (error) {
        console.error("Error deleting file:", error);
        return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
    }
}

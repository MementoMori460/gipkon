import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
        return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads dir exists
    const relativeUploadDir = "/uploads";
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
    }

    // Clean filename and make unique if needed (or just overwrite)
    const filename = file.name.replace(/\s+/g, '-').toLowerCase();
    const finalPath = join(uploadDir, filename);

    try {
        await writeFile(finalPath, buffer);
        const url = `${relativeUploadDir}/${filename}`;
        return NextResponse.json({ success: true, url, name: filename });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
    }
}

export async function GET() {
    // List files
    const uploadDir = join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) {
        return NextResponse.json([]);
    }

    try {
        const fs = require('fs');
        const files = await fs.promises.readdir(uploadDir);
        // Filter mainly images
        const imageFiles = files.filter((file: string) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file));

        const fileList = imageFiles.map((file: string) => ({
            name: file,
            url: `/uploads/${file}`
        }));

        return NextResponse.json(fileList);
    } catch (e) {
        return NextResponse.json([], { status: 500 });
    }
}

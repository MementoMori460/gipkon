import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data/hero.json");

export async function GET() {
    try {
        const jsonData = fs.readFileSync(filePath, "utf8");
        return NextResponse.json(JSON.parse(jsonData));
    } catch (error) {
        return NextResponse.json({ error: "Failed to load hero slides" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!Array.isArray(body)) {
            return NextResponse.json({ error: "Data must be an array" }, { status: 400 });
        }

        fs.writeFileSync(filePath, JSON.stringify(body, null, 2), "utf8");
        return NextResponse.json({ success: true, data: body });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to save hero slides" }, { status: 500 });
    }
}

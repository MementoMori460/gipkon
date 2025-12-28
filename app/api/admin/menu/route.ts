import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data/menu.json");

export async function GET() {
    try {
        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ header: [], footer: { quickLinks: [], services: [] } });
        }
        const jsonData = fs.readFileSync(filePath, "utf8");
        return NextResponse.json(JSON.parse(jsonData));
    } catch (error) {
        return NextResponse.json({ error: "Failed to load menu" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to save menu" }, { status: 500 });
    }
}

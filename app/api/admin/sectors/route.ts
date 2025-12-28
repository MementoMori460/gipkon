import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const dataPath = path.join(process.cwd(), "data/sectors.json");

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const jsonData = fs.readFileSync(dataPath, "utf8");
        const sectors = JSON.parse(jsonData);
        return NextResponse.json(sectors);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch sectors" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        let sectors = [];
        if (fs.existsSync(dataPath)) {
            const jsonData = fs.readFileSync(dataPath, "utf8");
            sectors = JSON.parse(jsonData);
        }

        // Handle both "create single" and "save all" scenarios
        if (Array.isArray(body)) {
            // If body is array, it's a bulk save/reorder
            fs.writeFileSync(dataPath, JSON.stringify(body, null, 2));
            return NextResponse.json({ success: true });
        } else {
            // New sector
            const newSector = {
                id: body.id || body.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""), // Generate ID from title if not provided
                ...body
            };

            // Check for duplicate ID
            if (sectors.some((s: any) => s.id === newSector.id)) {
                return NextResponse.json({ error: "ID already exists" }, { status: 400 });
            }

            sectors.push(newSector);
            fs.writeFileSync(dataPath, JSON.stringify(sectors, null, 2));
            return NextResponse.json({ success: true, sector: newSector });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to save sector" }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const dataPath = path.join(process.cwd(), "data/sectors.json");

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const jsonData = fs.readFileSync(dataPath, "utf8");
        const sectors = JSON.parse(jsonData);
        const sector = sectors.find((s: any) => s.id === params.id);

        if (!sector) {
            return NextResponse.json({ error: "Sector not found" }, { status: 404 });
        }

        return NextResponse.json(sector);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch sector" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const jsonData = fs.readFileSync(dataPath, "utf8");
        let sectors = JSON.parse(jsonData);

        const index = sectors.findIndex((s: any) => s.id === params.id);
        if (index === -1) {
            return NextResponse.json({ error: "Sector not found" }, { status: 404 });
        }

        sectors[index] = { ...sectors[index], ...body };
        fs.writeFileSync(dataPath, JSON.stringify(sectors, null, 2));

        return NextResponse.json({ success: true, sector: sectors[index] });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update sector" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const jsonData = fs.readFileSync(dataPath, "utf8");
        let sectors = JSON.parse(jsonData);

        const newSectors = sectors.filter((s: any) => s.id !== params.id);
        fs.writeFileSync(dataPath, JSON.stringify(newSectors, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete sector" }, { status: 500 });
    }
}

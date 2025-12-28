import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const dataPath = path.join(process.cwd(), "data/projects.json");

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = parseInt(params.id);
    const body = await req.json();

    const fileContents = fs.readFileSync(dataPath, "utf8");
    let projects = JSON.parse(fileContents);

    const index = projects.findIndex((p: any) => p.id === id);
    if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

    projects[index] = { ...projects[index], ...body };

    fs.writeFileSync(dataPath, JSON.stringify(projects, null, 4));

    return NextResponse.json(projects[index]);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = parseInt(params.id);

    const fileContents = fs.readFileSync(dataPath, "utf8");
    let projects = JSON.parse(fileContents);

    projects = projects.filter((p: any) => p.id !== id);

    fs.writeFileSync(dataPath, JSON.stringify(projects, null, 4));

    return NextResponse.json({ success: true });
}

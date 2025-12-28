import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const dataPath = path.join(process.cwd(), "data/projects.json");

// GET: List all projects
export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const fileContents = fs.readFileSync(dataPath, "utf8");
    const projects = JSON.parse(fileContents);

    // Sort by ID desc (newest first)
    return NextResponse.json(projects.sort((a: any, b: any) => b.id - a.id));
}

// POST: Create a new project
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    const fileContents = fs.readFileSync(dataPath, "utf8");
    const projects = JSON.parse(fileContents);

    const newProject = {
        id: projects.length > 0 ? Math.max(...projects.map((p: any) => p.id)) + 1 : 1,
        ...body,
        slug: body.slug || body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
    };

    projects.push(newProject);
    fs.writeFileSync(dataPath, JSON.stringify(projects, null, 4));

    return NextResponse.json(newProject);
}

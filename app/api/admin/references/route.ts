import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const dataPath = path.join(process.cwd(), "data/references.json");

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const fileContents = fs.readFileSync(dataPath, "utf8");
    const references = JSON.parse(fileContents);

    return NextResponse.json(references.sort((a: any, b: any) => b.id - a.id));
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    const fileContents = fs.readFileSync(dataPath, "utf8");
    const references = JSON.parse(fileContents);

    const newReference = {
        id: references.length > 0 ? Math.max(...references.map((r: any) => r.id)) + 1 : 1,
        ...body
    };

    references.push(newReference);
    fs.writeFileSync(dataPath, JSON.stringify(references, null, 4));

    revalidatePath("/referanslar");
    revalidatePath("/admin/referanslar"); // Optional if admin list uses client-side fetch, but good for SSR pages

    return NextResponse.json(newReference);
}

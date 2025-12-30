import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

const servicesFilePath = path.join(process.cwd(), "data/services.json");

function getServices() {
    if (!fs.existsSync(servicesFilePath)) {
        return [];
    }
    const jsonData = fs.readFileSync(servicesFilePath, "utf8");
    return JSON.parse(jsonData);
}

function saveServices(services: any[]) {
    fs.writeFileSync(servicesFilePath, JSON.stringify(services, null, 4));
}

export async function GET() {
    try {
        const services = getServices();
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const services = getServices();

        const newService = {
            id: data.slug || Math.random().toString(36).substring(7),
            ...data
        };

        services.push(newService);
        saveServices(services);

        revalidatePath("/hizmetler");
        revalidatePath("/admin/services");

        return NextResponse.json(newService);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
    }
}

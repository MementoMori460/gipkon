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

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const services = getServices();
        const service = services.find((s: any) => s.id === params.id);

        if (!service) {
            return NextResponse.json({ error: "Service not found" }, { status: 404 });
        }

        return NextResponse.json(service);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const data = await request.json();
        const services = getServices();
        const index = services.findIndex((s: any) => s.id === params.id);

        if (index === -1) {
            return NextResponse.json({ error: "Service not found" }, { status: 404 });
        }

        services[index] = { ...services[index], ...data };
        saveServices(services);

        revalidatePath("/hizmetler");
        revalidatePath("/hizmetler/" + services[index].slug);
        revalidatePath("/admin/services");

        return NextResponse.json(services[index]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const services = getServices();
        const newServices = services.filter((s: any) => s.id !== params.id);
        saveServices(newServices);

        revalidatePath("/hizmetler");
        revalidatePath("/admin/services");

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
    }
}

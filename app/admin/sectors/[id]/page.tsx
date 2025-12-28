import SectorForm from "@/components/admin/SectorForm";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

async function getSector(id: string) {
    const filePath = path.join(process.cwd(), "data/sectors.json");
    if (!fs.existsSync(filePath)) return null;
    const jsonData = fs.readFileSync(filePath, "utf8");
    const sectors = JSON.parse(jsonData);
    return sectors.find((s: any) => s.id === id);
}

export default async function EditSectorPage({ params }: { params: { id: string } }) {
    const sector = await getSector(params.id);

    if (!sector) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Sektörü Düzenle: {sector.title}</h1>
            <SectorForm initialData={sector} isEdit={true} />
        </div>
    );
}

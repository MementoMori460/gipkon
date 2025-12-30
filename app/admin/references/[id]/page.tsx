import ReferenceForm from "@/components/admin/ReferenceForm";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function getReference(id: string) {
    const filePath = path.join(process.cwd(), "data/references.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    const references = JSON.parse(jsonData);
    return references.find((r: any) => r.id === parseInt(id));
}

export default async function EditReferencePage({ params }: { params: { id: string } }) {
    const reference = await getReference(params.id);

    if (!reference) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Referansı Düzenle: {reference.name}</h1>
            <ReferenceForm initialData={reference} isEdit={true} />
        </div>
    );
}

import fs from "fs";
import path from "path";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import DeleteSectorButton from "@/components/admin/DeleteSectorButton";
import Image from "next/image";

async function getSectors() {
    const filePath = path.join(process.cwd(), "data/sectors.json");
    if (!fs.existsSync(filePath)) return [];
    const jsonData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(jsonData);
}

export default async function SectorsPage() {
    const sectors = await getSectors();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Sektörler</h1>
                <Link
                    href="/admin/sectors/new"
                    className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                    <Plus size={18} />
                    Yeni Sektör
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Görsel</th>
                            <th className="px-6 py-4 font-semibold">Başlık</th>
                            <th className="px-6 py-4 font-semibold">Durum</th>
                            <th className="px-6 py-4 font-semibold">Slug</th>
                            <th className="px-6 py-4 font-semibold text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {sectors.length > 0 ? (
                            sectors.map((sector: any) => (
                                <tr key={sector.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="w-16 h-10 relative rounded overflow-hidden bg-gray-100">
                                            {sector.image && (
                                                <Image src={sector.image} alt={sector.title} fill className="object-cover" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{sector.title}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sector.isActive
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {sector.isActive ? "Aktif" : "Pasif"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs">{sector.slug}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/sectors/${sector.id}`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <DeleteSectorButton id={sector.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                                    Henüz hiç sektör eklenmemiş.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

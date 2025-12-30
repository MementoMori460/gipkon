import fs from "fs";
import path from "path";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import DeleteReferenceButton from "@/components/admin/DeleteReferenceButton";

async function getReferences() {
    const filePath = path.join(process.cwd(), "data/references.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(jsonData);
}

export default async function ReferencesPage() {
    // Force rebuild
    const references = await getReferences();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Referanslar</h1>
                <Link
                    href="/admin/references/new"
                    className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                    <Plus size={18} />
                    Yeni Referans
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold">ID</th>
                            <th className="px-6 py-4 font-semibold">Firma Adı</th>
                            <th className="px-6 py-4 font-semibold">Sektör</th>
                            <th className="px-6 py-4 font-semibold text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {references.length > 0 ? references.sort((a: any, b: any) => b.id - a.id).map((ref: any) => (
                            <tr key={ref.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-500 font-mono">#{ref.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{ref.name}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                                        {ref.sector}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link
                                            href={`/admin/references/${ref.id}`}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <DeleteReferenceButton id={ref.id} />
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                                    Henüz hiç referans eklenmemiş.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

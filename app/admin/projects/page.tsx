import fs from "fs";
import path from "path";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton"; // Will create this next

async function getProjects() {
    const filePath = path.join(process.cwd(), "data/projects.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(jsonData);
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Projeler</h1>
                <Link
                    href="/admin/projects/new"
                    className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                    <Plus size={18} />
                    Yeni Proje
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold">ID</th>
                            <th className="px-6 py-4 font-semibold">Başlık</th>
                            <th className="px-6 py-4 font-semibold">Sektör</th>
                            <th className="px-6 py-4 font-semibold">Yıl</th>
                            <th className="px-6 py-4 font-semibold text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {projects.sort((a: any, b: any) => b.id - a.id).map((project: any) => (
                            <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-500 font-mono">#{project.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{project.title}</td>
                                <td className="px-6 py-4 bg-yellow-50">{project.sector}</td>
                                <td className="px-6 py-4">{project.year}</td>
                                <td className="px-6 py-4 text-right flex justify-end gap-2">
                                    <Link
                                        href={`/admin/projects/${project.id}`}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <Edit size={18} />
                                    </Link>
                                    <DeleteButton id={project.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

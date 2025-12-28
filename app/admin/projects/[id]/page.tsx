import ProjectForm from "@/components/admin/ProjectForm";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

async function getProject(id: string) {
    const filePath = path.join(process.cwd(), "data/projects.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    const projects = JSON.parse(jsonData);
    return projects.find((p: any) => p.id === parseInt(id));
}

export default async function EditProjectPage({ params }: { params: { id: string } }) {
    const project = await getProject(params.id);

    if (!project) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Projeyi Düzenle: {project.title}</h1>
            <ProjectForm initialData={project} isEdit={true} />
        </div>
    );
}

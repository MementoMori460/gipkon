import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, CheckCircle, Tag, Factory, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import projectsData from "@/data/projects.json";

// Define the Project type based on our JSON structure
type Project = {
    id: number;
    title: string;
    slug?: string;
    sector: string;
    client?: string;
    location?: string;
    duration?: string;
    year: number;
    description: string;
    fullDescription?: string;
    image: string;
    gallery?: string[];
    features: string[];
    technologies?: string[];
};

export async function generateStaticParams() {
    return projectsData.map((project) => ({
        slug: project.slug || String(project.id),
    }));
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
    // Find project by slug
    const project = (projectsData as Project[]).find(
        (p) => p.slug === params.slug
    );

    if (!project) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <div className="relative h-[60vh] bg-secondary-900">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-secondary-900/50 to-transparent" />
                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-4 pb-16">
                        <Link
                            href="/projeler"
                            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Tüm Projeler
                        </Link>
                        <div className="flex flex-wrap gap-4 mb-4">
                            <span className="bg-primary-600/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                                {project.sector.replace("-", " ").toUpperCase()}
                            </span>
                            <span className="bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20 flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5" /> {project.year}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white max-w-4xl">
                            {project.title}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Project Overview Card */}
                        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-secondary-800 mb-6">Proje Detayları</h2>
                            <div className="prose prose-lg text-secondary-600 max-w-none">
                                <p className="mb-4 text-xl font-light leading-relaxed">
                                    {project.description}
                                </p>
                                <p>
                                    {project.fullDescription || project.description}
                                </p>
                            </div>
                        </div>

                        {/* Gallery Grid */}
                        {project.gallery && project.gallery.length > 0 && (
                            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                                <h2 className="text-2xl font-bold text-secondary-800 mb-6">Proje Görselleri</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.gallery.map((img, index) => (
                                        <div key={index} className="relative h-64 rounded-lg overflow-hidden group">
                                            <Image
                                                src={img}
                                                alt={`${project.title} - Görsel ${index + 1}`}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Key Features */}
                        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-secondary-800 mb-6">Öne Çıkan Özellikler</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-secondary-700 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Technologies Used */}
                        {project.technologies && (
                            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                                <h2 className="text-2xl font-bold text-secondary-800 mb-6">Kullanılan Teknolojiler</h2>
                                <div className="flex flex-wrap gap-3">
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold border border-blue-100">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Project Info Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-24">
                            <h3 className="text-lg font-bold text-secondary-800 mb-6 border-b pb-4">Proje Bilgileri</h3>

                            <div className="space-y-4">
                                {project.client && (
                                    <div>
                                        <div className="text-xs text-gray-400 uppercase font-semibold mb-1">Müşteri</div>
                                        <div className="flex items-center gap-2 text-secondary-700 font-medium">
                                            <Factory className="w-4 h-4 text-primary-500" />
                                            {project.client}
                                        </div>
                                    </div>
                                )}

                                {project.location && (
                                    <div>
                                        <div className="text-xs text-gray-400 uppercase font-semibold mb-1">Konum</div>
                                        <div className="flex items-center gap-2 text-secondary-700 font-medium">
                                            <MapPin className="w-4 h-4 text-primary-500" />
                                            {project.location}
                                        </div>
                                    </div>
                                )}

                                {project.duration && (
                                    <div>
                                        <div className="text-xs text-gray-400 uppercase font-semibold mb-1">Proje Süresi</div>
                                        <div className="flex items-center gap-2 text-secondary-700 font-medium">
                                            <Clock className="w-4 h-4 text-primary-500" />
                                            {project.duration}
                                        </div>
                                    </div>
                                )}

                                <div className="pt-6 mt-6 border-t border-gray-100">
                                    <h4 className="font-semibold text-secondary-800 mb-3">Benzer bir proje mi planlıyorsunuz?</h4>
                                    <Link href="/hizmet-talebi" className="block">
                                        <Button className="w-full">
                                            Teklif İste
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

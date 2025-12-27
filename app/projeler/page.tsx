import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import projects from "@/data/projects.json";
import sectors from "@/data/sectors.json";

export const metadata: Metadata = {
    title: "Projelerimiz - GIPKON TEKNOLOJİ",
    description: "GIPKON TEKNOLOJİ tarafından başarıyla tamamlanan endüstriyel otomasyon projeleri.",
};

export default function ProjectsPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-secondary-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-900 via-secondary-800 to-secondary-900 opacity-90 z-0" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Projelerimiz
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Farklı sektörlerde başarıyla tamamladığımız otomasyon projelerimizden örnekler
                    </p>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    {/* Sector Filter Buttons - Could be interactive in future */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <Button variant="primary" className="rounded-full">
                            Tümü
                        </Button>
                        {sectors.slice(0, 5).map((sector) => (
                            <Link key={sector.id} href={`/cozumler/${sector.slug}`}>
                                <Button variant="outline" className="rounded-full bg-white hover:bg-gray-50 border-gray-200 text-secondary-600">
                                    {sector.title}
                                </Button>
                            </Link>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
                                <div className="relative h-48 bg-gray-200">
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                        Project Image
                                    </div>
                                    {/* Uncomment when images are available
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    */}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary-700">
                                        {project.year}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="text-xs font-medium text-primary-600 mb-2 uppercase tracking-wide">
                                        {sectors.find(s => s.slug === project.sector)?.title || "Endüstriyel Otomasyon"}
                                    </div>
                                    <h3 className="text-xl font-bold text-secondary-800 mb-3 group-hover:text-primary-700 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-secondary-600 text-sm mb-4 line-clamp-3">
                                        {project.description}
                                    </p>
                                    <div className="space-y-2 mb-6">
                                        {project.features.slice(0, 2).map((feature, idx) => (
                                            <div key={idx} className="flex items-center text-xs text-secondary-500">
                                                <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                    <Link href={`/iletisim`}>
                                        <Button variant="outline" className="w-full text-sm py-2">
                                            Detaylı Bilgi <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary-700 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-display font-bold mb-6">
                        Sizin Projenizi de Hayata Geçirelim
                    </h2>
                    <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
                        Uzman ekibimizle tanışın, endüstriyel otomasyon ihtiyaçlarınıza en uygun çözümü birlikte planlayalım.
                    </p>
                    <Link href="/iletisim">
                        <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100">
                            Proje Başlat
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

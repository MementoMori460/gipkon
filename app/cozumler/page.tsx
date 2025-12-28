import { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";
import sectors from "@/data/sectors.json";

export const metadata: Metadata = {
    title: "Çözümlerimiz - GIPKON TEKNOLOJİ",
    description: `${sectors.filter((s: any) => s.isActive !== false).length} farklı sektörde uzmanlaşmış endüstriyel otomasyon çözümleri`,
};

export default function CozumlerPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-700 to-primary-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl font-display font-bold mb-6">
                            Sektörel Çözümlerimiz
                        </h1>
                        <p className="text-xl text-primary-100">
                            {sectors.filter((s: any) => s.isActive !== false).length} farklı sektörde uzmanlaşmış otomasyon çözümleri sunuyoruz
                        </p>
                    </div>
                </div>
            </section>

            {/* Sectors Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sectors.filter((s: any) => s.isActive !== false).map((sector) => (
                            <Card
                                key={sector.id}
                                title={sector.title}
                                description={sector.description}
                                image={sector.image}
                                href={`/cozumler/${sector.slug}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-display font-bold text-secondary-800 mb-6">
                            Her Sektöre Özel Çözümler
                        </h2>
                        <p className="text-lg text-secondary-600 mb-8">
                            15+ yıllık deneyimimiz ve uzman kadromuz ile her sektörün özel
                            ihtiyaçlarına uygun otomasyon çözümleri geliştiriyoruz. Projeleriniz için
                            en uygun teknolojiyi seçiyor ve başarılı bir şekilde uyguluyoruz.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

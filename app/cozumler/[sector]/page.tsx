import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import sectors from "@/data/sectors.json";

interface PageProps {
    params: {
        sector: string;
    };
}

export async function generateStaticParams() {
    return sectors.map((sector) => ({
        sector: sector.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const sector = sectors.find((s) => s.slug === params.sector);

    if (!sector) {
        return {
            title: "Sektör Bulunamadı",
        };
    }

    return {
        title: `${sector.title} - GIPKON TEKNOLOJİ`,
        description: sector.description,
    };
}

export default function SectorPage({ params }: PageProps) {
    const sector = sectors.find((s) => s.slug === params.sector);

    if (!sector) {
        notFound();
    }

    // Get related sectors (exclude current)
    const relatedSectors = sectors.filter((s) => s.id !== sector.id).slice(0, 3);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-primary-700 to-primary-600 text-white py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                            Sektörel Çözümler
                        </div>
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                            {sector.title}
                        </h1>
                        <p className="text-xl text-primary-100 mb-8">{sector.description}</p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/iletisim">
                                <Button
                                    size="lg"
                                    className="bg-white text-primary-700 hover:bg-gray-100"
                                >
                                    Teklif Alın
                                </Button>
                            </Link>
                            <Link href={`/projeler/${sector.slug}`}>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white text-white hover:bg-white/10"
                                >
                                    Projelerimiz
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-display font-bold text-secondary-800 mb-8">
                            Özellikler ve Avantajlar
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {sector.features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <CheckCircle className="w-6 h-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-secondary-800 mb-1">
                                            {feature}
                                        </h3>
                                        <p className="text-secondary-600 text-sm">
                                            Sektörünüze özel geliştirilmiş çözümler
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Details Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-display font-bold text-secondary-800 mb-8">
                            Çözüm Detayları
                        </h2>
                        <div className="bg-white rounded-xl p-8 shadow-sm">
                            <div className="prose prose-lg max-w-none">
                                <p className="text-secondary-600 leading-relaxed mb-6">
                                    {sector.title} için özel olarak tasarlanmış otomasyon çözümlerimiz,
                                    üretim süreçlerinizi optimize eder ve verimliliğinizi artırır. Uzman
                                    ekibimiz, sektörünüzün özel ihtiyaçlarını anlayarak size en uygun
                                    çözümleri sunar.
                                </p>
                                <h3 className="text-xl font-semibold text-secondary-800 mb-4">
                                    Neden GIPKON?
                                </h3>
                                <ul className="space-y-3 text-secondary-600">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                                        <span>15+ yıllık sektör deneyimi</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                                        <span>Anahtar teslim proje hizmeti</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                                        <span>7/24 teknik destek</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                                        <span>Yerli ve yabancı marka entegrasyonu</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Sectors */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-display font-bold text-secondary-800 mb-8 text-center">
                        Diğer Sektörler
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {relatedSectors.map((relatedSector) => (
                            <Card
                                key={relatedSector.id}
                                title={relatedSector.title}
                                description={relatedSector.description}
                                image={relatedSector.image}
                                href={`/cozumler/${relatedSector.slug}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-primary-700 to-primary-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-display font-bold mb-6">
                        {sector.title} İçin Özel Çözümler
                    </h2>
                    <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
                        Projeniz için hemen bizimle iletişime geçin
                    </p>
                    <Link href="/iletisim">
                        <Button
                            size="lg"
                            className="bg-white text-primary-700 hover:bg-gray-100"
                        >
                            İletişime Geç <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import services from "@/data/services.json";

interface PageProps {
    params: {
        service: string;
    };
}

export async function generateStaticParams() {
    return services.map((service) => ({
        service: service.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const service = services.find((s) => s.slug === params.service);

    if (!service) {
        return {
            title: "Hizmet Bulunamadı",
        };
    }

    return {
        title: `${service.title} - GIPKON TEKNOLOJİ`,
        description: service.description,
    };
}

export default function ServicePage({ params }: PageProps) {
    const service = services.find((s) => s.slug === params.service);

    if (!service) {
        notFound();
    }

    // Get related services (exclude current)
    const relatedServices = services.filter((s) => s.id !== service.id).slice(0, 3);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-primary-700 to-primary-600 text-white py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                            Hizmetlerimiz
                        </div>
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                            {service.title}
                        </h1>
                        <p className="text-xl text-primary-100 mb-8">{service.description}</p>
                        <Link href="/iletisim">
                            <Button
                                size="lg"
                                className="bg-white text-primary-700 hover:bg-gray-100"
                            >
                                Hizmet Talebi Oluştur
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Details Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-display font-bold text-secondary-800 mb-8">
                            Hizmet Kapsamı
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {service.details.map((detail, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <CheckCircle className="w-6 h-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-secondary-800">{detail}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-display font-bold text-secondary-800 mb-8 text-center">
                            Çalışma Sürecimiz
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {["Analiz", "Planlama", "Uygulama", "Destek"].map((step, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                        {index + 1}
                                    </div>
                                    <h3 className="font-semibold text-secondary-800 mb-2">{step}</h3>
                                    <p className="text-sm text-secondary-600">
                                        {index === 0 && "İhtiyaç analizi ve keşif"}
                                        {index === 1 && "Detaylı proje planlaması"}
                                        {index === 2 && "Kurulum ve devreye alma"}
                                        {index === 3 && "Sürekli destek ve bakım"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-display font-bold text-secondary-800 mb-8">
                            Avantajlarımız
                        </h2>
                        <div className="bg-white rounded-xl p-8 shadow-sm">
                            <ul className="space-y-4 text-secondary-600">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                                    <span>15+ yıllık sektör deneyimi ve uzmanlık</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                                    <span>Yerli ve yabancı marka entegrasyonu</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                                    <span>7/24 teknik destek hizmeti</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                                    <span>Garantili işçilik ve malzeme kalitesi</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                                    <span>Hızlı ve etkili çözüm süreçleri</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Services */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-display font-bold text-secondary-800 mb-8 text-center">
                        Diğer Hizmetlerimiz
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {relatedServices.map((relatedService) => (
                            <Card
                                key={relatedService.id}
                                title={relatedService.title}
                                description={relatedService.description}
                                href={`/hizmetler/${relatedService.slug}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-primary-700 to-primary-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-display font-bold mb-6">
                        {service.title} Hizmeti Alın
                    </h2>
                    <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
                        Projeniz için hemen bizimle iletişime geçin
                    </p>
                    <Link href="/iletisim">
                        <Button
                            size="lg"
                            className="bg-white text-primary-700 hover:bg-gray-100"
                        >
                            Hizmet Talebi Oluştur <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

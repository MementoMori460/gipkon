import Hero from "@/components/ui/Hero";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import sectors from "@/data/sectors.json";
import services from "@/data/services.json";
import { ArrowRight, CheckCircle, Users, Award, Zap } from "lucide-react";
import fs from "fs";
import path from "path";

async function getHeroSlides() {
    try {
        const filePath = path.join(process.cwd(), "data/hero.json");
        const jsonData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(jsonData);
    } catch (error) {
        return [];
    }
}

const stats = [
    { icon: Users, value: "500+", label: "Mutlu Müşteri" },
    { icon: Award, value: "15+", label: "Yıllık Deneyim" },
    { icon: CheckCircle, value: "1000+", label: "Tamamlanan Proje" },
    { icon: Zap, value: "7/24", label: "Teknik Destek" },
];

export default async function HomePage() {
    const heroSlides = await getHeroSlides();

    return (
        <>
            {/* Hero Section */}
            <Hero slides={heroSlides} />

            {/* Stats Section */}
            <section className="py-16 bg-primary-700 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary-300" />
                                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                                <div className="text-primary-200">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Preview */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-display font-bold text-secondary-800 mb-6">
                            Teknolojiye ve Geleceğe Yön Veren Firma
                        </h2>
                        <p className="text-lg text-secondary-600 mb-8">
                            Firmamız kurulduğu yıldan itibaren sürekli kendini geliştiren, yenilikleri takip eden
                            ve bu doğrultuda hizmet veren otomasyon çözüm firmasıdır. Müşteri memnuniyetini ilke
                            edinerek yolumuza devam etmekteyiz.
                        </p>
                        <Button size="lg" variant="primary">
                            Hakkımızda <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Solutions Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-display font-bold text-secondary-800 mb-4">
                            Sektörel Çözümlerimiz
                        </h2>
                        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                            9 farklı sektörde uzmanlaşmış otomasyon çözümleri sunuyoruz
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sectors.map((sector) => (
                            <Card
                                key={sector.id}
                                title={sector.title}
                                description={sector.description}
                                image={sector.image}
                                href={`/cozumler/${sector.slug}`}
                            />
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Button size="lg" variant="outline">
                            Tüm Çözümler <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-display font-bold text-secondary-800 mb-4">
                            Hizmetlerimiz
                        </h2>
                        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                            Proje danışmanlığından devreye almaya kadar tam kapsamlı hizmet
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.slice(0, 6).map((service) => (
                            <Card
                                key={service.id}
                                title={service.title}
                                description={service.description}
                                href={`/hizmetler/${service.slug}`}
                            />
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Button size="lg" variant="outline">
                            Tüm Hizmetler <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-display font-bold mb-6">
                        Projeniz İçin Hemen İletişime Geçin
                    </h2>
                    <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
                        Uzman ekibimiz size en uygun otomasyon çözümünü sunmak için hazır
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100">
                            İletişime Geç
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                            Teklif Al
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}

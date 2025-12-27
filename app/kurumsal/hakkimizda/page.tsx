import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Target, Eye, Award, Users, Zap, Shield } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "Hakkımızda - GIPKON TEKNOLOJİ",
    description: "GIPKON TEKNOLOJİ olarak endüstriyel otomasyon alanında 15+ yıllık deneyimimizle hizmet veriyoruz.",
};

const values = [
    {
        icon: Target,
        title: "Misyonumuz",
        description: "Müşterilerimize en yüksek kalitede otomasyon çözümleri sunarak üretim süreçlerini optimize etmek ve rekabet gücünü artırmak.",
    },
    {
        icon: Eye,
        title: "Vizyonumuz",
        description: "Endüstriyel otomasyon alanında Türkiye'nin lider firması olmak ve uluslararası pazarda güçlü bir marka haline gelmek.",
    },
    {
        icon: Award,
        title: "Kalite",
        description: "Her projede mükemmellik standartlarını koruyarak müşteri memnuniyetini en üst seviyede tutmak.",
    },
    {
        icon: Users,
        title: "Müşteri Odaklılık",
        description: "Müşterilerimizin ihtiyaçlarını anlamak ve onlara özel çözümler geliştirmek bizim önceliğimizdir.",
    },
    {
        icon: Zap,
        title: "İnovasyon",
        description: "Teknolojideki gelişmeleri yakından takip ederek sürekli yenilikçi çözümler üretiyoruz.",
    },
    {
        icon: Shield,
        title: "Güvenilirlik",
        description: "Projelerimizde güvenlik ve sürdürülebilirlik ilkelerini ön planda tutuyoruz.",
    },
];

const timeline = [
    { year: "2008", event: "GIPKON TEKNOLOJİ kuruldu" },
    { year: "2010", event: "İlk büyük ölçekli proje tamamlandı" },
    { year: "2013", event: "Uluslararası sertifikalar alındı" },
    { year: "2015", event: "Yeni ofis ve AR-GE merkezi açıldı" },
    { year: "2018", event: "500+ proje tamamlandı" },
    { year: "2020", event: "Avrupa pazarına açıldı" },
    { year: "2023", event: "1000+ proje milestonuna ulaşıldı" },
];

export default function HakkimizdaPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-700 to-primary-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl font-display font-bold mb-6">Hakkımızda</h1>
                        <p className="text-xl text-primary-100">
                            Teknolojiye ve Geleceğe Yön Veren Firma
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-display font-bold text-secondary-800 mb-6">
                                Kimiz?
                            </h2>
                            <div className="space-y-4 text-secondary-600">
                                <p>
                                    Firmamız kurulduğu yıldan itibaren sürekli kendini geliştiren, yenilikleri
                                    takip eden ve bu doğrultuda hizmet veren otomasyon çözüm firmasıdır.
                                    Müşteri memnuniyetini ilke edinerek yolumuza devam etmekteyiz.
                                </p>
                                <p>
                                    Yerli ve yabancı otomasyon ürün markaları ile, otomasyon çözümlerini uygun
                                    fiyatlarla müşterilerimize ulaştırıyoruz. Siz müşterilerimizin bize olan
                                    güvenini boşa çıkartmamak için her geçen gün büyüyerek yolumuza devam
                                    etmekteyiz.
                                </p>
                                <p>
                                    15+ yıllık deneyimimiz ve uzman kadromuz ile gıda, tekstil, sağlık, kimya,
                                    ilaç, kozmetik, enerji, maden ve savunma sanayi sektörlerinde başarılı
                                    projeler gerçekleştirdik.
                                </p>
                            </div>
                        </div>
                        <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <div className="text-6xl font-bold mb-4">15+</div>
                                    <div className="text-2xl">Yıllık Deneyim</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-display font-bold text-secondary-800 mb-4">
                            Değerlerimiz
                        </h2>
                        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                            İş yapış şeklimizi ve kültürümüzü şekillendiren temel değerlerimiz
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <value.icon className="w-12 h-12 text-primary-600 mb-4" />
                                <h3 className="text-xl font-semibold text-secondary-800 mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-secondary-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-display font-bold text-secondary-800 mb-4">
                            Tarihçemiz
                        </h2>
                        <p className="text-lg text-secondary-600">
                            Başarı dolu yolculuğumuzun kilometre taşları
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200" />

                            {/* Timeline Items */}
                            <div className="space-y-12">
                                {timeline.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                                            }`}
                                    >
                                        <div className="w-1/2 pr-8 text-right">
                                            {index % 2 === 0 && (
                                                <>
                                                    <div className="text-2xl font-bold text-primary-600 mb-2">
                                                        {item.year}
                                                    </div>
                                                    <div className="text-secondary-600">{item.event}</div>
                                                </>
                                            )}
                                        </div>
                                        <div className="relative z-10">
                                            <div className="w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow" />
                                        </div>
                                        <div className="w-1/2 pl-8 text-left">
                                            {index % 2 !== 0 && (
                                                <>
                                                    <div className="text-2xl font-bold text-primary-600 mb-2">
                                                        {item.year}
                                                    </div>
                                                    <div className="text-secondary-600">{item.event}</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-primary-700 to-primary-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-display font-bold mb-6">
                        Projeniz İçin Bizimle İletişime Geçin
                    </h2>
                    <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
                        Uzman ekibimiz size en uygun otomasyon çözümünü sunmak için hazır
                    </p>
                    <Link href="/iletisim">
                        <Button
                            size="lg"
                            className="bg-white text-primary-700 hover:bg-gray-100"
                        >
                            İletişime Geç
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

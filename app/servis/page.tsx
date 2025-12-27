import { Metadata } from "next";
import Link from "next/link";
import { Phone, MapPin, Wrench, Clock, Shield } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "Servis Ağımız - GIPKON TEKNOLOJİ",
    description: "GIPKON TEKNOLOJİ teknik servis ağı, yetkili servis noktaları ve destek hizmetleri.",
};

const serviceRegions = [
    {
        region: "Marmara Bölgesi",
        center: "İstanbul (Merkez)",
        address: "Organize Sanayi Bölgesi, 4. Cadde No: 12, Başakşehir, İstanbul",
        phone: "+90 212 999 99 99",
        coverage: ["İstanbul", "Kocaeli", "Bursa", "Tekirdağ", "Sakarya"]
    },
    {
        region: "Ege Bölgesi",
        center: "İzmir",
        address: "Atatürk Organize Sanayi Bölgesi, 10003 Sokak No: 15, Çiğli, İzmir",
        phone: "+90 232 999 99 99",
        coverage: ["İzmir", "Manisa", "Aydın", "Denizli"]
    },
    {
        region: "İç Anadolu Bölgesi",
        center: "Ankara",
        address: "OSTİM Organize Sanayi Bölgesi, 1234. Sk. No: 45, Yenimahalle, Ankara",
        phone: "+90 312 999 99 99",
        coverage: ["Ankara", "Konya", "Eskişehir", "Kayseri"]
    },
    {
        region: "Güney Anadolu Bölgesi",
        center: "Gaziantep",
        address: "2. Organize Sanayi Bölgesi, 83204 Nolu Cadde No: 5, Şehitkamil, Gaziantep",
        phone: "+90 342 999 99 99",
        coverage: ["Gaziantep", "Adana", "Mersin", "Hatay"]
    }
];

export default function ServiceNetworkPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-primary-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-primary-800 opacity-90 z-0" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Servis Ağımız
                    </h1>
                    <p className="text-xl text-primary-200 max-w-2xl mx-auto">
                        Türkiye genelinde yaygın servis ağımızla 7/24 yanınızdayız
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50 border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Clock className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary-800 mb-3">7/24 Destek</h3>
                            <p className="text-secondary-600">Her an ulaşabileceğiniz teknik destek ekibimizle üretiminiz hiç durmasın.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Wrench className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary-800 mb-3">Yerinde Müdahale</h3>
                            <p className="text-secondary-600">Gezici teknik servis araçlarımızla en kısa sürede yerinde arıza tespiti ve onarım.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary-800 mb-3">Garantili Yedek Parça</h3>
                            <p className="text-secondary-600">Orijinal yedek parça ve garantili işçilik ile sistemleriniz güvende.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map/Regions Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-display font-bold text-secondary-800 mb-4">
                            Bölge Müdürlüklerimiz
                        </h2>
                        <p className="text-secondary-600 max-w-2xl mx-auto">
                            Türkiye'nin 4 büyük sanayi bölgesindeki merkezlerimiz ve yaygın servis ağımızla hizmetinizdeyiz.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {serviceRegions.map((region, idx) => (
                            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                                <h3 className="text-2xl font-bold text-primary-700 mb-6 border-b border-gray-100 pb-4">
                                    {region.region}
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <MapPin className="w-5 h-5 text-secondary-400 mt-1 mr-3 flex-shrink-0" />
                                        <div>
                                            <div className="font-semibold text-secondary-800">{region.center}</div>
                                            <div className="text-sm text-secondary-600">{region.address}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="w-5 h-5 text-secondary-400 mr-3 flex-shrink-0" />
                                        <a href={`tel:${region.phone}`} className="text-primary-600 font-medium hover:underline">
                                            {region.phone}
                                        </a>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg mt-4">
                                        <span className="text-xs font-semibold text-secondary-500 uppercase tracking-wide block mb-2">
                                            Hizmet Verilen İller
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            {region.coverage.map((city, cityIdx) => (
                                                <span key={cityIdx} className="text-sm px-2 py-1 bg-white border border-gray-200 rounded text-secondary-600">
                                                    {city}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-primary-700 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">Acil Teknik Destek</h2>
                    <p className="text-xl text-primary-100 mb-8">
                        Teknik bir sorun mu yaşıyorsunuz? 7/24 destek hattımız hizmetinizde.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100">
                            Servis Talebi Oluştur
                        </Button>
                        <a href="tel:+902129999999">
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                                <Phone className="w-5 h-5 mr-2" />
                                Hemen Ara
                            </Button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import references from "@/data/references.json";

export const metadata: Metadata = {
    title: "Referanslarımız - GIPKON TEKNOLOJİ",
    description: "GIPKON TEKNOLOJİ olarak çalıştığımız değerli müşterilerimiz ve başarılı projelerimiz.",
};

// Temporary mock data - will be replaced with real data from admin panel
const mockReferences = [
    { id: 1, name: "Şirket A", logo: "/images/references/company-a.png", sector: "Gıda" },
    { id: 2, name: "Şirket B", logo: "/images/references/company-b.png", sector: "Tekstil" },
    { id: 3, name: "Şirket C", logo: "/images/references/company-c.png", sector: "Sağlık" },
    { id: 4, name: "Şirket D", logo: "/images/references/company-d.png", sector: "Kimya" },
    { id: 5, name: "Şirket E", logo: "/images/references/company-e.png", sector: "İlaç" },
    { id: 6, name: "Şirket F", logo: "/images/references/company-f.png", sector: "Enerji" },
    { id: 7, name: "Şirket G", logo: "/images/references/company-g.png", sector: "Maden" },
    { id: 8, name: "Şirket H", logo: "/images/references/company-h.png", sector: "Savunma" },
];

const stats = [
    { value: "500+", label: "Mutlu Müşteri" },
    { value: "1000+", label: "Tamamlanan Proje" },
    { value: "9", label: "Farklı Sektör" },
    { value: "15+", label: "Yıllık Deneyim" },
];

const sectors = [
    "Tümü",
    "Gıda",
    "Tekstil",
    "Sağlık",
    "Kimya",
    "İlaç",
    "Kozmetik",
    "Enerji",
    "Maden",
    "Savunma",
];

export default function ReferanslarPage() {
    // Use mock data if references.json is empty
    const displayReferences = references.length > 0 ? references : mockReferences;

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-700 to-primary-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl font-display font-bold mb-6">Referanslarımız</h1>
                        <p className="text-xl text-primary-100">
                            Çalışmalarımızı referanslarımız anlatsın
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl font-bold text-primary-600 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-secondary-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-8 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {sectors.map((sector) => (
                            <button
                                key={sector}
                                className="px-6 py-2 rounded-full bg-white border-2 border-gray-200 text-secondary-700 hover:border-primary-600 hover:text-primary-600 transition-colors font-medium"
                            >
                                {sector}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* References Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {displayReferences.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {displayReferences.map((reference: any) => (
                                <div
                                    key={reference.id}
                                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-center aspect-square border border-gray-100"
                                >
                                    <div className="text-center">
                                        {/* Placeholder for logo */}
                                        <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <span className="text-4xl font-bold text-gray-300">
                                                {reference.name.charAt(0)}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-secondary-800 mb-1">
                                            {reference.name}
                                        </h3>
                                        <p className="text-sm text-secondary-600">{reference.sector}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🏢</div>
                            <h3 className="text-2xl font-semibold text-secondary-800 mb-2">
                                Referanslar Yükleniyor
                            </h3>
                            <p className="text-secondary-600">
                                Referanslar admin panel üzerinden eklenecektir.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-display font-bold text-secondary-800 mb-4">
                            Müşteri Görüşleri
                        </h2>
                        <p className="text-lg text-secondary-600">
                            Müşterilerimizin bizim hakkımızda söyledikleri
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-lg">
                                        M{i}
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-semibold text-secondary-800">
                                            Müşteri {i}
                                        </h4>
                                        <p className="text-sm text-secondary-600">Şirket Yetkilisi</p>
                                    </div>
                                </div>
                                <div className="flex mb-3">
                                    {[...Array(5)].map((_, index) => (
                                        <svg
                                            key={index}
                                            className="w-5 h-5 text-yellow-400 fill-current"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-secondary-600 italic">
                                    "GIPKON ile çalışmak bizim için harika bir deneyim oldu. Profesyonel
                                    yaklaşımları ve kaliteli hizmetleri için teşekkür ederiz."
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-primary-700 to-primary-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-display font-bold mb-6">
                        Siz de Referanslarımıza Katılın
                    </h2>
                    <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
                        Projeniz için bizimle iletişime geçin ve başarı hikayenizin bir parçası olalım
                    </p>
                    <Link
                        href="/iletisim"
                        className="px-8 py-3 bg-white text-primary-700 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block"
                    >
                        İletişime Geç
                    </Link>
                </div>
            </section>
        </div>
    );
}

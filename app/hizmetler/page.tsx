import { Metadata } from "next";
import Card from "@/components/ui/Card";
import services from "@/data/services.json";

export const metadata: Metadata = {
    title: "Hizmetlerimiz - GIPKON TEKNOLOJİ",
    description: "Proje danışmanlığından devreye almaya kadar tam kapsamlı otomasyon hizmetleri",
};

export default function HizmetlerPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-700 to-primary-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl font-display font-bold mb-6">Hizmetlerimiz</h1>
                        <p className="text-xl text-primary-100">
                            Proje danışmanlığından devreye almaya kadar tam kapsamlı hizmet
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <Card
                                key={service.id}
                                title={service.title}
                                description={service.description}
                                href={`/hizmetler/${service.slug}`}
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
                            Kapsamlı Hizmet Anlayışı
                        </h2>
                        <p className="text-lg text-secondary-600">
                            Projenizin her aşamasında yanınızdayız. İhtiyaç analizinden başlayarak,
                            tasarım, kurulum, devreye alma ve sonrasında 7/24 teknik destek ile
                            hizmetinizdeyiz.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

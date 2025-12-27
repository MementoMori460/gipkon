import { Metadata } from "next";
import Link from "next/link";
import { Download, FileText, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import catalogs from "@/data/catalogs.json";

export const metadata: Metadata = {
    title: "Kataloglarımız - GIPKON TEKNOLOJİ",
    description: "GIPKON TEKNOLOJİ ürün ve hizmet kataloglarını PDF olarak indirebilirsiniz.",
};

export default function CatalogsPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="bg-primary-900 text-white py-20 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        E-Kataloglar
                    </h1>
                    <p className="text-primary-200 max-w-2xl mx-auto text-lg">
                        Ürün ve çözümlerimiz hakkında detaylı bilgiye ulaşmak için kataloglarımızı inceleyebilirsiniz.
                    </p>
                </div>
            </section>

            {/* Catalogs Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {catalogs.map((catalog) => (
                            <div key={catalog.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="relative h-64 bg-gray-100 group-hover:bg-gray-200 transition-colors flex items-center justify-center p-8">
                                    {/* Placeholder for Catalog Cover */}
                                    <div className="w-40 h-56 bg-white shadow-lg flex items-center justify-center transform group-hover:-translate-y-2 transition-transform duration-300">
                                        <div className="text-center p-4">
                                            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <FileText className="w-6 h-6 text-primary-600" />
                                            </div>
                                            <p className="text-xs text-gray-400 font-medium">ÖNİZLEME</p>
                                        </div>
                                    </div>
                                    {/* File Type Badge */}
                                    <div className="absolute top-4 right-4 bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold uppercase">
                                        PDF
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-secondary-800 mb-2 group-hover:text-primary-700 transition-colors">
                                        {catalog.title}
                                    </h3>
                                    <p className="text-secondary-600 text-sm mb-4 min-h-[40px]">
                                        {catalog.description}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
                                        <span>Dosya Boyutu: {catalog.size}</span>
                                        <span>Dil: {catalog.language}</span>
                                    </div>

                                    {/* Download Button (Simulated) */}
                                    <Button variant="outline" className="w-full justify-center group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600">
                                        <Download className="w-4 h-4 mr-2" />
                                        İndir / Görüntüle
                                    </Button>
                                    <p className="text-xs text-center text-gray-400 mt-2">
                                        *PDF formatında indirilecektir
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Need More Info CTA */}
            <section className="py-16 bg-gray-50 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-secondary-800 mb-4">
                        Aradığınızı Bulamadınız mı?
                    </h2>
                    <p className="text-secondary-600 mb-8 max-w-xl mx-auto">
                        Özel projeleriniz ve spesifik teknik doküman talepleriniz için bizimle iletişime geçebilirsiniz.
                    </p>
                    <Link href="/iletisim">
                        <Button size="lg" variant="secondary">
                            Bize Ulaşın <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

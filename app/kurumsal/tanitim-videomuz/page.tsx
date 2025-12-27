import { Metadata } from "next";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "Tanıtım Videomuz - GIPKON TEKNOLOJİ",
    description: "GIPKON TEKNOLOJİ kurumsal tanıtım filmi ve üretim tesislerimiz.",
};

export default function VideoPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="bg-gray-900 text-white py-16 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-display font-bold mb-4">Tanıtım Videomuz</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Teknoloji ve inovasyon dolu dünyamızı keşfedin.
                    </p>
                </div>
            </section>

            {/* Main Video Section */}
            <section className="py-20 bg-black">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-2xl overflow-hidden shadow-2xl relative group">
                            {/* Placeholder for Video Embed */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform cursor-pointer shadow-glow">
                                        <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                                    </div>
                                    <p className="text-gray-400 font-medium">Kurumsal Tanıtım Filmi</p>
                                    <p className="text-xs text-gray-500 mt-2">Daha iyi bir deneyim için HD izleyin</p>
                                </div>
                            </div>
                            {/* 
                            <iframe 
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                                title="GIPKON TEKNOLOJİ Tanıtım Filmi" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen 
                                className="w-full h-full"
                            ></iframe> 
                            */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-secondary-800 mb-4">Üretim Tesisi</h3>
                            <p className="text-secondary-600">
                                5.000 m² kapalı alana sahip modern üretim tesisimizde, son teknoloji ekipmanlarla üretim yapıyoruz.
                            </p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-secondary-800 mb-4">Ar-Ge Merkezi</h3>
                            <p className="text-secondary-600">
                                Yenilikçi çözümler geliştirdiğimiz Ar-Ge merkezimizde geleceğin teknolojilerini tasarlıyoruz.
                            </p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-secondary-800 mb-4">Uzman Kadro</h3>
                            <p className="text-secondary-600">
                                Alanında uzman mühendis ve teknik ekibimizle projelerinizi hayata geçiriyoruz.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gray-50 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-secondary-800 mb-6">Daha Fazla Bilgi Alın</h2>
                    <Link href="/iletisim">
                        <Button size="lg" variant="primary">
                            Bizimle İletişime Geçin <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

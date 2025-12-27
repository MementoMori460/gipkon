import { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, ChevronDown, ChevronUp, Mail, Phone, MessageSquare } from "lucide-react";
import Button from "@/components/ui/Button";
import faqData from "@/data/faq.json";

export const metadata: Metadata = {
    title: "Sıkça Sorulan Sorular - GIPKON TEKNOLOJİ",
    description: "GIPKON TEKNOLOJİ ve hizmetlerimiz hakkında sıkça sorulan soruların cevapları.",
};

export default function FAQPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-primary-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 opacity-90 z-0" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-block p-3 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                        <HelpCircle className="w-8 h-8 text-primary-200" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Sıkça Sorulan Sorular
                    </h1>
                    <p className="text-xl text-primary-200 max-w-2xl mx-auto">
                        Hizmetlerimiz ve süreçlerimiz hakkında merak ettiğiniz tüm soruların cevapları
                    </p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="space-y-6">
                            {faqData.map((item) => (
                                <details
                                    key={item.id}
                                    className="group bg-white rounded-xl shadow-sm border border-gray-100 open:shadow-md transition-shadow"
                                >
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-medium px-3 py-1 bg-primary-50 text-primary-700 rounded-full">
                                                {item.category}
                                            </span>
                                            <h3 className="text-lg font-semibold text-secondary-800 group-hover:text-primary-700 transition-colors">
                                                {item.question}
                                            </h3>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <ChevronDown className="w-5 h-5 text-secondary-500 group-open:hidden transition-transform" />
                                            <ChevronUp className="w-5 h-5 text-primary-600 hidden group-open:block transition-transform" />
                                        </div>
                                    </summary>
                                    <div className="px-6 pb-6 pt-0">
                                        <p className="text-secondary-600 leading-relaxed border-t border-gray-100 pt-4">
                                            {item.answer}
                                        </p>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-display font-bold text-secondary-800 mb-8">
                        Başka Sorunuz Var mı?
                    </h2>
                    <p className="text-lg text-secondary-600 mb-12 max-w-2xl mx-auto">
                        Aradığınız cevabı bulamadınız mı? Bize doğrudan ulaşın, size yardımcı olmaktan memnuniyet duyarız.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center group hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 transition-colors">
                                <Phone className="w-6 h-6 text-primary-600" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Bizi Arayın</h3>
                            <p className="text-secondary-600 mb-4">+90 212 999 99 99</p>
                            <a href="tel:+902129999999" className="text-primary-600 font-medium hover:underline">
                                Hemen Ara
                            </a>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center group hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 transition-colors">
                                <Mail className="w-6 h-6 text-primary-600" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">E-posta Gönderin</h3>
                            <p className="text-secondary-600 mb-4">info@gipkon.com.tr</p>
                            <a href="mailto:info@gipkon.com.tr" className="text-primary-600 font-medium hover:underline">
                                Mail Gönder
                            </a>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center group hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 transition-colors">
                                <MessageSquare className="w-6 h-6 text-primary-600" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">İletişim Formu</h3>
                            <p className="text-secondary-600 mb-4">Formu doldurun biz arayalım</p>
                            <Link href="/iletisim" className="text-primary-600 font-medium hover:underline">
                                Forma Git
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

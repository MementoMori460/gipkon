"use client";

import { useState } from "react";
import { Metadata } from "next";
import { FileText, Wrench, Settings, BookOpen, Send, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

const requestTypes = [
    {
        id: "teklif",
        title: "Teklif İste",
        icon: FileText,
        description: "Yeni proje ve sistem ihtiyaçlarınız için teklif alın.",
    },
    {
        id: "servis",
        title: "Servis/Bakım",
        icon: Wrench,
        description: "Arıza bildirimi veya periyodik bakım talebi oluşturun.",
    },
    {
        id: "yedek-parca",
        title: "Yedek Parça",
        icon: Settings,
        description: "İhtiyacınız olan yedek parçalar için talep oluşturun.",
    },
    {
        id: "egitim",
        title: "Eğitim Talebi",
        icon: BookOpen,
        description: "Teknik personeliniz için eğitim programı talep edin.",
    },
];

export default function ServiceRequestPage() {
    const [activeType, setActiveType] = useState("teklif");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Common form state
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        details: "",
        machineModel: "", // for service/parts
        partNumber: "", // for parts
        attendeeCount: "", // for training
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 5000);
        // Reset form would go here
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-display font-bold text-secondary-800 mb-4">
                        Hizmet Talebi Oluşturun
                    </h1>
                    <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
                        İhtiyacınız olan hizmet türünü seçin ve formu doldurun. Uzman ekibimiz en kısa sürede size dönüş yapacaktır.
                    </p>
                </div>

                {/* Type Selection Tabs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
                    {requestTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => {
                                setActiveType(type.id);
                                setIsSuccess(false);
                            }}
                            className={`p-6 rounded-xl border transition-all text-left group ${activeType === type.id
                                    ? "bg-white border-primary-500 shadow-md ring-2 ring-primary-500/20"
                                    : "bg-white border-gray-200 hover:border-primary-300 hover:shadow-sm"
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${activeType === type.id ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-500 group-hover:bg-primary-50 group-hover:text-primary-500"
                                }`}>
                                <type.icon className="w-5 h-5" />
                            </div>
                            <h3 className={`font-bold mb-1 ${activeType === type.id ? "text-primary-700" : "text-secondary-700"}`}>
                                {type.title}
                            </h3>
                            <p className="text-xs text-secondary-500">
                                {type.description}
                            </p>
                        </button>
                    ))}
                </div>

                {/* Form Section */}
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                    <div className="mb-8 border-b border-gray-100 pb-6">
                        <h2 className="text-2xl font-bold text-secondary-800 flex items-center">
                            {requestTypes.find(t => t.id === activeType)?.title} Formu
                        </h2>
                    </div>

                    {isSuccess ? (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-fade-in">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-green-700 mb-2">Talebiniz Alındı!</h3>
                            <p className="text-green-800 mb-6">
                                Formunuz başarıyla tarafımıza ulaşmıştır. İlgili birimimiz inceledikten sonra size dönüş sağlayacaktır.
                            </p>
                            <Button onClick={() => setIsSuccess(false)} variant="outline">
                                Yeni Talep Oluştur
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Common Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                                        Ad Soyad *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                                        Firma Adı
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                                        E-posta *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                                        Telefon *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Dynamic Fields based on Type */}
                            {(activeType === "servis" || activeType === "yedek-parca") && (
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                                        Makine/Sistem Modeli
                                    </label>
                                    <input
                                        type="text"
                                        name="machineModel"
                                        placeholder="Varsa seri no veya model bilgisi"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {activeType === "yedek-parca" && (
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                                        Parça Kodu (Varsa)
                                    </label>
                                    <input
                                        type="text"
                                        name="partNumber"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            {activeType === "egitim" && (
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                                        Katılımcı Sayısı
                                    </label>
                                    <input
                                        type="number"
                                        name="attendeeCount"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    Talep Detayları *
                                </label>
                                <textarea
                                    name="details"
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                                    placeholder="Lütfen talebinizi detaylı bir şekilde açıklayınız..."
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Gönderiliyor..." : "Talebi Gönder"} <Send className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

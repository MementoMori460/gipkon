"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Slide {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    image: string;
    cta?: { text: string; href: string };
    secondaryCta?: { text: string; href: string };
}

interface HeroFormProps {
    slide: Slide | null;
    onSave: (slide: Slide) => void;
    onCancel: () => void;
}

export default function HeroForm({ slide, onSave, onCancel }: HeroFormProps) {
    const [formData, setFormData] = useState<Slide>(
        slide || {
            id: Date.now().toString(),
            title: "",
            subtitle: "",
            description: "",
            image: "",
            cta: { text: "Bize Ulaşın", href: "/iletisim" },
            secondaryCta: { text: "", href: "" },
        }
    );

    const handleChange = (field: keyof Slide, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleCtaChange = (type: "cta" | "secondaryCta", field: "text" | "href", value: string) => {
        setFormData({
            ...formData,
            [type]: { ...formData[type], [field]: value },
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold">{slide ? "Slayt Düzenle" : "Yeni Slayt"}</h2>
                    <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Görsel URL</label>
                        <input
                            type="text"
                            required
                            value={formData.image}
                            onChange={(e) => handleChange("image", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="/images/hero/..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık (Opsiyonel)</label>
                        <input
                            type="text"
                            value={formData.subtitle || ""}
                            onChange={(e) => handleChange("subtitle", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama (Opsiyonel)</label>
                        <textarea
                            value={formData.description || ""}
                            onChange={(e) => handleChange("description", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            rows={2}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Buton 1 Metin</label>
                            <input
                                type="text"
                                value={formData.cta?.text || ""}
                                onChange={(e) => handleCtaChange("cta", "text", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Buton 1 Link</label>
                            <input
                                type="text"
                                value={formData.cta?.href || ""}
                                onChange={(e) => handleCtaChange("cta", "href", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Buton 2 Metin</label>
                            <input
                                type="text"
                                value={formData.secondaryCta?.text || ""}
                                onChange={(e) => handleCtaChange("secondaryCta", "text", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Buton 2 Link</label>
                            <input
                                type="text"
                                value={formData.secondaryCta?.href || ""}
                                onChange={(e) => handleCtaChange("secondaryCta", "href", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            Kaydet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

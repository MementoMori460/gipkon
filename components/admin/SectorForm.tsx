"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Plus, Trash2 } from "lucide-react";
import ImagePicker from "@/components/admin/ImagePicker";
import Image from "next/image";

interface Sector {
    id: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    features: string[];
    isActive: boolean;
}

interface SectorFormProps {
    initialData?: Sector;
    isEdit?: boolean;
}

export default function SectorForm({ initialData, isEdit = false }: SectorFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [formData, setFormData] = useState<Sector>(
        initialData || {
            id: "",
            title: "",
            slug: "",
            description: "",
            image: "",
            features: [""],
            isActive: true,
        }
    );

    const handleChange = (field: keyof Sector, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ""] });
    };

    const removeFeature = (index: number) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const url = isEdit ? `/api/admin/sectors/${formData.id}` : "/api/admin/sectors";
            const method = isEdit ? "PUT" : "POST";

            // Clean up features (remove empty ones)
            const cleanData = {
                ...formData,
                features: formData.features.filter((f) => f.trim() !== ""),
            };

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cleanData),
            });

            if (res.ok) {
                router.push("/admin/sectors");
                router.refresh();
            } else {
                const data = await res.json();
                alert(data.error || "Bir hata oluştu.");
            }
        } catch (error) {
            console.error(error);
            alert("Bir hata oluştu.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sektör Başlığı</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="Örn: Gıda Sektörü"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                        <input
                            type="text"
                            required
                            value={formData.slug}
                            onChange={(e) => handleChange("slug", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="rn: gida-sektoru"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                        <textarea
                            required
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            rows={4}
                            placeholder="Sektör hakkında kısa açıklama..."
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kapak Görseli</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            {formData.image ? (
                                <div className="relative w-full h-48 mb-2 rounded-lg overflow-hidden">
                                    <Image src={formData.image} alt="Preview" fill className="object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, image: "" })}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <div className="py-8 flex flex-col items-center justify-center text-gray-500">
                                    <p className="text-sm mb-2">Görsel seçilmedi</p>
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={() => setShowPicker(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                <Upload size={18} />
                                Görsel Seç
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-900">Durum</label>
                        <p className="text-xs text-gray-500">Sektörün sitede görünüp görünmeyeceğini belirleyin.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.isActive}
                            onChange={(e) => handleChange("isActive", e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-700">{formData.isActive ? "Aktif" : "Pasif"}</span>
                    </label>
                </div>
            </div>

            <div className="border-t pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Özellikler (Maddeler)</label>
                <div className="space-y-3">
                    {formData.features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                value={feature}
                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder={`Özellik ${index + 1}`}
                            />
                            <button
                                type="button"
                                onClick={() => removeFeature(index)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                disabled={formData.features.length === 1}
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addFeature}
                        className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium mt-2"
                    >
                        <Plus size={16} />
                        Yeni Özellik Ekle
                    </button>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    İptal
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                    {isLoading ? "Kaydediliyor..." : isEdit ? "Güncelle" : "Oluştur"}
                </button>
            </div>

            {showPicker && (
                <ImagePicker
                    onSelect={(url) => {
                        setFormData({ ...formData, image: url });
                        setShowPicker(false);
                    }}
                    onClose={() => setShowPicker(false)}
                />
            )}
        </form>
    );
}

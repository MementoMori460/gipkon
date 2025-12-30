"use client";

import { useState } from "react";
import { Save, Plus, X, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImagePicker from "./ImagePicker";

interface ServiceFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function ServiceForm({ initialData, isEdit = false }: ServiceFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        description: initialData?.description || "",
        icon: initialData?.icon || "star",
        image: initialData?.image || "", // New image field
        details: initialData?.details || [], // Array of strings
    });

    const [newDetail, setNewDetail] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Auto-generate slug from title if creating new
        if (name === "title" && !isEdit) {
            setFormData((prev) => ({
                ...prev,
                slug: value.toLowerCase()
                    .replace(/ğ/g, 'g')
                    .replace(/ü/g, 'u')
                    .replace(/ş/g, 's')
                    .replace(/ı/g, 'i')
                    .replace(/ö/g, 'o')
                    .replace(/ç/g, 'c')
                    .replace(/[^a-z0-9]/g, '-')
                    .replace(/-+/g, '-')
                    .replace(/^-|-$/g, '')
            }));
        }
    };

    const addDetail = () => {
        if (!newDetail.trim()) return;
        setFormData(prev => ({
            ...prev,
            details: [...prev.details, newDetail.trim()]
        }));
        setNewDetail("");
    };

    const removeDetail = (index: number) => {
        setFormData(prev => ({
            ...prev,
            details: prev.details.filter((_: string, i: number) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEdit
                ? `/api/admin/services/${initialData.id}`
                : "/api/admin/services";

            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/services");
                router.refresh();
            } else {
                alert("Bir hata oluştu");
            }
        } catch (error) {
            console.error(error);
            alert("Bir hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800">Genel Bilgiler</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Hizmet Başlığı
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Slug (URL)
                            </label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Kapak Görseli
                        </label>
                        <div className="flex items-start gap-4">
                            {formData.image ? (
                                <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-gray-200 group">
                                    <Image
                                        src={formData.image}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            ) : (
                                <div className="w-32 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 bg-gray-50">
                                    <ImageIcon size={24} />
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={() => setShowImagePicker(true)}
                                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
                            >
                                Görsel Seç
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            İkon Adı (Lucide React)
                        </label>
                        <input
                            type="text"
                            name="icon"
                            value={formData.icon}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Örn: lightbulb, factory, settings..."
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Lucide icon isimlerini kullanabilirsiniz. (Örn: activity, anchor, api...)
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Kısa Açıklama
                        </label>
                        <textarea
                            name="description"
                            rows={3}
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800">Hizmet Detayları (Maddeler)</h2>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newDetail}
                            onChange={(e) => setNewDetail(e.target.value)}
                            placeholder="Yeni madde ekle..."
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addDetail())}
                        />
                        <button
                            type="button"
                            onClick={addDetail}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>

                    <ul className="space-y-2">
                        {formData.details.map((detail: string, index: number) => (
                            <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group">
                                <span className="text-sm text-gray-700">{detail}</span>
                                <button
                                    type="button"
                                    onClick={() => removeDetail(index)}
                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </li>
                        ))}
                        {formData.details.length === 0 && (
                            <li className="text-sm text-gray-500 text-center py-4">Henüz detay eklenmemiş.</li>
                        )}
                    </ul>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        İptal
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        {loading ? "Kaydediliyor..." : "Kaydet"}
                    </button>
                </div>
            </form>

            {showImagePicker && (
                <ImagePicker
                    onSelect={(url) => setFormData(prev => ({ ...prev, image: url }))}
                    onClose={() => setShowImagePicker(false)}
                />
            )}
        </>
    );
}

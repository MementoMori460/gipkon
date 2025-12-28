"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Upload } from "lucide-react";
import ImagePicker from "@/components/admin/ImagePicker";

type ProjectFormData = {
    title: string;
    slug: string;
    sector: string;
    client: string;
    location: string;
    year: number;
    description: string;
    fullDescription: string;
    image: string;
};

type Props = {
    initialData?: any;
    isEdit?: boolean;
};

export default function ProjectForm({ initialData, isEdit = false }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProjectFormData>({
        defaultValues: initialData || {
            year: new Date().getFullYear(),
            image: "/images/projects/placeholder.svg"
        }
    });

    const onSubmit = async (data: ProjectFormData) => {
        setLoading(true);
        try {
            const url = isEdit ? `/api/admin/projects/${initialData.id}` : "/api/admin/projects";
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.refresh();
                router.push("/admin/projects");
            } else {
                alert("Bir hata oluştu.");
            }
        } catch (error) {
            console.error(error);
            alert("Bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Proje Başlığı</label>
                    <input
                        {...register("title", { required: "Başlık zorunludur" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
                    />
                    {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Slug (URL)</label>
                    <input
                        {...register("slug")}
                        placeholder="Otomatik oluşturulur"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 outline-none bg-gray-50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sektör</label>
                    <select
                        {...register("sector", { required: "Sektör seçiniz" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
                    >
                        <option value="">Seçiniz</option>
                        <option value="gida-sektoru">Gıda Sektörü</option>
                        <option value="tekstil-sektoru">Tekstil Sektörü</option>
                        <option value="saglik-sektoru">Sağlık Sektörü</option>
                        <option value="kimya-sektoru">Kimya Sektörü</option>
                        <option value="ilac-sektoru">İlaç Sektörü</option>
                        <option value="kozmetik-sektoru">Kozmetik Sektörü</option>
                        <option value="enerji-sektoru">Enerji Sektörü</option>
                        <option value="maden-sektoru">Maden Sektörü</option>
                        <option value="savunma-sanayi">Savunma Sanayi</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Müşteri</label>
                    <input
                        {...register("client")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lokasyon</label>
                    <input
                        {...register("location")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Yıl</label>
                    <input
                        type="number"
                        {...register("year")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Görsel URL</label>
                <div className="flex gap-2">
                    <input
                        {...register("image")}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPicker(true)}
                        className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 text-gray-600"
                        title="Resim Seç"
                    >
                        <Upload size={20} />
                    </button>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kısa Açıklama</label>
                <textarea
                    {...register("description")}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Detaylı Açıklama</label>
                <textarea
                    {...register("fullDescription")}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
                />
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Link
                    href="/admin/projects"
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                >
                    İptal
                </Link>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium disabled:opacity-50"
                >
                    {loading ? "Kaydediliyor..." : (isEdit ? "Güncelle" : "Oluştur")}
                </button>
            </div>
            {showPicker && (
                <ImagePicker
                    onSelect={(url) => {
                        setValue("image", url);
                        setShowPicker(false);
                    }}
                    onClose={() => setShowPicker(false)}
                />
            )}
        </form>
    );
}

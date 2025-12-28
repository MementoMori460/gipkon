"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

type ReferenceFormData = {
    name: string;
    sector: string;
    logo: string;
};

type Props = {
    initialData?: any;
    isEdit?: boolean;
};

export default function ReferenceForm({ initialData, isEdit = false }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<ReferenceFormData>({
        defaultValues: initialData || {
            logo: "/images/references/placeholder.png"
        }
    });

    const onSubmit = async (data: ReferenceFormData) => {
        setLoading(true);
        try {
            const url = isEdit ? `/api/admin/references/${initialData.id}` : "/api/admin/references";
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.refresh();
                router.push("/admin/references");
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
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6 max-w-2xl">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Firma Adı</label>
                <input
                    {...register("name", { required: "Firma adı zorunludur" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
                />
                {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sektör</label>
                <select
                    {...register("sector", { required: "Sektör seçiniz" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
                >
                    <option value="">Seçiniz</option>
                    <option value="Gıda">Gıda</option>
                    <option value="Tekstil">Tekstil</option>
                    <option value="Sağlık">Sağlık</option>
                    <option value="Kimya">Kimya</option>
                    <option value="İlaç">İlaç</option>
                    <option value="Kozmetik">Kozmetik</option>
                    <option value="Enerji">Enerji</option>
                    <option value="Maden">Maden</option>
                    <option value="Savunma">Savunma</option>
                    <option value="Diğer">Diğer</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
                <input
                    {...register("logo")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
                />
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Link
                    href="/admin/references"
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
        </form>
    );
}

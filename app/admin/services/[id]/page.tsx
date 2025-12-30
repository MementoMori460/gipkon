"use client";

import ServiceForm from "@/components/admin/ServiceForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function EditServicePage({ params }: { params: { id: string } }) {
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/admin/services/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setService(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [params.id]);

    if (loading) return <div className="p-8">Yükleniyor...</div>;
    if (!service) return <div className="p-8">Hizmet bulunamadı.</div>;

    return (
        <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/services" className="p-2 hover:bg-gray-100 rounded-lg">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Hizmeti Düzenle</h1>
            </div>

            <ServiceForm initialData={service} isEdit={true} />
        </div>
    );
}

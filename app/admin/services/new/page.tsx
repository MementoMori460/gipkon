"use client";

import ServiceForm from "@/components/admin/ServiceForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewServicePage() {
    return (
        <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/services" className="p-2 hover:bg-gray-100 rounded-lg">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Yeni Hizmet Ekle</h1>
            </div>

            <ServiceForm />
        </div>
    );
}

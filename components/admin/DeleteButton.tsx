"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id }: { id: number }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Bu projeyi silmek istediğinize emin misiniz?")) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
            if (res.ok) {
                router.refresh();
            } else {
                alert("Silinirken hata oluştu.");
            }
        } catch (err) {
            alert("Hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        >
            <Trash2 size={18} />
        </button>
    );
}

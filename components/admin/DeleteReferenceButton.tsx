"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteReferenceButton({ id }: { id: number }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm("Bu referansı silmek istediğinizden emin misiniz?")) return;

        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/references/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            } else {
                alert("Silme işlemi başarısız oldu.");
            }
        } catch (error) {
            console.error(error);
            alert("Bir hata oluştu.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isLoading}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            title="Sil"
        >
            <Trash2 size={18} />
        </button>
    );
}

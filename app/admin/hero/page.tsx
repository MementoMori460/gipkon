"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import Image from "next/image";
import HeroForm from "@/components/admin/HeroForm";

export default function HeroPage() {
    const [slides, setSlides] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSlide, setCurrentSlide] = useState<any | null>(null);

    const fetchSlides = async () => {
        try {
            const res = await fetch("/api/admin/hero");
            const data = await res.json();
            setSlides(data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSlides();
    }, []);

    const handleSave = async (slide: any) => {
        let newSlides;
        if (currentSlide) {
            newSlides = slides.map((s) => (s.id === slide.id ? slide : s));
        } else {
            newSlides = [...slides, slide];
        }

        try {
            const res = await fetch("/api/admin/hero", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newSlides),
            });

            if (res.ok) {
                setSlides(newSlides);
                setIsEditing(false);
                setCurrentSlide(null);
            } else {
                alert("Kaydetme başarısız oldu.");
            }
        } catch (error) {
            console.error(error);
            alert("Bir hata oluştu.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu slaytı silmek istediğinizden emin misiniz?")) return;

        const newSlides = slides.filter((s) => s.id !== id);
        try {
            const res = await fetch("/api/admin/hero", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newSlides),
            });
            if (res.ok) setSlides(newSlides);
        } catch (error) {
            console.error(error);
        }
    };

    const moveSlide = async (index: number, direction: "up" | "down") => {
        if (
            (direction === "up" && index === 0) ||
            (direction === "down" && index === slides.length - 1)
        )
            return;

        const newSlides = [...slides];
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        [newSlides[index], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[index]];

        try {
            const res = await fetch("/api/admin/hero", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newSlides),
            });
            if (res.ok) setSlides(newSlides);
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) return <div className="p-8">Yükleniyor...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Hero Slider Yönetimi</h1>
                <button
                    onClick={() => { setCurrentSlide(null); setIsEditing(true); }}
                    className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                    <Plus size={18} />
                    Yeni Slayt
                </button>
            </div>

            <div className="grid gap-6">
                {slides.map((slide, index) => (
                    <div key={slide.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6">
                        <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                    // Fallback for broken images if needed, or visual indication
                                }}
                            />
                        </div>

                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900">{slide.title}</h3>
                            <p className="text-sm text-gray-500">{slide.subtitle}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex flex-col gap-1 mr-4">
                                <button
                                    onClick={() => moveSlide(index, "up")}
                                    disabled={index === 0}
                                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                                >
                                    <ArrowUp size={16} />
                                </button>
                                <button
                                    onClick={() => moveSlide(index, "down")}
                                    disabled={index === slides.length - 1}
                                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                                >
                                    <ArrowDown size={16} />
                                </button>
                            </div>

                            <button
                                onClick={() => { setCurrentSlide(slide); setIsEditing(true); }}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <Edit size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(slide.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isEditing && (
                <HeroForm
                    slide={currentSlide}
                    onSave={handleSave}
                    onCancel={() => { setIsEditing(false); setCurrentSlide(null); }}
                />
            )}
        </div>
    );
}

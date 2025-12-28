"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Upload, Image as ImageIcon, Check, X, Trash2 } from "lucide-react";

interface ImagePickerProps {
    onSelect: (url: string) => void;
    onClose: () => void;
}

export default function ImagePicker({ onSelect, onClose }: ImagePickerProps) {
    const [activeTab, setActiveTab] = useState<"upload" | "gallery">("upload");
    const [images, setImages] = useState<{ name: string; url: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch images when gallery tab is active
    useEffect(() => {
        if (activeTab === "gallery") {
            setIsLoading(true);
            fetch("/api/admin/media")
                .then((res) => res.json())
                .then((data) => {
                    setImages(data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setIsLoading(false);
                });
        }
    }, [activeTab]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/admin/media", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (data.success) {
                // Determine what to do next: either select immediately or show gallery
                // For better UX: Select immediate
                onSelect(data.url);
                onClose();
            } else {
                alert("Yükleme başarısız: " + data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Yükleme hatası");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-[500px] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">Resim Seç / Yükle</h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <div className="flex border-b">
                    <button
                        className={`flex-1 py-3 text-sm font-medium ${activeTab === "upload" ? "text-primary-600 border-b-2 border-primary-600" : "text-gray-500 hover:text-gray-700"}`}
                        onClick={() => setActiveTab("upload")}
                    >
                        Yeni Yükle
                    </button>
                    <button
                        className={`flex-1 py-3 text-sm font-medium ${activeTab === "gallery" ? "text-primary-600 border-b-2 border-primary-600" : "text-gray-500 hover:text-gray-700"}`}
                        onClick={() => setActiveTab("gallery")}
                    >
                        Galeriden Seç
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {activeTab === "upload" ? (
                        <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                            <Upload size={48} className="text-gray-400 mb-4" />
                            <p className="text-gray-600 mb-6">Bilgisayarınızdan bir dosya seçin</p>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleUpload}
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                            >
                                {uploading ? "Yükleniyor..." : "Dosya Seç"}
                            </button>
                        </div>
                    ) : (
                        <div>
                            {isLoading ? (
                                <p className="text-center text-gray-500 mt-10">Yükleniyor...</p>
                            ) : images.length === 0 ? (
                                <div className="text-center mt-10">
                                    <ImageIcon size={48} className="mx-auto text-gray-300 mb-3" />
                                    <p className="text-gray-500">Henüz hiç resim yüklenmemiş.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {images.map((img) => (
                                        <div
                                            key={img.url}
                                            className="group relative aspect-square border rounded-lg overflow-hidden cursor-pointer hover:border-primary-500"
                                            onClick={() => {
                                                onSelect(img.url);
                                                onClose();
                                            }}
                                        >
                                            <Image
                                                src={img.url}
                                                alt={img.name}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                                                <div className="opacity-0 group-hover:opacity-100 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                                                    Seç
                                                </div>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-[10px] p-1 truncate">
                                                {img.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

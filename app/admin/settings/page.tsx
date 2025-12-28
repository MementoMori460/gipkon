"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Save, RefreshCw } from "lucide-react";

export default function SettingsPage() {
    const router = useRouter();
    const { refreshTheme } = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [settings, setSettings] = useState({
        contact: {
            address: "",
            phone: "",
            email: "",
            mapUrl: ""
        },
        branding: {
            logo: "",
            favicon: ""
        },
        socialMedia: {
            facebook: "",
            twitter: "",
            linkedin: "",
            instagram: ""
        }
    });

    useEffect(() => {
        fetch("/api/admin/settings")
            .then((res) => res.json())
            .then((data) => {
                // Ensure checking for nulls to avoid uncontrolled input errors
                setSettings({
                    contact: {
                        address: data.contact?.address || "",
                        phone: data.contact?.phone || "",
                        email: data.contact?.email || "",
                        mapUrl: data.contact?.mapUrl || ""
                    },
                    branding: {
                        logo: data.branding?.logo || "",
                        favicon: data.branding?.favicon || ""
                    },
                    socialMedia: {
                        facebook: data.socialMedia?.facebook || "",
                        twitter: data.socialMedia?.twitter || "",
                        linkedin: data.socialMedia?.linkedin || "",
                        instagram: data.socialMedia?.instagram || ""
                    }
                });
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    const handleChange = (section: string, field: string, value: string) => {
        setSettings((prev: any) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            // We need to fetch existing settings first to merge, so we don't overwrite theme settings
            // But since this page doesn't touch theme settings anymore, simpler is to just send what we have
            // However, the backend likely overwrites the whole file. 
            // So we should ideally have fetched the whole object in the beginning.
            // Let's rely on the API implementation. If existing API overwrites, we need to be careful.
            // Assuming we need to merge with current theme settings which we might not have in state.

            // Re-fetch latest to get current theme
            const currentRes = await fetch("/api/admin/settings");
            const currentData = await currentRes.json();

            const mergedSettings = {
                ...currentData,
                contact: settings.contact,
                branding: settings.branding,
                socialMedia: settings.socialMedia
            };

            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(mergedSettings)
            });

            if (res.ok) {
                await refreshTheme();
                alert("Ayarlar başarıyla kaydedildi.");
                router.refresh();
            } else {
                alert("Kaydetme başarısız oldu.");
            }
        } catch (error) {
            console.error(error);
            alert("Bir hata oluştu.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="p-8">Yükleniyor...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Site Ayarları</h1>
                <button
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                    {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                    Kaydet
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4 pb-2 border-b">İletişim Bilgileri</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                            <textarea
                                value={settings.contact.address}
                                onChange={(e) => handleChange("contact", "address", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                rows={3}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                            <input
                                type="text"
                                value={settings.contact.phone}
                                onChange={(e) => handleChange("contact", "phone", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                            <input
                                type="email"
                                value={settings.contact.email}
                                onChange={(e) => handleChange("contact", "email", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Harita URL (Embed)</label>
                            <input
                                type="text"
                                value={settings.contact.mapUrl || ""}
                                onChange={(e) => handleChange("contact", "mapUrl", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                                placeholder="Google Maps embed URL"
                            />
                        </div>
                    </div>
                </div>

                {/* Branding */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Marka & Görseller</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                            <input
                                type="text"
                                value={settings.branding?.logo || ""}
                                onChange={(e) => handleChange("branding", "logo", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                                placeholder="https://example.com/logo.png"
                            />
                            <p className="text-xs text-gray-500 mt-1">Header ve Admin panelde görünecek logo adresi.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Favicon URL</label>
                            <input
                                type="text"
                                value={settings.branding?.favicon || ""}
                                onChange={(e) => handleChange("branding", "favicon", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                                placeholder="https://example.com/favicon.ico"
                            />
                            <p className="text-xs text-gray-500 mt-1">Tarayıcı sekmesinde görünecek ikon adresi.</p>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Sosyal Medya</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                            <input
                                type="url"
                                value={settings.socialMedia.facebook}
                                onChange={(e) => handleChange("socialMedia", "facebook", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Twitter / X</label>
                            <input
                                type="url"
                                value={settings.socialMedia.twitter}
                                onChange={(e) => handleChange("socialMedia", "twitter", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                            <input
                                type="url"
                                value={settings.socialMedia.linkedin}
                                onChange={(e) => handleChange("socialMedia", "linkedin", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                            <input
                                type="url"
                                value={settings.socialMedia.instagram}
                                onChange={(e) => handleChange("socialMedia", "instagram", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Save, RefreshCw, RotateCcw } from "lucide-react";

export default function ThemePage() {
    const { refreshTheme } = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [settings, setSettings] = useState<any>(null);

    const defaultTheme = {
        primaryColor: "#475569",
        secondaryColor: "#94a3b8",
        backgroundColor: "#ffffff",
        textColor: "#334155",
        header: {
            background: "#ffffff",
            textColor: "#334155"
        },
        footer: {
            background: "#f8fafc",
            textColor: "#64748b"
        },
        hero: {
            textColor: "#ffffff",
            overlayColor: "#1e293b",
            overlayOpacity: "0.4"
        },
        card: {
            background: "#ffffff",
            textColor: "#334155",
            borderColor: "#e2e8f0"
        },
        components: {
            buttonPrimaryBg: "#475569",
            buttonPrimaryText: "#ffffff",
            buttonSecondaryBg: "#f1f5f9",
            buttonSecondaryText: "#475569",
            inputBg: "#ffffff",
            inputText: "#334155",
            inputBorder: "#cbd5e1"
        }
    };

    useEffect(() => {
        fetch("/api/admin/settings")
            .then((res) => res.json())
            .then((data) => {
                setSettings(data);
                setIsLoading(false);
            });
    }, []);

    const handleChange = (section: string, field: string, value: string) => {
        setSettings((prev: any) => {
            const newSettings = { ...prev };
            if (!newSettings.theme) newSettings.theme = {};

            if (section === "root") {
                newSettings.theme[field] = value;
            } else {
                if (!newSettings.theme[section]) newSettings.theme[section] = {};
                newSettings.theme[section][field] = value;
            }
            return newSettings;
        });
    };

    const handleReset = (section: string, field: string) => {
        // @ts-ignore
        const defaultValue = section === "root" ? defaultTheme[field] : defaultTheme[section]?.[field];
        handleChange(section, field, defaultValue);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            });
            if (res.ok) {
                await refreshTheme();
                alert("Tema ayarları kaydedildi.");
            }
        } catch (error) {
            console.error(error);
            alert("Hata oluştu.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading || !settings) return <div className="p-8">Yükleniyor...</div>;

    const renderColorInput = (label: string, section: string, field: string, description?: string) => {
        const value = section === "root"
            ? settings.theme?.[field]
            : settings.theme?.[section]?.[field];

        return (
            <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        value={value || "#000000"}
                        onChange={(e) => handleChange(section, field, e.target.value)}
                        className="h-9 w-12 rounded border cursor-pointer"
                    />
                    <input
                        type="text"
                        value={value || ""}
                        onChange={(e) => handleChange(section, field, e.target.value)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm p-2 border"
                    />
                    <button
                        type="button"
                        onClick={() => handleReset(section, field)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title="Varsayılana Dön"
                    >
                        <RotateCcw size={16} />
                    </button>
                </div>
                {description && <p className="mt-1 text-xs text-gray-500">{description}</p>}
            </div>
        );
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gelişmiş Tema Ayarları</h1>
                <button
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                    {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                    Kaydet
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Global Colors */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Genel Renkler</h2>
                    {renderColorInput("Ana Renk (Primary)", "root", "primaryColor", "Butonlar, linkler ve vurgular.")}
                    {renderColorInput("İkincil Renk (Secondary)", "root", "secondaryColor", "Alt metinler, pasif ikonlar.")}
                    {renderColorInput("Sayfa Arkaplanı", "root", "backgroundColor")}
                    {renderColorInput("Genel Metin Rengi", "root", "textColor")}
                </div>

                {/* Header & Footer */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Header & Footer</h2>
                    <h3 className="text-sm font-bold text-gray-900 mb-2">Header (Üst Menü)</h3>
                    {renderColorInput("Arkaplan", "header", "background")}
                    {renderColorInput("Metin Rengi", "header", "textColor")}

                    <h3 className="text-sm font-bold text-gray-900 mb-2 mt-4">Footer (Alt Menü)</h3>
                    {renderColorInput("Arkaplan", "footer", "background")}
                    {renderColorInput("Metin Rengi", "footer", "textColor")}
                </div>

                {/* Hero Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Hero Alanı</h2>
                    {renderColorInput("Metin Rengi", "hero", "textColor")}
                    {renderColorInput("Overlay Rengi", "hero", "overlayColor", "Resim üzeri karartma rengi.")}

                    <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Overlay Opaklık (0.1 - 1.0)</label>
                        <input
                            type="number"
                            min="0" max="1" step="0.1"
                            value={settings.theme?.hero?.overlayOpacity || "0.5"}
                            onChange={(e) => handleChange("hero", "overlayOpacity", e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm p-2 border"
                        />
                    </div>
                </div>

                {/* Cards */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Kartlar (Hizmetler/Projeler)</h2>
                    {renderColorInput("Arkaplan", "card", "background")}
                    {renderColorInput("Metin Rengi", "card", "textColor")}
                    {renderColorInput("Çerçeve Rengi", "card", "borderColor")}
                </div>

                {/* Components */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Bileşenler</h2>

                    <h3 className="text-sm font-bold text-gray-900 mb-2">Butonlar (Birincil)</h3>
                    {renderColorInput("Arkaplan", "components", "buttonPrimaryBg")}
                    {renderColorInput("Metin", "components", "buttonPrimaryText")}

                    <h3 className="text-sm font-bold text-gray-900 mb-2 mt-4">Inputlar</h3>
                    {renderColorInput("Arkaplan", "components", "inputBg")}
                    {renderColorInput("Metin", "components", "inputText")}
                    {renderColorInput("Çerçeve", "components", "inputBorder")}
                </div>
            </div>
        </div>
    );
}

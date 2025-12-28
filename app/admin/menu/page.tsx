"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw, ChevronRight, ChevronDown, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MenuPage() {
    const router = useRouter();
    const [menu, setMenu] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Collapsed state for tree view
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

    useEffect(() => {
        fetch("/api/admin/menu")
            .then((res) => res.json())
            .then((data) => {
                setMenu(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    const toggleCollapse = (id: string) => {
        setCollapsed(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleHeaderChange = (index: number, field: string, value: any) => {
        const newHeader = [...menu.header];
        newHeader[index] = { ...newHeader[index], [field]: value };
        setMenu({ ...menu, header: newHeader });
    };

    const handleHeaderItemChange = (parentIndex: number, itemIndex: number, field: string, value: any) => {
        const newHeader = [...menu.header];
        const newItems = [...newHeader[parentIndex].items];
        newItems[itemIndex] = { ...newItems[itemIndex], [field]: value };
        newHeader[parentIndex].items = newItems;
        setMenu({ ...menu, header: newHeader });
    };

    const handleFooterChange = (section: "quickLinks" | "services", index: number, field: string, value: any) => {
        const newSection = [...menu.footer[section]];
        newSection[index] = { ...newSection[index], [field]: value };
        setMenu({ ...menu, footer: { ...menu.footer, [section]: newSection } });
    };

    const handleSubmit = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/admin/menu", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(menu)
            });

            if (res.ok) {
                alert("Menü başarıyla güncellendi.");
                router.refresh();
            } else {
                alert("Güncelleme başarısız.");
            }
        } catch (error) {
            console.error(error);
            alert("Hata oluştu.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="p-8">Yükleniyor...</div>;
    if (!menu) return <div className="p-8">Menü verisi bulunamadı.</div>;

    return (
        <div className="space-y-8 pb-20">
            <div className="flex justify-between items-center sticky top-0 bg-gray-50/95 backdrop-blur py-4 z-10 border-b border-gray-200 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Menü Yönetimi</h1>
                <button
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 shadow-sm"
                >
                    {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                    Kaydet
                </button>
            </div>

            {/* Header Menu Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Üst Menü (Header)</h2>
                <div className="space-y-4">
                    {menu.header.map((item: any, idx: number) => (
                        <div key={idx} className="border border-gray-100 rounded-lg p-3 bg-gray-50/50">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => toggleCollapse(`h-${idx}`)}
                                    className={`p-1 rounded hover:bg-gray-200 ${!item.items ? 'invisible' : ''}`}
                                >
                                    {collapsed[`h-${idx}`] ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                                </button>

                                <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => handleHeaderChange(idx, "name", e.target.value)}
                                    className="border px-2 py-1 rounded w-1/3"
                                    placeholder="Menü Adı"
                                />
                                <input
                                    type="text"
                                    value={item.href || ""}
                                    onChange={(e) => handleHeaderChange(idx, "href", e.target.value)}
                                    className="border px-2 py-1 rounded w-1/3 text-sm text-gray-600 font-mono"
                                    placeholder={item.items ? "Dropdown Menü (Link Yok)" : "Link URL"}
                                    disabled={!!item.items}
                                />

                                <div className="flex items-center ml-auto gap-2">
                                    <span className="text-xs text-gray-500 uppercase font-semibold">Aktif</span>
                                    <button
                                        onClick={() => handleHeaderChange(idx, "active", !item.active)}
                                        className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${item.active ? 'bg-primary-600 justify-end' : 'bg-gray-300 justify-start'}`}
                                    >
                                        <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                                    </button>
                                </div>
                            </div>

                            {/* Submenu Items */}
                            {item.items && !collapsed[`h-${idx}`] && (
                                <div className="mt-3 pl-12 space-y-2 border-l-2 border-gray-200 ml-4 py-2">
                                    {item.items.map((sub: any, subIdx: number) => (
                                        <div key={subIdx} className="flex items-center gap-4">
                                            <input
                                                type="text"
                                                value={sub.name}
                                                onChange={(e) => handleHeaderItemChange(idx, subIdx, "name", e.target.value)}
                                                className="border px-2 py-1 rounded w-1/3 text-sm"
                                            />
                                            <input
                                                type="text"
                                                value={sub.href}
                                                onChange={(e) => handleHeaderItemChange(idx, subIdx, "href", e.target.value)}
                                                className="border px-2 py-1 rounded w-1/3 text-sm text-gray-600 font-mono"
                                            />
                                            <div className="flex items-center ml-auto gap-2">
                                                <button
                                                    onClick={() => handleHeaderItemChange(idx, subIdx, "active", !sub.active)}
                                                    className={`w-8 h-4 flex items-center rounded-full p-0.5 transition-colors ${sub.active ? 'bg-primary-600 justify-end' : 'bg-gray-300 justify-start'}`}
                                                >
                                                    <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Menu Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Alt Menü (Hızlı Linkler)</h2>
                    <div className="space-y-2">
                        {menu.footer.quickLinks.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 border border-transparent hover:border-gray-100">
                                <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => handleFooterChange("quickLinks", idx, "name", e.target.value)}
                                    className="border px-2 py-1 rounded w-1/2 text-sm"
                                />
                                <input
                                    type="text"
                                    value={item.href}
                                    onChange={(e) => handleFooterChange("quickLinks", idx, "href", e.target.value)}
                                    className="border px-2 py-1 rounded w-1/2 text-sm text-gray-600 font-mono"
                                />
                                <button
                                    onClick={() => handleFooterChange("quickLinks", idx, "active", !item.active)}
                                    className={`w-8 h-4 flex-shrink-0 flex items-center rounded-full p-0.5 transition-colors ${item.active ? 'bg-primary-600 justify-end' : 'bg-gray-300 justify-start'}`}
                                >
                                    <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Alt Menü (Hizmetlerimiz)</h2>
                    <div className="space-y-2">
                        {menu.footer.services.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 border border-transparent hover:border-gray-100">
                                <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => handleFooterChange("services", idx, "name", e.target.value)}
                                    className="border px-2 py-1 rounded w-1/2 text-sm"
                                />
                                <input
                                    type="text"
                                    value={item.href}
                                    onChange={(e) => handleFooterChange("services", idx, "href", e.target.value)}
                                    className="border px-2 py-1 rounded w-1/2 text-sm text-gray-600 font-mono"
                                />
                                <button
                                    onClick={() => handleFooterChange("services", idx, "active", !item.active)}
                                    className={`w-8 h-4 flex-shrink-0 flex items-center rounded-full p-0.5 transition-colors ${item.active ? 'bg-primary-600 justify-end' : 'bg-gray-300 justify-start'}`}
                                >
                                    <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

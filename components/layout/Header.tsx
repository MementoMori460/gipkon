"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";

const navigation = [
    {
        name: "KURUMSAL",
        items: [
            { name: "Hakkımızda", href: "/kurumsal/hakkimizda" },
            { name: "Tanıtım Videomuz", href: "/kurumsal/tanitim-videomuz" },
            { name: "Kataloglarımız", href: "/kurumsal/kataloglarimiz" },
            { name: "Referanslarımız", href: "/kurumsal/referanslar" },
            { name: "S.S.S.", href: "/kurumsal/sss" },
            { name: "İnsan Kaynakları", href: "/kurumsal/insan-kaynaklari" },
        ],
    },
    {
        name: "ÇÖZÜMLERİMİZ",
        href: "/cozumler",
    },
    {
        name: "PROJELERİMİZ",
        href: "/projeler",
    },
    {
        name: "HİZMETLERİMİZ",
        items: [
            { name: "Hizmetlere Genel Bakış", href: "/hizmetler" },
            { name: "Proje & Danışmanlık", href: "/hizmetler/proje-danismanlik" },
            { name: "Anahtar Teslim Tesisler", href: "/hizmetler/anahtar-teslim-tesisler" },
            { name: "Mekanik Bakım & Servis", href: "/hizmetler/mekanik-bakim-ve-servis" },
            { name: "Hizmet & Teklif Talebi", href: "/hizmet-talebi" },
        ],
    },
    {
        name: "SERVİS AĞIMIZ",
        href: "/servis",
    },
    {
        name: "İLETİŞİM",
        href: "/iletisim",
    },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [settings, setSettings] = useState<any>(null);
    const [menu, setMenu] = useState<any>(null);

    useEffect(() => {
        // Fetch Settings
        fetch("/api/admin/settings")
            .then(res => res.json())
            .then(data => setSettings(data))
            .catch(err => console.error(err));

        // Fetch Menu
        fetch("/api/admin/menu")
            .then(res => res.json())
            .then(data => setMenu(data))
            .catch(err => console.error(err));
    }, []);

    // Defaults if loading or error
    const phone = settings?.contact?.phone || "+90 XXX XXX XX XX";
    const email = settings?.contact?.email || "info@gipkon.com.tr";

    // Fallback static navigation if menu hasn't loaded yet
    const navItems = menu?.header || [];

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
            {/* Top Bar */}
            <div className="bg-primary-700 text-white py-2">
                <div className="container mx-auto px-4 flex justify-between items-center text-sm">
                    <div className="flex gap-4">
                        <a href={`tel:${phone}`} className="hover:text-primary-200 transition-colors">
                            📞 {phone}
                        </a>
                        <a href={`mailto:${email}`} className="hover:text-primary-200 transition-colors">
                            ✉️ {email}
                        </a>
                    </div>
                    <div className="flex gap-3">
                        <button className="hover:text-primary-200 transition-colors">TR</button>
                        <button className="hover:text-primary-200 transition-colors">EN</button>
                        <button className="hover:text-primary-200 transition-colors">DE</button>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <span className="text-2xl font-display font-bold text-primary-700">
                            GIPKON
                        </span>
                        <span className="ml-2 text-sm text-secondary-600">TEKNOLOJİ</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.filter((item: any) => item.active).map((item: any) => (
                            <div
                                key={item.name}
                                className="relative"
                                onMouseEnter={() => item.items && setActiveDropdown(item.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                {item.items ? (
                                    <>
                                        <button className="px-4 py-2 text-sm font-medium text-secondary-700 hover:text-primary-600 transition-colors flex items-center gap-1">
                                            {item.name}
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                        {activeDropdown === item.name && (
                                            <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-slide-down">
                                                {item.items.filter((sub: any) => sub.active).map((subItem: any) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className="block px-4 py-2 text-sm text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={item.href || "#"}
                                        className="px-4 py-2 text-sm font-medium text-secondary-700 hover:text-primary-600 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Search & Mobile Menu */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Search className="w-5 h-5 text-secondary-600" />
                        </button>
                        <button
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6 text-secondary-700" />
                            ) : (
                                <Menu className="w-6 h-6 text-secondary-700" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-gray-200 bg-white animate-slide-down">
                    <div className="container mx-auto px-4 py-4 space-y-2">
                        {navItems.filter((item: any) => item.active).map((item: any) => (
                            <div key={item.name}>
                                {item.items ? (
                                    <>
                                        <button
                                            onClick={() =>
                                                setActiveDropdown(activeDropdown === item.name ? null : item.name)
                                            }
                                            className="w-full text-left px-4 py-2 text-sm font-medium text-secondary-700 hover:bg-primary-50 rounded-lg transition-colors flex items-center justify-between"
                                        >
                                            {item.name}
                                            <ChevronDown
                                                className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>
                                        {activeDropdown === item.name && (
                                            <div className="ml-4 mt-1 space-y-1">
                                                {item.items.filter((sub: any) => sub.active).map((subItem: any) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className="block px-4 py-2 text-sm text-secondary-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={item.href || "#"}
                                        className="block px-4 py-2 text-sm font-medium text-secondary-700 hover:bg-primary-50 rounded-lg transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}

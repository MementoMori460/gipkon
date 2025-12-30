"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FolderKanban,
    Users,
    LogOut,
    Image as ImageIcon,
    Factory,
    Menu,
    X,
    Settings,
    List,
    Database,
    Paintbrush,
    Layout
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminShellProps {
    children: React.ReactNode;
    userName?: string;
    logoUrl?: string;
}

const menuItems = [
    {
        title: "Genel",
        items: [
            { name: "Genel Bakış", href: "/admin", icon: LayoutDashboard },
            { name: "Menü Yönetimi", href: "/admin/menu", icon: List },
            { name: "Hero Slider", href: "/admin/hero", icon: ImageIcon }, // Using ImageIcon temporarily if specific icon not found, or use a custom SVG
            { name: "Medya", href: "/admin/media", icon: ImageIcon },
        ]
    },
    {
        title: "İçerik",
        items: [
            {
                name: "Hizmetler",
                href: "/admin/services",
                icon: Layout,
                isActive: (path: string) => path.startsWith("/admin/services"),
            },
            {
                name: "Projeler",
                href: "/admin/projects",
                icon: FolderKanban,
                isActive: (path: string) => path.startsWith("/admin/projects"),
            },
            { name: "Referanslar", href: "/admin/references", icon: Users },
            { name: "Sektörler", href: "/admin/sectors", icon: Factory },
        ]
    },
    {
        title: "Sistem",
        items: [
            { name: "Site Ayarları", href: "/admin/settings", icon: Settings }, // Changed 'Ayarlar' to 'Site Ayarları'
            { name: "Tema & Tasarım", href: "/admin/theme", icon: Paintbrush }, // Added new item
            { name: "Yedekleme", href: "/admin/backup", icon: Database },
        ]
    }
];

export default function AdminShell({ children, userName, logoUrl }: AdminShellProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="flex h-screen" style={{ backgroundColor: 'var(--page-bg)', color: 'var(--page-text)' }}>
            {/* ... Mobile Overlay ... */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed lg:static inset-y-0 left-0 z-30 w-64 shadow-lg transform transition-transform duration-200 ease-in-out lg:transform-none flex flex-col",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
                style={{ backgroundColor: 'var(--card-bg)', borderRight: '1px solid var(--card-border)' }}
            >
                {/* Logo Area */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        {logoUrl ? (
                            <div className="relative h-8 w-auto aspect-[3/1]">
                                <Image
                                    src={logoUrl}
                                    alt="GIPKON Admin"
                                    fill
                                    className="object-contain"
                                    sizes="150px"
                                    priority
                                />
                            </div>
                        ) : (
                            <div className="text-2xl font-bold text-primary-600">
                                GIPKON
                                <span className="text-xs ml-2 text-gray-500 block font-normal">Admin Panel</span>
                            </div>
                        )}
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                    {menuItems.map((section, idx) => (
                        <div key={idx}>
                            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                {section.title}
                            </h3>
                            <div className="space-y-1">
                                {section.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={cn(
                                                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                                                isActive
                                                    ? "font-medium"
                                                    : "hover:opacity-80"
                                            )}
                                            style={{
                                                backgroundColor: isActive ? 'var(--primary-50)' : 'transparent',
                                                color: isActive ? 'var(--primary-600)' : 'var(--page-text)'
                                            }}
                                        >
                                            <Icon size={20} />
                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* User Info & Logout */}
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                        <div className="text-sm">
                            <p className="font-medium text-gray-900">{userName || "Admin"}</p>
                            <p className="text-xs text-gray-500">Yönetici</p>
                        </div>
                        <Link href="/api/auth/signout" className="text-gray-400 hover:text-red-500 transition-colors">
                            <LogOut size={18} />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Mobile Header */}
                <header className="shadow-sm lg:hidden flex items-center justify-between p-4 z-10" style={{ backgroundColor: 'var(--header-bg)', color: 'var(--header-text)' }}>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-gray-800">Admin Panel</span>
                    <div className="w-6" /> {/* Spacer for centering if needed */}
                </header>

                {/* Content */}
                <main className="flex-1 overflow-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

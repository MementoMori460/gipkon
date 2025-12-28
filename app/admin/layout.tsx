
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { LayoutDashboard, FolderKanban, Users, LogOut, Image as ImageIcon } from "lucide-react";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        // Double check protection, though middleware should handle it
        // but middleware might have issues with matcher if not set up perfectly
        // redirect("/admin/login"); 
    }

    return (
        <NextAuthProvider>
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-lg z-10 flex flex-col">
                    <div className="p-6 border-b border-gray-100">
                        <Link href="/" className="text-2xl font-bold text-primary-600">
                            GIPKON
                            <span className="text-xs ml-2 text-gray-500 block font-normal">Admin Panel</span>
                        </Link>
                    </div>

                    <nav className="flex-1 p-4 space-y-2">
                        <Link
                            href="/admin"
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-primary-600 transition-colors"
                        >
                            <LayoutDashboard size={20} />
                            <span>Genel Bakış</span>
                        </Link>
                        <Link
                            href="/admin/projects"
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-primary-600 transition-colors"
                        >
                            <FolderKanban size={20} />
                            <span>Projeler</span>
                        </Link>

                        <Link
                            href="/admin/hero"
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-primary-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                            <span>Hero Slider</span>
                        </Link>
                        <Link
                            href="/admin/settings"
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-primary-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                            <span>Ayarlar</span>
                        </Link>
                        <Link
                            href="/admin/menu"
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-primary-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                            <span>Menü Yönetimi</span>
                        </Link>
                    </nav>

                    <div className="p-4 border-t border-gray-100">
                        <div className="flex items-center justify-between px-4 py-3">
                            <div className="text-sm">
                                <p className="font-medium text-gray-900">{session?.user?.name || "Admin"}</p>
                                <p className="text-xs text-gray-500">Yönetici</p>
                            </div>
                            <Link href="/api/auth/signout" className="text-gray-400 hover:text-red-500 transition-colors">
                                <LogOut size={18} />
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-auto p-8">
                    {children}
                </main>
            </div>
        </NextAuthProvider >
    );
}

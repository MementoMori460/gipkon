import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import fs from "fs";
import path from "path";

async function getSettings() {
    try {
        const filePath = path.join(process.cwd(), "data/settings.json");
        const jsonData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(jsonData);
    } catch (error) {
        return null;
    }
}

async function getMenu() {
    try {
        const filePath = path.join(process.cwd(), "data/menu.json");
        const jsonData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(jsonData);
    } catch (error) {
        return null;
    }
}

export default async function Footer() {
    const settings = await getSettings();
    const menu = await getMenu();

    // Default values if settings missing
    const contact = settings?.contact || {};
    const social = settings?.social || {};

    const address = contact.address || "Adres bilgisi buraya gelecek";
    const phone = contact.phone || "+90 XXX XXX XX XX";
    const email = contact.email || "info@gipkon.com.tr";

    const socialLinks = [
        { icon: Facebook, href: social.facebook || "#", label: "Facebook" },
        { icon: Twitter, href: social.twitter || "#", label: "Twitter" },
        { icon: Linkedin, href: social.linkedin || "#", label: "LinkedIn" },
        { icon: Instagram, href: social.instagram || "#", label: "Instagram" },
    ];

    const quickLinks = menu?.footer?.quickLinks || [];
    const services = menu?.footer?.services || [];

    return (
        <footer className="bg-secondary-900 text-white">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-2xl font-display font-bold mb-4">
                            GIPKON <span className="text-primary-400">TEKNOLOJİ</span>
                        </h3>
                        <p className="text-secondary-300 text-sm mb-4">
                            Teknolojiye ve Geleceğe Yön Veren Firma. Endüstriyel otomasyon çözümlerinde
                            güvenilir iş ortağınız.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                social.href && social.href !== "#" ? (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-lg bg-secondary-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ) : null
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Hızlı Linkler</h4>
                        <ul className="space-y-2">
                            {quickLinks.filter((item: any) => item.active).map((link: any) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-secondary-300 hover:text-primary-400 transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Hizmetlerimiz</h4>
                        <ul className="space-y-2 text-sm text-secondary-300">
                            {services.filter((item: any) => item.active).map((link: any) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-secondary-300 hover:text-primary-400 transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">İletişim</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-secondary-300">
                                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                <span>{address}</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-secondary-300">
                                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                                <a href={`tel:${phone}`} className="hover:text-primary-400 transition-colors">
                                    {phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-secondary-300">
                                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                                <a
                                    href={`mailto:${email}`}
                                    className="hover:text-primary-400 transition-colors"
                                >
                                    {email}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-secondary-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary-400">
                        <p>© {new Date().getFullYear()} GIPKON TEKNOLOJİ. Tüm hakları saklıdır.</p>
                        <div className="flex gap-6">
                            <Link href="/gizlilik" className="hover:text-primary-400 transition-colors">
                                Gizlilik Politikası
                            </Link>
                            <Link href="/kvkk" className="hover:text-primary-400 transition-colors">
                                KVKK
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

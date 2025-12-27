import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
    { name: "Anasayfa", href: "/" },
    { name: "Hakkımızda", href: "/kurumsal/hakkimizda" },
    { name: "Çözümlerimiz", href: "/cozumler" },
    { name: "Projelerimiz", href: "/projeler" },
    { name: "Hizmetlerimiz", href: "/hizmetler" },
    { name: "Hizmet Talebi", href: "/hizmet-talebi" },
    { name: "İletişim", href: "/iletisim" },
];

const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
];

export default function Footer() {
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
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-lg bg-secondary-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Hızlı Linkler</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
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
                            <li>Proje & Danışmanlık</li>
                            <li>Anahtar Teslim Tesisler</li>
                            <li>Fabrika Revizyonları</li>
                            <li>Sistem Geliştirmeleri</li>
                            <li>Devreye Alma & Servis</li>
                            <li>
                                <Link href="/hizmet-talebi" className="text-primary-400 hover:text-primary-300">
                                    Hizmet Talebi Oluştur
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">İletişim</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-secondary-300">
                                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                <span>Adres bilgisi buraya gelecek</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-secondary-300">
                                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                                <a href="tel:+90" className="hover:text-primary-400 transition-colors">
                                    +90 XXX XXX XX XX
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-secondary-300">
                                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                                <a
                                    href="mailto:info@gipkon.com.tr"
                                    className="hover:text-primary-400 transition-colors"
                                >
                                    info@gipkon.com.tr
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

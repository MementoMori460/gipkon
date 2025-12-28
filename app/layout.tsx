import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/providers/ThemeProvider";
import fs from "fs";
import path from "path";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

async function getSettings() {
    try {
        const filePath = path.join(process.cwd(), "data/settings.json");
        const jsonData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(jsonData);
    } catch (error) {
        return null;
    }
}

export async function generateMetadata() {
    const settings = await getSettings();

    return {
        title: settings?.siteName || "GIPKON TEKNOLOJİ - Endüstriyel Otomasyon Çözümleri",
        description: settings?.siteDescription || "Teknolojiye ve Geleceğe Yön Veren Firma ; GIPKON TEKNOLOJİ !",
        keywords: ["otomasyon", "endüstriyel otomasyon", "gıda sektörü", "tekstil", "sağlık", "kimya", "ilaç", "kozmetik", "enerji", "maden", "savunma sanayi"],
        icons: {
            icon: settings?.branding?.favicon || "/favicon.ico",
        }
    };
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr" className={`${inter.variable} ${outfit.variable}`}>
            <body className="font-sans antialiased">
                <ThemeProvider>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}

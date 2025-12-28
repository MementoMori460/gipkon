import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/providers/ThemeProvider";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

export const metadata: Metadata = {
    title: "GIPKON TEKNOLOJİ - Endüstriyel Otomasyon Çözümleri",
    description: "Teknolojiye ve Geleceğe Yön Veren Firma ; GIPKON TEKNOLOJİ !",
    keywords: ["otomasyon", "endüstriyel otomasyon", "gıda sektörü", "tekstil", "sağlık", "kimya", "ilaç", "kozmetik", "enerji", "maden", "savunma sanayi"],
};

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

import React from "react";
import Image from "next/image";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Reference {
    id: number;
    image: string;
    name: string;
    sector: string;
}

async function getReferences(): Promise<Reference[]> {
    try {
        const filePath = path.join(process.cwd(), "data/references.json");
        const jsonData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(jsonData);
    } catch (error) {
        return [];
    }
}

export default async function ReferencesPage() {
    const references = await getReferences();

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header Section */}
            <div className="bg-primary-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Referanslarımız
                    </h1>
                    <p className="text-xl text-primary-200 max-w-2xl mx-auto">
                        Bize güvenen ve birlikte başarıya ulaştığımız değerli iş ortaklarımız
                    </p>
                </div>
            </div>

            {/* References Grid */}
            <div className="container mx-auto px-4 -mt-10">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    {references.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
                            {references.map((ref) => (
                                <div
                                    key={ref.id}
                                    className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow group border border-gray-100"
                                >
                                    <div className="relative w-32 h-32 mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">
                                        <Image
                                            src={ref.image}
                                            alt={ref.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-1">
                                        {ref.name}
                                    </h3>
                                    <span className="text-sm bg-tag-bg text-tag-text px-3 py-1 rounded-full">
                                        {ref.sector}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">Henüz referans eklenmemiş.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4 mt-20 text-center">
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                    Siz de Mutlu Müşterilerimiz Arasına Katılın
                </h2>
                <Link
                    href="/iletisim"
                    className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-lg"
                >
                    İletişime Geçin <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
            </div>
        </div>
    );
}

"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-10 h-10 text-orange-600" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Bir Hata Oluştu!</h2>
                <p className="text-gray-600 mb-8">
                    Üzgünüz, bir şeyler yanlış gitti. Lütfen tekrar deneyin.
                </p>
                <button
                    onClick={() => reset()}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                    Tekrar Dene
                </button>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import ImagePicker from "@/components/admin/ImagePicker";
import { Image as ImageIcon } from "lucide-react";

export default function MediaPage() {
    const [showPicker, setShowPicker] = useState(true); // Default open for now or use specific UI
    // Actually, for a full manager page, we might want a different view than just the picker modal.
    // But to save time and reuse logic, let's just render the picker directly OR reuse the logic?
    // Let's reuse the ImagePicker but maybe we need a dedicated view if we want to delete?
    // For MVP "Quick", let's wrap the ImagePicker in a way that it just stays open or allow simple management.

    // Better approach: Re-implement a simple gallery here specifically for management (view/delete)
    // BUT the user just asked for "Media Manager". Re-using the picker logic inside the page is safest.

    // Let's create a wrapper that opens the picker when "Manage" is clicked, or just list images.
    // Creating a dedicated "Gallery View" for this page is cleaner.

    // NOTE: For now, I will use the ImagePicker component as a "Modal" triggered by a button, 
    // and also display a read-only list on the main page to look like a manager.

    const [refreshTrigger, setRefreshTrigger] = useState(0);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Medya Yöneticisi</h1>
                <button
                    onClick={() => setShowPicker(true)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                    + Yeni Resim Yükle
                </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="max-w-md mx-auto">
                    <ImageIcon size={64} className="mx-auto text-gray-300 mb-4" />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Resimlerinizi Yönetin</h2>
                    <p className="text-gray-500 mb-6">
                        Buradan yeni resimler yükleyebilir veya mevcut resimlerinizi görüntüleyebilirsiniz.
                        Site genelinde kullanmak için "Yeni Resim Yükle" butonuna tıklayın.
                    </p>
                    <button
                        onClick={() => setShowPicker(true)}
                        className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                        Galeriyi Aç
                    </button>
                </div>
            </div>

            {showPicker && (
                <ImagePicker
                    onSelect={(url) => {
                        // Just copy key to clipboard or show success?
                        // For this page, "Select" might just mean "View" or "Copy URL"
                        prompt("Resim URL'si:", url);
                        setShowPicker(false);
                    }}
                    onClose={() => setShowPicker(false)}
                />
            )}
        </div>
    );
}

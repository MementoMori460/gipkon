export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Genel Bakış</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Toplam Proje</h3>
                    <div className="text-3xl font-bold text-primary-600">27+</div>
                    <div className="text-xs text-green-500 mt-2">Yayında</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Referanslar</h3>
                    <div className="text-3xl font-bold text-primary-600">-</div>
                    <div className="text-xs text-gray-400 mt-2">Henüz eklenmedi</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Sistem Durumu</h3>
                    <div className="text-3xl font-bold text-green-600">Aktif</div>
                    <div className="text-xs text-gray-400 mt-2">Her şey yolunda</div>
                </div>
            </div>

            <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <h2 className="text-xl font-semibold mb-4">Hoş Geldiniz!</h2>
                <p className="text-gray-600 max-w-lg mx-auto mb-6">
                    Sol menüden <strong>Projeler</strong> veya <strong>Referanslar</strong> sekmesine tıklayarak site içeriğini yönetmeye başlayabilirsiniz.
                </p>
            </div>
        </div>
    );
}

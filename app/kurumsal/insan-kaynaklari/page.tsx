import { Metadata } from "next";
import Link from "next/link";
import { Users, Target, Heart, Briefcase, CheckCircle, GraduationCap } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "İnsan Kaynakları - GIPKON TEKNOLOJİ",
    description: "GIPKON TEKNOLOJİ kariyer fırsatları, insan kaynakları politikamız ve açık pozisyonlar.",
};

const benefits = [
    {
        icon: GraduationCap,
        title: "Sürekli Gelişim",
        description: "Düzenli teknik eğitimler ve kişisel gelişim fırsatları."
    },
    {
        icon: Heart,
        title: "Tamamlayıcı Sağlık",
        description: "Tüm çalışanlarımız için kapsamlı özel sağlık sigortası."
    },
    {
        icon: Users,
        title: "Güçlü İletişim",
        description: "Açık iletişim kültürü ve sosyal aktiviteler."
    },
    {
        icon: Target,
        title: "Kariyer Yolu",
        description: "Net kariyer planlaması ve yükselme fırsatları."
    }
];

export default function HRPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-900 to-secondary-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Kariyer Fırsatları
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Teknolojiye yön veren dinamik ekibimizin bir parçası olmak ister misiniz?
                    </p>
                </div>
            </section>

            {/* Culture Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
                        <div className="flex-1">
                            <h2 className="text-3xl font-display font-bold text-secondary-800 mb-6">
                                Çalışma Kültürümüz
                            </h2>
                            <p className="text-secondary-600 text-lg mb-6 leading-relaxed">
                                GIPKON TEKNOLOJİ olarak, çalışanlarımızın mutluluğu ve gelişimi bizim için önceliklidir.
                                Yenilikçi fikirlerin değer gördüğü, takım çalışmasının teşvik edildiği ve sürekli
                                öğrenmenin desteklendiği bir çalışma ortamı sunuyoruz.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Yenilikçi ve dinamik çalışma ortamı",
                                    "Teknoloji odaklı projeler",
                                    "Liyakat esaslı değerlendirme",
                                    "Eşitlikçi ve adil yaklaşım"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center text-secondary-700">
                                        <CheckCircle className="w-5 h-5 text-primary-600 mr-3" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="grid grid-cols-2 gap-6">
                                {benefits.map((benefit, idx) => (
                                    <div key={idx} className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors">
                                        <benefit.icon className="w-10 h-10 text-primary-600 mb-4" />
                                        <h3 className="font-bold text-secondary-800 mb-2">{benefit.title}</h3>
                                        <p className="text-sm text-secondary-600">{benefit.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-display font-bold text-secondary-800 mb-4">
                            Açık Pozisyonlar
                        </h2>
                        <p className="text-secondary-600">
                            Şu anda açık pozisyonumuz bulunmamaktadır. Ancak genel başvurularınızı değerlendirmek üzere her zaman kabul ediyoruz.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Briefcase className="w-8 h-8 text-primary-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-secondary-800 mb-6 text-center">
                            Genel Başvuru Formu
                        </h3>

                        <form className="space-y-6 text-left">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                                        Ad Soyad *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                                        Telefon *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                                        E-posta *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                                        Pozisyon / Alan
                                    </label>
                                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
                                        <option value="">Seçiniz</option>
                                        <option value="yazilim">Yazılım / Otomasyon</option>
                                        <option value="elektrik">Elektrik / Elektronik</option>
                                        <option value="satis">Satış / Pazarlama</option>
                                        <option value="idari">İdari İşler</option>
                                        <option value="staj">Stajyer</option>
                                        <option value="diger">Diğer</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    Kısa Ön Yazı
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                                    placeholder="Kendinizden kısaca bahsedin..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    CV Yükle (PDF)
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                                    <p className="text-secondary-500 text-sm">
                                        Dosyayı buraya sürükleyin veya seçmek için tıklayın
                                    </p>
                                </div>
                            </div>

                            <Button size="lg" className="w-full">
                                Başvuruyu Gönder
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Button from "@/components/ui/Button";

export default function IletisimPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [settings, setSettings] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        // Fetch Settings
        fetch("/api/admin/settings")
            .then(res => res.json())
            .then(data => setSettings(data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setIsSuccess(true);
                setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                // Reset success message after 5 seconds
                setTimeout(() => setIsSuccess(false), 5000);
            } else {
                alert("Mesaj gönderilirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Hata:", error);
            alert("Bir hata oluştu.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const contactInfo = [
        {
            icon: Phone,
            title: "Telefon",
            details: [
                settings?.contact?.phone || "+90 312 939 86 33",
            ].filter(Boolean),
        },
        {
            icon: Mail,
            title: "E-posta",
            details: [
                settings?.contact?.email || "info@gipkon.com.tr"
            ],
        },
        {
            icon: MapPin,
            title: "Adres",
            details: [
                settings?.contact?.address || "Adres bilgisi yükleniyor..."
            ],
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-700 to-primary-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl font-display font-bold mb-6">İletişim</h1>
                        <p className="text-xl text-primary-100">
                            Projeniz için hemen bizimle iletişime geçin
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                                    <info.icon className="w-8 h-8 text-primary-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-secondary-800 mb-3">
                                    {info.title}
                                </h3>
                                {info.details.map((detail, idx) => (
                                    <p key={idx} className="text-secondary-600">
                                        {detail}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Contact Form & Map */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Form */}
                        <div>
                            <h2 className="text-3xl font-display font-bold text-secondary-800 mb-6">
                                Bize Mesaj Gönderin
                            </h2>

                            {isSuccess ? (
                                <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl flex items-center animate-fade-in">
                                    <div className="bg-green-100 rounded-full p-2 mr-4">
                                        <Send className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Mesajınız Gönderildi!</h3>
                                        <p>En kısa sürede size dönüş yapacağız.</p>
                                        <button
                                            onClick={() => setIsSuccess(false)}
                                            className="text-sm underline mt-2 text-green-800 hover:text-green-900"
                                        >
                                            Yeni mesaj gönder
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-secondary-700 mb-2"
                                        >
                                            Ad Soyad *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Adınız ve soyadınız"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-secondary-700 mb-2"
                                            >
                                                E-posta *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                                placeholder="ornek@email.com"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="phone"
                                                className="block text-sm font-medium text-secondary-700 mb-2"
                                            >
                                                Telefon
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                                placeholder="0XXX XXX XX XX"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="subject"
                                            className="block text-sm font-medium text-secondary-700 mb-2"
                                        >
                                            Konu *
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        >
                                            <option value="">Konu seçiniz</option>
                                            <option value="genel">Genel Bilgi</option>
                                            <option value="teklif">Teklif Talebi</option>
                                            <option value="destek">Teknik Destek</option>
                                            <option value="is-birligi">İş Birliği</option>
                                            <option value="diger">Diğer</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="block text-sm font-medium text-secondary-700 mb-2"
                                        >
                                            Mesajınız *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                                            placeholder="Mesajınızı buraya yazın..."
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            "Gönderiliyor..."
                                        ) : (
                                            <>
                                                Gönder <Send className="w-5 h-5 ml-2" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </div>

                        {/* Map */}
                        <div>
                            <h2 className="text-3xl font-display font-bold text-secondary-800 mb-6">
                                Ofisimiz
                            </h2>
                            <div className="rounded-xl overflow-hidden shadow-lg h-[600px] bg-gray-200 relative">
                                {settings?.contact?.mapUrl ? (
                                    <iframe
                                        src={settings.contact.mapUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen={true}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="absolute inset-0 w-full h-full"
                                    ></iframe>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-secondary-600">
                                        <div className="text-center">
                                            <MapPin className="w-16 h-16 mx-auto mb-4 text-primary-600" />
                                            <p>Harita bilgisi yükleniyor...</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Working Hours */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-display font-bold text-secondary-800 mb-8 text-center">
                            Çalışma Saatlerimiz
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-xl font-semibold text-secondary-800 mb-4">
                                    Ofis Saatleri
                                </h3>
                                <div className="space-y-2 text-secondary-600">
                                    <div className="flex justify-between">
                                        <span>Pazartesi - Cuma:</span>
                                        <span className="font-medium">{settings?.officeHours?.weekdays || "09:00 - 18:00"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Cumartesi:</span>
                                        <span className="font-medium">{settings?.officeHours?.saturday || "Kapalı"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Pazar:</span>
                                        <span className="font-medium">{settings?.officeHours?.sunday || "Kapalı"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-xl font-semibold text-secondary-800 mb-4">
                                    Teknik Destek
                                </h3>
                                <div className="space-y-2 text-secondary-600">
                                    <div className="flex justify-between">
                                        <span>7/24 Destek:</span>
                                        <span className="font-medium text-primary-600">Aktif</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Acil Durum:</span>
                                        <span className="font-medium">{settings?.contact?.gsm || "+90 XXX XXX XX XX"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

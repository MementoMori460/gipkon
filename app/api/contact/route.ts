import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, subject, message } = body;

        // Basic validation
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { message: "Lütfen gerekli alanları doldurunuz." },
                { status: 400 }
            );
        }

        // Configure transporter with environment variables
        // Users should add these to their .env file
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.SMTP_FROM || `"Gipkon İletişim Formu" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER, // Send to the configured email
            replyTo: email,
            subject: `[İletişim Formu] ${subject} - ${name}`,
            text: `
İsim: ${name}
E-posta: ${email}
Telefon: ${phone || "Belirtilmedi"}
Konu: ${subject}

Mesaj:
${message}
            `,
            html: `
<h3>Yeni İletişim Formu Mesajı</h3>
<p><strong>İsim:</strong> ${name}</p>
<p><strong>E-posta:</strong> ${email}</p>
<p><strong>Telefon:</strong> ${phone || "Belirtilmedi"}</p>
<p><strong>Konu:</strong> ${subject}</p>
<hr/>
<p><strong>Mesaj:</strong></p>
<p>${message.replace(/\n/g, "<br>")}</p>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Mesajınız başarıyla gönderildi." });
    } catch (error) {
        console.error("Mail gönderme hatası:", error);
        return NextResponse.json(
            { message: "Mesaj gönderilirken bir hata oluştu." },
            { status: 500 }
        );
    }
}

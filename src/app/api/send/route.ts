import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email, // Send to the client
            subject: `تم استلام طلبك - مؤسسة سطور الماسة`,
            text: `
                مرحباً ${name}،
                
                شكراً لتواصلك معنا. لقد استلمنا رسالتك وسنعود إليك في أقرب وقت ممكن.
                
                تفاصيل رسالتك:
                ${message}
            `,
            html: `
                <div dir="rtl" style="text-align: right; font-family: sans-serif;">
                    <h3>مرحباً ${name}،</h3>
                    <p>شكراً لتواصلك مع <strong>مؤسسة سطور الماسة</strong>.</p>
                    <p>لقد استلمنا طلبك وسيقوم فريقنا بمراجعته والرد عليك قريباً.</p>
                    <hr />
                    <p><strong>تفاصيل رسالتك:</strong></p>
                    <p>${message}</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Email sending failed:', error);
        return NextResponse.json({ error: 'Failed to send email', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}

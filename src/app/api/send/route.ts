import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Simple in-memory rate limiter with cleanup (V-010 fix)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // max requests
const RATE_WINDOW = 60 * 60 * 1000; // per hour
const MAX_MAP_SIZE = 10000; // prevent unbounded growth

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetTime) {
        // V-010: Prevent memory leak by capping map size
        if (rateLimitMap.size > MAX_MAP_SIZE) {
            // Purge all expired entries
            for (const [key, val] of rateLimitMap.entries()) {
                if (now > val.resetTime) rateLimitMap.delete(key);
            }
        }
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
        return false;
    }

    entry.count++;
    return entry.count > RATE_LIMIT;
}

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
    try {
        // Rate limiting
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

        if (isRateLimited(ip)) {
            return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
        }

        const { name, email, message } = await request.json();

        // Input validation
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
            return NextResponse.json({ error: 'Invalid input types' }, { status: 400 });
        }

        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
        }

        // Length limits
        if (name.length > 100 || email.length > 254 || message.length > 2000) {
            return NextResponse.json({ error: 'Input too long' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Sanitize inputs for HTML
        const safeName = escapeHtml(name);
        const safeMessage = escapeHtml(message);
        const safeEmail = escapeHtml(email);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.CONTACT_EMAIL, // Send to admin, NOT to user-supplied email
            replyTo: email,
            subject: `رسالة جديدة من ${safeName} - موقع مؤسسة سطور الماسة`,
            text: `
                اسم المرسل: ${name}
                البريد: ${email}
                
                الرسالة:
                ${message}
            `,
            html: `
                <div dir="rtl" style="text-align: right; font-family: sans-serif;">
                    <h3>رسالة جديدة من الموقع</h3>
                    <p><strong>الاسم:</strong> ${safeName}</p>
                    <p><strong>البريد:</strong> ${safeEmail}</p>
                    <hr />
                    <p><strong>الرسالة:</strong></p>
                    <p>${safeMessage}</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Email sending failed');
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}

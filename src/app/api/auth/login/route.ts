import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

// Brute-force protection (V-002)
const loginAttempts = new Map<string, { count: number; lockUntil: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

function checkLoginRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
    const now = Date.now();
    const entry = loginAttempts.get(ip);

    if (entry && now < entry.lockUntil) {
        return { allowed: false, retryAfter: Math.ceil((entry.lockUntil - now) / 1000) };
    }

    if (!entry || now > entry.lockUntil) {
        loginAttempts.set(ip, { count: 1, lockUntil: 0 });
        return { allowed: true };
    }

    entry.count++;
    if (entry.count > MAX_ATTEMPTS) {
        entry.lockUntil = now + LOCKOUT_DURATION;
        return { allowed: false, retryAfter: LOCKOUT_DURATION / 1000 };
    }
    return { allowed: true };
}

// Cleanup expired entries every 30 minutes
setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of loginAttempts.entries()) {
        if (now > entry.lockUntil && entry.count <= MAX_ATTEMPTS) {
            loginAttempts.delete(ip);
        }
    }
}, 30 * 60 * 1000);

export async function POST(request: Request) {
    try {
        // Rate limit check (V-002)
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded?.split(',')[0]?.trim() || 'unknown';
        const rateCheck = checkLoginRateLimit(ip);

        if (!rateCheck.allowed) {
            return NextResponse.json(
                { success: false, message: 'Too many login attempts. Try again later.' },
                { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfter) } }
            );
        }

        const body = await request.json();
        const { username, password } = body;

        // Input validation
        if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }

        const validUsername = process.env.ADMIN_USERNAME;
        const passwordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!validUsername || !passwordHash) {
            return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 });
        }

        // V-003: Always run bcrypt regardless of username match to prevent timing attack
        const isPasswordValid = await bcrypt.compare(password, passwordHash);
        const isUsernameValid = username === validUsername;

        if (isUsernameValid && isPasswordValid) {
            const token = await signToken({ username });
            const response = NextResponse.json({ success: true });

            response.cookies.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
            });

            return response;
        }

        return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        console.error('Login error');
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}

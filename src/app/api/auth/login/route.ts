import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        const validUsername = process.env.ADMIN_USERNAME;
        const passwordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!validUsername || !passwordHash) {
            return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 });
        }

        const isPasswordValid = await bcrypt.compare(password, passwordHash);

        if (username === validUsername && isPasswordValid) {
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

import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        const validUsername = 'ali.Hamood@2025!Z#37';
        // Hardcoded hash for !@AliHamood@2025#z6G$ to ensure it works immediately
        const passwordHash = '$2b$10$gaHG4ouibm3CGFpDzgDJXufWpYZ3lBtZdSAitweTDsTmbgpy.SWs.'; 

        console.log('Login attempt for:', username);
        
        const isPasswordValid = await bcrypt.compare(password, passwordHash);
        console.log('Password valid:', isPasswordValid);

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
        console.error('Login error:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { writeClient } from '@/lib/sanity.server';
import { verifyToken } from '@/lib/auth';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
    // Authentication check
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const payload = await verifyToken(token || '');

    if (!payload) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // File type validation
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json({ error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' }, { status: 400 });
        }

        // File size validation
        if (file.size > MAX_SIZE) {
            return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const asset = await writeClient.assets.upload('image', buffer, {
            filename: file.name.replace(/[^a-zA-Z0-9._-]/g, '_'), // Sanitize filename
        });

        return NextResponse.json({ asset });
    } catch (error) {
        console.error('Upload error');
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}

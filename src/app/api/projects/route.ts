import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { client } from '@/lib/sanity';
import { verifyToken } from '@/lib/auth';

export async function POST(request: Request) {
    // Authentication check
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const payload = await verifyToken(token || '');

    if (!payload) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, description, imageAssetIds } = body;

        const doc = {
            _type: 'project',
            title,
            slug: {
                _type: 'slug',
                current: title.toLowerCase().replace(/\s+/g, '-').slice(0, 96),
            },
            description,
            images: imageAssetIds.map((id: string) => ({
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: id,
                },
            })),
            publishedAt: new Date().toISOString(),
        };

        const result = await client.create(doc);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Create project error');
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}

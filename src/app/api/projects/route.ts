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

        // V-004: Input validation
        if (!title || typeof title !== 'string' || title.length > 200) {
            return NextResponse.json({ error: 'Invalid title' }, { status: 400 });
        }
        if (!description || typeof description !== 'string' || description.length > 5000) {
            return NextResponse.json({ error: 'Invalid description' }, { status: 400 });
        }
        if (!Array.isArray(imageAssetIds) || imageAssetIds.length > 20 ||
            imageAssetIds.some((id: any) => typeof id !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(id))) {
            return NextResponse.json({ error: 'Invalid image IDs' }, { status: 400 });
        }

        const doc = {
            _type: 'project',
            title: title.trim(),
            slug: {
                _type: 'slug',
                current: title.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 96),
            },
            description: description.trim(),
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

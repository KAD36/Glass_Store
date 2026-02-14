import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { verifyToken } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const token = req.cookies.get('token')?.value;
    const payload = await verifyToken(token || '');

    if (!payload) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { title, description, imageAssetIds } = await req.json();
        const projectId = params.id;

        // V-005: Input validation
        if (!/^[a-zA-Z0-9_-]+$/.test(projectId)) {
            return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
        }
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

        const images = imageAssetIds.map((id: string) => ({
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: id,
            },
        }));

        await client.patch(projectId)
            .set({
                title: title.trim(),
                description: description.trim(),
                images,
            })
            .commit();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating project');
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

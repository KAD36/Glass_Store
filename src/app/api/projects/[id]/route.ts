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

        // Prepare image objects
        const images = imageAssetIds.map((id: string) => ({
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: id,
            },
        }));

        await client.patch(projectId)
            .set({
                title,
                description,
                images,
            })
            .commit();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating project');
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

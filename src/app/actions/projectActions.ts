'use server';

import { client } from '@/lib/sanity';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProject(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    // We expect imageAssetIds to be a JSON string of array
    const imageAssetIdsJson = formData.get('imageAssetIds') as string;

    if (!title || !description) {
        throw new Error('Missing required fields');
    }

    let images: any[] = [];
    if (imageAssetIdsJson) {
        try {
            const assetIds = JSON.parse(imageAssetIdsJson);
            if (Array.isArray(assetIds)) {
                images = assetIds.map((id: string) => ({
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: id,
                    },
                }));
            }
        } catch (e) {
            console.error('Failed to parse image asset IDs', e);
        }
    }

    try {
        await client.create({
            _type: 'project',
            title,
            description,
            images,
            publishedAt: new Date().toISOString(),
        });

        revalidatePath('/admin/projects');
        revalidatePath('/');
    } catch (error) {
        console.error('Failed to create project:', error);
        throw new Error('Failed to create project');
    }

    redirect('/admin/projects');
}

export async function updateProject(id: string, formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const imageAssetIdsJson = formData.get('imageAssetIds') as string;

    if (!id || !title || !description) {
        throw new Error('Missing required fields');
    }

    try {
        const doc: any = {
            title,
            description,
        };

        if (imageAssetIdsJson) {
            try {
                const assetIds = JSON.parse(imageAssetIdsJson);
                if (Array.isArray(assetIds)) {
                    doc.images = assetIds.map((assetId: string) => ({
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: assetId,
                        },
                    }));
                }
            } catch (e) {
                console.error('Failed to parse image asset IDs', e);
            }
        }

        await client.patch(id).set(doc).commit();

        revalidatePath('/admin/projects');
        revalidatePath('/');
    } catch (error) {
        console.error('Failed to update project:', error);
        throw new Error('Failed to update project');
    }

    redirect('/admin/projects');
}

export async function deleteProject(id: string) {
    if (!id) {
        throw new Error('Missing project ID');
    }

    try {
        await client.delete(id);
        revalidatePath('/admin/projects');
        revalidatePath('/');
    } catch (error) {
        console.error('Failed to delete project:', error);
        throw new Error('Failed to delete project');
    }
}

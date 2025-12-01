'use server';

import { writeClient } from '@/lib/sanity.server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function generateSlug(title: string): string {
    const baseSlug = title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\u0600-\u06FF\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');

    // Append a short random string to ensure uniqueness
    return `${baseSlug}-${Date.now().toString().slice(-4)}`;
}

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
        const slug = generateSlug(title);

        await writeClient.create({
            _type: 'project',
            title,
            slug: { _type: 'slug', current: slug },
            description,
            images,
            publishedAt: new Date().toISOString(),
        });

        revalidatePath('/admin/projects');
        revalidatePath('/admin/dashboard');
        revalidatePath('/portfolio');
        revalidatePath('/');
    } catch (error: any) {
        console.error('Failed to create project:', error);
        throw new Error(`Failed to create project: ${error.message || 'Unknown error'}`);
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

        // Always ensure slug exists or update it (simplest fix for broken projects)
        // In a real app we might check if it exists first, but here we want to fix visibility.
        doc.slug = { _type: 'slug', current: generateSlug(title) };

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

        await writeClient.patch(id).set(doc).commit();

        revalidatePath('/admin/projects');
        revalidatePath('/admin/dashboard');
        revalidatePath('/portfolio');
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
        await writeClient.delete(id);
        revalidatePath('/admin/projects');
        revalidatePath('/admin/dashboard');
        revalidatePath('/portfolio');
        revalidatePath('/');
    } catch (error) {
        console.error('Failed to delete project:', error);
        throw new Error('Failed to delete project');
    }
}

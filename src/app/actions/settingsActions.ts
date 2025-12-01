'use server';

import { client } from '@/lib/sanity';
import { revalidatePath } from 'next/cache';

// Helper to get or create a singleton document
async function getOrCreateSingleton(type: string) {
    const doc = await client.fetch(`*[_type == "${type}"][0]`);
    if (doc) return doc;

    // If not found, create it
    return await client.create({
        _type: type,
    });
}

export async function updateAboutPage(formData: FormData) {
    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const vision = formData.get('vision') as string;
    // Handle team members and images separately if needed, 
    // but for simplicity we'll assume basic text updates first 
    // or complex form handling in the client component.

    // For this implementation, we will focus on the text fields 
    // and assume the client handles the complex object structure for team/images 
    // by passing a JSON string or we handle it here.

    // Let's assume the client sends a JSON string for the team array
    const teamJson = formData.get('team') as string;
    let team = [];
    if (teamJson) {
        try {
            team = JSON.parse(teamJson);
        } catch (e) {
            console.error('Failed to parse team JSON', e);
        }
    }

    try {
        // We need to find the 'about' document or create it if it doesn't exist
        // Since it's a singleton-like, we query for it.
        const existing = await client.fetch(`*[_type == "about"][0]`);

        const doc: any = {
            _type: 'about',
            title,
            subtitle,
            vision,
            team,
        };

        if (existing) {
            await client.patch(existing._id).set(doc).commit();
        } else {
            await client.create(doc);
        }

        revalidatePath('/about');
        revalidatePath('/admin/about');
    } catch (error) {
        console.error('Failed to update about page:', error);
        throw new Error('Failed to update about page');
    }
}

export async function updateContactInfo(formData: FormData) {
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;

    try {
        const existing = await client.fetch(`*[_type == "contact"][0]`);

        const doc: any = {
            _type: 'contact',
            email,
            phone,
            address,
        };

        if (existing) {
            await client.patch(existing._id).set(doc).commit();
        } else {
            await client.create(doc);
        }

        revalidatePath('/contact');
        revalidatePath('/admin/contact');
        revalidatePath('/'); // Footer might use it
    } catch (error) {
        console.error('Failed to update contact info:', error);
        throw new Error('Failed to update contact info');
    }
}

export async function getContactInfo() {
    try {
        return await client.fetch(`*[_type == "contact"][0]`);
    } catch (error) {
        console.error('Failed to fetch contact info:', error);
        return null;
    }
}

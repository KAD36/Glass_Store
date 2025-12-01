import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = 'p1fbpbfc';
export const dataset = 'production';
export const apiVersion = '2024-01-01';

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Set to false for fresh data
    token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}

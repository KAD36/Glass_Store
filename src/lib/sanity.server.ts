import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || '';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
export const token = process.env.SANITY_API_TOKEN;

export const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
});

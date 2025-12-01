require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

async function debugImages() {
    try {
        console.log('Fetching projects...');
        const projects = await client.fetch(`
            *[_type == "project"] | order(publishedAt desc) {
                title,
                images
            }
        `);

        console.log(`Found ${projects.length} projects.`);

        projects.forEach((p, i) => {
            console.log(`\nProject ${i + 1}: ${p.title}`);
            if (!p.images || p.images.length === 0) {
                console.log('  No images found.');
            } else {
                console.log(`  Found ${p.images.length} images.`);
                console.log('  First image structure:', JSON.stringify(p.images[0], null, 2));
            }
        });

    } catch (error) {
        console.error('Error fetching projects:', error.message);
    }
}

debugImages();

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_TOKEN;

console.log('--- Debugging Sanity Configuration ---');
console.log('Project ID from .env:', projectId);
console.log('Token from .env:', token ? `${token.substring(0, 10)}...` : 'MISSING');

if (!projectId || !token) {
    console.error('Missing Project ID or Token in .env.local');
    process.exit(1);
}

const client = createClient({
    projectId: projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: token,
    useCdn: false,
});

async function testConnection() {
    try {
        console.log('\nAttempting to fetch project info...');
        // Try a simple authenticated request
        const result = await client.fetch('*[_type == "project"][0]');
        console.log('Fetch successful. Result:', result ? 'Found document' : 'No documents found (but connection worked)');

        console.log('\nAttempting to upload a test image...');
        // Create a small buffer for testing
        const buffer = Buffer.from('fake-image-content');
        const asset = await client.assets.upload('image', buffer, {
            filename: 'debug-test.txt'
        });
        console.log('Upload successful! Asset ID:', asset._id);

        // Clean up
        await client.delete(asset._id);
        console.log('Cleanup successful.');

    } catch (error) {
        console.error('\nERROR OCCURRED:');
        console.error('Message:', error.message);
        console.error('Status Code:', error.statusCode);
        if (error.response && error.response.body) {
            console.error('Response Body:', JSON.stringify(error.response.body, null, 2));
        }

        if (error.message.includes('Session does not match project host')) {
            console.log('\n*** DIAGNOSIS ***');
            console.log('The token you provided likely belongs to a DIFFERENT Sanity project.');
            console.log(`Your configured Project ID is: ${projectId}`);
            console.log('Please check your Sanity Dashboard and ensure you are in the correct project when generating the token.');
        }
    }
}

testConnection();

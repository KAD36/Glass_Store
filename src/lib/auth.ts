import { SignJWT, jwtVerify } from 'jose';

const ISSUER = 'glass-store';
const AUDIENCE = 'glass-store-admin';

function getSecret(): Uint8Array {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret || jwtSecret.length < 32) {
        throw new Error('FATAL: JWT_SECRET environment variable must be set and at least 32 characters long.');
    }
    return new TextEncoder().encode(jwtSecret);
}

export async function signToken(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setIssuer(ISSUER)
        .setAudience(AUDIENCE)
        .setExpirationTime('8h')  // V-012: Reduced from 24h to 8h
        .sign(getSecret());
}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, getSecret(), {
            issuer: ISSUER,
            audience: AUDIENCE,
        });
        return payload;
    } catch (error) {
        return null;
    }
}

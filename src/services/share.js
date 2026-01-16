// Share functionality - encode/decode profile data for sharing
import { getProfile, getBrandsByProfile, getSizesByBrand } from './db';
import pako from 'pako';

// Compress and encode profile data for sharing
export async function generateShareLink(profileId) {
    const profile = await getProfile(profileId);
    if (!profile) throw new Error('Profile not found');

    const brands = await getBrandsByProfile(profileId);
    const brandsWithSizes = [];

    for (const brand of brands) {
        const sizes = await getSizesByBrand(brand.id);
        brandsWithSizes.push({
            name: brand.name,
            notes: brand.notes,
            sizes: sizes.map(s => ({
                category: s.category,
                size: s.size,
                fit: s.fit,
                notes: s.notes
                // Exclude photo to keep URL shorter
            }))
        });
    }

    const shareData = {
        v: 1, // version
        n: profile.name,
        c: profile.color,
        b: brandsWithSizes
    };

    // Compress with pako and encode to base64
    const jsonStr = JSON.stringify(shareData);
    const compressed = pako.deflate(jsonStr);
    const base64 = btoa(String.fromCharCode(...compressed));

    // URL-safe base64
    const urlSafe = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    return `${window.location.origin}/share/${urlSafe}`;
}

// Decode shared data from URL parameter
export function decodeShareData(encoded) {
    try {
        // Restore base64 padding
        let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) base64 += '=';

        // Decode and decompress
        const binaryStr = atob(base64);
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
            bytes[i] = binaryStr.charCodeAt(i);
        }

        const decompressed = pako.inflate(bytes, { to: 'string' });
        return JSON.parse(decompressed);
    } catch (error) {
        console.error('Error decoding share data:', error);
        return null;
    }
}

// Copy text to clipboard
export async function copyToClipboard(text) {
    if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// Native share if available
export async function nativeShare(title, text, url) {
    if (navigator.share) {
        await navigator.share({ title, text, url });
        return true;
    }
    return false;
}

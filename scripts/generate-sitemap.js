
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import data sources
// Note: In a real node script running in TS context we might need ts-node, 
// but for simplicity we will duplicate the data reading or assume build artifacts.
// For now, we'll hardcode the "dynamic" reading by importing the raw data files or mocking 
// since we can't easily import TS files in a raw JS script without compilation.
// STRATEGY: We will read the source files as text or JSON if possible, but since they are TS, 
// we will rely on a shared JSON or just define the static list here for the script to stay simple.
// BETTER APPROACH for avoiding duplication: We will make this script robust.

const BASE_URL = 'https://spinwheelhub.vercel.app';

// Static Routes
const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.5 },
    { url: '/contact', changefreq: 'monthly', priority: 0.5 },
    { url: '/blog', changefreq: 'daily', priority: 0.8 },
    { url: '/custom-wheel-of-names', changefreq: 'weekly', priority: 0.9 },
    { url: '/wheel-of-names', changefreq: 'weekly', priority: 0.9 },
    { url: '/hub', changefreq: 'daily', priority: 1.0 },
];

// Add Wheel Categories (Mocking the data we just created in TS)
// In a full build pipeline, we would import the compiled JS from dist.
const wheelCategories = [
    'yes-no', 'random-number-1-10', 'coin-flip', 'dice-roll', 'raffle-number-1-100',
    'roblox-game-picker', 'fortnite-drop', 'pokemon-type',
    'truth-or-dare', 'twister-moves',
    'what-for-dinner', 'fast-food',
    'weekend-activity',
    'couple-activity', 'who-pays-dinner',
    'what-for-lunch', 'dessert-picker', 'healthy-snack'
];

wheelCategories.forEach(slug => {
    links.push({ url: `/wheel/${slug}`, changefreq: 'weekly', priority: 0.8 });
});

// Blog Posts (Mocking data)
const blogPosts = [
    'ultimate-name-finder-guide',
    'creative-classroom-name-pickers',
    'host-viral-giveaway-spin-wheel',
    'instagram-giveaway-picker-guide',
    'decision-fatigue-cure',
    'student-engagement-activities'
];

blogPosts.forEach(slug => {
    links.push({ url: `/blog/${slug}`, changefreq: 'monthly', priority: 0.7 });
});

async function generateSitemap() {
    const sitemap = new SitemapStream({ hostname: BASE_URL });
    const path = resolve(__dirname, '../public/sitemap.xml');
    const writeStream = createWriteStream(path);

    sitemap.pipe(writeStream);

    links.forEach(link => sitemap.write(link));
    sitemap.end();

    await streamToPromise(sitemap);
    console.log('✅ Sitemap compiled successfully to public/sitemap.xml');
}

generateSitemap().catch(console.error);

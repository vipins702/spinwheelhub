
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream, readFileSync } from 'fs';
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

const BASE_URL = 'https://spinwheelhub.org';

// Static Routes
const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.5 },
    { url: '/contact', changefreq: 'monthly', priority: 0.5 },
    { url: '/blog', changefreq: 'daily', priority: 0.8 },
    { url: '/custom-wheel-of-names', changefreq: 'weekly', priority: 0.9 },
    { url: '/wheel-of-names', changefreq: 'weekly', priority: 0.9 },
    { url: '/number-wheel', changefreq: 'weekly', priority: 0.9 },
    { url: '/team-generator', changefreq: 'weekly', priority: 0.9 },
    { url: '/secret-santa', changefreq: 'weekly', priority: 0.9 },
    { url: '/rock-paper-scissors', changefreq: 'weekly', priority: 0.8 },
    { url: '/giveaway', changefreq: 'weekly', priority: 0.9 },
    { url: '/hub', changefreq: 'daily', priority: 1.0 },
    { url: '/privacy', changefreq: 'yearly', priority: 0.3 },
    { url: '/terms', changefreq: 'yearly', priority: 0.3 },
];

// Read slugs straight from the TS data files so new wheels and posts are never missed.
// Matches lines like `id: 'yes-no',` or `slug: "my-post",` at the start of an object field.
const readSlugs = (relPath, field) => {
    const source = readFileSync(resolve(__dirname, relPath), 'utf8');
    const pattern = new RegExp(`^\\s*${field}:\\s*['"]([a-z0-9-]+)['"]`, 'gm');
    const slugs = [...source.matchAll(pattern)].map(m => m[1]);
    if (slugs.length === 0) throw new Error(`No ${field} values found in ${relPath}`);
    return slugs;
};

const wheelCategories = readSlugs('../src/data/wheelTemplates.ts', 'id');

wheelCategories.forEach(slug => {
    links.push({ url: `/wheel/${slug}`, changefreq: 'weekly', priority: 0.8 });
});

const blogPosts = readSlugs('../src/data/blogPosts.ts', 'slug');

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

// View your visitor analytics.
// Run with: node --env-file=.env scripts/stats.js
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

const [{ total }] = await sql`SELECT count(*)::int AS total FROM visits`;
const [{ last24 }] = await sql`SELECT count(*)::int AS last24 FROM visits WHERE created_at > now() - interval '24 hours'`;
console.log(`\n📊 Total visits: ${total}  |  Last 24h: ${last24}\n`);

console.log('🌍 Top countries:');
const countries = await sql`
    SELECT COALESCE(country,'?') AS country, count(*)::int AS visits
    FROM visits GROUP BY country ORDER BY visits DESC LIMIT 10`;
countries.forEach(r => console.log(`   ${r.country.padEnd(6)} ${r.visits}`));

console.log('\n🏙️  Top cities:');
const cities = await sql`
    SELECT COALESCE(city,'?') AS city, COALESCE(country,'?') AS country, count(*)::int AS visits
    FROM visits WHERE city IS NOT NULL GROUP BY city, country ORDER BY visits DESC LIMIT 10`;
cities.forEach(r => console.log(`   ${(r.city + ', ' + r.country).padEnd(24)} ${r.visits}`));

console.log('\n📄 Top pages (avg time on page):');
const pages = await sql`
    SELECT path, count(*)::int AS visits, round(avg(duration_seconds))::int AS avg_sec
    FROM visits GROUP BY path ORDER BY visits DESC LIMIT 12`;
pages.forEach(r => console.log(`   ${r.path.padEnd(28)} ${String(r.visits).padStart(4)} visits   ~${r.avg_sec ?? 0}s`));

console.log('\n📱 Devices:');
const devices = await sql`
    SELECT COALESCE(device,'?') AS device, count(*)::int AS visits
    FROM visits GROUP BY device ORDER BY visits DESC`;
devices.forEach(r => console.log(`   ${r.device.padEnd(8)} ${r.visits}`));

console.log('\n🔗 Top referrers:');
const refs = await sql`
    SELECT COALESCE(NULLIF(referrer,''),'(direct)') AS referrer, count(*)::int AS visits
    FROM visits GROUP BY referrer ORDER BY visits DESC LIMIT 10`;
refs.forEach(r => console.log(`   ${r.referrer.slice(0, 40).padEnd(42)} ${r.visits}`));

console.log('');

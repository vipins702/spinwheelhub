import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL as string);

// Records a page visit. Privacy note: we intentionally never store the raw IP.
// Vercel resolves coarse geo from the IP for us via request headers, and we
// only persist country / region / city.
export default async function handler(req: any, res: any) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

        const path = String(body.path || '/').slice(0, 300);
        const referrer = body.referrer ? String(body.referrer).slice(0, 300) : null;
        const sessionId = body.sessionId ? String(body.sessionId).slice(0, 64) : null;
        const duration = Number.isFinite(body.duration) ? Math.max(0, Math.min(86400, Math.round(body.duration))) : null;

        // Vercel-provided geo headers (no raw IP stored)
        const h = req.headers || {};
        const dec = (v: any) => {
            if (!v) return null;
            try { return decodeURIComponent(String(v)).slice(0, 100); } catch { return String(v).slice(0, 100); }
        };
        const country = dec(h['x-vercel-ip-country']);
        const region = dec(h['x-vercel-ip-country-region']);
        const city = dec(h['x-vercel-ip-city']);

        const ua = String(h['user-agent'] || '');
        const device = /mobile|iphone|android/i.test(ua) ? 'Mobile' : /tablet|ipad/i.test(ua) ? 'Tablet' : 'Desktop';

        await sql`
            INSERT INTO visits (path, referrer, country, region, city, device, duration_seconds, session_id)
            VALUES (${path}, ${referrer}, ${country}, ${region}, ${city}, ${device}, ${duration}, ${sessionId})`;

        return res.status(204).end();
    } catch (err: any) {
        console.error('track api error:', err);
        // Never break the page over analytics
        return res.status(204).end();
    }
}

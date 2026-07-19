import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL as string);

const ID_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function generateId(length = 8): string {
    let id = '';
    for (let i = 0; i < length; i++) {
        id += ID_CHARS[Math.floor(Math.random() * ID_CHARS.length)];
    }
    return id;
}

export default async function handler(req: any, res: any) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(204).end();

    try {
        if (req.method === 'GET') {
            const id = String(req.query.id || '');
            if (!/^[a-zA-Z0-9]{4,16}$/.test(id)) {
                return res.status(400).json({ error: 'Invalid draw id' });
            }
            const rows = await sql`
                SELECT id, title, winner, entry_count, created_at
                FROM giveaway_draws WHERE id = ${id}`;
            if (rows.length === 0) return res.status(404).json({ error: 'Draw not found' });
            return res.status(200).json(rows[0]);
        }

        if (req.method === 'POST') {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
            const title = String(body.title || 'Giveaway').slice(0, 100).trim();
            const winner = String(body.winner || '').slice(0, 200).trim();
            const entries: string[] = Array.isArray(body.entries)
                ? body.entries.map((e: any) => String(e).slice(0, 200)).slice(0, 5000)
                : [];
            const entryCount = Number(body.entryCount) || entries.length;

            if (!winner) return res.status(400).json({ error: 'A winner is required' });
            if (entryCount < 1) return res.status(400).json({ error: 'At least one entry is required' });

            let id = generateId();
            for (let attempt = 0; attempt < 3; attempt++) {
                const inserted = await sql`
                    INSERT INTO giveaway_draws (id, title, winner, entry_count, entries)
                    VALUES (${id}, ${title}, ${winner}, ${entryCount}, ${JSON.stringify(entries)})
                    ON CONFLICT (id) DO NOTHING
                    RETURNING id, created_at`;
                if (inserted.length > 0) {
                    return res.status(201).json({ id, created_at: inserted[0].created_at, url: `/giveaway/${id}` });
                }
                id = generateId();
            }
            return res.status(500).json({ error: 'Could not generate a unique id, try again' });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (err: any) {
        console.error('giveaway api error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
}

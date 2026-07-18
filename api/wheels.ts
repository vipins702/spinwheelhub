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

interface WheelEntry {
    text: string;
    color?: string;
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
                return res.status(400).json({ error: 'Invalid wheel id' });
            }
            const rows = await sql`
                UPDATE wheels SET views = views + 1
                WHERE id = ${id}
                RETURNING id, title, entries, views, spins, created_at`;
            if (rows.length === 0) return res.status(404).json({ error: 'Wheel not found' });
            return res.status(200).json(rows[0]);
        }

        if (req.method === 'POST') {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

            // Record a spin on an existing wheel
            if (body.action === 'spin' && body.id) {
                await sql`UPDATE wheels SET spins = spins + 1 WHERE id = ${String(body.id)}`;
                return res.status(200).json({ ok: true });
            }

            // Create a new shared wheel
            const title = String(body.title || 'Custom Spin Wheel').slice(0, 100).trim();
            const rawEntries: WheelEntry[] = Array.isArray(body.entries) ? body.entries : [];
            const entries = rawEntries
                .filter((e) => e && typeof e.text === 'string' && e.text.trim())
                .slice(0, 100)
                .map((e) => ({
                    text: String(e.text).slice(0, 80).trim(),
                    color: typeof e.color === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(e.color) ? e.color : undefined,
                }));

            if (entries.length < 2) {
                return res.status(400).json({ error: 'A wheel needs at least 2 entries' });
            }

            let id = generateId();
            for (let attempt = 0; attempt < 3; attempt++) {
                const inserted = await sql`
                    INSERT INTO wheels (id, title, entries)
                    VALUES (${id}, ${title}, ${JSON.stringify(entries)})
                    ON CONFLICT (id) DO NOTHING
                    RETURNING id`;
                if (inserted.length > 0) {
                    return res.status(201).json({ id, url: `/w/${id}` });
                }
                id = generateId();
            }
            return res.status(500).json({ error: 'Could not generate a unique id, try again' });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (err: any) {
        console.error('wheels api error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
}

// One-time DB setup for shared wheels.
// Run with: node --env-file=.env scripts/setup-db.js
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

await sql`
    CREATE TABLE IF NOT EXISTS wheels (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        entries JSONB NOT NULL,
        views INTEGER NOT NULL DEFAULT 0,
        spins INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;

const [{ count }] = await sql`SELECT count(*)::int AS count FROM wheels`;
console.log(`✅ wheels table ready (${count} rows)`);

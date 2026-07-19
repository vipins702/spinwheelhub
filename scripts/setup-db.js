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

await sql`
    CREATE TABLE IF NOT EXISTS giveaway_draws (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        winner TEXT NOT NULL,
        entry_count INTEGER NOT NULL,
        entries JSONB,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;

const [{ gcount }] = await sql`SELECT count(*)::int AS gcount FROM giveaway_draws`;
console.log(`✅ giveaway_draws table ready (${gcount} rows)`);

// Visit analytics. Note: we deliberately do NOT store raw IP addresses
// (personal data under GDPR). Only coarse location from Vercel geo headers.
await sql`
    CREATE TABLE IF NOT EXISTS visits (
        id BIGSERIAL PRIMARY KEY,
        path TEXT NOT NULL,
        referrer TEXT,
        country TEXT,
        region TEXT,
        city TEXT,
        device TEXT,
        duration_seconds INTEGER,
        session_id TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
await sql`CREATE INDEX IF NOT EXISTS visits_created_at_idx ON visits (created_at)`;

const [{ vcount }] = await sql`SELECT count(*)::int AS vcount FROM visits`;
console.log(`✅ visits table ready (${vcount} rows)`);

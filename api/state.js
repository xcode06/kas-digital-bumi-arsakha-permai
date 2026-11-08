import postgres from 'postgres';

export const ALLOWED_KEYS = [
  'users', 'houses', 'bills', 'incomes', 'expenseRequests',
  'categories', 'auditLogs', 'cashSettlements', 'systemConfig'
];

const MAX_BODY_BYTES = 4 * 1024 * 1024;

function resolveConnectionString() {
  const candidates = [process.env.POSTGRES_URL, process.env.DATABASE_URL, process.env.DATABASE_URL_POOLED];
  return candidates.find((url) => url && /^postgres(ql)?:\/\//.test(url));
}

let sql;
let tableReady;

function getSql() {
  if (sql) return sql;
  const url = resolveConnectionString();
  if (!url) return null;
  sql = postgres(url, { ssl: 'require', max: 1, prepare: false, idle_timeout: 20 });
  return sql;
}

function ensureTable(db) {
  tableReady ??= db`
    create table if not exists kas_app_state (
      key text primary key,
      value jsonb not null,
      updated_at timestamptz not null default now()
    )
  `.catch((error) => {
    tableReady = undefined;
    throw error;
  });
  return tableReady;
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body);
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new Error('Payload too large');
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

export default async function handler(req, res) {
  const db = getSql();
  if (!db) return send(res, 503, { error: 'Database belum dikonfigurasi' });

  try {
    await ensureTable(db);

    if (req.method === 'GET') {
      const rows = await db`select key, value, updated_at from kas_app_state where key = any(${ALLOWED_KEYS})`;
      const items = {};
      for (const row of rows) items[row.key] = { value: row.value, updatedAt: row.updated_at };
      return send(res, 200, { items });
    }

    if (req.method === 'POST') {
      const body = await readBody(req);
      const entries = Object.entries(body?.items ?? {}).filter(([key]) => ALLOWED_KEYS.includes(key));
      if (entries.length === 0) return send(res, 400, { error: 'Tidak ada data valid' });

      await db.begin(async (tx) => {
        for (const [key, value] of entries) {
          await tx`
            insert into kas_app_state (key, value, updated_at)
            values (${key}, ${tx.json(value)}, now())
            on conflict (key) do update set value = excluded.value, updated_at = now()
          `;
        }
      });
      return send(res, 200, { ok: true, saved: entries.map(([key]) => key) });
    }

    res.setHeader('Allow', 'GET, POST');
    return send(res, 405, { error: 'Method not allowed' });
  } catch (error) {
    console.error('[kas-state]', error);
    return send(res, 500, { error: 'Gagal mengakses database' });
  }
}

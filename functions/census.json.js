/* The census feed. The Clerk writes it to KV from the chain; this hands it out.
   Empty until the gate opens. Never invented. */
const EMPTY = '{"updated":null,"tick":null,"residents":0,"levels":{}}';
export async function onRequestGet({ env }) {
  let body = null;
  try { body = env.CENSUS ? await env.CENSUS.get('census.json') : null; } catch {}
  return new Response(body || EMPTY, {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=60',
      'access-control-allow-origin': '*',
    },
  });
}

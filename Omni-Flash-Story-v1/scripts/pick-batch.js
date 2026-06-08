#!/usr/bin/env node
/**
 * pick-batch.js — Controlled-random batch selector for storywriting.
 *
 * Picks N scenario seeds from concepts3.md (all E00 humiliation->reveal) and
 * concepts4.md (E01-E22, engine-based), enforcing variety + tone balance so a
 * mixed batch does not drift into one formula. Prints an engine map and a JSON
 * skeleton (engine pre-filled per item) ready for Phase 0.
 *
 * Usage:
 *   node scripts/pick-batch.js [count] [options]
 *
 * Options:
 *   --batch <id>        batch id for the skeleton (default: batch-XX)
 *   --prefix <p>        item id prefix (default: M)
 *   --start <n>         first item number (default: 1)
 *   --max-engines <n>   max distinct engines (default: 6)
 *   --max-sad <n>       max heavy/sad items E04/E06/E12/E20 (default: 3)
 *   --e00 <n>           # of humiliation->reveal (concepts3) items (default: ~30%)
 *   --seed <n>          reproducible selection
 *   --write             also write skeleton to output/<batch>/<batch>.json
 *
 * Examples:
 *   node scripts/pick-batch.js 10 --batch batch-09 --seed 7
 *   node scripts/pick-batch.js 6 --max-engines 4 --max-sad 1
 */

const fs = require('fs');
const path = require('path');

const REF = path.join(__dirname, '..', 'references');
const SAD = ['E04', 'E06', 'E12', 'E20']; // heavy/sad engines


// engine -> { name, opening style, ending tone, mood bucket }
const ENGINES = {
  E00: { name: 'Humiliation → Reveal', opening: 'Dialogue Slap', tone: 'satisfying', mood: 'punchy' },
  E01: { name: 'Kindness → Karma', opening: 'Moral Choice', tone: 'uplifting', mood: 'warm' },
  E02: { name: 'Mystery → Explanation', opening: 'Curious Ritual', tone: 'warm/bitter', mood: 'warm' },
  E03: { name: 'Hidden Burden', opening: 'Quiet Watch', tone: 'respect', mood: 'warm' },
  E04: { name: 'Long Wait / Devotion', opening: 'Countdown of Years', tone: 'poignant', mood: 'sad' },
  E05: { name: 'Comeuppance', opening: 'Accuser POV', tone: 'satisfying', mood: 'punchy' },
  E06: { name: 'Bittersweet / Too Late', opening: 'Tender Oddity', tone: 'grief+love', mood: 'sad' },
  E07: { name: 'Test / Secret Evaluator', opening: 'Moral Choice', tone: 'earned reward/loss', mood: 'punchy' },
  E08: { name: 'Reunion / Recognition', opening: 'Object Clue', tone: 'cathartic', mood: 'warm' },
  E09: { name: 'Underdog Earns It', opening: 'Deadline Pressure', tone: 'earned triumph', mood: 'punchy' },
  E10: { name: 'Pay-It-Forward Chain', opening: 'Quiet Watch', tone: 'hopeful', mood: 'warm' },
  E11: { name: 'Role Reversal Over Time', opening: 'Countdown of Years', tone: 'moving', mood: 'warm' },
  E12: { name: 'Message From the Past', opening: 'Letter Fragment', tone: 'aching/warm', mood: 'sad' },
  E13: { name: 'Misunderstanding → Truth', opening: 'Accuser POV', tone: 'relief', mood: 'warm' },
  E14: { name: 'Anonymous Benefactor', opening: 'Curious Ritual', tone: 'tender', mood: 'warm' },
  E15: { name: 'Promise Kept', opening: 'Countdown of Years', tone: 'dignified', mood: 'warm' },
  E16: { name: 'Redemption / Amends', opening: 'Wrong Apology', tone: 'earned forgiveness', mood: 'warm' },
  E17: { name: 'A Reason to Stay', opening: 'Tender Oddity', tone: 'hope restored', mood: 'warm' },
  E18: { name: 'Gift Comes Full Circle', opening: 'Object Clue', tone: 'poetic', mood: 'warm' },
  E19: { name: 'Quiet Protector', opening: 'Quiet Watch', tone: 'gratitude', mood: 'warm' },
  E20: { name: 'The Cost of Pride', opening: 'Dialogue Slap', tone: 'self-inflicted loss', mood: 'sad' },
  E21: { name: 'Found Family', opening: 'Tender Oddity', tone: 'belonging', mood: 'warm' },
  E22: { name: 'Reverse Rescue', opening: 'Object Clue', tone: 'full-circle', mood: 'warm' },
};

function parseArgs(argv) {
  const a = { count: 10, batch: null, prefix: 'M', start: 1, maxEngines: 6, maxSad: 3, e00: null, seed: null, write: false };
  const r = argv.slice(2);
  for (let i = 0; i < r.length; i++) {
    const t = r[i];
    if (/^\d+$/.test(t)) a.count = parseInt(t, 10);
    else if (t === '--batch') a.batch = r[++i];
    else if (t === '--prefix') a.prefix = r[++i];
    else if (t === '--start') a.start = parseInt(r[++i], 10);
    else if (t === '--max-engines') a.maxEngines = parseInt(r[++i], 10);
    else if (t === '--max-sad') a.maxSad = parseInt(r[++i], 10);
    else if (t === '--e00') a.e00 = parseInt(r[++i], 10);
    else if (t === '--seed') a.seed = parseInt(r[++i], 10);
    else if (t === '--write') a.write = true;
  }
  if (!a.batch) a.batch = 'batch-XX';
  return a;
}


// seedable RNG (mulberry32); falls back to Math.random when no seed
function makeRng(seed) {
  if (seed == null) return Math.random;
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffle(arr, rng) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const SEED_RE = /^(\d+)\.\s+\*\*(.+?)\*\*:\s+(.+)$/;

function parseConcepts3(file) {
  const out = [];
  let group = '';
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const g = line.match(/^##\s+Concept\s+\d+\s+—\s+(.+)$/);
    if (g) { group = g[1].trim(); continue; }
    const m = line.match(SEED_RE);
    if (m) out.push({ bank: 'concepts3', engine: 'E00', group, num: +m[1], title: m[2], desc: m[3] });
  }
  return out;
}

function parseConcepts4(file) {
  const out = [];
  let engine = null, group = '';
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const g = line.match(/^##\s+(E\d{2})\s+—\s+(.+)$/);
    if (g) { engine = g[1]; group = g[2].trim(); continue; }
    const m = line.match(SEED_RE);
    if (m && engine) out.push({ bank: 'concepts4', engine, group, num: +m[1], title: m[2], desc: m[3] });
  }
  return out;
}


function distribute(count, d, rng) {
  const base = Math.floor(count / d);
  const counts = new Array(d).fill(base);
  const idx = shuffle([...Array(d).keys()], rng);
  for (let i = 0; i < count - base * d; i++) counts[idx[i]]++;
  return counts;
}

// choose engines + per-engine counts that satisfy the controlled-random rules.
// A backbone of E00 (concepts3 humiliation->reveal) is guaranteed so both banks mix.
function selectMix(poolByEngine, count, maxEngines, maxSad, e00, rng) {
  const others = Object.keys(poolByEngine).filter((e) => e !== 'E00');
  const e00Pool = (poolByEngine.E00 || []).length;
  let force = e00 == null ? Math.max(1, Math.round(count * 0.3)) : e00;
  force = Math.max(0, Math.min(force, 3, count - 1, e00Pool)); // <=3, keep >=1 concepts4 item
  const restCount = count - force;
  const restMax = Math.max(1, maxEngines - (force > 0 ? 1 : 0));
  let dMin = Math.min(3, restCount, others.length);
  const dMax = Math.max(1, Math.min(restMax, restCount, others.length));
  if (dMin > dMax) dMin = dMax; // tight --max-engines with forced E00
  for (let attempt = 0; attempt < 6000; attempt++) {
    const d = dMin + Math.floor(rng() * (dMax - dMin + 1));
    const chosen = shuffle(others.slice(), rng).slice(0, d);
    const counts = distribute(restCount, d, rng);
    const map = {};
    chosen.forEach((e, i) => (map[e] = counts[i]));
    if (force > 0) map.E00 = force;
    const engines = Object.keys(map);
    if (engines.some((e) => map[e] > poolByEngine[e].length)) continue; // not enough seeds
    if (engines.some((e) => map[e] > 3)) continue; // no engine dominates
    if (engines.length > maxEngines) continue;
    const sad = engines.reduce((s, e) => s + (SAD.includes(e) ? map[e] : 0), 0);
    if (sad > maxSad) continue;
    if (new Set(engines.map((e) => ENGINES[e].mood)).size < 2) continue; // need >=2 moods
    return map;
  }
  return null;
}

// greedy interleave so the same engine never lands in consecutive slots
function arrange(buckets) {
  const rem = buckets.map((b) => ({ engine: b.engine, items: b.items.slice() }));
  const result = [];
  let last = null;
  let total = rem.reduce((s, b) => s + b.items.length, 0);
  while (total > 0) {
    const live = rem.filter((b) => b.items.length > 0).sort((a, b) => b.items.length - a.items.length);
    const pick = live.find((b) => b.engine !== last) || live[0];
    result.push(pick.items.shift());
    last = pick.engine;
    total--;
  }
  return result;
}


function build(items, args) {
  return items.map((it, i) => {
    const id = args.prefix + String(args.start + i).padStart(3, '0');
    const src = it.bank === 'concepts3'
      ? `concepts3 / ${it.group} #${it.num}`
      : `concepts4 / ${it.engine} ${ENGINES[it.engine].name} #${it.num}`;
    return {
      id,
      engine: it.engine,
      engineName: ENGINES[it.engine].name,
      openingStyle: ENGINES[it.engine].opening,
      conceptSource: src,
      sourceTitle: it.title,
      sourceSeed: it.desc,
      title: null,
      characterBible: null,
      photoPrompt: null,
      caption: null,
      fullStory: null,
      status: { plan: false, photo: false, caption: false, story: false },
    };
  });
}

function printMap(items) {
  const w = (s, n) => String(s).padEnd(n).slice(0, n);
  console.log(`\n| ID    | Source                         | Engine                      | Opening style       | Tone           |`);
  console.log(`|-------|--------------------------------|-----------------------------|---------------------|----------------|`);
  for (const it of items) {
    const eng = `${it.engine} ${ENGINES[it.engine].name}`;
    console.log(`| ${w(it.id, 5)} | ${w(it.sourceTitle, 30)} | ${w(eng, 27)} | ${w(it.openingStyle, 19)} | ${w(ENGINES[it.engine].tone, 14)} |`);
  }
  const mix = {};
  for (const it of items) mix[it.engine] = (mix[it.engine] || 0) + 1;
  const sad = items.filter((it) => SAD.includes(it.engine)).length;
  console.log(`\nEngines: ${Object.keys(mix).length} distinct  ${JSON.stringify(mix)}`);
  console.log(`Heavy/sad items: ${sad}\n`);
}


function main() {
  const args = parseArgs(process.argv);
  const rng = makeRng(args.seed);

  const c3 = path.join(REF, 'concepts3.md');
  const c4 = path.join(REF, 'concepts4.md');
  if (!fs.existsSync(c3) || !fs.existsSync(c4)) {
    console.error('Cannot find concepts3.md / concepts4.md in', REF);
    process.exit(1);
  }
  const pool = [...parseConcepts3(c3), ...parseConcepts4(c4)];
  if (pool.length < args.count) {
    console.error(`Pool has only ${pool.length} seeds; cannot pick ${args.count}.`);
    process.exit(1);
  }

  const byEngine = {};
  for (const s of pool) (byEngine[s.engine] = byEngine[s.engine] || []).push(s);

  const map = selectMix(byEngine, args.count, args.maxEngines, args.maxSad, args.e00, rng);
  if (!map) {
    console.error('Could not satisfy constraints. Try raising --max-engines or --max-sad.');
    process.exit(1);
  }

  const buckets = Object.keys(map).map((e) => ({
    engine: e,
    items: shuffle(byEngine[e].slice(), rng).slice(0, map[e]),
  }));
  const items = build(arrange(buckets), args);

  printMap(items);

  const mix = {};
  for (const it of items) mix[it.engine] = (mix[it.engine] || 0) + 1;
  const skeleton = {
    batchId: args.batch,
    prefix: args.prefix,
    generated: new Date().toISOString(),
    engineMix: mix,
    items,
  };
  const json = JSON.stringify(skeleton, null, 2);
  console.log('--- JSON skeleton (engine pre-filled; Phase 0 fills title/characterBible/beats) ---');
  console.log(json);

  if (args.write) {
    const dir = path.join(__dirname, '..', 'output', args.batch);
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${args.batch}.json`);
    fs.writeFileSync(file, json + '\n', 'utf8');
    console.error(`\nWrote ${file}`);
  }
}

main();

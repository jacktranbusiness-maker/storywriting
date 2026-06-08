#!/usr/bin/env node
/**
 * Batch picker for story-photo-full-v2 (concepts5 only).
 *
 * Usage:
 *   node scripts/pick-batch.js --count 10 --prefix V --batch batch-01
 *   node scripts/pick-batch.js -n 10 -p V -b batch-01 --seed 42 --write
 */

'use strict';

const fs = require('fs');
const path = require('path');

const FAMILIES = [
  { id: 'F01', name: 'Wedding Ballroom Public Meltdown', engine: 'E00', tone: 'mixed' },
  { id: 'F02', name: 'Wedding Night Overheard Betrayal', engine: 'E00', tone: 'mixed' },
  { id: 'F03', name: 'Ex-Billionaire & Secret Children', engine: 'E26', tone: 'mixed' },
  { id: 'F04', name: 'Stand-In Parent Humiliated', engine: 'E02', tone: 'mixed' },
  { id: 'F05', name: 'Widower Cottage & Lost Children', engine: 'E11', tone: 'bittersweet' },
  { id: 'F06', name: 'Single Mother Workplace Crisis', engine: 'E04', tone: 'feel-good' },
  { id: 'F07', name: 'Hospital Birth & Bloodline Truth', engine: 'E26', tone: 'mixed' },
  { id: 'F08', name: 'Courtroom Vindication', engine: 'E15', tone: 'mixed' },
  { id: 'F09', name: 'Hidden Identity Power Reversal', engine: 'E00', tone: 'mixed' },
];

const SEEDS_PER_FAMILY = 25;

const OPENING_STYLES = [
  'I thought… Then…',
  'They called me…',
  'On the night of…',
  'My name is… (cold open)',
  'Dialogue slap',
  'Silent witness',
  'Object clue',
  'Crisis clock',
  'The return',
  'Room goes wrong',
  'Accuser POV flip',
  'Visual reveal',
  'Third-person chaos',
  'Medical / legal threshold',
];

function hashSeed(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randInt(rng, min, max) {
  return min + Math.floor(rng() * (max - min + 1));
}

function shuffle(arr, rng) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function parseArgs(argv) {
  const out = { count: 10, prefix: 'V', batch: null, start: 1, seed: null, write: false };
  const alias = { n: 'count', p: 'prefix', b: 'batch', s: 'seed' };
  for (let i = 0; i < argv.length; i++) {
    let key = argv[i];
    if (!key.startsWith('-')) continue;
    key = key.replace(/^--?/, '');
    key = alias[key] || key;
    const camel = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    if (camel === 'write') { out.write = true; continue; }
    const val = argv[++i];
    if (['count', 'start', 'seed'].includes(camel)) out[camel] = parseInt(val, 10);
    else out[camel] = val;
  }
  if (!out.batch) out.batch = `batch-${out.prefix.toLowerCase()}`;
  if (out.seed == null) out.seed = hashSeed(`${out.batch}|${out.count}|${Date.now()}`);
  return out;
}

function interleaveByFamily(multiset, rng) {
  const counts = {};
  for (const f of multiset) counts[f.id] = (counts[f.id] || 0) + 1;
  const byId = {};
  for (const f of multiset) byId[f.id] = f;
  const result = [];
  let last = null;
  for (let step = 0; step < multiset.length; step++) {
    let pool = Object.keys(counts).filter((id) => counts[id] > 0 && id !== last);
    if (!pool.length) pool = Object.keys(counts).filter((id) => counts[id] > 0);
    const maxC = Math.max(...pool.map((id) => counts[id]));
    pool = pool.filter((id) => counts[id] === maxC);
    const pick = pool[Math.floor(rng() * pool.length)];
    result.push(byId[pick]);
    counts[pick]--;
    last = pick;
  }
  return result;
}

function build(opts) {
  const rng = mulberry32(opts.seed);
  const n = opts.count;
  const familyOrder = shuffle(FAMILIES, rng);
  const multiset = [];
  for (let i = 0; i < n; i++) multiset.push(familyOrder[i % familyOrder.length]);
  const ordered = interleaveByFamily(multiset, rng);

  const items = [];
  let prevStyle = null;
  let styleCursor = randInt(rng, 0, OPENING_STYLES.length - 1);
  for (let i = 0; i < n; i++) {
    const fam = ordered[i];
    const seedNo = randInt(rng, 1, SEEDS_PER_FAMILY);
    const engineLabel = `${fam.engine} — ${engineName(fam.engine)}`;
    const stylePool = fam.id === 'F01'
      ? OPENING_STYLES
      : OPENING_STYLES.filter((s) => s !== 'Third-person chaos');
    // Advance through the rotation until we land on an allowed, non-repeating style.
    let style = null;
    for (let k = 0; k < OPENING_STYLES.length; k++) {
      const candidate = OPENING_STYLES[(styleCursor + k) % OPENING_STYLES.length];
      if (stylePool.includes(candidate) && candidate !== prevStyle) {
        style = candidate;
        styleCursor = (styleCursor + k + 1) % OPENING_STYLES.length;
        break;
      }
    }
    if (!style) style = stylePool.find((s) => s !== prevStyle) || stylePool[0];
    prevStyle = style;
    const id = `${opts.prefix}${String(opts.start + i).padStart(3, '0')}`;
    const conceptRef = `concepts5 #${fam.id}-${String(seedNo).padStart(2, '0')}`;
    items.push({
      id,
      title: null,
      family: fam.id,
      engine: engineLabel,
      tone: fam.tone,
      photoRule: 'cinematic',
      openingStyle: style,
      conceptSource: conceptRef,
      seedRefs: { family: fam.id, seed: seedNo },
      characterBible: null,
      photoPrompt: null,
      caption: null,
      fullStory: null,
      status: { plan: false, photo: false, caption: false, story: false },
    });
  }
  return items;
}

function engineName(id) {
  const map = {
    E00: 'Humiliation → Reveal',
    E02: 'Hidden Sacrifice Revealed',
    E04: 'The Test in Disguise',
    E11: 'Bittersweet / Too Late',
    E15: 'The Truth That Exonerates',
    E26: 'The Misunderstanding Explained',
  };
  return map[id] || id;
}

function pad(s, w) { s = String(s); return s + ' '.repeat(Math.max(0, w - s.length)); }

function printFamilyMap(items, opts) {
  const tones = items.reduce((m, i) => ((m[i.tone] = (m[i.tone] || 0) + 1), m), {});
  let dup = 0;
  for (let i = 1; i < items.length; i++) {
    if (items[i].family === items[i - 1].family) dup++;
  }
  console.log(`\n# FAMILY MAP — ${opts.batch} | ${items.length} items | seed=${opts.seed}`);
  console.log(`# concept bank: concepts5.md | consecutive family dup: ${dup === 0 ? 'OK' : 'WARN ' + dup}`);
  console.log(`# tone: ${Object.entries(tones).map(([t, c]) => `${t}=${c}`).join(', ')}`);
  console.log('-'.repeat(110));
  console.log(pad('#', 3), pad('id', 6), pad('family', 6), pad('engine', 36), pad('tone', 12), pad('opening', 22), 'conceptSource');
  console.log('-'.repeat(110));
  items.forEach((it, i) => {
    console.log(
      pad(i + 1, 3), pad(it.id, 6), pad(it.family, 6), pad(it.engine, 36),
      pad(it.tone, 12), pad(it.openingStyle, 22), it.conceptSource
    );
  });
  console.log('-'.repeat(110));
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const items = build(opts);
  const skeleton = {
    batchId: opts.batch,
    prefix: opts.prefix,
    pipelineVersion: 'v2-cinematic',
    conceptSource: 'concepts5.md',
    generated: new Date().toISOString(),
    seed: opts.seed,
    items,
  };
  printFamilyMap(items, opts);
  if (opts.write) {
    const dir = path.join('output', opts.batch);
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${opts.batch}.json`);
    fs.writeFileSync(file, JSON.stringify(skeleton, null, 2), 'utf8');
    console.log(`\nWrote skeleton: ${file}`);
    console.log('Next: Phase 0 — fill title, 4-beat arc, characterBible per item.');
  } else {
    console.log('\n# JSON SKELETON (re-run with --write to save):\n');
    console.log(JSON.stringify(skeleton, null, 2));
  }
}

main();

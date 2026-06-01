#!/usr/bin/env node
/**
 * Assemble Omni-Flash-Story batch JSON into TXT package files.
 * Usage: node scripts/json-to-txt.js path/to/batch.json
 */

const fs = require('fs');
const path = require('path');

const jsonPath = process.argv[2];
if (!jsonPath) {
  console.error('Usage: node scripts/json-to-txt.js <batch.json>');
  process.exit(1);
}

const batch = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const dir = path.dirname(jsonPath);
const base = batch.batchId || path.basename(jsonPath, '.json');
const sep = '='.repeat(80);
const ids = batch.items.map((i) => i.id).join('–');

function storyboardsBlock(item) {
  const parts = (item.actStoryboards || []).map(
    (a) => `Act ${a.act} | ${a.label}\n\n${a.storyboardPrompt}`
  );
  return `${item.id} | ${item.title}\n\n${parts.join('\n\n---\n\n')}`;
}

function omniBlock(item) {
  const parts = (item.omniPrompts || []).map(
    (a) => `Act ${a.act}\n\n${a.videoPrompt}`
  );
  return `${item.id} | ${item.title}\n\n${parts.join('\n\n---\n\n')}`;
}

function storyBlock(item) {
  return `${item.id} | ${item.title}\n\n${item.fullStory}`;
}

const packageLines = [`# ${base.toUpperCase()} | ${ids} | ${batch.conceptSource || ''}`, ''];

for (const item of batch.items) {
  const capLen = item.caption ? item.caption.length : 0;
  const storyLen = item.fullStory ? item.fullStory.length : 0;
  const acts = item.actStoryboards || [];
  const omni = item.omniPrompts || [];

  packageLines.push(sep, `${item.id} | ${item.title} | engine ${item.engine || 'E00'}`, sep, '');
  packageLines.push('[CHARACTER LOCK]', item.characterBible || '', '');
  packageLines.push('[CHARACTER ANCHOR PROMPT]', item.characterAnchorPrompt || '', '');

  acts.forEach((a) => {
    packageLines.push(`[ACT ${a.act} STORYBOARD — ${a.label}]`, a.storyboardPrompt || '', '');
  });

  omni.forEach((a) => {
    packageLines.push(`[ACT ${a.act} OMNI FLASH PROMPT]`, a.videoPrompt || '', '');
  });

  packageLines.push(
    `[CAPTION — ${capLen} chars]`,
    item.caption || '',
    '',
    `[FULL STORY — ${storyLen} chars]`,
    item.fullStory || '',
    ''
  );
}

const packagePath = path.join(dir, `${base}-package.txt`);
fs.writeFileSync(packagePath, packageLines.join('\n'), 'utf8');

const sbPath = path.join(dir, `${base}-storyboards.txt`);
fs.writeFileSync(sbPath, batch.items.map(storyboardsBlock).join('\n\n---\n\n'), 'utf8');

const omniPath = path.join(dir, `${base}-omni-prompts.txt`);
fs.writeFileSync(omniPath, batch.items.map(omniBlock).join('\n\n---\n\n'), 'utf8');

const captionsPath = path.join(dir, `${base}-captions.txt`);
fs.writeFileSync(captionsPath, batch.items.map((i) => i.caption).join('\n\n---\n\n'), 'utf8');

const storiesPath = path.join(dir, `${base}-stories.txt`);
fs.writeFileSync(storiesPath, batch.items.map(storyBlock).join('\n\n---\n\n'), 'utf8');

console.log('Wrote:');
console.log(' ', packagePath);
console.log(' ', sbPath);
console.log(' ', omniPath);
console.log(' ', captionsPath);
console.log(' ', storiesPath);

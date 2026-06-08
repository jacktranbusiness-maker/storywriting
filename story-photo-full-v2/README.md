# story-photo-full-v2 — Cinematic Viral Drama Pipeline

Phased workflow for Facebook drama posts: **cinematic 4:5 photo** + **viral-long caption** + **full story article**.

## Start here

1. `SKILL.md` — agent instructions
2. `sources.txt` — writing voice samples
3. `references/batch-mode.md` — session prompts
4. `references/concepts5.md` — 9 families × 25 seeds (225 total)

## Quick start

```bash
cd story-photo-full-v2
node scripts/pick-batch.js --count 10 --prefix V --batch batch-01 --seed 42 --write
# Phase 0 → 1 → 2 → 3 → 4 (one phase per session)
node scripts/json-to-txt.js output/batch-01/batch-01.json
```

## What changed (v2-cinematic)

| Before | Now |
|--------|-----|
| Smartphone snapshot photos | **Cinematic soap-opera stills** |
| concepts1–4 banks | **concepts5 only** (from `sources.txt` themes) |
| 31 engines | **8 focused engines** |
| Old batch outputs | Clean `output/` for new batches |

## Output per batch

```
output/{batch-id}/
  {batch-id}-plan.md
  {batch-id}.json
  {batch-id}-package.txt
  {batch-id}-photos.txt
  {batch-id}-captions.txt
  {batch-id}-stories.txt
```

## Genre families (concepts5)

| ID | Theme |
|----|-------|
| F01 | Wedding ballroom public meltdown |
| F02 | Wedding night overheard betrayal |
| F03 | Ex-billionaire & secret children |
| F04 | Stand-in parent humiliated |
| F05 | Widower cottage & lost children |
| F06 | Single mother workplace crisis |
| F07 | Hospital birth & bloodline truth |
| F08 | Courtroom vindication |
| F09 | Hidden identity power reversal |

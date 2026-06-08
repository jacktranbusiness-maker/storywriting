---
name: story-photo-full-v2
description: >
  Phased pipeline for viral Facebook cinematic drama: Plan → Cinematic Photo Prompt →
  Long Caption (4000–5000 chars, sources.txt voice) → Full Story (7000–8000 chars) → TXT export.
  JSON source of truth; concepts5.md only; 4:5 cinematic soap-opera stills (Nano Banana 2).

  Use when the user mentions: story-photo-full-v2, cinematic drama photo, concepts5,
  viral FB caption, sources.txt style, batch mode, Nano Banana 2, ReelShort aesthetic.

  Default: phased batches only. TXT deliverable. Read references/batch-mode.md.
---

# Story-Photo-Full v2 — Cinematic Drama

Phased pipeline: **Plan → Photo → Caption → Full Story → TXT Export**

| Layer | Reference |
|-------|-----------|
| Concepts | `references/concepts5.md` (F01–F09, 225 seeds) |
| Engines | `references/story-engines.md` (E00 default + 7 alts) |
| Photo | `references/nano-banana-2.md` — **cinematic drama still** |
| Caption voice | `references/caption-methodology.md` + `sources.txt` |
| Full story | `references/full-story-methodology.md` |
| Batches | `references/batch-mode.md` |

**User workflow**
1. Generate 4:5 cinematic image from photo prompt
2. Post image + long caption on Facebook
3. Link full story when readers engage
4. Publish article on site

---

## Critical rules

1. **Never one-shot** a batch of 2+ items
2. **One session = one phase** — stop for confirmation
3. **JSON is source of truth** — `output/{batch-id}/{batch-id}.json`
4. **TXT only** — never HTML unless user overrides
5. **Never trim** over-limit caption/story
6. **One PR per batch** — after Phase 4 only

---

## Phased pipeline

```
Phase 0 — Story Plan        → plan.md + JSON skeleton
Phase 1 — Photo Prompts     → JSON (max 5/session)
Phase 2 — Captions          → JSON (max 3/session)
Phase 3 — Full Stories      → JSON (max 2/session)
Phase 4 — Export TXT        → package + split files
```

### Phase 0

```bash
node scripts/pick-batch.js --count 10 --prefix V --batch batch-01 --seed 42 --write
```

Fill per item: `title`, 4-beat arc, `characterBible`, scroll-stop photo moment.

### Phase 1 — Photo

- Opener: `4:5 vertical cinematic photorealistic drama still...`
- Multi-character tableau OK; partial twist visible OK
- No readable in-scene text
- See `photo-prompt-format.md`

### Phase 2 — Caption

- **4000–5000** chars, `sources.txt` voice
- Staccato lines, US settings, sharp dialogue
- CTA: MORE/YES/NEXT or sources-style engagement bait
- Stop before deepest payoff

### Phase 3 — Full story

- **7000–8000** chars, same voice
- Continue from caption — no repeat
- Full Turn + Payoff + consequences

### Phase 4 — Export

```bash
node scripts/json-to-txt.js output/{batch-id}/{batch-id}.json
```

---

## JSON schema

```json
{
  "batchId": "batch-01",
  "prefix": "V001",
  "pipelineVersion": "v2-cinematic",
  "conceptSource": "concepts5.md",
  "items": [{
    "id": "V001",
    "title": "Under-Bed Bride Records → Heiress Reverses Plot",
    "conceptSource": "concepts5 #F02-01",
    "family": "F02",
    "engine": "E00 — Humiliation → Reveal",
    "tone": "mixed",
    "photoRule": "cinematic",
    "openingStyle": "On the night of…",
    "characterBible": "CHARACTER LOCK — ...",
    "photoPrompt": "4:5 vertical cinematic...",
    "caption": "...",
    "fullStory": "...",
    "status": { "plan": true, "photo": false, "caption": false, "story": false }
  }]
}
```

---

## Checklist (before Phase 4)

**Photo**
- [ ] Cinematic opener + Framing block
- [ ] Character Lock matches caption/story
- [ ] Scroll-stop moment; no full resolution in frame
- [ ] No readable text

**Caption**
- [ ] 4000–5000 chars
- [ ] sources.txt voice
- [ ] CTA present
- [ ] Deepest payoff saved for story

**Full story**
- [ ] 7000–8000 chars
- [ ] Continues caption
- [ ] All threads closed

**Export**
- [ ] `json-to-txt.js` run
- [ ] All `status.*` true

---

## Policy

Fictional characters only. No graphic violence or sexual content. See `nano-banana-2.md`.

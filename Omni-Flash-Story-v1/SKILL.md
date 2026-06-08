---
name: omni-flash-story-v1
description: >
  Phased pipeline for Facebook drama with Gemini Omni Flash 20s clips (2 acts × 10s):
  Story Plan (concepts3 + concepts4, story engines E00–E22) → Character Lock + 2 Act Storyboards
  → 2 Omni Flash Video Prompts → Facebook Caption → Full Story (6000–8000 chars) → TXT export.
  JSON source of truth; strict phase-by-phase batch mode.

  Use whenever the user mentions: omni-flash-story-v1, omni flash story, 20s video, 2 act storyboard,
  concepts3, concepts4, story engines, E00–E22, mixed concept batch, character anchor sheet,
  storyboard to omni prompt, facebook caption + full story, pick-batch omni.

  Default: concepts3 + concepts4 only; actCount always 2 (20s). Never one-shot 6+ items.
  Output TXT package, never HTML.
---

# Omni-Flash-Story v1 (Batch Mode)

Phased pipeline: **Plan → Storyboard (×2) → Omni Prompt (×2) → Caption → Full Story → TXT Export**

Platform: **Gemini Omni Flash** · **9:16 · 10s per act · 2 acts = 20s total**

**Concept focus:** `references/concepts3.md` + `references/concepts4.md` only (do not default to concepts1/2 unless user overrides).

**Narrative variety:** every item has an **engine** (`E00`–`E22` in `references/story-engines.md`). Only concepts3 items use **E00**; concepts4 items use their seed’s engine. **Do not write every story as humiliation → reveal.**

**User workflow:**
1. Generate Character Anchor Sheet
2. Generate **Act 1** and **Act 2** storyboard sheets
3. Generate **2** Omni Flash clips → stitch to **20s**
4. Post video + caption on Facebook
5. Publish full story on website

---

## Critical rules

1. **Never one-shot a batch** of 2+ items in one session
2. **One session = one phase** — stop and wait for confirmation
3. **JSON is source of truth** — `output/{batch-id}/{batch-id}.json`
4. **Final deliverable = TXT** — never HTML unless user overrides
5. **Phase prompts** — copy from `references/batch-mode.md`
6. **`actCount` is always `2`** — exactly 2 storyboards + 2 video prompts per item (20s)
7. **No commit/PR per phase** — one PR only after Phase 5 export

---

## When to read reference files

| File | When |
|------|------|
| `references/batch-mode.md` | **Always** for batches |
| `references/two-act-by-engine.md` | **Always** before storyboards — 2-act beats per engine |
| `references/story-engines.md` | **Every item** — driver, scroll-stop, opening style, payoff |
| `references/concepts3.md` | Picking / tagging concepts3 seeds (engine E00) |
| `references/concepts4.md` | Picking concepts4 seeds (engines E01–E22) |
| `references/character-anchor-sheet.md` | Phase 1 — anchor + bible |
| `references/act-storyboard.md` | Phase 1 — each act sheet (4 panels per 10s) |
| `references/frames-to-video.md` | Phase 2 — each act video prompt |
| `references/caption-methodology.md` | Phase 3 |
| `references/full-story-methodology.md` | Phase 4 |

**Batch picker (concepts3 + concepts4 mix):**
```bash
cd Omni-Flash-Story-v1
node scripts/pick-batch.js 10 --batch batch-omni-01 --prefix O --write
```

---

## Phased pipeline

```
Phase 0 — Plan + engine map + JSON skeleton
Phase 1 — Character bible + anchor + 2 act storyboards   (max 4/session)
Phase 2 — 2 Omni Flash video prompts per item              (max 4/session)
Phase 3 — Facebook captions                                (max 5/session)
Phase 4 — Full stories                                     (max 2/session)
Phase 5 — Export TXT from JSON, then one PR
```

**10-item batch ≈ 12–14 sessions** (not 1).

---

## Phase 0 — Story Plan

For each item:

| Field | Rule |
|-------|------|
| `conceptSource` | `concepts3 #NNN` or `concepts4 E0x #NNN` |
| `engine` | E00 for concepts3; E01–E22 for concepts4 (from seed group) |
| `actCount` | **Always `2`** |
| `openingStyle` | From engine card in `story-engines.md` |
| `title` | Engine-appropriate (not always humiliation → reveal) |
| `twoActPlan` | Act 1 + Act 2 labels from `two-act-by-engine.md` |
| `characterBible` draft | Names, outfits, prop, US setting |

**Phase 0 must print engine map** (see `batch-mode.md`).

Controlled-random batch rules (when mixing banks):
- ≤ 6 distinct engines per 10-item batch
- No 3 consecutive same engine
- Max 3 sad engines (E04, E06, E12, E20) per batch

---

## Phase 1 — Storyboard assets (2 acts only)

Per item:
1. `characterBible` (final)
2. `characterAnchorPrompt` (16:9 reference sheet — **no drama panels**)
3. `actStoryboards[]` — **length 2** only:
   - Act 1: Hook + Build (engine scroll-stop / withhold)
   - Act 2: Turn + tease (continuity from Act 1 Frame 4)

Read `two-act-by-engine.md` + engine card. Template: `act-storyboard.md`.

---

## Phase 2 — Omni Flash video prompts (2 only)

Per item: `omniPrompts[]` length **2**.

Each prompt: `Vertical 9:16, 24fps, 10 seconds` + two-reference upload + timestamps + hard cuts.

Template: `frames-to-video.md`.

---

## Phase 3 — Facebook Caption

Same as story-photo-full-v1 (`caption-methodology.md`):
- 1000–1200 chars target (over = keep)
- 3 paragraphs + CTA (`MORE` / `YES` / `NEXT`)
- Para 2: visual from **Act 1–2 storyboard**
- **Do not complete** engine payoff (full twist in full story only)
- Opening style from **engine**, not always Dialogue Slap

---

## Phase 4 — Full Story

Same as story-photo-full-v1 (`full-story-methodology.md`):
- 6000–8000 chars target (over = keep)
- 4 narrative acts in prose (Hook → Build → Turn → Payoff) mapped to **engine**
- Antagonist consequence only if engine requires it

---

## Phase 5 — TXT Export

From skill folder:
```bash
node scripts/json-to-txt.js output/{batch-id}/{batch-id}.json
```

Do not rewrite content during export.

---

## JSON schema (summary)

```json
{
  "batchId": "batch-omni-01",
  "prefix": "O001",
  "conceptSource": "concepts3 + concepts4 mixed",
  "items": [{
    "id": "O001",
    "title": "Odd ritual → the reason",
    "conceptSource": "concepts4 E02 #7",
    "engine": "E02",
    "actCount": 2,
    "openingStyle": "Curious Ritual",
    "twoActPlan": { "act1": "Odd ritual", "act2": "Explanation begins" },
    "characterBible": "...",
    "characterAnchorPrompt": "...",
    "actStoryboards": [
      { "act": 1, "label": "Hook + Build", "storyboardPrompt": "..." },
      { "act": 2, "label": "Turn + tease", "storyboardPrompt": "..." }
    ],
    "omniPrompts": [
      { "act": 1, "videoPrompt": "..." },
      { "act": 2, "videoPrompt": "..." }
    ],
    "caption": "...",
    "fullStory": "...",
    "status": {
      "plan": true,
      "storyboard": true,
      "omniPrompt": true,
      "caption": true,
      "story": true
    }
  }]
}
```

---

## Output checklist (before Phase 5)

**Engine + plan**
- [ ] concepts3/4 source tagged; engine set (not all E00 unless batch is concepts3-only)
- [ ] Engine map printed in Phase 0
- [ ] `actCount` = 2; exactly 2 storyboards + 2 omni prompts

**Storyboard + video**
- [ ] Anchor sheet separate from drama boards
- [ ] Act 2 Frame 1 continues Act 1 Frame 4
- [ ] Hard cuts; no readable in-scene text

**Caption + story**
- [ ] Caption withholds full payoff; story completes engine payoff
- [ ] Opening style matches engine

**Export**
- [ ] All status flags true; package.txt assembled

---

## Batch size guidance

| Request | Action |
|---------|--------|
| 1 item | Phases 0–4 in one session OK if user asks |
| 2–10 items | Mandatory phased batch mode |
| concepts3 only | All `engine: "E00"` — still vary opening styles |
| concepts4 only | Rotate E01–E22 using pick-batch or manual engine map |

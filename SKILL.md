---
name: story-photo-full-v1
description: >
  Phased pipeline for Facebook drama content with Nano Banana 2 image generation (4:5 vertical,
  self-taken photo aesthetic): Concept Plan → 4:5 Photo Prompt → Facebook Caption → Full Story
  (6000–8000 chars) → TXT package export. Uses JSON source of truth and multi-session batch mode
  to avoid agent context overflow.

  Use whenever the user mentions: storywriting, story-photo-full-v1, story photo full, photo story
  pipeline, batch mode, Nano Banana 2, 4:5 photo prompt, Facebook drama photo, self-taken photo
  prompt, Facebook caption + full story, concepts1, concepts2, concept bank, category A–M drama,
  Rich vs Poor, Workplace, Wedding, Military, Lullaby drama photo posts.

  Default: phased batch workflow (never one-shot 6+ items). Output TXT package, never HTML.
  Single item: Phases 0–3 in one session OK. Read references/batch-mode.md for session prompts.
---

# Story-Photo-Full v1 (Batch Mode)

Phased pipeline: **Plan → Photo Prompt → Caption → Full Story → TXT Export**

Platform: **Nano Banana 2** (Google image generation)

**User workflow:**
1. Generate image from 4:5 photo prompt
2. Post image + caption on Facebook
3. Comment article link when readers engage (MORE / YES / NEXT)
4. Publish full story on website

---

## Critical rules

1. **Never one-shot a batch** of 2+ items in one session — agent will degrade or break
2. **One session = one phase** — stop and wait for user confirmation
3. **JSON is source of truth** — `output/{batch-id}/{batch-id}.json`
4. **Final deliverable = TXT** — never HTML unless user explicitly overrides
5. **Phase prompts** — copy from `references/batch-mode.md`
6. **No commit/PR per phase** — do NOT commit or open a pull request after each phase. Work locally through Phases 0–3. Create **exactly one PR** for the whole batch only after Phase 4 finishes (see `Git workflow` section below).

---

## When to read reference files

| File | When |
|------|------|
| `references/batch-mode.md` | **Always** for batches — session limits, prompts, JSON schema, TXT format |
| `references/nano-banana-2.md` | Before any photo prompt |
| `references/concepts1.md` | Category bank A–M (~130 templates) |
| `references/concepts2.md` | 240 seeds in 12 groups |
| `references/concepts3.md` | 400 seeds in 20 groups (Concepts 13–32) |
| `references/caption-methodology.md` | Before any caption |
| `references/full-story-methodology.md` | Before any full story |

**Concept source:**
- "concepts1" / "category B" → `concepts1.md`
- "concepts2" / "concept 03" → `concepts2.md`
- "concepts3" / "concept 13–32" → `concepts3.md`
- Custom scenario → no bank required

---

## Phased pipeline

```
Phase 0 — Story Plan        → plan.md + JSON skeleton
Phase 1 — Photo Prompts     → JSON (max 5/session)
Phase 2 — Captions          → JSON (max 5/session)
Phase 3 — Full Stories      → JSON (max 2/session)
Phase 4 — Export TXT        → package.txt from JSON, then ONE PR
```

**Commit policy:** nothing is committed during Phases 0–3. Only Phase 4 opens a single PR for the whole batch.

**Session limits:** see `references/batch-mode.md`

**10-item batch = ~11 sessions** (not 1).

---

## Phase 0 — Story Plan

Before any creative writing, plan every item:

```
Beat 1 — Setup: humiliation or block
Beat 2 — Clue: object, detail, or pressure
Beat 3 — Turn: recognition begins
Beat 4 — Payoff: full twist (caption + story only — NOT in photo)
```

Per item output in plan + JSON:
- id | title (humiliation → reveal)
- conceptSource
- 4-beat arc (1–2 sentences each)
- Character Lock (all persons, setting US, object clue)
- Peak-tension moment for photo (Beat 1–2)
- openingStyle (rotate across batch — no consecutive duplicates)

---

## Phase 1 — 4:5 Photo Prompt

Read `references/nano-banana-2.md` first.

| Field | Value |
|-------|-------|
| Aspect ratio | **4:5 vertical** — opens every prompt |
| Style | Self-taken phone photo — candid, natural light, subtle grain |
| Setting | United States — specific location + lighting |
| Language | English |
| Content | Peak-tension Beat 1–2 — **twist NOT shown** |
| Policy | Google Generative AI — fictional characters only |

### Prompt structure

```
4:5 vertical photo, smartphone snapshot aesthetic, natural unposed moment, realistic phone-camera detail.

[US location + time + lighting]. [Character lock — age, hair, outfit for every person].

The photo captures [peak-tension moment]: [antagonist action + protagonist reaction]. [Object clue]. [Background context].

Framing: [handheld angle]. Shallow phone depth-of-field. Candid snapshot. No readable text on signs, documents, screens, or badges. No watermark.
```

### Rules

- Character lock in prompt body for every person
- Self-taken cues required — never cinematic/studio
- Twist withheld — no reversal or antagonist humiliated in frame
- Title format: `NNN | [humiliation] → [reveal]`

### Character Lock block (JSON `characterBible`)

```
CHARACTER LOCK — do not change across photo, caption, and full story:
• Name — age, hair, outfit, distinguishing detail
• Setting — location, lighting, time of day
• Object clue — [item] (pays off in full story Act 3–4)
```

---

## Phase 2 — Facebook Caption

Read `references/caption-methodology.md` first.

- **Length**: 1000–1200 characters target (count characters). **If it runs over, do NOT trim — keep it as-is.** The range is guidance, not a hard cap.
- **Structure**: 3 paragraphs + blank line + CTA
- **CTA**: Only `MORE`, `YES`, or `NEXT`
- **No twist spoil** — payoff stays in full story
- **Visual anchor**: Paragraph 2 includes one detail from photo prompt
- **Style variety**: No two consecutive same opening style

Opening styles:
`Dialogue slap` · `Silent witness` · `Object clue` · `Accuser POV` · `Victim restraint` ·
`Room goes wrong` · `Visual reveal` · `Deadline pressure` · `Wrong apology` · `Moral choice`

After writing, print verify table: `id | char count | opening style | CTA`

---

## Phase 3 — Full Story Article

Read `references/full-story-methodology.md` first.

- **Length**: 6000–8000 characters target (count characters). **If it runs over, do NOT trim — leave the full story intact.** The range is guidance, not a hard cap.
- **Opening**: Match and extend caption — same scene, same hook
- **Structure**: 4 acts — Hook → Pressure → Turn → Payoff
- **Ending**: Full twist + antagonist consequence + concrete final line
- **Voice**: Human storytelling — not summary-style or robotic
- **No CTA** in story body

After writing, print verify: `id | char count | first 80 chars of opening`

### Caption ↔ Story handoff

| Caption ends with... | Story opens with... |
|----------------------|---------------------|
| Rising tension, twist hidden | Same moment, wider lens |
| One quoted line | Same line in context, then expands |
| Object clue teased | Object gets meaning in Act 2–3 |

---

## Phase 4 — TXT Export

**Do not rewrite content** — assemble from JSON only.

Output: `output/{batch-id}/{batch-id}-package.txt`

Format per item:
```
================================================================================
{id} | {title}
================================================================================

[CHARACTER LOCK]
...

[PHOTO PROMPT]
...

[CAPTION — {n} chars]
...

[FULL STORY — {n} chars]
...
```

Optional split files: `-photos.txt`, `-captions.txt`, `-stories.txt`

**Zero-token export:** run from skill folder:
```bash
node scripts/json-to-txt.js output/{batch-id}/{batch-id}.json
```

---

## Git workflow

**One batch = one PR, created only after Phase 4.**

- Phases 0–3: write/update files locally only. Do **not** `git commit`, push, or open a PR.
- Do **not** create a PR per phase (an earlier version of this skill did — that is no longer wanted).
- Phase 4: after the TXT package is assembled, stage the whole batch (plan, JSON, TXT) and
  create **one** PR for the entire batch.
- Branch name: `{batch-id}` (e.g. `batch-09`) — not `{batch-id}-phase-N`.

**Cross-session note:** if a phase runs in a fresh session and the workspace was reset to the
remote, the prior phase's JSON must still be reachable to continue. If the environment does NOT
persist files between sessions, push the working branch (commit, **no PR**) at each phase end to
preserve the JSON, and still open the single PR only at Phase 4. If the workspace persists between
sessions, no intermediate push is needed.

---

## JSON schema (summary)

```json
{
  "batchId": "batch-04",
  "prefix": "C041",
  "conceptSource": "concepts2 / Concept 03",
  "items": [{
    "id": "C041",
    "title": "Humiliation → Reveal",
    "conceptSource": "Concept 03 #7",
    "openingStyle": "Silent witness",
    "characterBible": "...",
    "photoPrompt": "...",
    "caption": "...",
    "fullStory": "...",
    "status": { "plan": true, "photo": true, "caption": true, "story": true }
  }]
}
```

Full schema + copy-paste prompts: `references/batch-mode.md`

---

## Batch numbering

- Original: `001` → `030`
- Concepts2: `C001` → `C240`
- Mix: `M001` → `M030`

---

## Output checklist (before Phase 4)

**Photo prompt**
- [ ] 4:5 vertical + smartphone aesthetic
- [ ] Character lock consistent; Beat 1–2 shown
- [ ] Twist NOT depicted
- [ ] No readable in-scene text
- [ ] Google content policy OK

**Caption**
- [ ] ≥1000 chars (target 1000–1200; if over, keep — do not trim)
- [ ] Paragraph 2 has photo visual detail
- [ ] No twist spoil; no consecutive same opening style
- [ ] CTA = MORE / YES / NEXT only

**Full story**
- [ ] ≥6000 chars (target 6000–8000; if over, keep — do not trim)
- [ ] Opening matches caption
- [ ] Complete twist + consequence + final line
- [ ] No Facebook CTA in body

**JSON + TXT**
- [ ] All items have photoPrompt, caption, fullStory
- [ ] All status flags true
- [ ] package.txt assembled (no content edits during export)
- [ ] Single PR opened for the batch (no per-phase commits/PRs)

---

## Batch size guidance

| Request | Action |
|---------|--------|
| 1 item | Phases 0–3 in one session OK → export TXT |
| 2–10 items | **Mandatory batch mode** — follow phase schedule |
| 10+ items | Default batch size; confirm if 20+ |
| Fix 1 item | Fix prompt in batch-mode.md — touch JSON field only |

---

## Google content policy

Must not: graphic violence, sexual content, real public figures as deepfake targets,
misinformation as fact, hate speech.

Permitted: social humiliation, power reversals, confrontational dialogue, class/workplace
injustice, non-violent acting. Fictional characters only. See `references/nano-banana-2.md`.

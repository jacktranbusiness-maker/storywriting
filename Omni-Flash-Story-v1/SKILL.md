---
name: omni-flash-story-v1
description: >
  Phased pipeline for Facebook drama content using Gemini Omni Flash multi-act generation:
  Story Plan -> Character Lock + Act Storyboard Sheets -> Omni Flash Video Prompts ->
  Facebook Caption -> Full Story (6000-8000 chars) -> TXT package export.
  Uses JSON as source of truth and strict phase-by-phase batch mode to prevent context drift.

  Use whenever the user mentions: omni flash story, omni-flash-story-v1, multi-act storyboard,
  act storyboard, 10s clips, 30s video, 40s video, stitch clips, long-form omni flash drama,
  character lock consistency, storyboard to video prompt pipeline, facebook caption + full story.

  Default: phased batch workflow (never one-shot 6+ items). Output TXT package, never HTML.
  Single item: Phases 0-4 in one session OK if user asks.
---

# Omni-Flash-Story v1 (Batch Mode)

Phased pipeline: **Plan -> Storyboard -> Omni Flash Prompt -> Caption -> Full Story -> TXT Export**

Platform: **Gemini Omni Flash** (I2V generation, 9:16, 10s per act)

**User workflow:**
1. Generate Character Anchor Sheet (image reference)
2. Generate each Act Storyboard Sheet (16:9 board with 4 vertical panels)
3. Generate each Act 10s video from Omni Flash prompts
4. Stitch acts into one 30-40s reel
5. Post video + caption on Facebook
6. Publish full story article on website

---

## Critical rules

1. **Never one-shot a batch** of 2+ items in one session
2. **One session = one phase** for batches, then stop and wait for confirmation
3. **JSON is source of truth** - `output/{batch-id}/{batch-id}.json`
4. **Final deliverable = TXT** - never HTML unless user explicitly overrides
5. **Phase prompts** - copy from `references/batch-mode.md`
6. **No commit/PR per phase** - complete all phases locally first; open one PR only after export

---

## When to read reference files

| File | When |
|------|------|
| `references/batch-mode.md` | **Always** for batches - phase prompts, limits, JSON schema |
| `../Ommi-Storyboard/references/character-anchor-sheet.md` | Before Stage 1 for character lock + anchor prompt |
| `../Ommi-Storyboard/references/act-storyboard.md` | Before writing each act storyboard |
| `../Ommi-Storyboard/references/frames-to-video.md` | Before writing each Omni Flash video prompt |
| `../references/caption-methodology.md` | Before writing any caption |
| `../references/full-story-methodology.md` | Before writing any full story |
| `../references/concepts1.md` | Optional concept bank A-M |
| `../references/concepts2.md` | Optional 240 concept seeds |
| `../references/concepts3.md` | Optional 400 concept seeds |
| `../references/concepts4.md` + `../references/story-engines.md` | Optional engine-based ideation |

---

## Phased pipeline

```
Phase 0 - Story Plan + JSON skeleton
Phase 1 - Character Lock + Anchor + Act Storyboards (N=3 or 4)
Phase 2 - Omni Flash Video Prompts per act
Phase 3 - Facebook Captions
Phase 4 - Full Stories
Phase 5 - Export TXT package, then one PR
```

**Session limits:** see `references/batch-mode.md`

---

## Phase 0 - Story Plan

Per item define:
- id, title, conceptSource
- actCount (`3` for 30s or `4` for 40s, default `4`)
- 4-beat arc: setup -> clue -> recognition -> payoff
- characterBible draft (names, age, hair, outfit, prop, setting lock)
- openingStyle for caption

---

## Phase 1 - Storyboard Assets

For each item write:
1. `characterBible` (final lock block)
2. `characterAnchorPrompt` (16:9 reference sheet prompt)
3. `actStoryboards[]` where each act contains:
   - `act`: number
   - `label`: beat label
   - `storyboardPrompt`: 16:9 sheet, 4x vertical 9:16 panels, with F1-F4 printed notes

Rules:
- Continuity required: Act N+1 Frame 1 continues Act N Frame 4
- No readable in-scene text
- Outfit changes only at act boundaries
- Keep twist fully resolved only in final act storyboard

---

## Phase 2 - Omni Flash Video Prompts

Fill `omniPrompts[]` per act.

Each prompt must:
- Open with: `Vertical 9:16, 24fps, 10 seconds, cinematic realism.`
- Instruct two uploads: Character Anchor Sheet + matching Act Storyboard
- Use explicit timestamps: 0-3s, 3-6s, 6-8s, 8-10s
- Use hard cuts between panels (no morph)
- Include character lock + sound arc + `No subtitles. No watermark.`

---

## Phase 3 - Facebook Caption

Use the same methodology from `../references/caption-methodology.md`.

- Target 1000-1200 chars (if over, keep as-is)
- 3 paragraphs + blank line + CTA (`MORE` / `YES` / `NEXT`)
- No full twist spoil
- Quote lines consistent with storyboard/video prompts

After writing, print verify table: `id | char count | opening style | CTA`

---

## Phase 4 - Full Story Article

Use the same methodology from `../references/full-story-methodology.md`.

- Target 6000-8000 chars (if over, keep as-is)
- Opening must match caption scene/hook
- 4 acts: Hook -> Build -> Turn -> Payoff
- No CTA in body

After writing, print verify: `id | char count | first 80 chars of opening`

---

## Phase 5 - TXT Export

Assemble from JSON only (no rewriting).

Output: `output/{batch-id}/{batch-id}-package.txt`

Format per item:
```
================================================================================
{id} | {title}
================================================================================

[CHARACTER LOCK]
...

[CHARACTER ANCHOR PROMPT]
...

[ACT STORYBOARDS]
Act 1 | ...
...

[OMNI FLASH VIDEO PROMPTS]
Act 1 | ...
...

[CAPTION - {n} chars]
...

[FULL STORY - {n} chars]
...
```

Optional split files:
- `{batch-id}-storyboards.txt`
- `{batch-id}-omni-prompts.txt`
- `{batch-id}-captions.txt`
- `{batch-id}-stories.txt`

---

## JSON schema (summary)

```json
{
  "batchId": "batch-omni-01",
  "prefix": "O001",
  "conceptSource": "concepts2 / Concept 03",
  "items": [{
    "id": "O001",
    "title": "Setup -> Payoff",
    "conceptSource": "Concept 03 #7",
    "actCount": 4,
    "openingStyle": "Dialogue Slap",
    "characterBible": "...",
    "characterAnchorPrompt": "...",
    "actStoryboards": [
      { "act": 1, "label": "Setup", "storyboardPrompt": "..." }
    ],
    "omniPrompts": [
      { "act": 1, "videoPrompt": "..." }
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

**Storyboard + Omni prompts**
- [ ] Character lock is consistent across all acts
- [ ] Act continuity enforced (N Frame1 follows N-1 Frame4)
- [ ] Omni prompts include two-reference instruction
- [ ] Hard cuts, timestamps, no readable in-scene text

**Caption**
- [ ] >=1000 chars target, CTA valid, no full twist spoil

**Full story**
- [ ] >=6000 chars target, opening matches caption, no CTA

**JSON + TXT**
- [ ] All required fields are filled
- [ ] All status flags true
- [ ] package.txt assembled without content edits


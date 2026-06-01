# Omni-Flash-Story v1 — Batch Mode

Use for every batch of 2+ items. **Never one-shot all phases in one session.**

**Defaults:** concepts3 + concepts4 · **2 acts · 20s** · engines E00–E22

---

## Session limits (hard rules)

| Phase | Max items/session | Why |
|-------|-------------------|-----|
| 0 — Plan | 10 | outline + engine map |
| 1 — Storyboards | **4** | anchor + 2 act sheets each |
| 2 — Omni prompts | **4** | 2 video prompts per item |
| 3 — Captions | 5 | short form |
| 4 — Full stories | **2** | heaviest |
| 5 — Export TXT | 1 batch | format only |

One session = one phase. Stop and wait for confirmation.

---

## Git rule

- No PR per phase.
- One batch = one PR after Phase 5 only.
- If workspace resets between sessions: commit + push at phase end to preserve JSON; PR still only at Phase 5.

---

## File layout

```text
output/{batch-id}/
  {batch-id}-plan.md
  {batch-id}.json
  {batch-id}-package.txt
  {batch-id}-storyboards.txt
  {batch-id}-omni-prompts.txt
  {batch-id}-captions.txt
  {batch-id}-stories.txt
```

Export:
```bash
cd Omni-Flash-Story-v1
node scripts/json-to-txt.js output/{batch-id}/{batch-id}.json
```

---

## Engine map (required in Phase 0)

Before writing creative content, print:

```
| ID  | Source              | Engine                    | Opening style    | Act1 → Act2 (labels)     |
|-----|---------------------|---------------------------|------------------|--------------------------|
| O01 | concepts3 #142      | E00 Humiliation→Reveal    | Dialogue Slap    | Humiliation → Recognition|
| O02 | concepts4 E02 #7    | E02 Mystery               | Curious Ritual   | Odd ritual → Reason surfaces |
```

Rules for mixed concepts3 + concepts4 batches:
- concepts3 → `engine: "E00"`
- concepts4 → engine from seed group (E01–E22)
- ≤ 6 distinct engines per 10-item batch
- No 3 consecutive same engine
- Max 3 sad items (E04, E06, E12, E20)

Helper:
```bash
node scripts/pick-batch.js 10 --batch batch-omni-01 --prefix O --write
```

---

## JSON skeleton

```json
{
  "batchId": "batch-omni-01",
  "prefix": "O001",
  "conceptSource": "concepts3 + concepts4",
  "items": [
    {
      "id": "O001",
      "title": "Setup → Payoff hint",
      "conceptSource": "concepts4 E08 #3",
      "engine": "E08",
      "actCount": 2,
      "openingStyle": "Object Clue",
      "twoActPlan": { "act1": "Separation + clue", "act2": "Reunion tease" },
      "characterBible": null,
      "characterAnchorPrompt": null,
      "actStoryboards": [],
      "omniPrompts": [],
      "caption": null,
      "fullStory": null,
      "status": {
        "plan": true,
        "storyboard": false,
        "omniPrompt": false,
        "caption": false,
        "story": false
      }
    }
  ]
}
```

**Hard rule:** `actCount` must always be `2`. Reject or fix any item with 3 or 4 acts.

Phase updates:
- Phase 1 → `characterBible`, `characterAnchorPrompt`, `actStoryboards` (exactly 2 entries), `status.storyboard`
- Phase 2 → `omniPrompts` (exactly 2 entries), `status.omniPrompt`
- Phase 3 → `caption`, `status.caption`
- Phase 4 → `fullStory`, `status.story`

---

## Copy-paste phase prompts

### Phase 0

```text
Run Phase 0 only for {BATCH_ID}.
Use concepts3.md and/or concepts4.md only. Run pick-batch if needed.
For each item: id, title, conceptSource, engine (E00 for concepts3; E01–E22 for concepts4),
actCount=2, openingStyle from story-engines.md, twoActPlan act labels, character bible draft.
Print ENGINE MAP table. Write plan + JSON skeleton. status.plan=true; others false.
STOP. No storyboards yet.
```

### Phase 1

```text
Run Phase 1 only for items {ID_RANGE} in {BATCH_ID}.
Read: google-policy-omni-flash.md, two-act-by-engine.md, story-engines.md (per item engine), character-anchor-sheet.md, act-storyboard.md.
Fill characterBible, characterAnchorPrompt, actStoryboards[] with EXACTLY 2 acts per item.
Follow engine card — NOT default humiliation unless engine is E00.
Act 2 Frame 1 continues Act 1 Frame 4. status.storyboard=true. STOP.
```

### Phase 2

```text
Run Phase 2 only for items {ID_RANGE} in {BATCH_ID}.
Read google-policy-omni-flash.md and frames-to-video.md. Fill omniPrompts[] with EXACTLY 2 friendly, policy-safe prompts per item.
Two-reference upload, timestamps, hard cuts, sound arc, no subtitles/watermark.
status.omniPrompt=true. STOP.
```

### Phase 3

```text
Run Phase 3 only for items {ID_RANGE} in {BATCH_ID}.
Read caption-methodology.md. 1000–1200 chars, 3 paragraphs + CTA.
Opening style from item engine. Do not complete payoff. status.caption=true.
Print: id | char count | opening style | CTA. STOP.
```

### Phase 4

```text
Run Phase 4 only for items {ID_RANGE} in {BATCH_ID}.
Read full-story-methodology.md + per-item engine card. 6000–8000 chars.
Deliver full engine payoff. status.story=true. STOP.
```

### Phase 5

```text
Run Phase 5 only for {BATCH_ID}.
node scripts/json-to-txt.js output/{BATCH_ID}/{BATCH_ID}.json
Verify all status flags true. No content rewrites. STOP.
```

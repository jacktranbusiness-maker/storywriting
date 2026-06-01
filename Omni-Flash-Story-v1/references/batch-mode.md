# Omni-Flash-Story v1 — Batch Mode

Use this file for every batch of 2+ items. Never generate all phases in one session.

---

## Session limits (hard rules)

| Phase | Max items/session | Why |
|------|--------------------|-----|
| 0 - Plan | 10 | lightweight planning |
| 1 - Storyboard assets | 3 | anchor + multi-act boards are heavy |
| 2 - Omni prompts | 3 | each item includes 3-4 act prompts |
| 3 - Captions | 5 | short form |
| 4 - Full stories | 2 | longest stage |
| 5 - Export TXT | 1 batch | formatting only |

One session = one phase only. Stop after each phase and wait for confirmation.

---

## Git rule

- No commit/PR after every phase for normal persistent workspace flow.
- One batch = one PR created only after Phase 5.
- If workspace resets between sessions, commit and push at phase end only to preserve JSON, but still create PR only after Phase 5.

---

## Batch file layout

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

---

## JSON skeleton template

```json
{
  "batchId": "batch-omni-01",
  "prefix": "O001",
  "conceptSource": "concepts2 / Concept 03",
  "items": [
    {
      "id": "O001",
      "title": "Setup -> Payoff",
      "conceptSource": "Concept 03 #7",
      "actCount": 4,
      "openingStyle": "Dialogue Slap",
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

Rules:
- Phase 1 only updates: `characterBible`, `characterAnchorPrompt`, `actStoryboards`, `status.storyboard`
- Phase 2 only updates: `omniPrompts`, `status.omniPrompt`
- Phase 3 only updates: `caption`, `status.caption`
- Phase 4 only updates: `fullStory`, `status.story`
- Phase 5 only assembles TXT from JSON

---

## Copy-paste phase prompts

### Phase 0 prompt

```text
Run Phase 0 only for {BATCH_ID}.
Create plan file and JSON skeleton at output/{BATCH_ID}/{BATCH_ID}.json.
For each item define: id, title, conceptSource, actCount (3 or 4), openingStyle, 4-beat arc, character lock draft.
Set status.plan=true and all other status flags=false.
Stop after Phase 0. Do not run later phases.
```

### Phase 1 prompt

```text
Run Phase 1 only for items {ID_RANGE} in {BATCH_ID}.
Read Character Anchor Sheet and Act Storyboard references.
Fill each item's characterBible, characterAnchorPrompt, and actStoryboards[] (N acts based on actCount).
Enforce continuity: Act N+1 Frame 1 continues Act N Frame 4.
Set status.storyboard=true for completed items.
Stop after Phase 1.
```

### Phase 2 prompt

```text
Run Phase 2 only for items {ID_RANGE} in {BATCH_ID}.
Read Frames-to-Video reference.
Fill omniPrompts[] for every act in each item.
Each prompt must include: two-reference upload instruction, timestamps, hard cuts, sound arc, no subtitles/watermark.
Set status.omniPrompt=true for completed items.
Stop after Phase 2.
```

### Phase 3 prompt

```text
Run Phase 3 only for items {ID_RANGE} in {BATCH_ID}.
Read caption methodology.
Write one caption per item (1000-1200 chars target, 3 paragraphs + blank line + CTA).
Do not fully reveal final twist.
Set status.caption=true.
Print verify table: id | char count | opening style | CTA
Stop after Phase 3.
```

### Phase 4 prompt

```text
Run Phase 4 only for items {ID_RANGE} in {BATCH_ID}.
Read full story methodology.
Write one full story per item (6000-8000 chars target).
Opening must match caption hook. No CTA in story body.
Set status.story=true.
Print verify table: id | char count | opening preview
Stop after Phase 4.
```

### Phase 5 prompt

```text
Run Phase 5 only for {BATCH_ID}.
Do not rewrite content. Assemble package and split TXT files from JSON only.
Verify all status flags are true for all items.
Stop after export.
```


# Batch Mode — Phased Pipeline (story-photo-full-v2)

**Concept bank:** `concepts5.md` only (9 families F01–F09).  
**Photo style:** cinematic drama still (`nano-banana-2.md`).  
**Writing voice:** `sources.txt` (`caption-methodology.md`).

Never one-shot a full batch in one session.

---

## Session limits

| Phase | Max items/session |
|-------|-------------------|
| 0 — Plan | 10 |
| 1 — Photo prompt | 5 |
| 2 — Caption | 3 |
| 3 — Full story | 2 |
| 4 — Export TXT | 1 batch |

**One session = one phase.** Stop and wait for confirmation.

---

## Version control

- Phases 0–3: no commit, no PR
- Phase 4 only: commit + **one PR per batch**

---

## Generate batch skeleton

```bash
node scripts/pick-batch.js --count 10 --prefix V --batch batch-01 --seed 42 --write
```

Rules enforced:
1. Distinct **families** when N ≤ 9
2. No consecutive duplicate family
3. Balanced **tone** (mixed / feel-good / bittersweet)
4. Rotated **opening styles**
5. Default engine **E00**; family-suggested engine in `conceptSource`

---

## File layout

```
output/{batch-id}/
  {batch-id}-plan.md
  {batch-id}.json
  {batch-id}-package.txt
  {batch-id}-photos.txt
  {batch-id}-captions.txt
  {batch-id}-stories.txt
```

---

## JSON schema

```json
{
  "batchId": "batch-01",
  "prefix": "V001",
  "pipelineVersion": "v2-cinematic",
  "conceptSource": "concepts5",
  "items": [{
    "id": "V001",
    "title": "Tension → Payoff",
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

## Phase prompts (placeholders: `{BATCH_ID}`, `{IDS}`, `{ID_A}`, `{ID_B}`)

### Master — new batch

```
Dùng skill story-photo-full-v2 — BATCH MODE.

Batch: {BATCH_ID}
Items: {COUNT} ({IDS})
Concept source: concepts5.md
Photo: cinematic drama still (nano-banana-2.md)
Voice: sources.txt

Phase 0 → plan + JSON skeleton
Phase 1 → photo prompts (5/session)
Phase 2 → captions 4–5k (3/session)
Phase 3 → full stories 7–8k (2/session)
Phase 4 → TXT export

KHÔNG one-shot. KHÔNG HTML.
Bắt đầu Phase 0 ONLY. Dừng sau khi xong.
```

### Phase 0

```
Phase 0 ONLY. Batch {BATCH_ID} | {IDS} | concepts5.md

Chạy pick-batch.js hoặc in family-map trước.
Mỗi item: id | title | conceptSource (concepts5 #Fxx-nn) | engine | 4-beat arc | Character Lock | scroll-stop photo moment | openingStyle

Output: {BATCH_ID}-plan.md + {BATCH_ID}.json (status.plan=true)
KHÔNG viết photo/caption/story.
```

### Phase 1 — Photo

```
Phase 1 ONLY. Đọc nano-banana-2.md + photo-prompt-format.md.
Viết photo prompts cho {IDS}.
Opener: 4:5 vertical cinematic photorealistic drama still...
Cập nhật JSON. status.photo=true.
```

### Phase 2 — Caption

```
Phase 2 ONLY. Đọc caption-methodology.md + sources.txt voice.
Caption 4000–5000 chars cho {IDS}.
Verify: id | char count | opening style | CTA
```

### Phase 3 — Full story

```
Phase 3 ONLY. Đọc full-story-methodology.md.
Full story 7000–8000 chars cho {ID_A} và {ID_B}.
Tiếp tục từ caption, không lặp.
```

### Phase 4 — Export

```bash
node scripts/json-to-txt.js output/{BATCH_ID}/{BATCH_ID}.json
```

Commit + one PR.

---

## 10-item schedule

| Session | Phase | Items |
|---------|-------|-------|
| 1 | 0 Plan | all |
| 2 | 1A Photo | 1–5 |
| 3 | 1B Photo | 6–10 |
| 4–6 | 2 Caption | 3+3+3+1 |
| 7–11 | 3 Story | 2×5 pairs |
| 12 | 4 Export | assemble |

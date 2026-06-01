# Batch Mode — Phased Pipeline

Use this file for every batch of 2+ concepts. **Never one-shot a full batch in a single session.**

---

## Session limits (hard rules)

| Phase | Max items/session | Why |
|-------|-------------------|-----|
| 0 — Plan | 10 | Outline only, lightweight |
| 1 — Photo prompt | 5 | Keep character/setting consistency |
| 2 — Caption | **3** | Long storytelling captions (~2–3k chars); match photo prompts |
| 3 — Full story | **2** | Heaviest stage (~7k chars each) |
| 4 — Export TXT | 1 batch | Format only, no creative writing |

**One session = one phase only.** Stop after each phase. Wait for user confirmation before the next.

---

## Git (hard rule)

- **No commit/PR per phase.** Phases 0–3 stay local. An earlier version opened a PR per phase
  (`{batch-id}-phase-N`) — that is no longer wanted.
- **One batch = one PR**, created **only after Phase 4**, on branch `{batch-id}`.
- Cross-session: if the workspace resets to remote between phases, push the working branch
  (commit, no PR) at each phase end to preserve the JSON; still open the single PR at Phase 4.

---

## File layout per batch

```
output/{batch-id}/
  {batch-id}-plan.md       ← Phase 0
  {batch-id}.json          ← Phases 1–3 (source of truth)
  {batch-id}-package.txt   ← Phase 4 (assembled from JSON)
  {batch-id}-photos.txt    ← optional split export
  {batch-id}-captions.txt
  {batch-id}-stories.txt
```

---

## JSON schema

```json
{
  "batchId": "batch-04",
  "prefix": "C041",
  "conceptSource": "concepts2 / Concept 03",
  "items": [
    {
      "id": "C041",
      "title": "Setup phrase → Payoff phrase",
      "conceptSource": "Concept 03 #7",
      "engine": "E08",
      "openingStyle": "Object Clue",
      "characterBible": "CHARACTER LOCK — do not change...",
      "photoPrompt": null,
      "caption": null,
      "fullStory": null,
      "status": {
        "plan": true,
        "photo": false,
        "caption": false,
        "story": false
      }
    }
  ]
}
```

**Rules:**
- Create JSON skeleton in Phase 0 with `characterBible`, beats, and metadata filled
- Each later phase **updates only its fields** — never rewrite completed items unless user asks
- Set `status.*` to `true` when that field is done

---

## Mixed-bank batches (concepts3 + concepts4)

Mixing banks is safe **only if every item is tagged with its engine** — otherwise the agent
drifts and writes everything as humiliation→reveal. Use **controlled random**, not pure random.

**Engine tagging**
- concepts1 / concepts2 / concepts3 item → `engine: "E00"` (Humiliation → Reveal)
- concepts4 item → its own `E01`–`E22` (the group it came from)

**Controlled-random rules for a 10-item batch**
1. **≤ 6 distinct engines** in the batch (4–6 is the sweet spot).
2. **No 3 consecutive items** with the same engine (ideally alternate).
3. **Tone balance:** at most **3** "heavy/sad" items (engines E04, E06, E12, E20). Include at
   least 2 different moods (punchy / warm / sad).
4. Don't let one engine exceed ~3 items unless the user asks.

**Phase 0 MUST print an engine map** before writing anything, so balance is visible:

```
| ID  | Source            | Engine                  | Opening style      | Tone        |
|-----|-------------------|-------------------------|--------------------|-------------|
| 01  | concepts3 #142    | E00 Humiliation→Reveal  | Dialogue Slap      | satisfying  |
| 02  | concepts4 E02 #7  | E02 Mystery             | Curious Ritual     | warm/bitter |
| 03  | concepts4 E21 #3  | E21 Found Family        | Tender Oddity      | belonging   |
| 04  | concepts4 E06 #11 | E06 Bittersweet         | Tender Oddity      | grief+love  |
| ... | ...               | ...                     | ...                | ...         |
```

**Helper:** `node scripts/pick-batch.js 10 --batch batch-09` auto-selects a balanced set from
concepts3 + concepts4, enforces the rules above, and prints the engine map **and** a JSON
skeleton (with `engine` filled per item) ready for Phase 0. See `references/story-engines.md`
for each engine's photo scroll-stop, opening style, and ending tone.

> In every later phase, read the per-item engine card in `story-engines.md`. Phase 3 stays at
> **2 stories/session** — pairing items of the same/similar engine reduces structure-switching.

---

## TXT package format (Phase 4)

```text
# BATCH-04 | C041–C050 | concepts2 Concept 03

================================================================================
C041 | Intern Blocked → Founder Security Guard
================================================================================

[CHARACTER LOCK]
...

[PHOTO PROMPT]
...

[CAPTION — 1124 chars]
...

[FULL STORY — 6847 chars]
...
```

Separator between items: 80 equals signs.

Split files use `---` between items (same as old "Copy All" blocks).

---

## Copy-paste prompts (replace placeholders)

Placeholders: `{BATCH_ID}`, `{IDS}`, `{ID_A}`, `{ID_B}`, `{CONCEPT_SOURCE}`, `{COUNT}`

### Master — start a new batch

```
Dùng skill storywriting — BATCH MODE.

Batch: {BATCH_ID}
Items: {COUNT} ({IDS})
Concept source: {CONCEPT_SOURCE}

Workflow bắt buộc — mỗi phase = 1 session riêng:
  Phase 0 → plan.md + JSON skeleton
  Phase 1 → photo prompts (5+5 nếu 10 items)
  Phase 2 → captions (3+3+… until done; see session limits)
  Phase 3 → full stories (2/lần)
  Phase 4 → package.txt từ JSON

KHÔNG one-shot. KHÔNG HTML. Deliverable cuối: {BATCH_ID}-package.txt

Git: KHÔNG commit/PR sau mỗi phase. Phase 0–3 chỉ làm local.
Chỉ tạo ĐÚNG 1 PR sau khi Phase 4 xong (branch {BATCH_ID}).

Bắt đầu Phase 0 ONLY. Dừng sau khi xong, chờ tôi confirm.
```

---

### Phase 0 — Story Plan

```
Dùng skill storywriting — Phase 0 ONLY.

Batch: {BATCH_ID} | Items: {IDS} | Source: {CONCEPT_SOURCE}

Đọc concept bank tương ứng (concepts1 / concepts2 / concepts3 / concepts4).
Nếu dùng concepts4 hoặc gán engine: đọc thêm references/story-engines.md.

Tạo STORY PLAN — KHÔNG viết photo prompt, caption, full story, txt.

Mỗi item gồm:
- id | title (`[setup] → [payoff]` theo engine của item)
- conceptSource
- engine (E01–E22 từ story-engines.md) — rotate trong batch, tránh 3+ item liên tiếp cùng engine
- 4-beat arc (Hook / Build / Turn / Payoff) — 1–2 câu/beat, map theo engine
- Character Lock đầy đủ (nhân vật, setting US, object clue)
- Peak-tension moment cho photo (Beat 1–2 = scroll-stop của engine, không spoil payoff)
- openingStyle (theo style engine gợi ý, không trùng liên tiếp)

Output:
1. output/{BATCH_ID}/{BATCH_ID}-plan.md
2. output/{BATCH_ID}/{BATCH_ID}.json — skeleton với characterBible + status.plan=true

Rotate location, twist type, opening style across items.
DỪNG sau Phase 0. Không làm Phase 1. KHÔNG commit/PR (chờ Phase 4).
```

---

### Phase 1A — Photo Prompts (first half)

```
Dùng skill storywriting — Phase 1A ONLY.

Đọc references/nano-banana-2.md
Đọc output/{BATCH_ID}/{BATCH_ID}-plan.md
Đọc output/{BATCH_ID}/{BATCH_ID}.json

Viết PHOTO PROMPT cho {IDS} (nửa đầu batch).
- Mở đầu: 4:5 vertical + smartphone snapshot aesthetic
- Character Lock khớp plan/JSON
- Scroll-stop = "Photo" line của engine item đó (xem story-engines.md); Beat 1–2, KHÔNG vẽ payoff
- Không readable text in scene

Cập nhật {BATCH_ID}.json — chỉ photoPrompt + status.photo=true cho items này.
KHÔNG viết caption, story, txt.
DỪNG sau Phase 1A. KHÔNG commit/PR (chờ Phase 4).
```

**Phase 1B** — same prompt, second half of IDs.

---

### Phase 2A — Captions (first chunk, max 3 items)

```
Dùng skill storywriting — Phase 2A ONLY.

Đọc references/caption-methodology.md
Đọc references/story-engines.md (opening style + tone theo engine)
Đọc output/{BATCH_ID}/{BATCH_ID}.json (items có photoPrompt)

Viết CAPTION cho {IDS} (tối đa 3 items session này).
- 2000–3000 ký tự mỗi caption (đếm ký tự) — nếu lố thì GIỮ NGUYÊN, không trim
- Phong cách storytelling: 5 beats (Hook → Ground → Rise → Turn → Hold) + blank line + CTA
- Beat 2: ít nhất 1 visual detail từ photo prompt
- Tối đa 2–3 dòng dialogue (verbatim từ prompt/plan), xen kẽ hành động
- Không spoil payoff (giấu đúng "Withhold" của engine)
- openingStyle theo engine của item

Cập nhật JSON — chỉ caption + status.caption=true.
In bảng verify: id | char count | opening style | CTA
DỪNG sau Phase 2A. KHÔNG commit/PR (chờ Phase 4).
```

**Phase 2B, 2C…** — next chunks of up to 3 IDs until all captions done.

---

### Phase 3 — Full Stories (2 items)

```
Dùng skill storywriting — Phase 3 ONLY.

Đọc references/full-story-methodology.md
Đọc references/story-engines.md (payoff + tone theo engine)
Đọc output/{BATCH_ID}/{BATCH_ID}.json

Viết FULL STORY cho {ID_A} và {ID_B} ONLY.
- 6000–8000 ký tự mỗi bài (đếm ký tự) — nếu lố thì GIỮ NGUYÊN, không trim
- Mở đầu khớp caption — reader cảm continuity
- 4 acts: Hook → Build → Turn → Payoff (map theo engine)
- Payoff theo engine + final line cụ thể; antagonist consequence CHỈ khi engine có antagonist
- Character Lock nhất quán
- Không copy CTA Facebook vào story

Cập nhật JSON — chỉ 2 items này + status.story=true.
In verify: id | char count | first 80 chars of opening
DỪNG. Không viết story khác. KHÔNG commit/PR (chờ Phase 4).
```

Repeat for each pair until all items done.

---

### Phase 4 — Export TXT

```
Dùng skill storywriting — Phase 4 ONLY.

Đọc output/{BATCH_ID}/{BATCH_ID}.json
Verify mọi item có photoPrompt, caption, fullStory đầy đủ.

Xuất output/{BATCH_ID}/{BATCH_ID}-package.txt theo format batch-mode.md.
- KHÔNG sửa nội dung creative — chỉ assemble
- Ghi char count caption và full story trong header mỗi item
- Chạy output checklist trong SKILL.md

Optional: cũng xuất -photos.txt, -captions.txt, -stories.txt
Hoặc chạy: node scripts/json-to-txt.js output/{BATCH_ID}/{BATCH_ID}.json

Sau khi assemble xong (đây là phase cuối):
- Tạo ĐÚNG 1 PR cho cả batch, branch tên {BATCH_ID}.
- KHÔNG tạo PR riêng cho từng phase.
- PR body: liệt kê items + char count caption/story.
```

---

### Fix single item

```
Dùng skill storywriting — FIX ONLY.

Batch: {BATCH_ID} | Item: {ID_A}
Đọc output/{BATCH_ID}/{BATCH_ID}.json

Chỉ sửa {ID_A}.fullStory — hiện {CURRENT} chars, cần 6500–7200 chars.
Giữ nguyên photoPrompt, caption, characterBible.
Không đụng items khác.
Sau khi sửa: cập nhật JSON + regenerate {BATCH_ID}-package.txt cho item đó hoặc cả file.
```

---

## Phase schedule for 10 items

| Session | Phase | Items |
|---------|-------|-------|
| 1 | 0 Plan | C041–C050 |
| 2 | 1A Photo | C041–C045 |
| 3 | 1B Photo | C046–C050 |
| 4 | 2A Caption | C041–C045 |
| 5 | 2B Caption | C046–C050 |
| 6 | 3 Story | C041–C042 |
| 7 | 3 Story | C043–C044 |
| 8 | 3 Story | C045–C046 |
| 9 | 3 Story | C047–C048 |
| 10 | 3 Story | C049–C050 |
| 11 | 4 Export | assemble TXT |

Total: **~13 short sessions** for a 10-item batch (Phase 2 = up to 4 caption sessions at 3 items each) vs 1 session that breaks.

The single PR (branch `batch-NN`) is created only in the final session (Phase 4) — never per phase.

---

## Single concept (1 item)

For 1 concept only, run Phase 0–3 in one session is OK (total ~9k chars output).
Still use JSON + export TXT. Skip splitting into 5+5.

Prompt:

```
Dùng skill storywriting — single item {ID}.
Phase 0→3 trong 1 session (chỉ 1 item).
Output: output/{BATCH_ID}/{BATCH_ID}.json + {BATCH_ID}-package.txt
KHÔNG HTML. Tạo ĐÚNG 1 PR ở cuối (branch {BATCH_ID}), không commit giữa chừng.
```

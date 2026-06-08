# Photo Prompt Format (v2 — cinematic)

How to **write** photo prompts in JSON and how **Phase 4** exports `{batch-id}-photos.txt`.

---

## Per-item structure (JSON)

| Field | Content |
|-------|---------|
| `title` | `Tension phrase → Payoff phrase` |
| `characterBible` | Full CHARACTER LOCK block (multi-line bullets OK) |
| `photoPrompt` | **Body only** — no `id \| title` or CHARACTER LOCK inside |

### `photoPrompt` body (3 parts)

1. **Opener** (one line): `4:5 vertical cinematic photorealistic drama still, high-budget soap opera aesthetic, shallow depth of field, emotionally charged faces.`
2. **Scene block** (one or two dense paragraphs): US location, time, lighting, every person from lock, scroll-stop action, object clue, witness reactions.
3. **Framing block** (one paragraph): starts with `Framing:` — angle, depth-of-field, cinematic photorealism, no readable text policy.

**Do not** use caption-style staccato in `photoPrompt`.

---

## Export: `{batch-id}-photos.txt`

Assembled by `scripts/json-to-txt.js`. **No `---` separators.**

Each item = one block:

```text
V001 | Under-Bed Bride Records → Apex Heiress Reverses In-Laws
CHARACTER LOCK — do not change across photo, caption, and full story:
• Emma Carter — 30, bride in white lace gown and veil, tear-streaked, under bed frame, smartphone recording
• Vanessa Cole — 58, silver sequined evening gown, silver heels, sharp gestures
• Ethan Marsh — 32, groom, blue suit, untied bow tie, tense jaw
• Monica Reyes — 29, pregnant, navy evening gown, composed expression, hand on stomach
• Setting — penthouse bridal suite, downtown Chicago, night, city skyline through windows

4:5 vertical cinematic photorealistic drama still, high-budget soap opera aesthetic, shallow depth of field, emotionally charged faces.
Penthouse bridal suite in downtown Chicago at night, warm interior light against cool city skyline through floor-to-ceiling windows. Emma Carter, 30, in a crushed white lace wedding gown, lies hidden beneath the bed, one hand over her mouth, smartphone raised with recording dot visible. Above: Vanessa Cole in a silver sequined gown gestures at a phone on the mattress; Ethan Marsh in a blue suit stands with hands in pockets; Monica Reyes in navy cradles her pregnant belly with a calm almost-smug expression. Luxury bed linens, champagne flutes on nightstand.
Framing: low angle from floor level showing both the hidden bride and the three figures above. Cinematic photorealism, natural skin texture. No readable text on phone screen or documents. No watermark.

V002 | ...
```

### Rules

- **Between items:** exactly **one blank line**
- **First line:** `{id} | {title}`
- **Then:** `characterBible` verbatim
- **Then:** one blank line
- **Then:** `photoPrompt` verbatim

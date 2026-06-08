# Character Anchor Sheet Reference

Generate **once per story**. Re-upload with **every act** I2V generation.

---

## Purpose

Lock faces, hair, outfits, and key props across 3–4 separate 10s clips. Text bible alone is not enough for multi-act consistency.

**Never combine** character reference panels with drama storyboard panels on the same sheet.

---

## Sheet specs

| Field | Value |
|-------|-------|
| Aspect | 16:9 widescreen |
| Panels | 4 equal vertical 9:16 portraits, full sheet height |
| Background | Plain gray, neutral soft studio lighting |
| Style | Cinematic realism — character design reference only |
| Content | No action, no story, no dramatic lighting, no text labels |

---

## Panel layout

| Panel | Content |
|-------|---------|
| 1 | Lead protagonist — full body front |
| 2 | Antagonist or second lead — full body front |
| 3 | Third character — full body front |
| 4 | Key prop extreme close-up **OR** fourth character portrait |

If only 2 characters: Panel 3 = prop close-up, Panel 4 = second angle of protagonist or setting texture reference.

---

## Prompt template

```
16:9 character reference sheet. Cinematic realism, neutral soft studio lighting,
plain gray background. Four equal vertical 9:16 portrait panels side-by-side,
full height of the sheet:

Panel 1: [Name] — full body front, [hair], [outfit details]
Panel 2: [Name] — full body front, [hair], [outfit details]
Panel 3: [Name] — full body front, [hair], [outfit details]
Panel 4: [Prop extreme close-up — e.g. crown-shaped sapphire ring on left hand]
         OR [Fourth character full body front]

No action, no story, no text labels, no dramatic lighting. Character design reference only.
```

---

## Character Bible template (text — paste into all act prompts)

```
CHARACTER LOCK — DO NOT CHANGE ACROSS ALL ACTS:
• [Name] — [age], [hair], [outfit], [skin/distinguishing detail]
• [Name] — [age], [hair], [outfit], [distinguishing detail]
• [Name] — [age], [hair], [outfit], [distinguishing detail]

PROP LOCK: [object] on [body location] — Acts [X–Y] only
OUTFIT CHANGES: None OR Act [N] only: [character] adds [item]
SETTING LOCK: [specific US location], [lighting type] — all acts
```

---

## I2V usage line (include in every act video prompt)

```
Upload two references: (1) Character Reference Sheet — match [names, outfits, prop] exactly.
(2) Act [N] Storyboard Sheet — use for composition and blocking only.
Follow timestamps below as primary timing.
```

---

## Optional: last-frame chaining

If Act N clip quality is good, export **last frame** of Act N as extra reference for Act N+1 Frame 1. Upload alongside Character Sheet — do not replace Character Sheet.


---

Append to every anchor prompt:
`Fictional characters only. Neutral reference poses — no story action.`

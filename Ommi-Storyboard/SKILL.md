---
name: ommi-storyboard
description: >
  Long-form Gemini Omni Flash drama pipeline (30–40s): Character Anchor Sheet →
  Character Bible → 3–4 Act Storyboard Sheets → Frames-to-Video prompts per act →
  one Facebook caption → HTML package with copy functions.

  Use when the user mentions: Ommi-Storyboard, long drama, 30s video, 40s video,
  multi-act storyboard, character reference sheet, character lock, stitch clips,
  4 storyboards, 4 video prompts, extended Omni Flash drama, bridal shop long form,
  or wants character consistency across multiple 10s segments.
---

# Ommi-Storyboard Skill

Long-form pipeline for **30–40 second** vertical drama on **Gemini Omni Flash**, built from **3–4 stitched 10s acts**.

Platform: **Gemini Omni Flash** · Output per act: **9:16 · 10s · 24fps**

For single **10s** clips without multi-act structure, use the sibling **ommi-story** skill instead.

---

## When to read reference files

| File | When |
|------|------|
| `references/character-anchor-sheet.md` | **Always first** for any new story — before act storyboards |
| `references/act-storyboard.md` | Before writing each act's 16:9 drama storyboard |
| `references/frames-to-video.md` | Before writing each act's I2V video prompt |
| `references/caption-longform.md` | Before writing the single full-story Facebook caption |
| `references/html-package.md` | Before building the HTML deliverable |
| `references/concepts1.md` | Optional — category bank A–M (~130 templates) |
| `references/concepts2.md` | Optional — expanded bank (240 seeds, 12 groups) |

---

## Pipeline Overview

```
Concept / story brief
     ↓
Stage 0  — Character Bible (text) + Character Anchor Sheet prompt (image)
Stage 1  — Act Storyboard × N  (N = 3 or 4, each 10s · 4 panels · 16:9 sheet)
Stage 2  — Video Prompt × N     (upload Character Sheet + Act Sheet each time)
Stage 3  — One Facebook Caption (full 30–40s story, no twist spoil)
Stage 4  — HTML Package
     ↓
User production: gen anchor → gen N act sheets → gen N clips → stitch → post
```

**Default: N = 4 acts (40s).** Use N = 3 (30s) when user asks for shorter long-form.

Always complete all stages in one pass unless the user asks for one stage only.

---

## Stage 0 — Character Lock (text + image)

### 0A — Character Bible (text block)

One block copied **verbatim** into every act storyboard and every video prompt. See template in `references/character-anchor-sheet.md`.

Rules:
- Max **3 named characters** per story (+ background silhouettes only)
- Lock: age, hair, outfit, distinguishing props
- If outfit changes mid-story, declare **per act** — never mid-act
- Prop lock (ring, recorder, scar): declare which acts it appears in
- Setting + lighting locked for all acts

### 0B — Character Anchor Sheet (separate image prompt)

**One 16:9 sheet — NOT mixed with drama storyboards.**

Four equal vertical 9:16 panels on plain gray background, neutral studio light:
- Panel 1–3: full-body front portraits of main characters
- Panel 4: key prop close-up OR fourth character portrait

No action, no story beats, no printed text labels.

**Upload this sheet with every act's I2V generation.** Never animate the anchor sheet itself.

---

## Stage 1 — Act Storyboard Sheets (× N)

Each act = **one 10-second beat** = **one 16:9 storyboard sheet** with 4 panels.

Timeline per act: **0–3s / 3–6s / 6–8s / 8–10s**

| Act | Typical beat (4-act structure) |
|-----|--------------------------------|
| 1 | Humiliation / conflict setup |
| 2 | Object clue / pressure / victim restraint |
| 3 | Recognition begins / whisper / entrance |
| 4 | Twist payoff — antagonist in frame reacting |

**Continuity rule:** Frame 1 of Act N+1 must describe continuation from Frame 4 of Act N (same positions, lighting, outfits).

Full template: `references/act-storyboard.md`

Printed notes format (short): `F1 0-3s | [action tag] | Name: "dialogue"`

---

## Stage 2 — Frames-to-Video Prompts (× N)

Each act video prompt:
- Opens: `Vertical 9:16, 24fps, 10 seconds, cinematic realism.`
- Declares **two uploads**: Character Anchor Sheet (face/outfit/prop lock) + Act N Storyboard (composition only)
- Timestamps in prompt = **primary timing** — do not rely on printed notes under panels
- **Hard cuts** between panels — never "seamless morph"
- Character lock line + sound arc + `No subtitles. No watermark.`

Full template: `references/frames-to-video.md`

**Production order per act:**
1. Upload Character Anchor Sheet + Act N Storyboard Sheet
2. Paste Act N video prompt → generate 10s clip
3. Repeat for all acts → stitch in editor (hard cut or 0.3s dissolve)

---

## Stage 3 — Facebook Caption (one per story)

One caption for the **full 30–40s arc**, not one per act.

- **1000–1200 characters**
- 3 paragraphs + blank line + CTA (`MORE` / `YES` / `NEXT`)
- Quote dialogue **verbatim from video prompts only**
- Stop before Act 4 full payoff — begin twist, don't complete it

Full rules: `references/caption-longform.md`

---

## Stage 4 — HTML Package

Deliver one `.html` file with JS data array and copy functions.

Per story card:
- Character Bible
- Character Anchor Sheet prompt
- Act 1–N storyboard prompts
- Act 1–N video prompts
- Full-story Facebook caption

Copy buttons: per-section + Copy All for each type. Toast on every copy.

Full spec: `references/html-package.md`

---

## Act planning — 4-act drama arc

When user gives no act breakdown, default split:

```
Act 1 (0–10s):   Dismissal / public humiliation — antagonist dominates
Act 2 (10–20s):  Clue panel — object, hands, ring, document reaction (face not text)
Act 3 (20–30s):  Third party reacts / recognition line lands
Act 4 (30–40s):  Full reversal — respect to protagonist, antagonist stunned in frame
```

Adjust act count if user specifies 30s (3 acts) or custom beats.

---

## Anti-patterns

| Don't | Do instead |
|-------|------------|
| Mix character portraits + drama panels on one sheet | Separate Character Anchor Sheet |
| Rely on printed notes for I2V timing | Timestamps + dialogue in video prompt |
| Write "seamless transition between panels" | "Clean cinematic cuts — do not morph" |
| Change outfit between panels in same act | Outfit changes only at act boundaries |
| 4 separate captions for 4 acts | One caption for full story |
| Camera pushes to readable document text | Blur paper — cut to face reaction |

---

## Output checklist

**Character layer**
- [ ] Character Bible block complete — copied into all act prompts
- [ ] Anchor sheet prompt is standalone — no drama action
- [ ] Panel 4 covers key prop or fourth character

**Each act storyboard**
- [ ] 16:9 sheet, 4 equal 9:16 panels, short F1–F4 notes
- [ ] Act 1 Frame 1 sets scene; later acts Frame 1 continues prior act Frame 4
- [ ] Twist only in Act 4; one dialogue line per panel
- [ ] No in-scene readable text

**Each act video**
- [ ] Two-reference instruction present
- [ ] Hard cuts specified; character lock line present
- [ ] Dialogue matches storyboard verbatim

**Caption**
- [ ] 1000–1200 chars; quotes match video prompts; twist not spoiled

**HTML**
- [ ] All copy functions + toast + navigation

---

## Batch guidance

| Request | Action |
|---------|--------|
| 1 story (default) | Full pipeline inline or HTML |
| 2–5 stories | HTML package, one file |
| 6+ stories | Confirm count first |
| concepts1 / concepts2 | Load concept bank, pick templates, plan 4-act arc per pick |

---

## Related skills

- **ommi-story** — single 10s clip (one storyboard + one video prompt)
- Concept banks in this folder mirror ommi-story naming: `concepts1.md`, `concepts2.md`

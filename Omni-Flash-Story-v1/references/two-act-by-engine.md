# Two-Act Structure by Story Engine (20s default)

Every item is **exactly 2 acts × 10s = 20s total**:
- **2** act storyboard sheets
- **2** Omni Flash video prompts
- Stitch with hard cut or 0.3s dissolve → one 20s clip

Do **not** default to humiliation → reveal unless `engine` is **E00** (concepts3).

---

## Concept sources (required focus)

| Bank | File | Engine tag |
|------|------|------------|
| concepts3 | `references/concepts3.md` | Always **E00** (Humiliation → Reveal) |
| concepts4 | `references/concepts4.md` | **E01–E22** (seed’s engine group) |

Read `references/story-engines.md` for every item’s engine card **before** planning beats.

**Mixed batch:** run from skill folder:
```bash
node scripts/pick-batch.js 10 --batch batch-omni-01 --prefix O --write
```

Phase 0 **must** print engine map (see `batch-mode.md`).

---

## Two-act spine (all engines)

| Act | Time | Role in video | Caption / full story |
|-----|------|---------------|----------------------|
| **1** | 0–10s | **Hook + Build** — engine scroll-stop + pressure | Caption para 1–2 |
| **2** | 10–20s | **Turn + tease** — recognition / pivot begins; **do not land full payoff in caption** | Caption para 3 stops early; **full story** delivers engine payoff |

Video Act 2 may show stronger visual turn than caption; caption still withholds complete twist.

---

## Act 1 panel guide (4 panels per sheet)

Map engine **Photo** + **Build** into F1–F4:

| Panel | Time | Content |
|-------|------|---------|
| F1 | 0–3s | Engine **Hook** — opening conflict, ritual, or image |
| F2 | 3–6s | Deepen **Build** — object clue, pressure, or emotional beat |
| F3 | 6–8s | Escalation or witness |
| F4 | 8–10s | End on **Withhold** — do not show payoff |

---

## Act 2 panel guide

Map engine **Turn** into F1–F4; F4 may show partial visual reversal but caption must not complete payoff.

| Panel | Time | Content |
|-------|------|---------|
| F1 | 0–3s | Continue Act 1 F4 — same positions/lighting/outfits |
| F2 | 3–6s | **Turn** begins — line or gesture from engine card |
| F3 | 6–8s | Antagonist cracks OR emotional pivot (if engine has antagonist) |
| F4 | 8–10s | Wide or close — **tease** payoff; strongest line can mirror storyboard (caption still withholds full reveal) |

---

## Per-engine Act 1 / Act 2 labels (quick map)

Use the engine card’s Photo / Turn / Payoff fields. Examples:

| Engine | Act 1 label | Act 2 label |
|--------|-------------|-------------|
| E00 | Humiliation + clue | Recognition begins |
| E01 | Kind act | Return teased |
| E02 | Odd ritual | Reason surfaces |
| E03 | Judgment | Hidden burden revealed |
| E04 | Devotion shown | Wait / payoff tease |
| E06 | Tender moment | Bittersweet turn |
| E08 | Separation / clue | Reunion beat |
| E12 | Object from past | Message lands |
| E21 | Outsider alone | Belonging tease |

For engines **without antagonist** (E02, E03, E10, …): Act 2 F4 = emotional payoff tease, not “villain stunned.”

---

## Title format

- E00: `[setup] → [payoff hint]`
- E01–E22: use engine card **Title** pattern (not forced humiliation arrow)

---

## Anti-drift rules

1. Tag `engine` on every JSON item in Phase 0.
2. Opening style from engine card — not always Dialogue Slap.
3. Do not write Act 3 or Act 4 fields — **actCount is always 2**.
4. concepts4 seeds must keep their native engine — never force E00.

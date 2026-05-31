# Act Storyboard Sheet Reference

One sheet per act. Each act = 10 seconds = 4 panels.

---

## Specs

| Field | Value |
|-------|-------|
| Sheet | 16:9 widescreen |
| Panels | 4 equal vertical 9:16, side-by-side, full height |
| Timeline | 0–3s / 3–6s / 6–8s / 8–10s |
| Notes | One short line under each panel — `F1 0-3s | action | "dialogue"` |
| Style | Cinematic realism, 35mm lens look |
| Setting | US location + lighting — same across all 4 panels in this act |

---

## Prompt template

```
A professional 16:9 widescreen storyboard sheet containing a horizontal sequence of four
equal-width vertical 9:16 film frames side-by-side, full height of the sheet. Below each
vertical frame, one short line of white printed text on a dark background. Cinematic realism,
35mm lens look, high detail. Same [lighting] across all four panels. Match [character names]
designs from Character Anchor Sheet. [Continuity line if Act 2+]. Act [N] — [beat label]:

- Frame 1 (leftmost panel): [visual description]. Printed note below:
  'F1 0-3s | [action tag] | Character: "dialogue"'

- Frame 2: [visual]. Printed note below:
  'F2 3-6s | [action tag] | Character: "dialogue"'

- Frame 3: [visual]. Printed note below:
  'F3 6-8s | [action tag] | Character: "dialogue"'

- Frame 4 (rightmost panel): [visual — antagonist in frame if payoff act]. Printed note below:
  'F4 8-10s | [action tag] | Character: "dialogue"'
```

---

## Continuity between acts

**Act 1 Frame 1:** Establish scene, characters, lighting.

**Act 2+ Frame 1:** Must open with continuation language:

```
Continue from Act [N-1] Frame 4 — [who is where, same outfits, same lighting]. [New action begins]
```

---

## Panel roles by act position

### Act 1 — Setup
- F1: Antagonist dismisses / blocks protagonist
- F2: Protagonist restrained reaction
- F3: Witnesses or escalation
- F4: Antagonist wins the moment — exit block or final insult

### Act 2 — Clue
- F1: Protagonist alone or pressured — emotional beat
- F2: **Dedicated object panel** — ring, hands, recorder (extreme close-up)
- F3: Reaction on face — not on text
- F4: Background figure notices OR clue intensifies

### Act 3 — Recognition
- F1: Third party enters or stops
- F2: Approaches / leans in
- F3: **Recognition dialogue** — the "almost full reveal" line
- F4: Antagonist begins to crack

### Act 4 — Payoff
- F1: Third party crosses to protagonist
- F2: Physical respect gesture — hands, bow, step aside
- F3: Protagonist stunned / emotional
- F4: **Wide shot** — antagonist pale/stunned in background; full twist line

---

## Rules

- One English dialogue line per panel
- Action tags in brackets: `[Victoria points at Avery]`
- No readable text on in-scene surfaces — blur documents, cut to faces
- Printed notes stay short — AI garbles long text under panels
- Title per act (optional in HTML): `Act [N] | [beat phrase]`

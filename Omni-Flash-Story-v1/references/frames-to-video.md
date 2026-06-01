# Frames-to-Video Prompt Reference (per act)

Upload **Character Anchor Sheet + Act Storyboard Sheet** before each generation.

---

## Template

```
Vertical 9:16, 24fps, 10 seconds, cinematic realism.

Upload two references: (1) Character Reference Sheet — match [character outfit/face/prop anchors] exactly.
(2) Act [N] Storyboard Sheet — use for composition and blocking only. Follow timestamps and
dialogue below as primary timing — do not rely on printed annotations under panels.

Character lock (all segments): [one-line per character + setting/lighting]

0–3s (Panel 1): [shot type + motion]. Character: "dialogue." [acting note]

3–6s (Panel 2): Cut to Panel 2. [camera move]. Character: "dialogue." [acting note]

6–8s (Panel 3): Hard cut. [motion]. Character: "dialogue." [acting note]

8–10s (Panel 4): Match Panel 4. [motion]. Character: "dialogue." [antagonist reaction if Act 4]

Use clean cinematic cuts between panels. Match character faces, outfits, and [key prop] exactly
at each cut. Do not morph or blend panels together. No readable text on in-scene surfaces.

Sound: [ambient] → [tension beat] → [reaction beat] → [resolve beat]. No subtitles. No watermark.
```

---

## Rules

| Rule | Detail |
|------|--------|
| Primary timing | Timestamps + dialogue in this prompt — not storyboard printed notes |
| Cuts | Always "Cut to Panel 2" / "Hard cut" — never seamless morph |
| Character lock | Required every act — same line structure, same outfits |
| Documents | Rack focus to face; paper blurred |
| Act 4 | Antagonist must be in frame for final panel |
| Sound | 3–4 beats matching act emotional arc |

---

## Sound vocabulary

```
Act 1: boutique murmur → heel click → murmur swell → door creak
Act 2: trembling breath → sparkle/glint accent → silence → sharp inhale
Act 3: footstep rush → gasp → dead silence → fabric rustle
Act 4: warm piano swell → fabric touch → emotional pause → sharp exhale
```

Adapt per setting (office HVAC, crowd murmur, service bay echo, etc.).

---

## Stitching note (for user, not in prompt)

After generating N clips:
- Hard cut or 0.3s dissolve between acts
- Normalize audio loudness across acts
- Optional: last frame of Act N as extra ref for Act N+1

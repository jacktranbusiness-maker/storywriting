# Frames-to-Video Prompt Reference (per act)

Read `google-policy-omni-flash.md` first. Upload **Character Anchor Sheet + Act Storyboard Sheet** before each generation.

Each story = **2 acts** only (20s total).

---

## Template

```
Vertical 9:16, 24fps, 10 seconds, cinematic realism, warm natural lighting.

Upload two references: (1) Character Reference Sheet — match [character outfit/face/prop anchors] exactly.
(2) Act [N] Storyboard Sheet — use for composition and blocking only. Follow timestamps and
dialogue below as primary timing — do not rely on printed annotations under panels.

Character lock (all segments): [one-line per character + setting/lighting]

0–3s (Panel 1): [calm shot type + gentle motion]. Character: "dialogue." [soft acting note — expression, not aggression]

3–6s (Panel 2): Cut to Panel 2. [camera move]. Character: "dialogue." [acting note]

6–8s (Panel 3): Hard cut. [motion]. Character: "dialogue." [acting note]

8–10s (Panel 4): Match Panel 4. [motion]. Character: "dialogue."
[If Act 2: optional — supporting character respectful gesture; misjudging character still in frame, surprised, not harmed]

Use clean cinematic cuts between panels. Match character faces, outfits, and [key prop] exactly
at each cut. Do not morph or blend panels together. No readable text on in-scene surfaces.

Sound: [soft ambient] → [gentle tension] → [quiet reaction] → [warm resolve]. No subtitles. No watermark.

Fictional characters only. Family-friendly emotional drama tone: no graphic violence, no gore,
no weapons in use, no sexual content, no hate speech, no real public figures, no readable text
on documents or screens. Respectful blocking and dialogue — tension through expression and words only.
```

---

## Rules

| Rule | Detail |
|------|--------|
| Policy | Every prompt ends with the **Required line** from `google-policy-omni-flash.md` |
| Tone | Warm cinematic drama — PG-13 emotional conflict |
| Primary timing | Timestamps + dialogue in this prompt — not storyboard printed notes |
| Cuts | "Cut to Panel 2" / "Hard cut" — never seamless morph |
| Character lock | Same line structure and outfits every act |
| Documents | Rack focus to face; paper blurred |
| Act 2 finale | Turn / tease payoff; misjudging character may look stunned — not injured or mocked |
| Sound | Soft ambience only — no screams, impacts, horror stingers |

---

## Sound vocabulary (gentle)

```
Act 1: soft room tone → quiet footsteps → low murmur → door latch
Act 2: held breath → soft glint accent → brief silence → warm piano or fabric rustle
```

Adapt per setting (boutique HVAC, office hush, hallway echo) — keep levels conversational.

---

## Stitching note (for user, not in prompt)

After generating **2** clips:
- Hard cut or 0.3s dissolve between acts
- Normalize audio loudness
- Optional: last frame of Act 1 as extra ref for Act 2 Frame 1

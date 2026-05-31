# HTML Package Reference — Long Form

One `.html` file per batch. Store content as JS `data` array.

---

## Required copy functions

| Button | Copies |
|--------|--------|
| Copy Character Sheet | Anchor sheet prompt |
| Copy Character Bible | Text lock block |
| Copy Act N Storyboard | One act storyboard prompt |
| Copy Act N Video | One act video prompt |
| Copy Caption | Full-story caption |
| Copy All Character Sheets | All anchor prompts (if batch) |
| Copy All Storyboards | All acts all stories, `\n\n---\n\n` |
| Copy All Video Prompts | All video prompts, `\n\n` between |
| Copy All Captions | All captions, `\n\n---\n\n` |

Toast notification on every copy action. Navigation jump links per card.

---

## Data shape (single story)

```javascript
{
  id: "001",
  title: "Bridal Shop Humiliation → Marcus's Daughter Revealed",
  characterBible: `CHARACTER LOCK — DO NOT CHANGE...`,
  characterAnchorPrompt: `16:9 character reference sheet...`,
  acts: [
    { num: 1, label: "Humiliation", storyboardPrompt: `...`, videoPrompt: `...` },
    { num: 2, label: "Ring Revealed", storyboardPrompt: `...`, videoPrompt: `...` },
    { num: 3, label: "Recognition", storyboardPrompt: `...`, videoPrompt: `...` },
    { num: 4, label: "Power Reversal", storyboardPrompt: `...`, videoPrompt: `...` }
  ],
  caption: `...`
}
```

---

## Card layout

1. Header — id, title, copy buttons
2. Character Bible panel
3. Character Anchor Sheet panel
4. Acts 1–N — each with Storyboard + Video sub-panels
5. Facebook Caption panel

---

## Design tokens

```css
:root {
  --bg: #f4f6fb; --card: #fff; --ink: #161c2d; --muted: #5e6e8a;
  --accent: #3b6df0; --green: #0d9373; --soft: #edf2ff;
  --anchor: #f5f0ff; --storyboard: #fff8f0; --video: #f0fff8; --caption: #f0f7ff;
  --line: #e3e9f4;
}
```

Fonts: `Outfit` UI · `JetBrains Mono` prompts · `Lora` captions

Badge: `Long Form · 30–40s · 4 Acts`

# omni-flash-story-v1

Cursor Agent skill for **20s Facebook drama videos** (Gemini Omni Flash):  
**2 act storyboards + 2 video prompts** per story, plus **caption** and **full story** article.

## Install (Cursor)

1. Clone this repo.
2. Add the folder to your Cursor skills path, or copy `SKILL.md` + `references/` + `scripts/` into your skills directory.
3. Invoke with: `omni-flash-story-v1`, `concepts3`, `concepts4`, `20s omni flash`, etc.

## Pipeline

| Phase | Output |
|-------|--------|
| 0 | Plan + engine map + JSON |
| 1 | Character bible, anchor sheet, **2** act storyboards |
| 2 | **2** Omni Flash video prompts (policy-safe, friendly tone) |
| 3 | Facebook caption |
| 4 | Full story (6000–8000 chars) |
| 5 | TXT export |

## Concept banks

- `references/concepts3.md` — tagged **E00**
- `references/concepts4.md` — engines **E01–E22**
- `references/story-engines.md` — narrative variety (not all humiliation → reveal)

## Scripts

```bash
# Pick mixed batch (concepts3 + concepts4)
node scripts/pick-batch.js 10 --batch batch-omni-01 --prefix O --write

# Export TXT package
node scripts/json-to-txt.js output/batch-omni-01/batch-omni-01.json
```

## Google policy

All storyboard and video prompts must follow `references/google-policy-omni-flash.md`  
(fictional characters, PG-13 emotional drama, no violence/gore/weapons/hate).

## License

Use per your project terms.

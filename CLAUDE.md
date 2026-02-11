# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Blood Bowl Card Creator — a client-side web app for creating custom Blood Bowl tabletop game cards. Three independent card types: Player Cards (`index.html`), Special Cards (`special.html`), and Playbook Cards (`playbook.html`). No backend; all rendering happens via HTML5 Canvas with browser localStorage for persistence.

## Tech Stack

- Vanilla JavaScript (ES6, no modules, all global scope), jQuery 3.x, Bootstrap 4.x
- HTML5 Canvas (fixed 822×1122px) for print-ready card rendering
- Jekyll for static site templating (`_includes/` partials)
- Fuse.js for playbook search; pre-loaded data from `assets/plays.json`

## Development

```bash
# Run locally (Jekyll required for includes to work)
jekyll serve    # http://localhost:4000

# Alternative (includes won't process)
python -m http.server 8000
```

No build step, no transpilation, no package manager, no tests, no linter.

## Architecture

Each card type follows the same pattern with its own HTML page and JS file:

| Card Type | HTML | JS | LOC |
|-----------|------|-----|-----|
| Player | `index.html` | `assets/js/card.js` | ~950 |
| Special | `special.html` | `assets/js/special.js` | ~790 |
| Playbook | `playbook.html` | `assets/js/plays.js` | ~990 |

**Core data flow (all three card types):**
```
Form Input → readControls() → data object → render() → Canvas
                                    ↕
                              localStorage (auto-save)
                                    ↕
                              JSON export/import (with base64 images)
```

**Key functions in each JS file:**
- `readControls()` — extracts form state into a plain object
- `writeControls(data)` — populates form from a data object
- `render(data)` — draws the full card on canvas
- `drawCardFrame(data)` — orchestrates layered canvas drawing (background → image → frame → text → stats)
- `defaultFighterData()` — returns initial empty card state
- `onAnyChange()` — triggered on every form input; calls readControls + render + localStorage save

**Canvas rendering layers** (Player Cards): blank background → uploaded player image → card frame → text elements → stat number sprites → optional border overlay.

## Adding a New Form Field

1. Add HTML input in `_includes/card/section-*.html` (or `special/` or `plays/`)
2. Read the value in `readControls()`
3. Write the value in `writeControls()`
4. Set a default in `defaultFighterData()`
5. Render it in `drawCardFrame()` or a helper drawing function

## Player Card Specifics

- **Two player types:** Roster (standard frame, skill categories) vs Star (star frame, playsFor/specialRules fields). Toggled via `playerType` select.
- **Six skill categories:** A (Agility), D (Devious), G (General), M (Mutation), P (Passing), S (Strength) — each has Primary/Secondary checkboxes.
- **Skill category rendering:** The comma-separated skill strings are built inside `drawCardFrame()`, not `drawDevelopment()`. `drawCardFrame()` constructs the strings from checkbox states and passes them to `drawDevelopment()`.
- **Stat number sprites:** Located at `assets/img/card/numbers/sf[0-9].png`, `sf+.png`, `sf-.png`.
- **Multiple cards** stored in `fighterDataMap` keyed by card name.

## Key Asset Locations

- Card backgrounds/frames: `assets/img/card/`, `assets/img/special/`, `assets/img/plays/`
- Team logos (570+): `assets/img/logos/`
- Custom fonts (defined via @font-face in `assets/css/main.css`): brothers-regular, franklin-gothic-book, built-titling, bank-gothic, frutiger-light, indie-flower
- Vendor libs: `assets/vendors/`

## Additional Context

The `memory-bank/` directory contains detailed AI context documents (project brief, tech context, system patterns, active context, progress) that provide deeper implementation details beyond this summary.

# Blood Bowl Card Creator

A client-side web app for creating custom, print-ready Blood Bowl tabletop game cards. No backend required — everything runs in the browser using HTML5 Canvas.

## Card Types

- **Player Cards** (`index.html`) — Roster and Star Player cards with stats (MA, ST, AG, PA, AV), skill categories, custom images, and team logos
- **Special Cards** (`special.html`) — Custom rules and ability cards
- **Playbook Cards** (`playbook.html`) — Team strategy and play diagrams with searchable pre-loaded plays

## Running Locally

The project uses [Jekyll](https://jekyllrb.com/) for template includes. To run with full functionality:

```bash
jekyll serve
```

Then open http://localhost:4000.

## Features

- Upload custom player images with positioning/scaling controls
- 570+ team logos included
- PNG export for printing (822×1122px cards)
- Save/load card designs as JSON
- Auto-save to browser localStorage
- Multiple cards per session

## Tech Stack

Vanilla JavaScript, jQuery, Bootstrap 4, HTML5 Canvas, Jekyll
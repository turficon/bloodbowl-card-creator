# Tech Context

## Technology Stack

### Core Technologies
- **HTML5**: Semantic markup, Canvas API
- **CSS3**: Custom fonts, Bootstrap customization
- **JavaScript (ES6)**: Vanilla JS with jQuery helpers
- **Jekyll**: Static site templating

### Dependencies

#### Frontend Libraries
1. **jQuery 3.x**
   - Location: `assets/vendors/jquery.js`
   - Usage: DOM manipulation, event handling
   - Could be replaced with vanilla JS in future

2. **Bootstrap 4.x**
   - CSS: `assets/vendors/bootstrap.min.css`
   - JS: `assets/vendors/bootstrap.min.js`
   - Theme: Bootswatch (Darkly & Flatly variants available)
   - Usage: Layout grid, form controls, accordions

3. **Popper.js**
   - Location: `assets/vendors/popper.min.js`
   - Usage: Bootstrap tooltips/popovers dependency

### Custom Fonts

#### Blood Bowl-Themed Fonts
Located in `assets/fonts/`:

1. **Brothers Regular** (brothers-regular.*)
   - Usage: Player names, team names
   - Style: Bold, stylized
   - Formats: .eot, .otf, .ttf, .woff, .woff2

2. **Franklin Gothic Book** (franklin-gothic-book.*)
   - Usage: Body text, skill descriptions
   - Style: Clean, readable
   - Formats: .eot, .ttf, .woff, .woff2

3. **Built Titling SB** (built-titling-sb.*)
   - Usage: Headers, special text
   - Style: Industrial, geometric
   - Formats: .eot, .ttf, .woff, .woff2

4. **Bank Gothic Medium BT** (bank-gothic-medium-bt.*)
   - Usage: Alternative headers
   - Formats: .eot, .ttf, .woff, .woff2

5. **Frutiger LT Std Light** (FrutigerLTStd-Light.*)
   - Usage: Alternative body text
   - Formats: .eot, .ttf, .woff, .woff2

6. **Indie Flower** (IndieFlower.*)
   - Usage: Handwritten notes/annotations
   - Formats: .eot, .svg, .ttf, .woff, .woff2

### Development Setup

#### Requirements
- **Jekyll**: Static site generator
  - Install: `gem install jekyll bundler`
  - Serve: `jekyll serve`
  - Build: `jekyll build`

#### No Build Process
- No webpack, gulp, grunt, or npm scripts
- Jekyll handles templating only
- JavaScript is unminified, unobfuscated
- CSS is hand-written (no Sass/LESS)

#### Local Development
```bash
# Option 1: Jekyll (if installed)
jekyll serve
# Access: http://localhost:4000

# Option 2: Any static server
python -m http.server 8000
# Note: Jekyll includes won't work without processing

# Option 3: GitHub Pages
# Push to main branch, auto-deploys
```

### Browser APIs Used

#### HTML5 Canvas API
```javascript
// Core methods used:
ctx.drawImage()        // Draw images/backgrounds
ctx.fillText()         // Render text
ctx.measureText()      // Calculate text width
ctx.rotate()           // Rotate text
ctx.scale()            // Scale drawing
ctx.save()/restore()   // Save/restore state
canvas.toDataURL()     // Export PNG
```

#### File API
```javascript
// Image upload:
URL.createObjectURL(file)   // Create blob URL
URL.revokeObjectURL(url)    // Clean up

// JSON import:
FileReader.readAsText()     // Read file content
```

#### Storage API
```javascript
// LocalStorage:
localStorage.setItem(key, value)
localStorage.getItem(key)
// Note: Values must be strings (JSON.stringify for objects)
```

### Technical Constraints

#### Browser Requirements
- **Minimum**: Chrome 60+, Firefox 55+, Safari 11+
- **Required Features**:
  - Canvas API
  - ES6 (arrow functions, template literals, const/let)
  - LocalStorage
  - File API
  - Custom fonts (@font-face)

#### Performance Targets
- Initial load: < 2 seconds
- Canvas redraw: < 100ms (imperceptible)
- PNG export: < 500ms
- JSON save/load: < 100ms

#### Size Constraints
- Canvas dimensions: 822x1122px (fixed)
- Max image size: No enforced limit (browser memory dependent)
- LocalStorage limit: ~5-10MB (browser dependent)
- JSON export: Typically < 1MB per card

### Asset Management

#### Image Assets Structure
```
assets/img/
├── card/
│   ├── blank.png               # Background texture
│   ├── bloodbowl_frame.png     # Standard player frame
│   ├── bloodbowl_border.png    # Card border overlay
│   ├── bloodbowl_specialplayer_frame.png  # Star player frame
│   └── numbers/                # Stat number graphics
│       ├── sf-.png  sf0.png  sf1.png ... sf9.png  sf+.png
├── special/                     # Special card graphics
├── plays/                       # Playbook graphics
└── logos/                       # Team logos
    ├── Amazon_01.png ... Amazon_16.png
    ├── BlackOrc_01.png ... BlackOrc_25.png
    ├── Bretonnia_01.png ... Bretonnia_19.png
    ├── ChaosChosen_01.png ... ChaosChosen_20.png
    └── (many more team logos)
```

#### Font Loading Strategy
Fonts are preloaded via CSS:
```css
@font-face {
  font-family: 'brothers-regular';
  src: url('../fonts/brothers-regular.woff2') format('woff2'),
       url('../fonts/brothers-regular.woff') format('woff');
}
```

Hidden div forces font load on page load:
```html
<div class="font-hack3 sr-only" 
     style="font-family:'brothers-regular';visibility:hidden;">
  Nothing to see here, move along…
</div>
```

### Deployment

#### GitHub Pages
- **Repository**: https://github.com/graylikeme/bloodbowl-card-creator.git
- **Branch**: main (or gh-pages)
- **Build**: Automatic via GitHub Actions
- **URL**: Typically `username.github.io/bloodbowl-card-creator`

#### Deployment Process
1. Push changes to main branch
2. GitHub Actions runs Jekyll build
3. Outputs to `_site/` directory
4. Serves static files

#### No CI/CD Beyond GitHub Pages
- No testing pipeline
- No linting enforcement
- No automated deployment scripts
- Manual QA only

### Development Tools

#### Recommended Tools
- **Code Editor**: VS Code, Sublime Text, any text editor
- **Browser DevTools**: Chrome DevTools for Canvas inspection
- **Image Editor**: For creating/modifying card graphics
- **Git**: Version control

#### Useful Browser DevTools Features
- **Console**: Debug JavaScript errors
- **Canvas Inspector**: View Canvas layers (Chrome/Firefox)
- **Network Tab**: Check asset loading
- **Application Tab**: Inspect localStorage

### Common Development Tasks

#### Adding New Assets
```bash
# Add team logo:
cp new_logo.png assets/img/logos/TeamName_01.png

# Add card background:
cp new_bg.png assets/img/card/new_background.png
```

#### Modifying Styles
```bash
# Edit main stylesheet:
open assets/css/main.css
```

#### Testing Changes Locally
```bash
# Start Jekyll server:
jekyll serve --livereload

# Or use simple HTTP server (includes won't work):
python -m http.server
```

### Known Technical Debt

#### Areas for Improvement
1. **jQuery Dependency**: Could migrate to vanilla JS
2. **No Module System**: All JS is global scope
3. **No Type Safety**: Could add TypeScript or JSDoc
4. **No Testing**: Could add Jest or similar
5. **Manual Font Loading**: Could use Font Face Observer
6. **No Image Optimization**: Large assets not minified
7. **No Code Splitting**: All JS loads at once

#### Why These Haven't Been Addressed
- **Simplicity Priority**: Easy to understand > modern tooling
- **Low Complexity**: Project size doesn't justify build tools
- **Stable Code**: Few bugs despite lack of tests
- **Good Performance**: Current approach is fast enough
- **Easy Contributions**: Simple tech stack = more contributors

### Security Considerations

#### Client-Side Only
- **Pros**: No server vulnerabilities, no data breach risk
- **Cons**: No authentication, no user accounts

#### Data Privacy
- All data stays in browser (localStorage)
- No analytics or tracking
- No external API calls
- Images never uploaded to servers

#### XSS Risks
- Minimal: No innerHTML with user content
- Text drawn to Canvas (not inserted into DOM)
- JSON parsing uses standard JSON.parse (safe)

### Browser Compatibility Notes

#### Fully Supported
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge (Chromium)

#### Partial Support
- IE 11: May work but not tested/supported
- Mobile browsers: Works but UX not optimized

#### Known Issues
- Safari: May have font rendering differences
- Firefox: Canvas export may differ slightly
- Mobile: Touch interactions not optimized

# Active Context

## Current Focus: Memory Bank Updated (February 2026) ✅

### Latest Update (February 10, 2026)
Completed comprehensive code review and updated memory bank documentation to reflect actual implementation details.

## Recent Changes

### Memory Bank Corrections (February 2026)
**Issue**: Several minor inaccuracies in documentation of skill category rendering and data handling patterns.

**Corrections Made**:
- Fixed description of skill category text rendering flow
- Corrected code pattern examples
- Added documentation for star player-specific fields
- Noted minor HTML typo in section-characteristics.html

## Skill Category Implementation (2025 Rules)

### How It Works
The 6-category skill system (A, D, G, M, P, S) uses this rendering flow:

1. **User Input**: Checkboxes in `section-characteristics.html`
2. **Data Reading**: `readControls()` reads checkbox states into boolean properties
3. **String Building**: `drawCardFrame()` constructs comma-separated strings
4. **Rendering**: `drawDevelopment(primary, secondary)` renders the pre-built strings

**Important**: The comma-separated text (e.g., "Agility, Devious, General") is built in `drawCardFrame()`, NOT in `drawDevelopment()`. The `drawDevelopment()` function only renders the labels and the passed-in strings.

### Skill Categories (2025 Rules)
- **A** — Agility
- **D** — Devious ✨ (Added February 2026)
- **G** — General
- **M** — Mutation
- **P** — Passing
- **S** — Strength

### Files Modified for Devious Support

#### 1. `_includes/card/section-characteristics.html`
- Added "D" (Devious) checkbox to Primary Skills section
- Added "D" (Devious) checkbox to Secondary Skills section
- Maintained alphabetical order: A, D, G, M, P, S
- **Note**: Contains minor HTML typo on line with `p_general` div (extra quote mark)

#### 2. `assets/js/card.js`
Four functions updated:

**`readControls()`**
```javascript
data.p_devious = document.getElementById("p_devious").checked;
data.s_devious = document.getElementById("s_devious").checked;
```

**`writeControls()`**
```javascript
document.getElementById('p_devious').checked = fighterData.p_devious;
document.getElementById('s_devious').checked = fighterData.s_devious;
```

**`drawCardFrame()`**
Builds comma-separated strings for both primary and secondary skills, properly ordered alphabetically (Agility → Devious → General → Mutations → Passing → Strength), then passes them to `drawDevelopment()`.

**`defaultFighterData()`**
```javascript
fighterData.p_devious = false;
fighterData.s_devious = false;
```

## Star Player Fields

The application has two player types:
- **Roster Player**: Standard team player
- **Star Player**: Special character with additional fields

### Star Player-Specific Fields
- `playsFor`: Team restrictions text (rendered below skills at y=840)
- `specialRules`: Additional rules text (rendered at y=940)

These fields are:
- Always present in `readControls()` and `writeControls()`
- Only **rendered** when `playerType === "star"`
- Hidden in UI for roster players

## Backward Compatibility
Existing saved cards (JSON exports) work correctly even without the `p_devious` and `s_devious` properties. The system treats missing properties as `false` (unchecked).

## Next Steps
None required for current functionality - all features complete and documented.

## Important Patterns & Preferences

### Code Organization
- HTML form controls use consistent naming: `p_{category}` for primary, `s_{category}` for secondary
- JavaScript uses **mixed DOM access patterns**:
  - `document.getElementById()` for checkboxes and select elements
  - jQuery `$("#id")[0].value` for text inputs
  - Both patterns are acceptable and in active use
- All changes maintain alphabetical ordering of skill categories
- Skill category string construction happens in `drawCardFrame()`, rendering in `drawDevelopment()`

### Testing Considerations
- This is a Jekyll site that needs to be built/served to test properly
- Cannot test directly by opening HTML files (Jekyll includes won't process)
- Testing requires either:
  - `jekyll serve` locally
  - Deploy to GitHub Pages
  - Use a local server that processes Jekyll templates

### Data Persistence
- Uses browser `localStorage` for auto-save
- JSON export includes all properties (including new devious flags and star player fields)
- LocalStorage automatically handles missing properties in older saved data

## Project Insights

### Architecture Philosophy
The codebase follows a **simple, direct approach**:
- No frameworks beyond jQuery and Bootstrap
- Vanilla JavaScript for all logic
- HTML5 Canvas for rendering
- No build process beyond Jekyll templating

### Why This Approach Works
- **Maintainability**: Easy to understand and modify
- **Performance**: Fast, no framework overhead
- **Reliability**: Fewer dependencies = fewer breaking changes
- **Accessibility**: Anyone with basic HTML/JS/Canvas knowledge can contribute

### Key Learnings
1. **Consistent Patterns**: When adding new features (like skill categories), follow the existing pattern exactly
2. **Alphabetical Order**: Skill categories are always displayed alphabetically in the UI
3. **String Building vs Rendering**: Text construction (comma-separated lists) happens in `drawCardFrame()`, actual canvas rendering in specialized functions like `drawDevelopment()`
4. **State Management**: Simple object properties work well for this use case - no need for complex state management
5. **Conditional Rendering**: Player type determines which sections render (roster vs star player layouts)
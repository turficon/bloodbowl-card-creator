# System Patterns

## Architecture Overview

### High-Level Structure
```
bloodbowl-card-creator/
├── index.html              # Main entry (Players tab)
├── special.html            # Special cards interface
├── playbook.html          # Playbook cards interface
├── instructions.html      # Usage instructions
├── _includes/             # Jekyll template components
│   ├── card/             # Player card UI sections
│   ├── special/          # Special card UI sections
│   ├── plays/            # Playbook UI sections
│   └── tabs/             # Tab content templates
└── assets/
    ├── js/               # JavaScript logic
    ├── css/              # Stylesheets
    ├── img/              # Images & card backgrounds
    └── fonts/            # Custom fonts
```

### Technology Stack
- **Frontend**: Pure HTML, JavaScript (ES6), jQuery
- **UI Framework**: Bootstrap 4
- **Rendering**: HTML5 Canvas API
- **Templating**: Jekyll (static site generator)
- **Storage**: Browser localStorage
- **Export**: Canvas toDataURL() for PNG

## Key Design Patterns

### 1. Data Flow Pattern
```
User Input → readControls() → Data Object → render() → Canvas
                                    ↓
                              localStorage
                                    ↓
                              writeControls()
```

**How It Works**:
1. User types in form fields or checks boxes
2. `onAnyChange()` triggers on every input change
3. `readControls()` reads all form values into a data object
4. `render()` draws the data object to canvas
5. `saveLatestFighterData()` stores to localStorage
6. On page load, `loadLatestFighterData()` → `writeControls()` restores state

### 2. Rendering Pipeline

**Canvas Layering**:
```
1. Background texture (blank.png)
2. Player image (if uploaded)
3. Card frame (bloodbowl_frame.png or star_frame)
4. Text elements (name, team, stats, skills)
5. Numeric stat displays (MA, ST, AG, PA, AV)
6. Border overlay (optional, bloodbowl_border.png)
```

**Text Rendering Strategy**:
- Dynamic font sizing based on content length
- Word wrapping with `splitWordWrap()` function
- Rotated text for player/team names (-6° angle)
- Shadow effects (black offset + white text)

### 3. State Management

**Three Storage Mechanisms**:

1. **Browser localStorage** (auto-save)
   - Key: `latestCardName`
   - Value: Name of current card
   - Map: `fighterDataMap` (all saved designs)

2. **JSON Export** (manual save)
   - User clicks "Save as JSON"
   - Data object serialized with `JSON.stringify()`
   - Includes base64-encoded images
   - Downloads via created anchor element

3. **JSON Import** (manual load)
   - File read with FileReader API
   - Parsed with `JSON.parse()`
   - Base64 images converted back to blob URLs
   - `writeControls()` populates form

### 4. Image Handling

**Upload Flow**:
```
User selects file → URL.createObjectURL() → Display in form
                          ↓
                    Draw on canvas with transforms
                          ↓
                 Export: Convert to base64 for JSON
                          ↓
                 Import: Convert back to blob URL
```

**Transform Properties**:
- `offsetX`, `offsetY`: Position adjustment
- `scalePercent`: Size scaling (default 100%)
- Applied during canvas drawing in `render()`

## Component Responsibilities

### Main JavaScript Files

#### `assets/js/card.js` (Player Cards)
**Core Functions**:
- `readControls()`: Form → Data object
- `writeControls()`: Data object → Form
- `render()`: Data object → Canvas
- `drawCardFrame()`: Orchestrates all drawing AND builds skill category strings
- `drawDevelopment()`: Renders pre-built skill category strings to canvas
- `drawNumber()`: Renders stat numbers with special images
- `defaultFighterData()`: Creates new blank card

**Important**: `drawCardFrame()` does two jobs:
1. Orchestrates the entire card rendering
2. Constructs comma-separated skill category strings from checkbox states
3. Passes those strings to `drawDevelopment()` for rendering

#### `assets/js/special.js` (Special Cards)
- Similar structure to card.js
- Handles timing/duration/effect sections
- Different layout logic for special rules

#### `assets/js/plays.js` (Playbook Cards)
- Playbook-specific rendering
- Objectives and actions layout
- Different canvas dimensions

### HTML Structure Pattern

All pages follow this pattern:
```html
<div class="container-fluid">
  <nav>...</nav>              <!-- Tab navigation -->
  <div class="row">
    <div class="col-lg-4">     <!-- Left: Canvas preview -->
      <canvas id="canvas" />
    </div>
    <div class="col-lg-5">     <!-- Right: Form controls -->
      <div class="accordion">
        {% include sections %}
      </div>
    </div>
  </div>
</div>
```

## Critical Implementation Paths

### Adding a New Form Field

1. **HTML** (`_includes/card/section-characteristics.html`)
   ```html
   <input id="newField" name="newField" oninput="onAnyChange()">
   ```

2. **JavaScript** (`readControls()`)
   ```javascript
   data.newField = document.getElementById("newField").value;
   ```

3. **JavaScript** (`writeControls()`)
   - Mixed pattern in use (both styles are valid):
   ```javascript
   // jQuery style (used for text inputs)
   $("#newField")[0].value = fighterData.newField;
   
   // or vanilla JS style (used for checkboxes/selects)
   document.getElementById("newField").value = fighterData.newField;
   ```

4. **JavaScript** (`defaultFighterData()`)
   ```javascript
   fighterData.newField = "default value";
   ```

5. **JavaScript** (`drawCardFrame()` or similar)
   ```javascript
   drawNewField(fighterData.newField);
   ```

### Adding a New Skill Category

Follow the pattern established for "Devious":

1. **Add checkboxes to HTML** (both Primary and Secondary)
   ```html
   <!-- In section-characteristics.html -->
   <div class="col-sm-1">
       <label for="p_newcategory">X</label>
       <input type="checkbox" id="p_newcategory" name="p_newcategory" oninput="onAnyChange()">
   </div>
   ```

2. **Update `readControls()`** to read checkbox state
   ```javascript
   data.p_newcategory = document.getElementById("p_newcategory").checked;
   data.s_newcategory = document.getElementById("s_newcategory").checked;
   ```

3. **Update `writeControls()`** to set checkbox state
   ```javascript
   document.getElementById('p_newcategory').checked = fighterData.p_newcategory;
   document.getElementById('s_newcategory').checked = fighterData.s_newcategory;
   ```

4. **Update `drawCardFrame()`** to build the category string
   - Add conditional logic to append "New Category" to the comma-separated string
   - Maintain alphabetical order
   - Pass the built strings to `drawDevelopment()`

5. **Update `defaultFighterData()`** to initialize as false
   ```javascript
   fighterData.p_newcategory = false;
   fighterData.s_newcategory = false;
   ```

**Critical**: The text string is built in `drawCardFrame()`, NOT in `drawDevelopment()`. The `drawDevelopment(primary, secondary)` function only renders the pre-built strings to canvas.

### Player Type Conditional Rendering

The app supports two player types with different rendering logic:

#### Roster Player (default)
- Standard frame: `bloodbowl_frame.png`
- Shows position name at bottom
- Skills text starts at y=730
- Renders primary/secondary skill categories

#### Star Player
- Special frame: `bloodbowl_specialplayer_frame.png`
- No position name (hidden)
- Skills text starts at y=670 (higher)
- Additional sections:
  - "Plays For" text at y=840
  - "Special Rules" text at y=940

**Implementation in `drawCardFrame()`**:
```javascript
playerType = document.getElementById("playerType").value;
if(playerType == "star"){
    // Use star frame
    // Render playsFor and specialRules
    // No position name or skill categories
} else {
    // Use roster frame
    // Render position name and skill categories
}
```

## Important Architectural Decisions

### Why No Modern Framework?
- **Simplicity**: No build step, no transpiling
- **Stability**: No breaking changes from framework updates
- **Learning**: Accessible to developers of all skill levels
- **Performance**: No framework overhead

### Why Canvas Instead of DOM?
- **Consistency**: Identical rendering across browsers
- **Export**: Easy PNG generation
- **Control**: Pixel-perfect positioning
- **Print**: No CSS print quirks

### Why Jekyll?
- **Components**: Reusable HTML includes
- **Simplicity**: Basic templating only
- **GitHub Pages**: Free hosting
- **No Backend**: Compiles to static HTML

### Why localStorage?
- **Automatic**: No save button needed
- **Fast**: Synchronous, instant
- **Simple**: Key-value pairs
- **Privacy**: Data stays local

## Performance Considerations

### Optimization Strategies
1. **Debouncing**: None currently (could add for typing)
2. **Image Caching**: Browser handles naturally
3. **Canvas Redraw**: Full redraw on change (acceptable performance)
4. **Font Loading**: Custom fonts preloaded via CSS

### Known Limitations
- Large images may slow rendering
- No undo/redo functionality
- No multi-card batch operations
- Canvas is single-threaded (blocking)

## Error Handling

### Current Approach
- Minimal explicit error handling
- Relies on browser defaults and user feedback
- Missing elements fail silently (undefined checks)
- Invalid data displays but doesn't break rendering

### Robustness Features
- Default values in `defaultFighterData()`
- Null checks before drawing images
- Font size reduction for long text
- LocalStorage availability check (could add)

## Testing Strategy

### Manual Testing Required
- Cannot unit test Canvas rendering easily
- Visual inspection is primary validation
- Test across browsers (Chrome, Firefox, Safari)
- Print test for PNG exports

### Test Scenarios
1. Create card with all fields filled
2. Create card with minimal fields
3. Save and reload from JSON
4. Export PNG and verify quality
5. Test with very long text strings
6. Test all skill category combinations
7. Upload various image sizes
8. Test both roster and star player types
9. Verify star player-specific fields render correctly

## Known Issues & Quirks

### HTML Typos
- `section-characteristics.html` has a double-quote typo: `<div class="col-sm-1"">` on the `p_general` div line
- Non-breaking, cosmetic issue

### Unused Files
- `_includes/card/section-deployment.html` exists in directory but is not included in `tabContentCard.html`
- Potentially legacy or future feature
- Not currently used in rendering pipeline

### Browser-Specific
- Safari: Font rendering may differ slightly
- Firefox: Canvas export might have minor color differences
- Mobile: Touch interactions not optimized
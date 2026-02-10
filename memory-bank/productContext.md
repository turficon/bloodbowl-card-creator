# Product Context

## Why This Exists

Blood Bowl is a fantasy football tabletop game with rich customization options. While official player cards exist, players often want to:
- Create homebrew teams and players
- Design custom star players
- Build house-ruled variants
- Create visually appealing cards for leagues

Purchasing or designing cards from scratch requires graphic design skills or expensive software. This tool democratizes card creation for the community.

## Problems It Solves

### For Players
- **Accessibility**: No need for Photoshop or design skills
- **Speed**: Create professional cards in minutes, not hours
- **Flexibility**: Easy to iterate and adjust designs
- **Cost**: Free alternative to commissioned artwork or design software

### For League Organizers
- **Consistency**: All custom cards maintain the same visual style
- **Documentation**: Easy to save and share league-specific rules
- **Printing**: Export ready-to-print PNG files

### For Homebrew Creators
- **Prototyping**: Quickly test new player concepts
- **Sharing**: JSON export makes it easy to share designs
- **Professionalism**: Homebrew content looks official

## How It Should Work

### User Flow: Creating a Player Card
1. User opens the application in browser
2. Selects "Players" tab (default view)
3. Fills in player details:
   - Player name
   - Team name
   - Position
   - Statistics (MA, ST, AG, PA, AV)
   - Gold piece cost
   - Skills & traits description
4. Selects skill categories (Primary/Secondary: A, D, G, M, P, S)
5. Optionally uploads player artwork
6. Adjusts image position/scale if needed
7. Reviews real-time preview on left side
8. Exports as PNG for printing or JSON for later editing

### User Flow: Loading Existing Design
1. User has previously exported JSON file
2. Clicks file upload button
3. Selects JSON file
4. All fields populate automatically
5. User can make adjustments
6. Re-export as needed

## User Experience Principles

### Immediate Feedback
- Canvas updates in real-time as user types
- No "preview" button needed
- What you see is what you get

### No Learning Curve
- Standard form controls (text inputs, checkboxes, number spinners)
- Familiar UI patterns (Bootstrap-based)
- Tooltips and clear labels

### Persistent State
- Browser localStorage saves current card automatically
- No "save" button needed during editing
- Only explicit export for file creation

### Professional Output
- High-resolution canvas rendering (822x1122px)
- Custom fonts matching Blood Bowl aesthetic
- Proper text wrapping and sizing
- Print-ready PNG exports

## Key Design Decisions

### Why Client-Side Only?
- No server costs or maintenance
- Works offline after initial load
- User data stays private
- Instant response times

### Why Canvas for Rendering?
- Pixel-perfect control over layout
- Easy export to PNG
- Consistent rendering across browsers
- No HTML/CSS print quirks

### Why JSON Export?
- Human-readable format
- Easy to version control
- Can be edited manually if needed
- Small file size

### Why LocalStorage Auto-Save?
- Prevents lost work
- No "unsaved changes" warnings needed
- Feels responsive and modern
- No database required

## Success Indicators

### User is Successful When:
- They create their first card within 5 minutes
- The exported PNG prints clearly
- They can reload their design from JSON
- The card looks "official" enough to use in games

### Tool is Successful When:
- Community members share their designs
- League organizers adopt it as standard
- Homebrew content creators use it regularly
- Minimal support questions needed

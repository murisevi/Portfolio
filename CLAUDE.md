# CLAUDE.md — Personal Portfolio Project

Below is the complete `CLAUDE.md` file content for the project:

---

```markdown
# CLAUDE.md — Personal Portfolio Website

## Project overview

A personal portfolio website for a software engineer, built with **vanilla JavaScript, HTML, and CSS only** (no frameworks, no build tools, no npm). The design and interaction style is modeled closely after [jarred.green](https://www.jarred.green/), an academic portfolio featuring a dark theme, animated background, hero section with animated text, fixed navigation, and a clean single-page layout. The key visual difference: the starfield/space background is replaced with an **interactive network/graph visualization** that reflects a software engineering theme.

---

## Reference site analysis (jarred.green)

### Structure and layout
- **Single-page design** with anchor-based navigation scrolling to sections
- **Fixed/sticky top navigation bar** with a decorative emoji icon (✨) as the logo/home link on the left and horizontal nav links on the right
- **Full-viewport hero section** with the person's name as the main heading ("Hi, I'm Jarred Green") followed by animated subtitle lines describing their role/affiliation
- **Content section** ("Science") below the hero with a two-column layout: text on one side, headshot image on the other
- **Footer area** with additional links (NASA ADS, CV)
- Dark background throughout; content is vertically stacked and centered

### Navigation system
- Logo/icon links to `#top` (scroll to top)
- Nav items are a mix of:
  - **Anchor links** that smooth-scroll to page sections (e.g., "About" → `#research`)
  - **External links** that open in new tabs (e.g., GitHub profile, ORCID, external thesis PDF)
  - **Asset links** that open files (e.g., CV PDF at `/assets/filename.pdf`)
- Navigation is minimal — 5 items: About, Github, ORCID, CV, Master Thesis

### Animations and interactions
- **Animated subtitle text** in the hero section — text cycles through multiple descriptive lines (e.g., "a PhD Candidate in very-high-energy astrophysics", "at the Max Planck Institute for Physics") using a typewriter or fade-cycle effect
- **Background animation** — dark canvas with animated starfield/particle effect behind all content
- **Smooth scrolling** when clicking anchor navigation links
- Subtle transitions on hover states for navigation links

### Visual design
- **Color scheme**: Very dark (near-black) background, white/light text, minimal accent colors
- **Typography**: Clean sans-serif font, large hero heading, medium body text
- **Imagery**: Single headshot photo with caption in the about section
- **Overall feel**: Minimal, clean, academic, space-themed (we adapt this to a tech/CS theme)

---

## Project specifications

### Tech stack
- **HTML5** — semantic markup, single `index.html` file
- **CSS3** — single `styles.css` file, no preprocessors
- **Vanilla JavaScript** — single `script.js` file, no libraries or frameworks
- **HTML5 Canvas** — for the network graph background animation
- No build tools, no npm, no bundlers. Pure static files servable from any web server or opened directly in a browser.

### File structure
```
portfolio/
├── index.html              # Main (and only) HTML page
├── css/
│   └── styles.css          # All styles
├── js/
│   ├── main.js             # Navigation, smooth scroll, typewriter, initialization
│   └── network-bg.js       # Network graph canvas background animation
├── assets/
│   ├── headshot.png         # Profile photo (placeholder until replaced)
│   └── cv.pdf               # CV document (placeholder until replaced)
└── CLAUDE.md                # This file
```

### Navigation menu items
The navigation must contain exactly these items, in this order:
1. **Logo/icon** — a code-related icon or symbol (e.g., `</>` or `{ }` or `⟨⟩`) linking to `#top` — replaces the ✨ star emoji from the reference site to match the software engineering theme
2. **About** — anchor link to `#about` section on the page
3. **Github** — external link to the user's GitHub profile (opens in new tab). URL is a placeholder: `https://github.com/USERNAME`
4. **CV** — link to `/assets/cv.pdf` (opens in new tab or downloads)
5. **Bachelor Thesis** — this item should be visually present but marked as "Coming Soon" or disabled/grayed out, since the thesis is not yet concluded

### Page sections

#### Hero section (`#top`)
- Full viewport height (`100vh`)
- Network graph canvas animation fills the background
- Centered content:
  - Main heading: "Hi, I'm [Name]" — large, bold, white text
  - Animated subtitle that cycles through lines using a typewriter effect:
    - Line 1: "a Software Engineer"
    - Line 2: "passionate about [topic]"
    - Line 3: "based in [location]"
  - (The actual text content is placeholder — the user will customize it)
- Subtle scroll-down indicator at the bottom (optional: a small animated chevron or arrow)

#### About section (`#about`)
- Section heading: "About" or "About Me"
- Two-column layout (text left, image right) on desktop; stacks vertically on mobile
- Left column: paragraph(s) of bio text (placeholder lorem ipsum for now)
- Right column: headshot image with subtle rounded corners
- Below the bio: links to GitHub and other profiles, styled as inline text links or small buttons
- The layout and visual hierarchy should closely match the "Science" section of jarred.green

#### Bachelor Thesis section (`#thesis`)
- Section heading: "Bachelor Thesis"
- Simple centered message: "🚧 Coming soon — thesis in progress" or similar
- Optionally include a brief description of the thesis topic
- This section should be minimal but present so the navigation link works

### Language
- All content in **English**

---

## Design system

### Color palette
```css
:root {
  --bg-primary: #0d1117;        /* Main background — GitHub dark style */
  --bg-secondary: #161b22;      /* Cards, alternate sections */
  --bg-nav: rgba(13, 17, 23, 0.85); /* Nav background with transparency */
  --text-primary: #e6edf3;      /* Main text — off-white */
  --text-secondary: #8b949e;    /* Muted/secondary text */
  --text-heading: #ffffff;      /* Headings — pure white */
  --accent: #58a6ff;            /* Primary accent — soft blue */
  --accent-hover: #79c0ff;      /* Accent hover state */
  --node-color: rgba(88, 166, 255, 0.6);  /* Network nodes */
  --edge-color: rgba(88, 166, 255, 0.12); /* Network edges */
  --border: rgba(48, 54, 61, 0.6);       /* Subtle borders */
}
```

### Typography
- **Font family**: `'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif` — load Inter from Google Fonts via `<link>` tag
- **Hero heading**: `clamp(2.5rem, 5vw, 4rem)`, font-weight 700
- **Hero subtitle (animated)**: `clamp(1.1rem, 2.5vw, 1.5rem)`, font-weight 400
- **Section headings**: `clamp(1.8rem, 3vw, 2.5rem)`, font-weight 600
- **Body text**: `1rem` (16px), line-height 1.7, font-weight 400
- **Nav links**: `0.9rem`, font-weight 500, uppercase or normal case (match reference)

### Spacing and layout
- **Max content width**: `800px` centered (matches the narrow, readable layout of jarred.green)
- **Section padding**: `6rem 2rem` vertically, `1.5rem` horizontally on mobile
- **Nav height**: ~`60px`, fixed at top, z-index 1000
- **Hero section**: `100vh` minimum height, flex-centered content
- Content sections should have generous vertical spacing between them

---

## Network graph background — implementation spec

### Overview
An HTML5 Canvas element covers the full viewport (position: fixed) behind all content. It renders an animated network/graph of interconnected nodes — representing a software engineering concept (like a data structure, network topology, or dependency graph).

### Canvas setup
```
- <canvas id="network-bg" aria-hidden="true"> as the first child of <body>
- CSS: position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none;
- Handle window.devicePixelRatio for retina displays
- Resize canvas on window resize (use ResizeObserver or resize event with debounce)
```

### Particle/node system
- **Particle count**: ~80 on desktop, ~30 on mobile (detect via `window.innerWidth < 768`)
- **Node appearance**: Small circles, radius 1–3px, with a few "hub" nodes at 3–5px for visual hierarchy
- **Node color**: `var(--node-color)` — semi-transparent blue
- **Movement**: Each node has a random velocity vector; speed should be very slow (0.15–0.4 px/frame) for a calm, ambient feel
- **Boundary behavior**: Reverse velocity when hitting canvas edges (with a small buffer zone of ~20px)

### Connection/edge system
- **Algorithm**: On each frame, check all particle pairs (O(n²)). If distance between two nodes < `connectDistance` (recommended: 150px), draw a line between them
- **Edge opacity**: Inversely proportional to distance: `opacity = baseOpacity * (1 - distance / connectDistance)` where baseOpacity is ~0.15
- **Edge color**: `var(--edge-color)` — very subtle, semi-transparent
- **Line width**: 0.5–1px

### Mouse interaction
- Track mouse position via `mousemove` event on `window` (not on canvas, since canvas has `pointer-events: none`)
- Treat the mouse cursor as an invisible "hub node" with a larger connection radius (~200px)
- Draw connections from the mouse position to any nodes within range
- Mouse connections should have slightly higher opacity than node-to-node connections
- On `mouseleave`, set mouse position to `null` and stop drawing mouse connections
- The interaction should feel subtle and responsive — the background reacts to the user's cursor without being distracting

### Performance requirements
- Use `requestAnimationFrame` for the animation loop
- Skip `Math.sqrt` in distance checks — compare squared distances: `dx*dx + dy*dy < maxDist*maxDist`
- Batch draw calls — use a single `beginPath()` for all edges, then one `stroke()`
- Pause animation when tab is not visible (listen to `document.visibilitychange`)
- On mobile: reduce particle count significantly and consider disabling mouse interaction
- Target: consistent 60fps on modern devices

### Code structure (network-bg.js)
```javascript
// Use an ES6 class-based structure:
class NetworkBackground {
  constructor(canvasId, options) { /* merge defaults, init */ }
  init() { /* resize, create particles, bind events, start loop */ }
  resize() { /* handle DPR, update canvas dimensions */ }
  createParticles() { /* populate particle array */ }
  bindEvents() { /* resize, mousemove, mouseleave, visibilitychange */ }
  animate() { /* clear, update, drawEdges, drawNodes, rAF */ }
  updateParticles() { /* move particles, boundary checks */ }
  drawEdges() { /* O(n²) distance check, draw lines */ }
  drawNodes() { /* draw circles for each particle */ }
  destroy() { /* cleanup: remove listeners, cancel animation frame */ }
}
// Initialize on DOMContentLoaded
```

---

## Typewriter animation — implementation spec

### Behavior
- Located in the hero section, below the main heading
- Displays one line at a time from an array of strings
- Types out each character one by one (typewriter effect)
- After completing a string, pauses briefly, then deletes character by character
- Then types the next string in the array
- Loops infinitely through the array
- A blinking cursor (|) is always visible at the typing position

### Configuration
```javascript
const typewriterConfig = {
  strings: [
    "a Software Engineer",
    "passionate about [topic]",
    "based in [location]"
  ],
  typeSpeed: 80,       // ms between each character typed
  deleteSpeed: 40,     // ms between each character deleted
  pauseAfterType: 2000, // ms to wait after finishing typing a string
  pauseAfterDelete: 500, // ms to wait after finishing deleting
  cursorChar: '|'
};
```

### Implementation
- Use vanilla JavaScript with `setTimeout` / recursive calls (no libraries)
- The cursor should blink using CSS animation (`@keyframes blink`)
- Wrap the typed text in a `<span>` and the cursor in a separate `<span class="cursor">`
- The element should have a minimum height set to prevent layout shift during typing
- Use `aria-live="polite"` on the container for accessibility

---

## Navigation — implementation spec

### HTML structure
```html
<nav id="navbar">
  <a href="#top" class="nav-logo">&lt;/&gt;</a>
  <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
    <span class="hamburger"></span>
  </button>
  <ul class="nav-links">
    <li><a href="#about">About</a></li>
    <li><a href="https://github.com/USERNAME" target="_blank" rel="noopener noreferrer">Github</a></li>
    <li><a href="/assets/cv.pdf" target="_blank" rel="noopener noreferrer">CV</a></li>
    <li><a href="#thesis" class="disabled">Bachelor Thesis</a></li>
  </ul>
</nav>
```

### Styling
- Fixed at top of viewport, full width
- Background: semi-transparent dark with `backdrop-filter: blur(10px)` for glassmorphism
- Transitions from fully transparent (at page top) to semi-transparent (after scrolling)
- Flexbox: logo on the left, links on the right
- Links styled with subtle hover effects (color transition, optional underline animation)
- The "Bachelor Thesis" link should be styled with reduced opacity (0.5) and `cursor: default` or `pointer-events: none` with a tooltip or "(coming soon)" suffix

### Mobile responsive
- Below 768px: hide nav links, show hamburger button
- Hamburger toggles a full-screen or slide-down overlay menu
- Menu items centered vertically with larger tap targets
- Implement with CSS class toggle via JavaScript (`.nav-open` class on `<nav>`)
- Animate the hamburger icon to an X when menu is open
- Close menu when a link is clicked or when pressing Escape

### Smooth scroll
- Apply `scroll-behavior: smooth` on `html` in CSS
- Additionally, in JavaScript, intercept clicks on anchor links and use `element.scrollIntoView({ behavior: 'smooth', block: 'start' })` for more control
- Account for the fixed nav height — add `scroll-margin-top: 70px` to target sections
- Respect `prefers-reduced-motion`: disable smooth scroll if user prefers reduced motion

### Scroll spy (active link highlighting)
- Use `IntersectionObserver` to detect which section is currently in view
- Add an `.active` class to the corresponding nav link
- Active link gets the accent color; others remain in muted text color

---

## Responsive design

### Breakpoints
- **Desktop**: > 768px — two-column about layout, horizontal nav links
- **Mobile**: ≤ 768px — single-column stacked layout, hamburger menu
- **Small mobile**: ≤ 480px — further reduced font sizes, padding

### Mobile adaptations
- Hero heading size reduces via `clamp()`
- About section image stacks above or below text
- Navigation switches to hamburger menu
- Network background reduces particle count
- Touch: no mouse interaction on network background (since no hover)

---

## Accessibility requirements

- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<header>`, `<footer>`, `<h1>`–`<h3>`
- Canvas element has `aria-hidden="true"` (decorative)
- All images have descriptive `alt` text
- Navigation hamburger has `aria-label` and `aria-expanded`
- Links to external sites have `rel="noopener noreferrer"`
- Color contrast meets WCAG AA (4.5:1 minimum for text)
- `prefers-reduced-motion` media query: disable typewriter animation (show static text), disable canvas animation (show static background or reduce to minimal)
- Keyboard navigable: all interactive elements reachable via Tab, Enter activates
- Focus styles visible (outline on focus-visible)

---

## Coding standards

- Use ES6+ features (classes, arrow functions, const/let, template literals)
- No global variables except the initialized class instances
- CSS uses custom properties (CSS variables) defined in `:root`
- BEM-like naming convention for CSS classes (e.g., `.hero__title`, `.nav__link--active`)
- All JavaScript in `'use strict'` mode or ES modules
- Comment complex logic (especially the canvas animation math)
- No inline styles or inline event handlers in HTML
- HTML validates against W3C standards
- Consistent 2-space indentation in all files

---

## Implementation order

1. **HTML structure** — Scaffold `index.html` with all sections, navigation, and semantic markup
2. **CSS base styles** — Reset/normalize, CSS variables, typography, dark theme, layout grid
3. **Navigation** — Fixed nav bar, styling, hover states
4. **Hero section** — Layout, heading, subtitle placeholder
5. **About section** — Two-column layout, image placeholder, text
6. **Thesis section** — Simple "coming soon" layout
7. **Network background** (`network-bg.js`) — Canvas setup, particle system, connections, animation loop
8. **Mouse interaction** — Add cursor-as-hub-node to network background
9. **Typewriter animation** (`main.js`) — Implement character-by-character typing with cursor
10. **Smooth scroll and scroll spy** — Navigation interactivity
11. **Mobile hamburger menu** — Responsive navigation
12. **Responsive refinements** — Test and polish all breakpoints
13. **Accessibility pass** — ARIA attributes, reduced motion, keyboard navigation, contrast check
14. **Performance optimization** — Throttle resize, optimize canvas, test on mobile

---

## Key differences from reference site (jarred.green)

| Aspect | jarred.green | This project |
|---|---|---|
| Theme | Astrophysics / Space | Software Engineering |
| Background | Starfield (stars) | Network/graph visualization |
| Logo icon | ✨ (sparkle emoji) | `</>` or `{ }` (code symbol) |
| Nav items | About, Github, ORCID, CV, Master Thesis | About, Github, CV, Bachelor Thesis |
| Thesis | Links to completed master thesis | "Coming soon" (not yet concluded) |
| GitHub link | Links to profile | Links to profile (same behavior) |
| Language | English | English |
| Tech stack | Likely SvelteKit | Vanilla HTML/CSS/JS |
| Color accent | Space/cosmic tones | Soft blue / tech blue |
| Subtitle content | Astrophysics roles | Software engineering roles |

---

## Notes for Claude

- When generating code, always produce complete, working files — not snippets or fragments
- The project must work by simply opening `index.html` in a browser (no server required, except for ES modules which may need a simple HTTP server)
- If using ES modules (`type="module"`), note that the project will need to be served via HTTP (e.g., `python -m http.server` or VS Code Live Server)
- Do NOT use any npm packages, CDN libraries, or external JavaScript dependencies (except Google Fonts CSS link)
- All animations must be smooth (60fps target) and non-janky
- The network background should feel alive but NOT distracting — it is ambient decoration, not the main content
- Prioritize code readability and clean organization over clever tricks
- Test mentally that all navigation links work correctly (anchor scroll, external links, disabled thesis link)
```

---

This CLAUDE.md provides a comprehensive specification for building a portfolio website that closely mirrors the design and interaction patterns of jarred.green, with the user's specified modifications. It covers every aspect from the reference site's analysis to detailed implementation specs for the network graph background, typewriter animation, navigation system, responsive design, accessibility, and coding standards. The file is structured as an actionable development guide that Claude (or any developer) can follow step by step.
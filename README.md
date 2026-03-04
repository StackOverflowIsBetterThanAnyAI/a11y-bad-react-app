# A11y Bad React App — Accessibility Issues Reference

This application **intentionally contains 28 web accessibility issues** that violate WCAG 2.1/2.2 guidelines. It is designed as a teaching and auditing tool for learning to identify and fix real-world accessibility problems in React applications.

## Getting Started

```bash
npm install
npm run dev
```

Navigate to `http://localhost:5173`. An **A11y Issues** panel in the bottom-left corner lists all 28 issues. Each issue is also annotated directly in the source code with a comment block describing the **problem** and the **fix**.

---

## The 28 Accessibility Issues

### Document-Level Issues

---

#### Issue #1 — Missing `lang` attribute on `<html>`

| | |
|---|---|
| **File** | `index.html` |
| **WCAG** | 3.1.1 Language of Page (Level A) |

**Problem:** Without a `lang` attribute, screen readers cannot select the correct language profile for pronunciation. Text-to-speech engines may read English content using a wrong accent/phoneme set, making it unintelligible. Browser-level translation tools may also fail.

**Fix:**
```html
<!-- Bad -->
<html>

<!-- Good -->
<html lang="en">
```

---

#### Issue #2 — Non-descriptive page `<title>`

| | |
|---|---|
| **File** | `index.html` |
| **WCAG** | 2.4.2 Page Titled (Level A) |

**Problem:** `<title>Website</title>` gives users no meaningful information about the page. Screen reader users hear the title when they land on the page, and sighted keyboard users rely on tab labels to identify open pages. "Website" is identical for every page.

**Fix:**
```html
<!-- Bad -->
<title>Website</title>

<!-- Good -->
<title>Home — Acme Co.</title>
```

---

### Navigation Issues

---

#### Issue #3 — `<div>` used instead of semantic `<nav>` / `<main>` landmarks

| | |
|---|---|
| **File** | `src/App.jsx` — `Nav` & `App` components |
| **WCAG** | 1.3.1 Info and Relationships (Level A), 4.1.2 Name, Role, Value (Level A) |

**Problem:** Using `<div className="navbar">` instead of `<nav>` removes the navigation landmark. Similarly, wrapping main content in `<div id="home">` instead of `<main>` removes the main content landmark. Screen reader users who navigate by landmarks (pressing **R** in NVDA, **W** in VoiceOver) cannot jump to or skip these regions.

**Fix:**
```jsx
// Bad
<div className="navbar"> ... </div>
<div id="home"> ... </div>

// Good
<nav aria-label="Primary navigation"> ... </nav>
<main id="main-content"> ... </main>
```

---

#### Issue #4 — No "skip to main content" link

| | |
|---|---|
| **File** | `src/App.jsx` — `Nav` component |
| **WCAG** | 2.4.1 Bypass Blocks (Level A) |

**Problem:** Keyboard-only users must tab through every navigation link on every page load before reaching the main content. On a page with 10 nav items, that is 10 extra Tab presses every single time.

**Fix:** Add a visually-hidden-until-focused skip link as the very first focusable element on the page:

```jsx
// Add as the first child inside <nav> or before <nav>
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

```css
/* CSS: hide off-screen until focused */
.skip-link {
  position: absolute;
  left: -9999px;
}
.skip-link:focus {
  left: 0;
  top: 0;
  z-index: 9999;
}
```

---

#### Issue #5 — Link opens a new tab without warning

| | |
|---|---|
| **File** | `src/App.jsx` — `Nav` component |
| **WCAG** | 3.2.2 On Input (Level A) |

**Problem:** `target="_blank"` silently opens a new browser tab. Screen reader and keyboard users can be disoriented when the Back button stops working because they are now in a new tab without being told.

**Fix:**
```jsx
// Bad
<a href="https://example.com" target="_blank">About</a>

// Good
<a href="https://example.com" target="_blank" rel="noreferrer noopener">
  About <span className="sr-only">(opens in new tab)</span>
</a>
```

---

#### Issue #6 — Generic link text ("Click here")

| | |
|---|---|
| **File** | `src/App.jsx` — `Nav` component |
| **WCAG** | 2.4.4 Link Purpose in Context (Level A) |

**Problem:** "Click here" is meaningless out of context. Screen reader users who navigate by listing all links on the page hear only "Click here" with no indication of the destination.

**Fix:**
```jsx
// Bad
<a href="#products">Click here</a>

// Good
<a href="#products">View our products</a>
```

---

#### Issue #7 — Hover-only dropdown (not keyboard accessible)

| | |
|---|---|
| **File** | `src/App.jsx` — `Nav` component |
| **WCAG** | 2.1.1 Keyboard (Level A) |

**Problem:** The dropdown is revealed only by CSS `:hover`. Keyboard users, touch-screen users, and switch-access users cannot trigger it, making the sub-links (Consulting, Design, Development) completely unreachable without a mouse.

**Fix:** Implement a button-triggered disclosure widget:

```jsx
function Dropdown() {
  const [open, setOpen] = useState(false)
  return (
    <div className="dropdown">
      <button
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(o => !o)}
        onKeyDown={e => e.key === 'Escape' && setOpen(false)}
      >
        Services ▾
      </button>
      {open && (
        <div className="dropdown-menu" role="menu">
          <a href="#svc1" role="menuitem">Consulting</a>
          <a href="#svc2" role="menuitem">Design</a>
          <a href="#svc3" role="menuitem">Development</a>
        </div>
      )}
    </div>
  )
}
```

---

### Hero Section Issues

---

#### Issue #8 — Image missing `alt` attribute entirely

| | |
|---|---|
| **File** | `src/App.jsx` — `Hero` component |
| **WCAG** | 1.1.1 Non-text Content (Level A) |

**Problem:** When `alt` is omitted, screen readers fall back to announcing the full image URL (e.g. `"picsum.photos/seed/hero/1200/400"`), which is meaningless. The image is also not skippable for screen reader users.

**Fix:**
```jsx
// Bad — alt omitted entirely
<img src="..." className="hero-img" />

// Good — meaningful alt
<img src="..." alt="Acme Co. team collaborating in a modern office" className="hero-img" />

// Good — decorative image, skip it
<img src="..." alt="" role="presentation" className="hero-img" />
```

---

#### Issue #9 — Very low colour contrast on hero text

| | |
|---|---|
| **File** | `src/App.jsx` — `Hero` component |
| **WCAG** | 1.4.3 Contrast (Minimum) (Level AA) |

**Problem:** The hero title and subtitle use light-grey text on a near-white background. The contrast ratio is well below the required **4.5:1** for normal text (or **3:1** for large text ≥ 18pt / ≥ 14pt bold). Low-vision users and users in bright environments cannot read this content.

**Fix:** Darken the text colour or add a semi-transparent dark overlay behind the text. Verify with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

```css
/* Bad */
.hero-title { color: #ccc; }

/* Good — meets 4.5:1 against white */
.hero-title { color: #333; }
```

---

#### Issue #10 — `<div>` used as a button (not focusable, no role)

| | |
|---|---|
| **File** | `src/App.jsx` — `Hero` component |
| **WCAG** | 4.1.2 Name, Role, Value (Level A), 2.1.1 Keyboard (Level A) |

**Problem:** A `<div>` with `onClick` is not in the natural tab order, has no implicit ARIA role, and cannot be activated with the keyboard (Enter or Space do nothing). Screen readers do not announce it as interactive at all.

**Fix:**
```jsx
// Bad
<div className="fake-button" onClick={() => alert('Signed up!')}>
  Get Started
</div>

// Good
<button type="button" className="cta-button" onClick={() => alert('Signed up!')}>
  Get Started
</button>
```

---

### Products Section Issues

---

#### Issue #11 — Heading hierarchy skips levels (h1 → h4)

| | |
|---|---|
| **File** | `src/App.jsx` — `Products` component |
| **WCAG** | 1.3.1 Info and Relationships (Level A), 2.4.6 Headings and Labels (Level AA) |

**Problem:** After an `<h1>` in the Hero, the Products section uses `<h4>`, skipping h2 and h3. Card titles use `<h6>`, skipping further levels. Screen reader users who navigate by headings experience a broken document outline and cannot infer section hierarchy.

**Fix:** Use headings in sequence. Never skip levels for visual styling — use CSS classes for appearance instead.

```jsx
// Bad
<h4 className="section-title">Our Products</h4>
  <h6>{item.name}</h6>

// Good
<h2 className="section-title">Our Products</h2>
  <h3>{item.name}</h3>
```

---

#### Issue #12 — Non-descriptive alt text ("img")

| | |
|---|---|
| **File** | `src/App.jsx` — `Products` component |
| **WCAG** | 1.1.1 Non-text Content (Level A) |

**Problem:** `alt="img"` communicates nothing meaningful. It is no better than an empty string (which would at least signal that the image is decorative) and fails to provide screen reader users any product context.

**Fix:**
```jsx
// Bad
<img src={item.img} alt="img" />

// Good
<img src={item.img} alt={`Photo of ${item.name}`} />
```

---

#### Issue #13 — Icon-only button with no accessible label

| | |
|---|---|
| **File** | `src/App.jsx` — `Products` component |
| **WCAG** | 4.1.2 Name, Role, Value (Level A) |

**Problem:** A `<button>` containing only the 🛒 emoji has no accessible name beyond the emoji's Unicode description. When multiple identical icon buttons exist on the page, they are completely indistinguishable to screen reader users.

**Fix:**
```jsx
// Bad
<button className="icon-btn" onClick={...}>🛒</button>

// Good
<button
  className="icon-btn"
  aria-label={`Add ${item.name} to cart`}
  onClick={...}
>
  🛒
</button>
```

---

#### Issue #14 — Generic "Read more" link text

| | |
|---|---|
| **File** | `src/App.jsx` — `Products` component |
| **WCAG** | 2.4.4 Link Purpose in Context (Level A) |

**Problem:** Multiple identical "Read more" links are indistinguishable when a screen reader lists all links on the page (a common navigation pattern). Users cannot tell which product each link refers to.

**Fix:**
```jsx
// Bad
<a href="#detail">Read more</a>

// Good — visually-hidden context
<a href="#detail">
  Read more
  <span className="sr-only"> about {item.name}</span>
</a>

// Also good — aria-label overrides visible text for screen readers
<a href="#detail" aria-label={`Read more about ${item.name}`}>
  Read more
</a>
```

---

### Pricing Table Issues

---

#### Issue #15 — Table missing `<caption>`

| | |
|---|---|
| **File** | `src/App.jsx` — `PricingTable` component |
| **WCAG** | 1.3.1 Info and Relationships (Level A) |

**Problem:** Without a `<caption>`, screen reader users who navigate to the table have no programmatic description of its purpose. They must rely on surrounding visual context, which is not always available or reliable.

**Fix:**
```jsx
// Bad
<table className="pricing-table">
  <thead>...

// Good
<table className="pricing-table">
  <caption>Pricing plans comparison</caption>
  <thead>...
```

---

#### Issue #16 — `<th>` elements have no `scope` attribute

| | |
|---|---|
| **File** | `src/App.jsx` — `PricingTable` component |
| **WCAG** | 1.3.1 Info and Relationships (Level A) |

**Problem:** Without `scope="col"` (or `scope="row"`), screen readers may not correctly associate header cells with their data cells. In complex tables this causes data to be read without its header context, making the table meaningless.

**Fix:**
```jsx
// Bad
<th>Plan</th>
<th>Price</th>

// Good
<th scope="col">Plan</th>
<th scope="col">Price</th>
```

---

### Contact Form Issues

---

#### Issue #17 — Input uses placeholder instead of a visible `<label>`

| | |
|---|---|
| **File** | `src/App.jsx` — `ContactForm` component |
| **WCAG** | 1.3.1 Info and Relationships (Level A), 3.3.2 Labels or Instructions (Level A) |

**Problem:** Placeholder text disappears as soon as the user types, making it impossible to recall what the field expects. Placeholders also have insufficient contrast by default and are not reliably announced as labels by all screen reader / browser combinations.

**Fix:**
```jsx
// Bad
<input type="text" placeholder="Your name" ... />

// Good
<label htmlFor="name">Your name</label>
<input id="name" type="text" placeholder="e.g. Jane Smith" ... />
```

---

#### Issue #18 — Error message not linked to its input via `aria-describedby`

| | |
|---|---|
| **File** | `src/App.jsx` — `ContactForm` component |
| **WCAG** | 3.3.1 Error Identification (Level A), 1.3.1 Info and Relationships (Level A) |

**Problem:** The error span is visually adjacent to the input but has no programmatic association. When the input receives focus, screen readers do not announce the error message because they have no way to know it belongs to this field.

**Fix:**
```jsx
// Bad
<input ... />
{errors.name && <span className="error-text">{errors.name}</span>}

// Good
<input
  id="name"
  aria-describedby={errors.name ? 'name-error' : undefined}
  aria-invalid={!!errors.name}
  ...
/>
{errors.name && (
  <span id="name-error" className="error-text" role="alert">
    {errors.name}
  </span>
)}
```

---

#### Issue #19 — Required fields not communicated to assistive technology

| | |
|---|---|
| **File** | `src/App.jsx` — `ContactForm` component |
| **WCAG** | 3.3.2 Labels or Instructions (Level A) |

**Problem:** All three form fields are functionally required, but nothing communicates this to users before they attempt to submit — neither visually (no asterisk / legend) nor programmatically (no `required` / `aria-required`). Screen reader users have no advance warning.

**Fix:**
```jsx
// Bad
<input type="email" placeholder="Email address" ... />

// Good
<label htmlFor="email">Email address <span aria-hidden="true">*</span></label>
<input
  id="email"
  type="email"
  required
  aria-required="true"
  ...
/>
// Also add a legend above the form: "Fields marked * are required"
```

---

#### Issue #20 — Textarea has no label or aria attributes

| | |
|---|---|
| **File** | `src/App.jsx` — `ContactForm` component |
| **WCAG** | 1.3.1 Info and Relationships (Level A), 3.3.2 Labels or Instructions (Level A) |

**Problem:** The textarea has no associated `<label>`, no `id`, and no `aria-label`. Like the inputs above (Issue #17), it relies solely on a placeholder. Screen readers cannot identify the purpose of this field.

**Fix:**
```jsx
// Bad
<textarea placeholder="Your message" ... />

// Good
<label htmlFor="msg">Your message</label>
<textarea
  id="msg"
  aria-describedby={errors.msg ? 'msg-error' : undefined}
  aria-invalid={!!errors.msg}
  ...
/>
{errors.msg && <span id="msg-error" className="error-text">{errors.msg}</span>}
```

---

### Video Section Issues

---

#### Issue #21 — Video autoplays without user consent

| | |
|---|---|
| **File** | `src/App.jsx` — `VideoSection` component |
| **WCAG** | 1.4.2 Audio Control (Level A), 2.2.2 Pause, Stop, Hide (Level A) |

**Problem:** Autoplaying video can interfere with screen reader audio. It can also cause distress for users with vestibular disorders, epilepsy, ADHD, or cognitive disabilities. Users expect control over when media plays.

**Fix:**
```jsx
// Bad
<video src="..." autoPlay muted loop className="demo-video" />

// Good — remove autoPlay; let the user decide
<video src="..." controls className="demo-video" />
```

---

#### Issue #22 — Video has no controls — user cannot pause or stop it

| | |
|---|---|
| **File** | `src/App.jsx` — `VideoSection` component |
| **WCAG** | 2.2.2 Pause, Stop, Hide (Level A) |

**Problem:** Without the `controls` attribute, the browser renders no play/pause/mute UI. Users have no mechanism to stop the video, adjust volume, or seek — a direct violation of user control over time-based media.

**Fix:**
```jsx
// Bad
<video src="..." autoPlay muted loop />

// Good
<video src="..." controls />
```

---

#### Issue #23 — Fine-print text has tiny font size and very low contrast

| | |
|---|---|
| **File** | `src/App.jsx` — `VideoSection` component |
| **WCAG** | 1.4.3 Contrast (Minimum) (Level AA), 1.4.4 Resize Text (Level AA) |

**Problem:** `font-size: 9px` is far below standard readability thresholds. Combined with `color: #ccc` on a white background the contrast ratio is approximately **1.6:1** — less than a third of the required 4.5:1 minimum. Legal/fine-print text is **not** exempt from WCAG contrast requirements.

**Fix:**
```css
/* Bad */
p { font-size: 9px; color: #ccc; }

/* Good — meets 4.5:1 against white */
p { font-size: 12px; color: #767676; }
```

---

### Ticker Issue

---

#### Issue #24 — Moving ticker with no pause mechanism

| | |
|---|---|
| **File** | `src/App.jsx` — `Ticker` component |
| **WCAG** | 2.2.2 Pause, Stop, Hide (Level A) |

**Problem:** The ticker scrolls indefinitely with no way to pause it. This causes significant problems for users with attention disorders (ADHD), vestibular disorders (motion sickness), or cognitive disabilities. It also makes the text hard to read for anyone.

**Fix:** Provide a pause/play button, and respect `prefers-reduced-motion`:

```jsx
function Ticker() {
  const [paused, setPaused] = useState(false)
  return (
    <div className="ticker-wrap">
      <button onClick={() => setPaused(p => !p)}>
        {paused ? 'Play' : 'Pause'} announcement
      </button>
      <div className={`ticker ${paused ? 'paused' : ''}`}>...</div>
    </div>
  )
}
```

```css
@media (prefers-reduced-motion: reduce) {
  .ticker { animation: none; }
}
```

---

### Modal Issues

---

#### Issue #25 — Modal missing `role="dialog"`, `aria-modal`, and `aria-labelledby`

| | |
|---|---|
| **File** | `src/App.jsx` — `Modal` component |
| **WCAG** | 4.1.2 Name, Role, Value (Level A) |

**Problem:** Without `role="dialog"` and `aria-modal="true"`, screen readers do not announce that a dialog has appeared. Virtual reading mode in NVDA and JAWS will continue to read background content as if the modal does not exist.

**Fix:**
```jsx
// Bad
<div className="modal-box">
  <h3>Special Offer!</h3>

// Good
<div
  className="modal-box"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <h3 id="modal-title">Special Offer!</h3>
```

---

#### Issue #26 — Modal close element is `<a href="#">` instead of `<button>`

| | |
|---|---|
| **File** | `src/App.jsx` — `Modal` component |
| **WCAG** | 4.1.2 Name, Role, Value (Level A) |

**Problem:** `<a href="#">` semantically represents navigation, not an action. It adds a spurious entry to the browser history (pressing Back does not close the modal), and screen readers announce it as "link" rather than "button" — an incorrect semantic signal for a dismiss action. The `×` character also has no accessible name.

**Fix:**
```jsx
// Bad
<a href="#" className="modal-close" onClick={onClose}>×</a>

// Good
<button
  type="button"
  className="modal-close"
  aria-label="Close dialog"
  onClick={onClose}
>
  ×
</button>
```

---

#### Issue #27 — Focus not moved into the modal when it opens

| | |
|---|---|
| **File** | `src/App.jsx` — `Modal` component |
| **WCAG** | 2.4.3 Focus Order (Level A), 2.1.2 No Keyboard Trap (Level A) |

**Problem:** When the modal opens, keyboard focus stays on the trigger button behind the backdrop. Keyboard users cannot reach the modal's content by tabbing, and screen reader users are not informed that a dialog has appeared. Focus also does not return to the trigger button when the modal closes.

**Fix:**

```jsx
function Modal({ onClose, triggerRef }) {
  const closeRef = useRef(null)

  // Move focus into modal on open
  useEffect(() => {
    closeRef.current?.focus()
    return () => triggerRef.current?.focus() // return focus on close
  }, [])

  // Close on Escape
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
    // Trap focus: intercept Tab/Shift+Tab here
  }

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div role="dialog" aria-modal="true" aria-labelledby="modal-title"
           className="modal-box" onClick={e => e.stopPropagation()}>
        <h3 id="modal-title">Special Offer!</h3>
        <p>Sign up today and get 10% off your first order.</p>
        <button ref={closeRef} type="button" aria-label="Close dialog"
                className="modal-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  )
}
```

---

### Footer Issue

---

#### Issue #28 — Footer icon links have no accessible label

| | |
|---|---|
| **File** | `src/App.jsx` — `Footer` component |
| **WCAG** | 4.1.2 Name, Role, Value (Level A), 2.4.4 Link Purpose in Context (Level A) |

**Problem:** Links containing only emoji (📘, 🐦, ▶️) have no accessible name beyond the emoji's Unicode description (e.g. "blue book"). Screen readers announce these as meaningless characters. Users cannot distinguish the links or determine their destination.

**Fix:**
```jsx
// Bad
<a href="#fb">📘</a>
<a href="#tw">🐦</a>
<a href="#yt">▶️</a>

// Good
<a href="#fb" aria-label="Acme Co. on Facebook">📘</a>
<a href="#tw" aria-label="Acme Co. on Twitter">🐦</a>
<a href="#yt" aria-label="Acme Co. on YouTube">▶️</a>
```

---

## WCAG Coverage Summary

| # | Issue | WCAG Criterion | Level |
|---|-------|---------------|-------|
| 1 | Missing `lang` on `<html>` | 3.1.1 Language of Page | A |
| 2 | Non-descriptive `<title>` | 2.4.2 Page Titled | A |
| 3 | No `<nav>` / `<main>` landmarks | 1.3.1 Info and Relationships | A |
| 4 | No skip-to-main link | 2.4.1 Bypass Blocks | A |
| 5 | New-tab link without warning | 3.2.2 On Input | A |
| 6 | Generic "Click here" link text | 2.4.4 Link Purpose in Context | A |
| 7 | Hover-only dropdown | 2.1.1 Keyboard | A |
| 8 | Image with no `alt` attribute | 1.1.1 Non-text Content | A |
| 9 | Low contrast hero text | 1.4.3 Contrast (Minimum) | AA |
| 10 | `<div>` as button | 4.1.2 Name, Role, Value | A |
| 11 | Skipped heading levels | 1.3.1 Info and Relationships | A |
| 12 | Non-descriptive `alt="img"` | 1.1.1 Non-text Content | A |
| 13 | Icon-only button, no label | 4.1.2 Name, Role, Value | A |
| 14 | Generic "Read more" link text | 2.4.4 Link Purpose in Context | A |
| 15 | Table missing `<caption>` | 1.3.1 Info and Relationships | A |
| 16 | `<th>` without `scope` | 1.3.1 Info and Relationships | A |
| 17 | Placeholder used as label | 3.3.2 Labels or Instructions | A |
| 18 | Error not linked via `aria-describedby` | 3.3.1 Error Identification | A |
| 19 | Required fields not announced | 3.3.2 Labels or Instructions | A |
| 20 | Textarea has no label | 3.3.2 Labels or Instructions | A |
| 21 | Video autoplays | 1.4.2 Audio Control | A |
| 22 | Video has no controls | 2.2.2 Pause, Stop, Hide | A |
| 23 | Fine-print: tiny text + low contrast | 1.4.3 Contrast (Minimum) | AA |
| 24 | Ticker with no pause control | 2.2.2 Pause, Stop, Hide | A |
| 25 | Modal missing ARIA dialog roles | 4.1.2 Name, Role, Value | A |
| 26 | Modal close is `<a>` not `<button>` | 4.1.2 Name, Role, Value | A |
| 27 | Focus not trapped in modal | 2.4.3 Focus Order | A |
| 28 | Icon links have no label | 4.1.2 Name, Role, Value | A |

**26 issues are Level A violations** (must fix), **2 are Level AA** (should fix for AA conformance).

---

## Recommended Auditing Tools

| Tool | Type | Notes |
|------|------|-------|
| [axe DevTools](https://www.deque.com/axe/) | Browser extension | Catches ~57% of WCAG issues automatically |
| [WAVE](https://wave.webaim.org/) | Browser extension | Visual overlay of errors and alerts |
| [Lighthouse](https://developer.chrome.com/docs/lighthouse/accessibility/) | Built into Chrome DevTools | Integrated accessibility scoring |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | Web tool | Verify colour contrast ratios |
| [NVDA](https://www.nvaccess.org/) | Screen reader (Windows, free) | Essential for real-world testing |
| [VoiceOver](https://support.apple.com/guide/voiceover/welcome/mac) | Screen reader (macOS/iOS, built-in) | `Cmd + F5` to toggle on macOS |
| [JAWS](https://www.freedomscientific.com/products/software/jaws/) | Screen reader (Windows, paid) | Most widely used by blind users |

---

## Further Reading

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Introduction to Accessibility](https://webaim.org/intro/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [The A11y Project Checklist](https://www.a11yproject.com/checklist/)

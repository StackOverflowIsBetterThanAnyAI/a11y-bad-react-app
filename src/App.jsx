import { useState } from "react";
import "./App.css";

// ─────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────
function Nav() {
    return (
        /*
         * ISSUE #3: <div> used instead of semantic <nav> landmark
         * PROBLEM: A plain <div> carries no implicit landmark role. Screen reader
         *          users who navigate by landmarks (e.g. pressing "R" in NVDA or
         *          "W" in VoiceOver) cannot jump to or skip the navigation. The
         *          same problem applies to the page content wrapped in a <div>
         *          instead of <main> (see App root below).
         * FIX:     Replace <div className="navbar"> with
         *          <nav aria-label="Primary navigation"> and wrap the main page
         *          content in <main id="main-content">.
         * WCAG:    1.3.1 Info and Relationships (Level A),
         *          4.1.2 Name, Role, Value (Level A)
         */
        <div className="navbar">
            {/*
             * ISSUE #4: No "skip to main content" link
             * PROBLEM: Keyboard-only users must tab through every navigation link
             *          on every page load before they can reach the main content.
             *          This is especially frustrating on pages with many nav items.
             * FIX:     Add a visually-hidden-until-focused skip link as the very
             *          first focusable element on the page:
             *            <a href="#main-content" className="skip-link">
             *              Skip to main content
             *            </a>
             *          Style it off-screen by default and visible on :focus.
             * WCAG:    2.4.1 Bypass Blocks (Level A)
             */}
            <div className="logo">Acme Co.</div>
            <div className="nav-links">
                <a href="#home">Home</a>
                {/*
                 * ISSUE #5: Link opens a new tab without warning the user
                 * PROBLEM: target="_blank" opens a new browsing context without
                 *          informing the user first. Screen reader and keyboard users
                 *          can be disoriented when the Back button stops working
                 *          because they are now in a new tab.
                 * FIX:     Append a visually-hidden (or visible) notice to the link
                 *          text, e.g. <span className="sr-only">(opens in new tab)</span>,
                 *          or use aria-label="About (opens in new tab)".
                 *          Always pair target="_blank" with rel="noreferrer noopener".
                 * WCAG:    3.2.2 On Input (Level A)
                 */}
                <a href="https://example.com" target="_blank">
                    About
                </a>
                {/*
                 * ISSUE #6: Generic link text gives no context to screen-reader users
                 * PROBLEM: "Click here" is meaningless when read out of context.
                 *          Screen reader users who navigate by listing all links on
                 *          the page hear only "Click here" with no destination info.
                 * FIX:     Use descriptive link text that makes sense on its own,
                 *          e.g. <a href="#products">View our products</a>.
                 * WCAG:    2.4.4 Link Purpose in Context (Level A)
                 */}
                <a href="#products">Click here</a>
                <div className="dropdown">
                    {/*
                     * ISSUE #7: Hover-only dropdown — not keyboard accessible
                     * PROBLEM: The dropdown is revealed with CSS :hover only. Keyboard
                     *          users and touch-screen users cannot trigger it, so the
                     *          sub-links (Consulting, Design, Development) are completely
                     *          unreachable without a mouse.
                     * FIX:     Replace the <span> trigger with a <button> that toggles
                     *          an open/closed state:
                     *            <button aria-expanded={open} aria-haspopup="true"
                     *                    onClick={() => setOpen(o => !o)}>
                     *              Services ▾
                     *            </button>
                     *          Show the menu based on state, and close it on Escape.
                     *          Move focus to the first menu item when the menu opens.
                     * WCAG:    2.1.1 Keyboard (Level A)
                     */}
                    <span>Services ▾</span>
                    <div className="dropdown-menu">
                        <a href="#svc1">Consulting</a>
                        <a href="#svc2">Design</a>
                        <a href="#svc3">Development</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────
function Hero() {
    return (
        <div className="hero">
            {/*
             * ISSUE #8: Image missing alt attribute entirely
             * PROBLEM: Omitting alt causes screen readers to fall back to reading
             *          the full image URL (e.g. "picsum.photos/seed/hero/1200/400"),
             *          which is meaningless to the user.
             * FIX:     Add a meaningful alt attribute that describes the image
             *          content, e.g. alt="Acme Co. team in a modern office".
             *          If the image is purely decorative, use alt="" so screen
             *          readers skip it entirely.
             * WCAG:    1.1.1 Non-text Content (Level A)
             */}
            <img
                src="https://picsum.photos/seed/hero/1200/400"
                className="hero-img"
            />
            <div className="hero-content">
                {/*
                 * ISSUE #9: Very low colour contrast — light-grey text on near-white background
                 * PROBLEM: The hero title and subtitle use colours that do not meet
                 *          the minimum contrast ratio of 4.5:1 for normal text (or
                 *          3:1 for large text). Low-vision users and those in bright
                 *          environments cannot read this content.
                 * FIX:     Darken the text colour or add a semi-transparent dark
                 *          overlay behind the text. Verify the ratio with a tool such
                 *          as the WebAIM Contrast Checker. Aim for ≥ 4.5:1 for body
                 *          text and ≥ 3:1 for text ≥ 18pt (or ≥ 14pt bold).
                 * WCAG:    1.4.3 Contrast (Minimum) (Level AA)
                 */}
                <h1 className="hero-title">Welcome to Acme</h1>
                <p className="hero-subtitle">
                    We make things. Probably good things.
                </p>
                {/*
                 * ISSUE #10: <div> used as a button — not keyboard-focusable, no role
                 * PROBLEM: A <div> with an onClick handler is invisible to keyboard
                 *          navigation (not in the tab order) and has no implicit ARIA
                 *          role, so screen readers do not announce it as interactive.
                 *          Pressing Enter or Space does nothing.
                 * FIX:     Replace with a native <button type="button">Get Started</button>.
                 *          If a custom element is unavoidable, add role="button",
                 *          tabIndex={0}, and an onKeyDown handler that activates the
                 *          action on Enter and Space.
                 * WCAG:    4.1.2 Name, Role, Value (Level A),
                 *          2.1.1 Keyboard (Level A)
                 */}
                <div
                    className="fake-button"
                    onClick={() => alert("Signed up!")}
                >
                    Get Started
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Products Section
// ─────────────────────────────────────────────
function Products() {
    const items = [
        {
            id: 1,
            name: "Widget Pro",
            price: "$49",
            img: "https://picsum.photos/seed/w1/200/150",
        },
        {
            id: 2,
            name: "Gadget Plus",
            price: "$99",
            img: "https://picsum.photos/seed/w2/200/150",
        },
        {
            id: 3,
            name: "Doohickey X",
            price: "$199",
            img: "https://picsum.photos/seed/w3/200/150",
        },
    ];

    return (
        <div id="products" className="section products">
            {/*
             * ISSUE #11: Heading hierarchy skips levels (h1 → h4)
             * PROBLEM: After the <h1> in the Hero section, using <h4> here skips
             *          h2 and h3. Screen reader users who navigate by headings
             *          expect a logical outline; skipped levels imply missing
             *          structure and cause confusion. Card titles then use <h6>,
             *          skipping further levels.
             * FIX:     Use <h2> for top-level section headings ("Our Products")
             *          and <h3> for individual card headings (product names).
             *          Never skip heading levels for visual styling — use CSS
             *          classes instead.
             * WCAG:    1.3.1 Info and Relationships (Level A),
             *          2.4.6 Headings and Labels (Level AA)
             */}
            <h4 className="section-title">Our Products</h4>
            <div className="card-grid">
                {items.map((item) => (
                    <div key={item.id} className="card">
                        {/*
                         * ISSUE #12: Non-descriptive alt text ("img")
                         * PROBLEM: alt="img" communicates nothing about the image content.
                         *          It is no better than having no alt text and fails to
                         *          give screen reader users any information about what
                         *          the product looks like.
                         * FIX:     Use the product name in the alt text so it is
                         *          descriptive: alt={`Photo of ${item.name}`}
                         * WCAG:    1.1.1 Non-text Content (Level A)
                         */}
                        <img src={item.img} alt="image" />
                        <div className="card-body">
                            <h5>{item.name}</h5>
                            <p className="price">{item.price}</p>
                            {/*
                             * ISSUE #13: Icon-only button with no accessible label
                             * PROBLEM: The button contains only the 🛒 emoji. Screen readers
                             *          announce it as "shopping cart button" (or just the
                             *          emoji's Unicode name) with no indication of which
                             *          product is being added. When multiple identical
                             *          icon buttons exist, they are indistinguishable.
                             * FIX:     Add aria-label={`Add ${item.name} to cart`} to the
                             *          button so each one has a unique, descriptive name.
                             * WCAG:    4.1.2 Name, Role, Value (Level A)
                             */}
                            <button
                                className="icon-btn"
                                onClick={() => alert(`Added ${item.name}`)}
                            >
                                🛒
                            </button>
                            {/*
                             * ISSUE #14: Generic "Read more" link text
                             * PROBLEM: Multiple links with identical text "Read more" are
                             *          indistinguishable when a screen reader lists all
                             *          links on the page. Users cannot tell which product
                             *          each link refers to.
                             * FIX:     Add visually-hidden context using a sr-only span:
                             *            <a href="#detail">
                             *              Read more
                             *              <span className="sr-only"> about {item.name}</span>
                             *            </a>
                             *          Or use aria-label={`Read more about ${item.name}`}.
                             * WCAG:    2.4.4 Link Purpose in Context (Level A)
                             */}
                            <a href="#detail">Read more</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Data Table
// ─────────────────────────────────────────────
function PricingTable() {
    return (
        <div className="section">
            <h2>Pricing</h2>
            {/*
             * ISSUE #15: Table missing <caption>
             * PROBLEM: Without a <caption>, screen reader users who navigate to
             *          the table have no programmatic description of its purpose.
             *          They must infer context from surrounding content, which is
             *          unreliable (especially if the heading is outside the table).
             * FIX:     Add <caption>Pricing plans comparison</caption> as the
             *          very first child of <table>. This is announced by screen
             *          readers when the user enters the table.
             * WCAG:    1.3.1 Info and Relationships (Level A)
             */}
            <table className="pricing-table">
                <thead>
                    <tr>
                        {/*
                         * ISSUE #16: <th> elements have no scope attribute
                         * PROBLEM: Without scope="col" (or scope="row"), screen readers
                         *          may not correctly associate header cells with their
                         *          data cells, particularly in larger or irregular tables.
                         *          This breaks the programmatic relationship between
                         *          headers and data.
                         * FIX:     Add scope="col" to each column header:
                         *            <th scope="col">Plan</th>
                         *          For row headers, use scope="row".
                         * WCAG:    1.3.1 Info and Relationships (Level A)
                         */}
                        <th>Plan</th>
                        <th scope="col">Price</th>
                        <th scope="col">Storage</th>
                        <th scope="col">Support</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Free</td>
                        <td>$0</td>
                        <td>1 GB</td>
                        <td>Community</td>
                    </tr>
                    <tr>
                        <td>Pro</td>
                        <td>$9/mo</td>
                        <td>50 GB</td>
                        <td>Email</td>
                    </tr>
                    <tr>
                        <td>Enterprise</td>
                        <td>$49/mo</td>
                        <td>1 TB</td>
                        <td>24/7 Phone</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

// ─────────────────────────────────────────────
// Contact Form
// ─────────────────────────────────────────────
function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [values, setValues] = useState({ name: "", email: "", msg: "" });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!values.name) e.name = "Name is required";
        if (!values.email) e.email = "Email is required";
        if (!values.msg) e.msg = "Message is required";
        return e;
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const e = validate();
        if (Object.keys(e).length) {
            setErrors(e);
            return;
        }
        setSubmitted(true);
    };

    if (submitted)
        return <p className="success-msg">Thanks! We'll be in touch.</p>;

    return (
        <div className="section contact">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
                {/*
                 * ISSUE #17: Input uses placeholder instead of a visible <label>
                 * PROBLEM: Placeholder text disappears as soon as the user starts
                 *          typing, making it impossible to remember what the field
                 *          is for. Placeholders are also not reliably announced as
                 *          labels by all screen readers and typically have insufficient
                 *          contrast.
                 * FIX:     Add a visible <label htmlFor="name">Your name</label>
                 *          paired with id="name" on the input. Keep the placeholder
                 *          as supplementary hint text only, never as the sole label.
                 * WCAG:    1.3.1 Info and Relationships (Level A),
                 *          3.3.2 Labels or Instructions (Level A)
                 */}
                <input
                    type="text"
                    placeholder="Your name"
                    value={values.name}
                    onChange={(e) =>
                        setValues({ ...values, name: e.target.value })
                    }
                    className={errors.name ? "input-error" : ""}
                />
                {/*
                 * ISSUE #18: Error message not linked to its input via aria-describedby
                 * PROBLEM: The error span is visually adjacent to the input, but there
                 *          is no programmatic association. When the input receives
                 *          focus, screen readers do not read the error message because
                 *          they have no way to know it belongs to this field.
                 * FIX:     Give the error span a stable id (e.g. id="name-error")
                 *          and add aria-describedby="name-error" and
                 *          aria-invalid={!!errors.name} to the input. The screen
                 *          reader will then announce the error when the field is focused.
                 * WCAG:    3.3.1 Error Identification (Level A),
                 *          1.3.1 Info and Relationships (Level A)
                 */}
                {errors.name && (
                    <span className="error-text">{errors.name}</span>
                )}

                {/*
                 * ISSUE #19: Required fields not communicated to assistive technology
                 * PROBLEM: All three form fields are functionally required (submission
                 *          is blocked without them), but nothing communicates this to
                 *          the user — visually or programmatically — before they try
                 *          to submit. Screen reader users have no advance warning.
                 * FIX:     Add required and aria-required="true" to each mandatory
                 *          input, and indicate requirement in the label text, e.g.
                 *          "Email address *" with a legend explaining that * means
                 *          required.
                 * WCAG:    3.3.2 Labels or Instructions (Level A)
                 */}
                <input
                    type="email"
                    placeholder="Email address"
                    value={values.email}
                    onChange={(e) =>
                        setValues({ ...values, email: e.target.value })
                    }
                    className={errors.email ? "input-error" : ""}
                />
                {errors.email && (
                    <span className="error-text">{errors.email}</span>
                )}

                {/*
                 * ISSUE #20: Textarea has no label and no aria attributes
                 * PROBLEM: Like the text inputs above, this textarea relies solely on
                 *          a placeholder. There is no <label> element, no id, and no
                 *          aria-label, so screen readers cannot identify the field's
                 *          purpose. The error span is also not associated.
                 * FIX:     Add <label htmlFor="msg">Your message</label> and
                 *          id="msg" on the textarea. Link the error message with
                 *          aria-describedby="msg-error" and add aria-invalid when
                 *          the field has an error.
                 * WCAG:    1.3.1 Info and Relationships (Level A),
                 *          3.3.2 Labels or Instructions (Level A)
                 */}
                <textarea
                    placeholder="Your message"
                    rows={4}
                    value={values.msg}
                    onChange={(e) =>
                        setValues({ ...values, msg: e.target.value })
                    }
                    className={errors.msg ? "input-error" : ""}
                />
                {errors.msg && <span className="error-text">{errors.msg}</span>}

                <button type="submit" className="submit-btn">
                    Send Message
                </button>
            </form>
        </div>
    );
}

// ─────────────────────────────────────────────
// Auto-play Video
// ─────────────────────────────────────────────
function VideoSection() {
    return (
        <div className="section">
            <h2>Watch Our Demo</h2>
            {/*
             * ISSUE #21: Video autoplays without user consent
             * PROBLEM: Autoplaying video (even when muted) can interfere with
             *          screen reader audio output. It can also cause distress for
             *          users with vestibular disorders, epilepsy, or attention
             *          difficulties. Users expect control over when media plays.
             * FIX:     Remove the autoPlay attribute. If autoplay is a hard
             *          product requirement, ensure the video is muted, brief
             *          (under 5 seconds), and provide an immediately-visible
             *          pause button. Never autoplay audio-bearing content.
             * WCAG:    1.4.2 Audio Control (Level A),
             *          2.2.2 Pause, Stop, Hide (Level A)
             *
             * ISSUE #22: Video has no controls — user cannot pause or stop it
             * PROBLEM: Without the controls attribute, the browser renders no
             *          play/pause/mute UI. Users have absolutely no way to stop
             *          the video, adjust volume, or seek — a direct violation of
             *          the principle of user control over time-based media.
             * FIX:     Add the controls attribute to the <video> element:
             *            <video controls ...>
             *          This renders the browser's native accessible control bar.
             * WCAG:    2.2.2 Pause, Stop, Hide (Level A)
             */}
            <video
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                autoPlay
                muted
                loop
                className="demo-video"
            />
            {/*
             * ISSUE #23: Fine-print text has tiny font size and very low contrast
             * PROBLEM: font-size: 9px is far below typical readability thresholds.
             *          Combined with color: #ccc on a white background the contrast
             *          ratio is approximately 1.6:1 — well below the 4.5:1 minimum
             *          required for normal text. Low-vision users cannot read this
             *          even with browser zoom.
             * FIX:     Use a minimum of 12–14px (or 0.75–0.875rem) and ensure a
             *          contrast ratio of at least 4.5:1. Legal/fine-print text is
             *          not exempt from WCAG contrast requirements.
             * WCAG:    1.4.3 Contrast (Minimum) (Level AA),
             *          1.4.4 Resize Text (Level AA)
             */}
            <p style={{ fontSize: "9px", color: "#ccc" }}>
                * Results may vary. See terms and conditions for full details.
            </p>
        </div>
    );
}

// ─────────────────────────────────────────────
// Ticker / Moving text
// ─────────────────────────────────────────────
function Ticker() {
    return (
        /*
         * ISSUE #24: Constantly moving content with no pause mechanism
         * PROBLEM: The ticker scrolls indefinitely with no way to pause it.
         *          This can cause significant problems for users with attention
         *          disorders (ADHD), vestibular disorders (motion sickness), or
         *          cognitive disabilities. It also makes the content hard to read
         *          for anyone.
         * FIX:     Provide a visible pause/play button adjacent to the ticker.
         *          Alternatively, respect the user's OS preference by stopping
         *          the animation via CSS:
         *            @media (prefers-reduced-motion: reduce) {
         *              .ticker { animation: none; }
         *            }
         *          For full compliance, both a pause button and reduced-motion
         *          support are recommended.
         * WCAG:    2.2.2 Pause, Stop, Hide (Level A)
         */
        <div className="ticker-wrap">
            <div className="ticker">
                <span>
                    🔥 Flash Sale — 50% off everything! &nbsp;&nbsp;&nbsp;
                </span>
                <span>
                    🔥 Flash Sale — 50% off everything! &nbsp;&nbsp;&nbsp;
                </span>
                <span>
                    🔥 Flash Sale — 50% off everything! &nbsp;&nbsp;&nbsp;
                </span>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Modal
// ─────────────────────────────────────────────
function Modal({ onClose }) {
    return (
        /*
         * ISSUE #25: Modal missing role="dialog", aria-modal, and aria-labelledby
         * PROBLEM: Without role="dialog" and aria-modal="true", screen readers
         *          do not announce that a dialog has opened. Virtual reading mode
         *          in screen readers like NVDA and JAWS will continue to read
         *          background content as if the modal does not exist, defeating
         *          its purpose.
         * FIX:     Add role="dialog", aria-modal="true", and
         *          aria-labelledby pointing to the modal heading's id:
         *            <div role="dialog" aria-modal="true"
         *                 aria-labelledby="modal-title" ...>
         *              <h3 id="modal-title">Special Offer!</h3>
         * WCAG:    4.1.2 Name, Role, Value (Level A)
         */
        <div className="modal-backdrop" onClick={onClose} onKeyDown={() => {}}>
            <div className="modal-box">
                <h3>Special Offer!</h3>
                <p>Sign up today and get 10% off your first order.</p>
                {/*
                 * ISSUE #26: Modal close element is <a href="#"> instead of <button>
                 * PROBLEM: An <a href="#"> semantically represents a navigation link,
                 *          not an action. It adds a spurious entry to the browser
                 *          history (pressing Back does not close the modal as expected)
                 *          and is announced as "link" rather than "button" by screen
                 *          readers, which is semantically incorrect for a dismiss action.
                 * FIX:     Replace with a native button:
                 *            <button type="button" aria-label="Close dialog"
                 *                    className="modal-close" onClick={onClose}>
                 *              ×
                 *            </button>
                 * WCAG:    4.1.2 Name, Role, Value (Level A)
                 */}
                <a href="#" className="modal-close" onClick={onClose}>
                    ×
                </a>
                {/*
                 * ISSUE #27: Focus is not moved into the modal when it opens
                 * PROBLEM: When the modal opens, keyboard focus remains on the
                 *          trigger button behind the backdrop. Keyboard users cannot
                 *          reach the modal's content by tabbing, and screen reader
                 *          users are not informed that a dialog has appeared. When
                 *          the modal closes, focus is also not returned to the trigger.
                 * FIX:     Use useRef + useEffect to move focus into the modal after
                 *          mount (e.g. to the close button or the dialog container
                 *          itself with tabIndex={-1}). Trap focus inside the modal
                 *          while it is open (intercept Tab/Shift+Tab). Return focus
                 *          to the trigger button when the modal closes.
                 *          Also add an onKeyDown handler for Escape to close the modal.
                 * WCAG:    2.4.3 Focus Order (Level A),
                 *          2.1.2 No Keyboard Trap (Level A)
                 */}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-links">
                {/*
                 * ISSUE #28: Footer icon links have no accessible label
                 * PROBLEM: These links contain only emoji (📘, 🐦, ▶️). Screen
                 *          readers announce the raw emoji description (e.g. "blue book"
                 *          or "bird") with no indication of where the link leads or
                 *          which social network it represents. Users cannot distinguish
                 *          or understand these links without a mouse hover or visual
                 *          context.
                 * FIX:     Add descriptive aria-label attributes to each link:
                 *            <a href="#fb" aria-label="Acme Co. on Facebook">📘</a>
                 *            <a href="#tw" aria-label="Acme Co. on Twitter">🐦</a>
                 *            <a href="#yt" aria-label="Acme Co. on YouTube">▶️</a>
                 *          Alternatively, add visually-hidden text with a sr-only span.
                 * WCAG:    4.1.2 Name, Role, Value (Level A),
                 *          2.4.4 Link Purpose in Context (Level A)
                 */}
                <a href="#fb">📘</a>
                <a href="#tw" aria-label="Acme Co. on Twitter">
                    🐦
                </a>
                <a href="#yt">▶️</a>
            </div>
            <p className="footer-copy">© 2024 Acme Co. All rights reserved.</p>
        </footer>
    );
}

// ─────────────────────────────────────────────
// Issue Legend Panel
// ─────────────────────────────────────────────
const ISSUES = [
    { n: 1, label: "Missing lang attribute on <html>" },
    { n: 2, label: "Non-descriptive page <title>" },
    { n: 3, label: "<div> used instead of <nav> landmark" },
    { n: 4, label: 'No "skip to main content" link' },
    { n: 5, label: "Links open new tab with no warning" },
    { n: 6, label: 'Generic link text ("Click here")' },
    { n: 7, label: "Hover-only dropdown (not keyboard accessible)" },
    { n: 8, label: "Image missing alt attribute entirely" },
    { n: 9, label: "Very low colour contrast on hero text" },
    { n: 10, label: "<div> used as a button (not focusable, no role)" },
    { n: 11, label: "Heading hierarchy skips levels (h1 → h4)" },
    { n: 12, label: 'Non-descriptive alt text ("img")' },
    { n: 13, label: "Icon-only button with no accessible label" },
    { n: 14, label: 'Generic link text ("Read more")' },
    { n: 15, label: "Table missing <caption>" },
    { n: 16, label: "<th> elements have no scope attribute" },
    { n: 17, label: "Input uses placeholder instead of <label>" },
    {
        n: 18,
        label: "Error message not associated to input (no aria-describedby)",
    },
    { n: 19, label: "Required fields not communicated" },
    { n: 20, label: "Textarea has no label" },
    { n: 21, label: "Video autoplays (no user consent)" },
    { n: 22, label: "Video has no controls — user cannot pause/stop" },
    { n: 23, label: "Fine-print text: tiny size + very low contrast" },
    { n: 24, label: "Moving ticker with no pause mechanism (WCAG 2.2.2)" },
    { n: 25, label: 'Modal missing role="dialog" and aria-modal' },
    { n: 26, label: 'Modal close is an <a href="#"> not a <button>' },
    { n: 27, label: "Focus not moved into modal when it opens" },
    { n: 28, label: "Footer icon links have no accessible label" },
];

function IssueLegend() {
    const [open, setOpen] = useState(true);
    return (
        <aside className="legend">
            <button
                className="legend-toggle"
                onClick={() => setOpen((o) => !o)}
            >
                {open ? "▲" : "▼"} A11y Issues ({ISSUES.length})
            </button>
            {open && (
                <ol className="legend-list">
                    {ISSUES.map((i) => (
                        <li key={i.n}>
                            <strong>#{i.n}</strong> — {i.label}
                        </li>
                    ))}
                </ol>
            )}
        </aside>
    );
}

// ─────────────────────────────────────────────
// App root
// ─────────────────────────────────────────────
export default function App() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="app">
            <Ticker />
            <Nav />
            <IssueLegend />

            {/*
             * ISSUE #3 (continued): No <main> landmark wrapping the page content
             * PROBLEM: The main content is wrapped in a plain <div id="home">
             *          instead of a <main> element. Screen reader users cannot
             *          jump directly to the main content area using the "main"
             *          landmark shortcut.
             * FIX:     Replace <div id="home"> with <main id="main-content">.
             *          There should be exactly one <main> element per page.
             */}
            <main id="home">
                <Hero />
                <Products />
                <PricingTable />
                <VideoSection />
                <ContactForm />
            </main>

            <Footer />

            <button
                className="modal-trigger"
                onClick={() => setShowModal(true)}
            >
                Show Special Offer
            </button>

            {showModal && <Modal onClose={() => setShowModal(false)} />}
        </div>
    );
}

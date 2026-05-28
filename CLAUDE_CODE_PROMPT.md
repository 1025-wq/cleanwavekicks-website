# Clean Wave Kicks — Claude Code Frontend Prompt

---

## COPY & PASTE THIS INTO CLAUDE CODE:

---

Build a full single-page website for **Clean Wave Kicks**, a mobile sneaker laundry business based in Johannesburg, South Africa.

---

### TECH STACK
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Form handling**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Fonts**: Use Google Fonts — pair a bold display font with a clean body font (e.g. Syne + DM Sans, or Bebas Neue + Inter). No generic defaults.
- **Deployment target**: Vercel (so keep it Vercel-compatible)

---

### BRAND & DESIGN DIRECTION

**Colors (strict — from logo):**
- Primary background: `#0A0E2E` (deep navy)
- Accent pink: `#FF4F9E`
- Accent blue: `#5BC8F5`
- White text on dark backgrounds

**Aesthetic:** Premium sneaker culture meets ocean/wave energy. Think clean, bold, slightly luxury streetwear. Dark navy base with glowing pink and cyan accents. Wave motifs and bubble/foam details echo the logo.

**Key design rules:**
- Dark theme throughout
- Animated wave SVG or CSS wave in the hero section
- Glowing neon-ish button hover effects (pink glow)
- Smooth scroll between sections
- Mobile-first and fully responsive
- Micro-animations on scroll (fade-in, slide-up) using Framer Motion
- No generic AI-looking layouts — make it feel like a real brand

---

### SECTIONS TO BUILD (in order)

#### 1. NAVBAR
- Logo image: use `./logo.jpg` (already in the project folder)
- Links: Home, Services, Pricing, Gallery, Book Now, Contact
- Sticky on scroll, slight blur/frosted glass effect
- Mobile: hamburger menu

#### 2. HERO
- Headline: **"Your Sneakers Deserve a Clean Wave"**
- Subheadline: *"Professional mobile sneaker laundry — we come to you, or you drop off at our locations."*
- Two CTA buttons:
  - **"Book Now"** → scrolls to booking form (pink, glowing)
  - **"See Pricing"** → scrolls to pricing section (outlined)
- Background: animated CSS wave at the bottom of the hero
- Optional: floating bubble/sparkle particles

#### 3. WHY CLEAN WAVE KICKS (value props, 3 cards)
- 🚗 **Mobile Service** — We pick up and drop off your sneakers
- ✨ **Expert Cleaning** — Specialists in all materials: standard, suede, leather
- ⚡ **Express Available** — Same-day turnaround when you need it fast

#### 4. SERVICES & PRICING

**ADULTS PRICING:**
| Service | Price |
|---|---|
| Standard Sneakers | R100 |
| Suede / Nubuck | R150 |
| Leather | R180 |
| Colour Restoration | R250 |

**KIDS PRICING:**
| Service | Price |
|---|---|
| Standard Sneakers | R60 |
| Suede / Nubuck | R100 |
| Leather | R120 |

**EXTRAS:**
| Extra | Price |
|---|---|
| Standard Turnaround (2 days) | Free |
| Express Same Day | R50 per pair |
| Delivery / Pickup | From R70 (location dependent) |

**Promo banner:** *"10% discount when you bring 3 or more pairs!"*

Design: Use cards with a subtle glow border. Split Adults / Kids with a toggle or clear section divider. Highlight the discount banner in pink.

#### 5. GALLERY — REAL BEFORE / AFTER PHOTOS

**All images are in the project folder — copy them into `public/gallery/` before running.**

The pairs are (before → after):

| Before file | After file | Shoe |
|---|---|---|
| `before-nike.jpeg` | `after-nike.jpeg` | Nike runner (white/red) |
| `before-timbs.jpeg` | `after-timbs.jpeg` | Custom Timberland boots |
| `before-adidas.jpeg` | `after-adidas.jpeg` | Adidas USA 84 (orange stripe) |

Extra showcase image (no "before" pair — use as a standalone spotlight card):
- `showcase-packaged.jpeg` — Jordan 1 sealed in Clean Wave Kicks branded bag (use as a "finished result" hero card with caption: *"Clean, sealed & ready for pickup"*)

Additional gallery shots (optional filler if needed): `gallery-extra-1.jpeg` through `gallery-extra-5.jpeg`

**Gallery component requirements:**
- Layout: CSS Grid, 2 columns on mobile, 3 columns on tablet+
- Each pair = one card with a **horizontal split or swipe slider** — left/dark side = "Before", right/bright side = "After"
- Use a `before/after` image slider (drag handle in the middle) — implement with pure CSS clip-path + a range input, no external library needed
- Label each card with the shoe type at the top (e.g. "Nike Runner", "Custom Timbs", "Adidas USA 84")
- The `showcase-packaged.jpeg` card spans full width at the bottom with the caption overlay
- Lazy-load all images with `loading="lazy"` on the `<img>` tags
- Add a subtle pink glow on hover to each card

#### 6. BOOKING FORM
Fields:
- Full Name (required) — **no placeholder text on this field, leave it blank. The label above the input is enough.**
- WhatsApp Number (required, SA format: 07XXXXXXXX or +27XXXXXXXXX)
- Email Address (optional)
- Drop-off Location: radio buttons → "Little Falls / Northgate" or "Request Pickup/Delivery"
- Sneaker Type: dropdown → Standard, Suede/Nubuck, Leather, Colour Restoration
- Category: Adults / Kids (toggle)
- Number of Pairs (number input, min 1)
- Turnaround: Standard (2 days - Free) / Express Same Day (+R50/pair)
- Add Delivery/Pickup? (checkbox, +R70)
- Special notes (textarea, optional)
- Calculated total shown dynamically as they fill in the form
- Submit button: **"Book My Clean"**

**On submit (Phase 1 — no backend yet):**
- Validate all required fields with Zod
- On success: open WhatsApp with a pre-filled message to +27728919458 summarising the booking details
- WhatsApp message format:
```
Hi Clean Wave Kicks! I'd like to book a clean:
Name: [name]
Sneaker type: [type]
Category: [adults/kids]
Pairs: [number]
Turnaround: [standard/express]
Drop-off: [location]
Delivery: [yes/no]
Notes: [notes]
Estimated total: R[total]
```

**Security on the form:**
- Zod schema validation on all fields
- Honeypot hidden field (spam trap)
- Disable submit button after first click (prevent double submit)
- Phone number format validation

#### 7. LOCATIONS
Two location cards:
- 📍 **Karee** — 2 Van Blerk Close, Willowbrook, Roodepoort, 1724
- 📍 **Cascades Shopping Centre** — Waterval, Little Falls

Hours: **Monday – Sunday, 09:00 – 18:00**

Each card should have a "Get Directions" button that opens Google Maps with the address.

#### 8. CONTACT / FOOTER
- WhatsApp: +27 728 919 458 (clickable `wa.me` link)
- Email: Cleanwavekicks@gmail.com (mailto link)
- Instagram: [@_cleanwavekicks](https://instagram.com/_cleanwavekicks)
- TikTok: [@cleanwavekicks](https://tiktok.com/@cleanwavekicks)
- Footer tagline: *"© 2025 Clean Wave Kicks. All rights reserved."*
- Small logo in footer

---

### SECURITY MEASURES TO IMPLEMENT NOW (frontend layer)

1. **Input validation**: Zod schema on every form field — no raw unvalidated data ever submitted
2. **Honeypot field**: Add a hidden `<input name="website" style="display:none" />` field. If it's filled in, reject the submission silently (bots fill hidden fields)
3. **Double-submit protection**: Disable the submit button immediately on first click
4. **Phone sanitization**: Strip all non-numeric characters before using the number
5. **XSS prevention**: Never use `dangerouslySetInnerHTML`. All user input rendered as text nodes only
6. **No sensitive data in URL params**: Form data never goes in the URL query string
7. **Content Security Policy headers**: Add to `next.config.js`:
```js
headers: [
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options', 
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  }
]
```

---

### FILE STRUCTURE TO CREATE

```
cleanwavekicks/
├── app/
│   ├── layout.tsx        (metadata, fonts, global styles)
│   ├── page.tsx          (main page — imports all sections)
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ValueProps.tsx
│   ├── Pricing.tsx
│   ├── Gallery.tsx        (before/after slider component)
│   ├── BookingForm.tsx
│   ├── Locations.tsx
│   └── Footer.tsx
├── lib/
│   └── booking-schema.ts  (Zod validation schema)
├── public/
│   ├── logo.jpg
│   └── gallery/
│       ├── before-nike.jpeg
│       ├── after-nike.jpeg
│       ├── before-timbs.jpeg
│       ├── after-timbs.jpeg
│       ├── before-adidas.jpeg
│       ├── after-adidas.jpeg
│       ├── showcase-packaged.jpeg
│       ├── gallery-extra-1.jpeg
│       ├── gallery-extra-2.jpeg
│       ├── gallery-extra-3.jpeg
│       ├── gallery-extra-4.jpeg
│       └── gallery-extra-5.jpeg
├── next.config.js         (with security headers)
├── tailwind.config.ts
└── package.json
```

---

### MOBILE-FIRST RULES (CRITICAL — most visitors will be on phones)

This site's primary audience is South African customers on mobile. Design for the phone first, then scale up.

- **Default breakpoint = 375px** (small Android). Everything must look great here first.
- Navbar: hamburger on mobile, full links only on `md:` and above. Hamburger should be a large tap target (min 44×44px).
- Hero: single column on mobile. Headline font size should be big but not overflow (use `clamp()` or responsive text sizes like `text-4xl md:text-6xl`).
- Pricing cards: single column stack on mobile, grid on tablet+.
- Gallery: 1 column on mobile (full-width cards), 2 columns on `sm:`, 3 on `lg:`.
- Before/after slider: must be touch-friendly — use `touchmove` event alongside `mousemove` so it works with fingers on mobile.
- Booking form: all inputs full-width on mobile. Large tap targets. No tiny dropdowns. Use `type="tel"` for phone field so mobile keyboard shows numbers.
- Floating WhatsApp button: fixed bottom-right on all screen sizes — bright green, 56px circle, always visible.
- Footer: stack everything vertically on mobile.
- Test every section at 375px width before calling it done.

---

### NOTES FOR CLAUDE CODE

**Step 1 — Scaffold the project in the CURRENT directory (do not create a subfolder):**
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"
```

**Step 2 — Install dependencies:**
```bash
npm install framer-motion react-hook-form @hookform/resolvers zod lucide-react
```

**Step 3 — Move images into place. Run these shell commands:**
```bash
mkdir -p public/gallery
cp before-nike.jpeg after-nike.jpeg before-timbs.jpeg after-timbs.jpeg before-adidas.jpeg after-adidas.jpeg showcase-packaged.jpeg public/gallery/
cp gallery-extra-1.jpeg gallery-extra-2.jpeg gallery-extra-3.jpeg gallery-extra-4.jpeg gallery-extra-5.jpeg public/gallery/ 2>/dev/null || true
cp logo.jpg public/
```

**Step 4 — Build the components** (one file at a time, mobile-first).

**Step 5 — Verify:**
```bash
npm run build
```

Other rules:
- Build mobile-first — start with 375px, then add `sm:`, `md:`, `lg:` Tailwind prefixes to scale up
- Keep all components in separate files — don't dump everything into page.tsx
- Run `npm run dev` and check on mobile viewport in browser devtools before finishing

---

### STEP 6 — DEPLOY: GitHub + Vercel

After the build passes, do the following:

**Push to GitHub:**
```bash
git init
git add .
git commit -m "feat: initial Clean Wave Kicks website"
gh repo create cleanwavekicks-website --public --source=. --push
```
> If `gh` CLI is not installed, just run `git init && git add . && git commit -m "feat: initial build"` and tell the user to manually create a repo at github.com and push.

**Vercel deployment:**
- Go to vercel.com → Add New Project → Import the `cleanwavekicks-website` GitHub repo
- Framework will auto-detect as Next.js — hit Deploy
- No environment variables needed yet (Phase 1 has no backend)

---

### PHASE 2 NOTE (do NOT build this yet — just be aware)

Binny currently gets notified only when a customer taps "Book My Clean" and it opens WhatsApp. **Phase 2 will add:**
- A `/api/booking` Vercel serverless function
- Supabase database to store every booking
- Email notification to Cleanwavekicks@gmail.com via Resend whenever a form is submitted
- This means Binny will get an email the moment any customer books, even if they never send the WhatsApp message

For now, the WhatsApp redirect is the notification system.

---

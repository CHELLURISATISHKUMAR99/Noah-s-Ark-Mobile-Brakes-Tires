# Brand Asset Brief

Status: **artwork built — awaiting visual review. Not approved.**
The direction below was approved; the SVG system in `public/assets/logo/` has been built
against it but has not been signed off.

## Selected logo direction

### "Mobile Service Shield"

A mark built around a protective shield, signalling trustworthy, professional brake and tire
service that comes to the customer.

## Required components

| Component | Intent |
| --- | --- |
| Protective shield | Core container form — safety, trust, guarantee of work |
| Wheel or tire | States the trade immediately |
| Minimal wrench | Service capability, kept restrained so it does not clutter the mark |
| Subtle forward-motion treatment | Conveys "mobile" — service that travels to the customer |

The forward-motion treatment must stay subtle. It supports the mobile promise; it should not
turn the mark into a speed or racing logo.

## Explicitly excluded

The following must **not** appear in any concept:

- ❌ Boat / ark imagery
- ❌ Animals
- ❌ Wings
- ❌ Crown
- ❌ Flames
- ❌ Cartoon imagery

> Note: despite the business name, no boat or animal imagery is to be used. The mark is
> positioned on automotive professionalism, not on a literal reading of the name.

## Approved color palette

| Role | Name | Hex |
| --- | --- | --- |
| Primary dark | Charcoal | `#16181A` |
| Light / background | Warm white | `#F5F2EA` |
| Accent | Safety orange | `#F05A28` |
| Secondary / metal | Steel gray | `#8C9298` |

```css
--color-charcoal:      #16181A;
--color-warm-white:    #F5F2EA;
--color-safety-orange: #F05A28;
--color-steel-gray:    #8C9298;
```

Charcoal and warm white carry the structure; safety orange is the single accent and should stay
scarce enough to remain an accent; steel gray supports as a metal/neutral tone.


### Contrast constraints (measured)

These WCAG ratios between the four approved colors were measured, and two of them are
unusable. The logo geometry was built specifically to avoid them.

| Pair | Ratio | Verdict |
| --- | --- | --- |
| Charcoal / Warm white | 15.91:1 | Safe anywhere |
| Charcoal / Steel gray | 5.66:1 | Safe |
| Charcoal / Safety orange | 5.25:1 | Safe |
| Warm white / Safety orange | 3.03:1 | Graphics only — never for text |
| Warm white / Steel gray | 2.81:1 | **Fails.** Never used in the system |
| Steel gray / Safety orange | 1.08:1 | **Fails.** Never placed adjacent |

Two consequences, both visible in the construction:

1. Orange on steel gray is effectively invisible, so the **wrench is sized to sit entirely inside
   the rotor's charcoal centre** and never touches the steel gray ring.
2. Steel gray on warm white fails, so the **steel gray rotor ring is always inset into a charcoal
   disc**, and the subtitle is charcoal (not gray) on light backgrounds.

---

## Logo construction

The mark is built from five concentric flat shapes on a 64 × 72 `viewBox`, all centred on
(32, 34). Everything is a filled path — there is not a single `stroke` in the system, so no line
can thin out or break when the mark is scaled.

| Layer | Geometry | Role |
| --- | --- | --- |
| Shield | Flat top, 3-unit rounded top corners, straight flanks to y=36, bezier taper to a point at (32, 66) | Protective silhouette |
| Tire ring | Annulus r 14.5 → 20.5 with a 40° gap centred on the left | Tire-shaped outer ring |
| Motion bars | Two rounded bars trailing left of the ring gap, r > 20.5 | Subtle forward motion |
| Inner disc | Disc r 12.8 | Charcoal backdrop that keeps the wrench legible in every colourway |
| Rotor ring | Annulus r 9.2 → 11.8, inset 1 unit inside the disc | Simplified brake rotor |
| Wrench | Open-end wrench, rotated 45°, scaled 0.617, max vertex radius 8.41 | The single tool element |

The forward-motion treatment is the ring gap plus two trailing bars — deliberately quiet, so the
mark reads as a service badge rather than a racing logo.

### Colourway construction

One geometry, colour-swapped. Nothing moves between variants.

| Layer | On light backgrounds | On dark backgrounds |
| --- | --- | --- |
| Shield | Charcoal | Warm white |
| Tire ring | Warm white | Charcoal |
| Inner disc | Charcoal | Charcoal |
| Rotor ring | Steel gray | Steel gray |
| Wrench | Safety orange | Safety orange |
| Motion bars | Steel gray | Steel gray |

## Approved lockups

| File | Lockup | Built for |
| --- | --- | --- |
| `logo-horizontal-dark.svg` | Shield left, name right | Light backgrounds |
| `logo-horizontal-light.svg` | Shield left, name right | Dark backgrounds |
| `logo-stacked.svg` | Shield above name | Light backgrounds |
| `logo-shield-color.svg` | Symbol only, full palette | Light or dark |
| `logo-shield-black.svg` | Symbol only, one-colour black | Single-plate reproduction |
| `logo-shield-white.svg` | Symbol only, one-colour white | Single-plate reproduction |
| `favicon.svg` | Simplified shield + ring + hub | 16–32px UI |

The wordmark is set in two lines — **NOAH'S ARK** over **MOBILE BRAKES & TIRES** — which
preserves the exact business name while keeping the lockup from becoming unusably wide.

### One-colour construction

`logo-shield-black.svg` and `logo-shield-white.svg` are each a **single `fill-rule="evenodd"`
path**. Interior detail is knocked out to the background rather than painted a second colour, so
they reproduce correctly on any surface — embroidery, vinyl, etching, single-plate print. They
also drop the inner disc, which is a colour-only construct with no meaning in one colour.

## Minimum sizes

| Asset | Minimum | Why |
| --- | --- | --- |
| Horizontal lockups | **160px wide** | Below this the second line stops resolving |
| Stacked lockup | **120px wide** | Same limit, narrower measure |
| Shield symbol | **24px wide** | Below this the rotor ring and wrench merge |
| Favicon | **16px wide** | Simplified specifically for this size |

Below 24px, use `favicon.svg` rather than shrinking the full shield.

## Clear space

Clear space is **half the shield's width** on all four sides of a lockup, and **a quarter** of it
around the shield-only mark. Because the measure is derived from the mark itself, it scales
automatically — no fixed pixel values to maintain.

Nothing enters that zone: no text, no rule lines, no photo edges, no other logos.

## Incorrect use

Do not:

- Place the dark lockup on a dark background, or the light lockup on a light one.
- Stretch, squash, or otherwise break the aspect ratio — always scale proportionally.
- Rotate or skew the mark; the shield sits square and upright.
- Recolour any part outside the four approved values, or apply the mark over a colour field that
  is not charcoal, warm white, or a photograph dark enough for the light lockup.
- Put safety orange directly against steel gray anywhere (1.08:1 — it disappears).
- Set the subtitle in steel gray on a light background (2.81:1 — it fails).
- Add gradients, shadows, glows, bevels, outlines, or distressed texture.
- Use the full-colour shield below 24px, or any lockup below its stated minimum.
- Reconstruct the mark from screenshots, or trace it from a raster export.
- Add a boat, ark, animal, wings, crown, flames, or checkered flag.
- Add a ™ or ® symbol unless a registration actually exists.
- Crowd the mark — respect the clear space.

## Known limitation: the wordmark is live text

The lockups set the business name as SVG `<text>` in a system font stack
(Helvetica Neue → Helvetica → Arial → Liberation Sans → sans-serif), because embedding an
external font was out of scope. `textLength` with `lengthAdjust="spacing"` pins each line to a
fixed width, so the lockup proportions stay stable even when the font is substituted — but the
letterforms themselves will vary slightly between macOS, Windows, and Linux.

**Before this goes to print or to any external vendor**, license a display typeface and convert
the wordmark to outlines. The skill's typography data suggests *Space Grotesk* (geometric,
uppercase-friendly, high-energy) or *Inter* 700–800 as fitting candidates for this category.

## Status

| Deliverable | Location | Status |
| --- | --- | --- |
| Primary logo (SVG) | `public/assets/logo/` | 🟡 Built — awaiting visual review |
| Monochrome variants | `public/assets/logo/` | 🟡 Built — awaiting visual review |
| Favicon | `public/assets/logo/favicon.svg` | 🟡 Built — awaiting visual review |
| Wordmark as outlines | — | ⬜ Not started (needs a licensed typeface) |
| UI icon set | `public/assets/icons/` | ⬜ Not started |

Review them at `docs/logo-preview.html`.

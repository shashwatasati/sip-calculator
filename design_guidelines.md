# Financial Calculator Suite - Design Guidelines

## Design Approach
**Reference-Based with Design System Principles**
Drawing inspiration from Groww and Zerodha Coin's clean financial interfaces while applying Material Design principles for information-dense applications. Focus on trust-building through clarity, precision, and professional presentation of financial data.

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- Trust Blue: 213 77% 44% (primary actions, headers, key metrics)
- Growth Green: 140 52% 38% (positive returns, gains, success states)
- Charcoal Text: 0 0% 13% (primary text content)

**Supporting Colors:**
- Highlight Orange: 27 100% 50% (CTAs, important alerts, step-up indicators)
- Success Green: 122 39% 49% (profit displays, positive outcomes)
- Light Background: 0 0% 98% (page background, card containers)
- White: Pure white for calculator cards and input backgrounds
- Subtle Grey: 0 0% 92% (dividers, inactive states)
- Error Red: 4 90% 58% (negative returns, warnings)

**Chart-Specific Colors:**
- Invested Amount: 213 77% 44% (blue - principal)
- Returns/Gains: 140 52% 38% (green - earnings)
- Withdrawal: 27 100% 50% (orange - outflows)

### B. Typography

**Font Stack:** 'Inter', 'Roboto', -apple-system, sans-serif

**Hierarchy:**
- Page Title: 32px/40px, font-weight 700, tracking tight
- Calculator Title: 24px/32px, font-weight 600
- Section Headers: 18px/24px, font-weight 600
- Input Labels: 14px/20px, font-weight 500, text-charcoal
- Result Values: 28px/36px, font-weight 700 (large financial figures)
- Result Labels: 14px/20px, font-weight 400, text-grey-600
- Body Text: 16px/24px, font-weight 400
- Helper Text: 13px/18px, font-weight 400, text-grey-500

### C. Layout System

**Tailwind Spacing Units:** Consistently use 2, 4, 6, 8, 12, 16, 20, 24 units
- Card padding: p-6 to p-8
- Section spacing: py-12 to py-20
- Element gaps: gap-4 to gap-6
- Input spacing: space-y-6

**Container Structure:**
- Max-width: 1280px (max-w-7xl) for main content
- Calculator cards: max-w-6xl in two-column grid (lg:grid-cols-2)
- Single calculator view: max-w-4xl centered
- Mobile: Full-width with px-4 padding

**Grid Patterns:**
- Calculator selection: 4-column grid (md:grid-cols-2 lg:grid-cols-4)
- Input/Output split: 2-column (lg:grid-cols-5, input col-span-2, results col-span-3)
- Result metrics: 3-column grid for key figures

### D. Component Library

**Navigation Header:**
- Fixed top bar with logo, calculator switcher, and download actions
- Height: 64px, white background, subtle bottom border
- Breadcrumb navigation showing active calculator

**Calculator Cards:**
- White background with rounded-xl borders, shadow-lg on hover
- Icon-based calculator type indicators (coin stack, arrow up, trending)
- Title, description, and "Calculate" button
- Subtle gradient overlay on hover state

**Input Forms:**
- Grouped in white card containers with rounded-lg borders
- Slider + number input combinations for key values
- Range sliders with visible track, primary blue fill
- Input fields: h-12, border-2, rounded-lg, focus:ring-2 with primary color
- Currency symbol prefix (₹) for monetary inputs
- Percentage suffix (%) for rate inputs
- Unit toggles (Monthly/Yearly, Years/Months)

**Result Displays:**
- Large metric cards with background gradients (blue-to-blue-light for totals, green for gains)
- Three-column layout: Total Value, Invested Amount, Estimated Returns
- Each metric: Large number (28px), label below, icon accent
- Detailed breakdown table below with year-wise projections
- Annual returns percentage badge in success green

**Charts & Visualizations:**
- Donut/Pie chart for principal vs returns ratio (left side)
- Line/Area chart for growth projection over time (right side)
- Bar chart for year-wise breakdown (SWP remaining corpus)
- Chart container: p-6, white background, rounded-lg
- Tooltips on hover with precise values
- Legend with color-coded labels

**Download Section:**
- Floating action button group (PDF + Excel) in bottom-right
- Or prominent download card below results
- Icons: download-cloud or file-text from Lucide
- Primary blue for PDF, success green for Excel

**Data Tables:**
- Striped rows for year-wise breakdown
- Headers with light grey background
- Sticky header on scroll
- Right-aligned numeric columns
- Alternate row backgrounds (white/light-grey)

**Buttons:**
- Primary: bg-trust-blue, text-white, h-11, px-6, rounded-lg, font-medium
- Secondary: border-2 border-trust-blue, text-trust-blue (outline)
- Download: bg-highlight-orange with white text
- Success: bg-growth-green for positive actions
- Hover: brightness increase + subtle shadow
- All buttons: transition-all duration-200

**Form Controls:**
- Toggle switches for comparison modes (Material Design style)
- Radio buttons for duration selection (Years/Months)
- Increment/decrement buttons for step adjusters
- Dropdown selectors with chevron indicators

### E. Interactions & Micro-animations

**Minimal Animation Strategy:**
- Real-time calculation updates (smooth number transitions)
- Chart data transitions when inputs change (300ms ease)
- Card hover elevations (transform translateY -2px)
- Slider thumb pulse on drag
- NO heavy scroll animations or parallax effects

## Special Features

**Comparison Mode:**
- Side-by-side calculator cards in split view
- Synchronized input controls option
- Comparative result metrics with difference indicators (+/- values)

**Mobile Optimization:**
- Stack all columns to single column
- Collapsible result sections with expand/collapse
- Sticky calculator type selector at top
- Bottom sheet for download options
- Touch-friendly slider controls (larger thumb size)

**Accessibility:**
- High contrast ratio (4.5:1 minimum) for all text
- ARIA labels for sliders and financial figures
- Keyboard navigation for all inputs
- Screen reader announcements for calculated results

## Images

**Hero Section:** 
No large hero image. Instead, use a subtle abstract financial graph pattern or grid texture as background (low opacity) with prominent calculator selection cards in foreground.

**Calculator Icons:**
Use icon library (Lucide or Heroicons) for:
- Coins/wallet icon for SIP
- Trending-up arrow for Step-up SIP
- Banknote/money-bag for Lump Sum
- Arrow-down-to-line for SWP
- Chart icons for visualization sections

**Decorative Elements:**
- Subtle geometric patterns in card backgrounds (very low opacity)
- Currency symbols as watermarks behind large numbers
- No stock photography - focus on data visualization clarity
# ShopStream — Mobile-First E-Commerce Order Tracking Screen

A production-ready, mobile-first **Order Tracking Screen** built with **Next.js (App Router)**, **Tailwind CSS**, **Lucide Icons**, and **TypeScript**. 

This application solves a key e-commerce UX challenge: replacing vague, generic status indicators (*Processing*, *Shipped*, *Out for Delivery*, *Delivered*) with clear, reassuring, and actionable delivery telemetry for both standard orders and critical edge-case scenarios.

---

## 🚀 Live Demo & Quick Start

### 1. Prerequisites
- Node.js 18.17+ or 20+ (tested on Node v20/v24)
- npm or yarn

### 2. Installation
```bash
# Clone or navigate to the project directory
cd vecosoft-assessment

# Install dependencies
npm install
```

### 3. Running Locally
```bash
# Start the local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the port specified in terminal output) in your browser. For the best experience, view with your browser's Mobile Device Inspector (e.g., iPhone 14 / Pixel 7 at 390px–430px width) or view the centered mobile frame on desktop.

### 4. Production Build
```bash
# Create optimized production build
npm run build

# Start production server
npm start
```
The build runs with static prerendering and zero TypeScript/lint errors, ready for 1-click deployment on **Vercel**.

---

## 🧪 Interactive Reviewer Demo Switcher

A floating **"Demo Scenario"** pill is pinned to the bottom right of the screen. Reviewers can instantly toggle between **7 different delivery scenarios and UI states**:

| # | Scenario | Key Features & UX Adaptations |
|---|---|---|
| **1** | **Normal / Active** *(Out for Delivery)* | Real-time countdown (`Arriving in ~2 hours`), animated progress bar (75%), courier assignment (`SwiftExpress - Driver Marcus V., 12 stops away`), 4-stage stepper, expandable carrier scan history, and item summary. |
| **2** | **Delayed Order** | High-visibility warning banner (`Running late by 2 days`), transparent reason explanation (*Midwest winter blizzard hold*), revised ETA date, sincere apology note, and 1-tap `$10 Delivery Guarantee Credit` claim. |
| **3** | **Delivered (Not Received)** | Proof of Delivery card with photo thumbnail modal and drop-off note (*"Behind planter pot"*). Prominent `"I didn't receive it"` button opening a guided **3-point checklist** followed by an instant missing package claim / priority dispatch check. |
| **4** | **Tracking Not Available Yet** | Friendly warehouse preparation stage (*"Dallas Logistics Center"*), estimated tracking readiness timestamp, roadmap breakdown, real-time SMS/Email notification subscription toggle, and support options. |
| **5** | **Loading State** | High-fidelity shimmer skeleton matching the exact visual card hierarchy to eliminate layout shift. |
| **6** | **Error State** | Connection failure state with clear troubleshooting copy, direct support link, and a reactive `Retry Loading Status` button. |
| **7** | **Empty / Not Found** | Order not found screen featuring an interactive order lookup bar and quick-click sample order IDs. |

---

## ✨ Features & Interactive Capabilities

### 📱 Core Screen Components
- **Color-Coded Status Badge (`StatusBadge`)**: Contextual color semantics (Emerald for Delivered, Blue for Out for Delivery, Amber for Delayed, Purple for Warehouse/Preparing, Gray for Processing) with subtle animated pulse indicators.
- **Prominent ETA Card (`EtaCard`)**: Dynamic relative arrival countdown, visual progress gauge, driver details, and tracking number with 1-tap clipboard copy.
- **Visual 4-Stage Stepper (`Timeline`)**: Clear visual distinction for *Completed* (checkmarks), *Active/Current* (pulsing highlighted badge), *Delayed* (warning badge), and *Upcoming* steps, with timestamps and contextual notes.
- **Carrier Activity Log (`TimelineDetailList`)**: Expandable carrier checkpoint timeline with city locations and facility timestamps.
- **Order & Product Summary (`OrderSummary`)**: Product thumbnails, item variants, quantity chips, line item pricing, recipient address, and special driver instructions.

### 🗂️ Interactive Modals & Bottom Sheets
- **"Contact Support" Bottom Sheet (`SupportSheet`)**:
  - **Live Support Chat**: Interactive chat simulator with realistic automated replies for driver ETA, address updates, and guarantees.
  - **Direct Carrier Call**: Formatted phone line with business hours.
  - **Priority Email Ticket**: Pre-filled support email with 2-hour SLA.
  - **FAQ Accordion**: Instant answers to top 4 common delivery questions.
- **"View Order Details & Receipt" Sheet (`OrderDetailsSheet`)**: Full itemized breakdown (Subtotal, Free Express Shipping, Promotional Discount, Sales Tax, Payment Method, and PDF Invoice download simulation).
- **"Report a Delivery Issue" Form (`IssueReportModal`)**:
  - Selectable issue types (damaged box, missing items, wrong address, driver issue, other).
  - Note textarea with character counter.
  - Mock photo upload attachment and preview.
  - Contact preference (Email / SMS).
  - Submit spinner transition followed by a confirmed Ticket Number (`#TKT-XXXXXX`) with 2-hour resolution SLA.
- **"Delivered but Not Received" Guided Flow (`MissingPackageFlow`)**: Step-by-step checklist (check concealed areas, parcel lockers, neighbors) transitioning to buyer-protection claim actions.

---

## 🎨 Design Decisions & Accessibility

1. **Mobile-First Dimensions (360px – 430px)**:
   - Designed strictly for touch ergonomics with reachable thumb zones, minimum 44px tap targets, and smooth scroll behavior.
   - On larger screens, the app renders inside an elegant centered device frame with subtle shadow framing.
2. **Visual Hierarchy & Reassurance**:
   - Order tracking is emotional—users check when they want clarity or are anxious about their package. The UI prioritizes the **ETA date/window** and **actionable status** at the very top.
   - Delay notices lead with transparency, apologies, and compensation rather than cold error codes.
3. **Accessibility (a11y)**:
   - Semantic HTML5 landmark tags (`<header>`, `<main>`, `<section>`, `role="dialog"`).
   - ARIA live regions for notifications and status badges.
   - Keyboard accessible modals with `Escape` key close handlers and body scroll locking.
   - High contrast color ratios (WCAG AAA compliant).

---

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.tsx                # Root layout, viewport metadata, fonts, mobile wrapper, ToastProvider
│   ├── page.tsx                  # Main Order Tracking screen controller & scenario state manager
│   └── globals.css               # Tailwind directives, theme variables, custom scrollbars
├── components/
│   ├── ui/
│   │   ├── BottomSheet.tsx       # Accessible touch-friendly bottom sheet drawer
│   │   ├── Modal.tsx             # Centered dialog overlay with smooth transitions
│   │   └── Toast.tsx             # Live toast notification provider & useToast hook
│   ├── tracking/
│   │   ├── OrderHeader.tsx       # Header with order ID, copy action, and status badge
│   │   ├── StatusBadge.tsx       # Semantic color-coded badge with animated pulse
│   │   ├── EtaCard.tsx           # Prominent ETA card with progress bar and driver info
│   │   ├── DelayBanner.tsx       # Delayed order alert banner with compensation claim
│   │   ├── DeliveryProofCard.tsx # Proof of delivery thumbnail, drop note, and photo modal
│   │   ├── Timeline.tsx          # 4-stage stepper with expandable carrier event logs
│   │   ├── OrderSummary.tsx      # Items thumbnail list, recipient address, and driver notes
│   │   ├── QuickActions.tsx      # Primary action bar (Support, Report Issue, Receipt)
│   │   ├── SupportSheet.tsx      # Live chat simulator, call line, email, and FAQs
│   │   ├── OrderDetailsSheet.tsx # Itemized price breakdown, taxes, payment, invoice PDF
│   │   ├── IssueReportModal.tsx  # Delivery issue report form with ticket confirmation
│   │   ├── MissingPackageFlow.tsx# Guided 3-point checklist for delivered-not-received
│   │   ├── UntrackedState.tsx    # Friendly preparation roadmap & alert subscription
│   │   ├── SkeletonLoader.tsx    # Exact-match pulse skeleton placeholder
│   │   ├── ErrorState.tsx        # Network error card with retry button
│   │   └── EmptyState.tsx        # Order not found card with order lookup search
│   └── demo/
│       └── ScenarioSwitcher.tsx  # Floating demo switcher to preview all 7 states
├── data/
│   └── mockOrders.ts             # Realistic static mock data for all scenarios & FAQs
├── types/
│   ├── order.ts                  # TypeScript types for orders, items, timeline, carrier
│   └── issue.ts                  # TypeScript types for issues, tickets, and support
└── lib/
    ├── utils.ts                  # Tailwind clsx/twMerge utility
    └── formatters.ts             # Currency, date, and time formatting helpers
```

---

## 📦 Deployment (Vercel)

This Next.js application is 100% static and client-hydrated with zero external server dependencies:
1. Push this repository to GitHub / GitLab / Bitbucket.
2. Import the project in [Vercel](https://vercel.com).
3. The default Next.js build settings (`npm run build`) will automatically deploy the site.

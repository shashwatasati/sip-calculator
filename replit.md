# Financial Calculator Suite

A comprehensive web-based SaaS application providing professional investment calculation tools for financial planning.

## Overview

This application offers four core calculators:
- **SIP Calculator**: Calculate returns on Systematic Investment Plans with monthly investments
- **SIP Step-up Calculator**: Plan investments with annual increment percentages  
- **Lump Sum Calculator**: Calculate future value of one-time investments
- **SWP Calculator**: Plan systematic withdrawals with remaining corpus projections

Each calculator features:
- Interactive input sliders with real-time calculations
- Visual charts and graphs (Recharts library)
- Year-wise breakdown tables
- Downloadable PDF and Excel reports

## Tech Stack

### Frontend
- React 18 with TypeScript
- Wouter for routing
- TanStack Query for state management
- Shadcn UI components
- Tailwind CSS for styling
- Recharts for data visualization
- jsPDF for PDF generation
- XLSX for Excel exports

### Backend
- Express.js server
- In-memory storage (MemStorage)

## Project Structure

```
client/
  src/
    components/
      calculator-card.tsx - Calculator selection cards
      input-slider.tsx - Input slider with text input combination
      result-card.tsx - Metric display cards
      breakdown-table.tsx - Year-wise breakdown tables
      download-buttons.tsx - PDF/Excel download buttons
      investment-chart.tsx - Pie chart for investment breakdown
      growth-chart.tsx - Area chart for growth projection
      ui/ - Shadcn UI components
    pages/
      home.tsx - Calculator selection page
      sip-calculator.tsx - SIP calculator
      sip-stepup-calculator.tsx - SIP Step-up calculator
      lumpsum-calculator.tsx - Lump sum calculator
      swp-calculator.tsx - SWP calculator
    lib/
      calculations.ts - Financial calculation functions
      queryClient.ts - TanStack Query configuration
shared/
  schema.ts - TypeScript types and Zod schemas
server/
  routes.ts - API routes (for future backend features)
  storage.ts - Storage interface
```

## Design System

### Colors
- Primary: Trust Blue (#1565C0 / hsl(213 77% 44%))
- Growth Green: #2E7D32 / hsl(140 52% 38%)
- Highlight Orange: #FF6F00 / hsl(27 100% 50%)
- Success Green: #4CAF50 / hsl(122 39% 49%)
- Background: Light Grey (#FAFAFA)

### Typography
- Font Family: Inter, Roboto, system fonts
- Responsive font sizes with proper hierarchy
- Font weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Layout
- Max-width: 1280px (max-w-7xl)
- Consistent spacing: 4, 6, 8, 12, 16, 20, 24 units
- Card-based layouts with rounded corners
- Responsive grid systems

## Key Features

### Calculation Accuracy
All calculations use standard financial formulas:
- SIP: FV = P × [(1 + r)^n - 1] / r × (1 + r)
- Lump Sum: FV = PV × (1 + r)^n
- SWP: Custom withdrawal calculation with monthly compounding

### Real-time Updates
- Calculations update instantly as user adjusts inputs
- Smooth transitions for data changes
- No page reloads required

### Data Visualization
- Pie charts showing principal vs returns ratio
- Area charts displaying growth over time
- Bar charts for withdrawal projections
- All charts responsive and interactive

### Export Functionality
- PDF reports with calculation summary and inputs
- Excel spreadsheets with detailed yearly breakdowns
- Both formats include all calculation parameters

## Running the Application

The application runs on a single port with Vite serving both frontend and backend:

```bash
npm run dev
```

This starts:
- Express backend server
- Vite development server for React frontend
- Both accessible at the same URL

## Future Enhancements

Potential additions for next phase:
- User authentication and saved calculations
- Calculation history
- Comparison mode for side-by-side scenarios
- Inflation adjustment options
- Tax calculation features (LTCG, STCG)
- Email functionality for reports
- Goal-based planning tools

## Design Inspiration

The interface is inspired by Groww and Zerodha Coin calculators, known for their:
- Clean, professional financial interfaces
- Clear result presentations
- Trust-building through precision
- Mobile-first responsive design

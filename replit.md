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
- Legal disclaimer for investment advice compliance
- Currency display in Indian Rupees (₹) throughout

## Tech Stack

### Frontend
- React 18 with TypeScript
- Wouter for routing
- TanStack Query for state management
- Shadcn UI components
- Tailwind CSS for styling
- Recharts for data visualization
- Lucide React for icons

### Backend
- Express.js server
- PostgreSQL database with Drizzle ORM (node-postgres driver)
- RESTful API for calculation history

## Project Structure

```
client/
  src/
    components/
      header.tsx - Global header with logo and branding
      footer.tsx - Global footer with copyright and attribution
      disclaimer.tsx - Disclaimer alert for legal compliance
      calculator-card.tsx - Calculator selection cards
      input-slider.tsx - Input slider with text input combination
      result-card.tsx - Metric display cards
      breakdown-table.tsx - Year-wise breakdown tables
      save-calculation-dialog.tsx - Dialog for saving calculations
      investment-chart.tsx - Pie chart for investment breakdown
      growth-chart.tsx - Area chart for growth projection
      ui/ - Shadcn UI components
    pages/
      home.tsx - Calculator selection page
      sip-calculator.tsx - SIP calculator
      sip-stepup-calculator.tsx - SIP Step-up calculator
      lumpsum-calculator.tsx - Lump sum calculator
      swp-calculator.tsx - SWP calculator
      comparison.tsx - Calculator comparison view
      history.tsx - Saved calculation history
    lib/
      calculations.ts - Financial calculation functions
      queryClient.ts - TanStack Query configuration
shared/
  schema.ts - TypeScript types, Zod schemas, and database models
server/
  db.ts - Database connection (Drizzle + node-postgres)
  routes.ts - API routes for saved calculations
  storage.ts - Storage interface and database operations
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

### Branding & Legal
- **Header**: Global sticky header on all pages with Calculator logo icon, "Financial Calculators by Shashwat Asati" branding, and link to shashwatasati.com
- **Footer**: Copyright notice "© 2025 shashwatasati.com" and "Made with ❤️ by Shashwat Asati" on all pages
- **Disclaimer**: Educational use disclaimer positioned at bottom of each calculator page for legal compliance
- All branding elements link to shashwatasati.com for blog traffic

### Calculation History
- Save calculations with custom names to PostgreSQL database
- View all saved calculations in history page
- Rename saved calculations inline
- Delete calculations with confirmation
- Persistent storage across sessions

### Calculator Comparison
- Compare up to 4 investment scenarios side-by-side
- Mix different calculator types in one comparison
- Independent state management for each scenario
- Add, duplicate, and remove scenarios dynamically
- Summary table showing all key metrics

## Running the Application

The application runs on a single port with Vite serving both frontend and backend:

```bash
npm run dev
```

This starts:
- Express backend server
- Vite development server for React frontend
- Both accessible at the same URL

## Database Schema

### saved_calculations
- `id` (serial): Auto-incrementing primary key
- `calculatorType` (varchar): Type of calculator (sip, sip-stepup, lumpsum, swp)
- `name` (varchar): User-provided name for the calculation
- `inputs` (json): Calculator input parameters
- `results` (json): Calculated results (derived from inputs)
- `createdAt` (timestamp): Auto-generated creation timestamp

**Note**: The Update operation only supports renaming calculations (updating the `name` field). Input/result modifications are not supported as they are formula-derived - users should create new calculations with different parameters instead.

## API Endpoints

### Saved Calculations
- `POST /api/saved-calculations` - Create new saved calculation
- `GET /api/saved-calculations` - List all saved calculations (ordered by date)
- `GET /api/saved-calculations/:id` - Get specific calculation
- `PATCH /api/saved-calculations/:id` - Update calculation name
- `DELETE /api/saved-calculations/:id` - Delete calculation

## Future Enhancements

Potential additions for next phase:
- User authentication and multi-user support
- Inflation adjustment options
- Tax calculation features (LTCG, STCG)
- Email functionality for reports
- Goal-based planning tools
- Shared calculation links

## Design Inspiration

The interface is inspired by Groww and Zerodha Coin calculators, known for their:
- Clean, professional financial interfaces
- Clear result presentations
- Trust-building through precision
- Mobile-first responsive design

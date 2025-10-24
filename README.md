# Financial Calculator Suite

A comprehensive web-based financial calculator application featuring SIP, SIP Step-up, Lump Sum, and SWP calculators. Professional styling inspired by Groww and Zerodha Coin.

## 🎯 Features

- **SIP Calculator** - Calculate returns on Systematic Investment Plans
- **SIP Step-up Calculator** - Plan investments with annual increment percentage
- **Lump Sum Calculator** - Calculate future value of one-time investments
- **SWP Calculator** - Plan systematic withdrawals with remaining corpus projections
- **Comparison Tool** - Compare multiple investment scenarios side-by-side
- **History** - Save and manage your calculations
- **Visual Charts** - Interactive graphs and year-wise breakdown tables
- **Export** - Download calculations as PDF or Excel

## 💰 FREE Deployment to Vercel

This app can be deployed to Vercel's **FREE tier** (saving $20-25/month compared to paid hosting).

### Quick Deploy

1. **See detailed guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
2. **Includes**:
   - Step-by-step Vercel setup
   - Free PostgreSQL database (Neon)
   - Custom domain configuration (`tools.shashwatasati.com`)
   - Environment variables setup
   - Troubleshooting tips

## 🚀 Local Development

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Run database migrations**:
   ```bash
   npm run db:push
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   ```
   http://localhost:5000
   ```

## 📁 Project Structure

```
client/          # React frontend
  src/
    components/  # Reusable UI components
    pages/       # Calculator pages
    lib/         # Utilities and calculations
server/          # Express backend
  routes.ts      # API endpoints
  storage.ts     # Database operations
shared/          # Shared types and schemas
  schema.ts      # Database models and Zod schemas
```

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Wouter (routing)
- TanStack Query (state management)
- Shadcn UI components
- Tailwind CSS
- Recharts (data visualization)

### Backend
- Express.js
- PostgreSQL (Drizzle ORM)
- RESTful API

## 📊 Database

Uses PostgreSQL with Drizzle ORM. Schema includes:
- **saved_calculations** - User's saved calculation history

### Migrations
```bash
# Push schema changes to database
npm run db:push

# Force push (if schema conflicts)
npm run db:push --force
```

## 🌐 Deployment

### Vercel (Recommended - FREE)

Complete deployment guide: [DEPLOYMENT.md](./DEPLOYMENT.md)

**Benefits**:
- ✅ $0/month hosting
- ✅ Free PostgreSQL database (Neon)
- ✅ Custom domain support
- ✅ Automatic HTTPS
- ✅ Auto-deploy from GitHub

### Other Platforms

Also compatible with:
- Railway
- Render  
- Netlify
- Any Node.js hosting

## 📝 Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run db:push     # Run database migrations
npm run check       # Type checking
```

## 🎨 Branding

- **Logo**: Calculator icon in trust blue (#1565C0)
- **Branding**: "Financial Calculators by Shashwat Asati"
- **Website**: shashwatasati.com
- **Domain**: tools.shashwatasati.com

## 📄 License

MIT License

## 👨‍💻 Author

**Shashwat Asati**
- Website: https://shashwatasati.com
- Tools: https://tools.shashwatasati.com

---

## 🚀 Deploy Now!

Ready to deploy for FREE? Follow the complete guide:

➡️ **[DEPLOYMENT.md - Step-by-Step Vercel Deployment](./DEPLOYMENT.md)**

Save $20-25/month with free hosting! 🎉

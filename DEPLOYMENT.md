# Deploying to Vercel (FREE Hosting)

This guide will help you deploy your Financial Calculator Suite to Vercel's **free tier** with your custom domain `tools.shashwatasati.com`.

## 💰 Cost Breakdown

- **Vercel Hosting**: $0/month (free tier)
- **Database (Neon)**: $0/month (free tier - 512MB storage)
- **Custom Domain**: Whatever you already pay for shashwatasati.com
- **Total**: $0/month 🎉

---

## 📋 Prerequisites

1. **GitHub Account** - Free at https://github.com
2. **Vercel Account** - Free at https://vercel.com (sign up with GitHub)
3. **Domain Access** - Access to shashwatasati.com DNS settings

---

## 🚀 Step-by-Step Deployment

### Step 1: Export Your Project from Replit

#### Option A: Download as ZIP
1. In Replit, click the **☰ menu** (top left)
2. Click **"Download as ZIP"**
3. Extract the ZIP file on your computer

#### Option B: Use Git (Recommended)
```bash
# In Replit Shell
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Push to GitHub

1. **Create a new repository** on GitHub:
   - Go to https://github.com/new
   - Repository name: `financial-calculator-suite`
   - Visibility: Public or Private (both work with Vercel)
   - Click **"Create repository"**

2. **Push your code** to GitHub:

   **If you downloaded ZIP:**
   ```bash
   # On your local computer
   cd path/to/extracted/folder
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/financial-calculator-suite.git
   git push -u origin main
   ```

   **If you used Replit Git:**
   ```bash
   # In Replit Shell
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/financial-calculator-suite.git
   git push -u origin main
   ```

### Step 3: Set Up Free PostgreSQL Database (Neon)

1. **Create Neon Account**:
   - Go to https://neon.tech
   - Sign up for **FREE** (no credit card required)

2. **Create Database**:
   - Click **"Create a project"**
   - Project name: `financial-calculators`
   - Region: Choose closest to your users (e.g., `AWS US East`)
   - PostgreSQL version: Latest (default)
   - Click **"Create project"**

3. **Get Connection String**:
   - After creation, you'll see a **Connection string**
   - It looks like:
     ```
     postgresql://user:password@ep-abc-123.us-east-2.aws.neon.tech/neondb?sslmode=require
     ```
   - **Copy this!** You'll need it in Step 5.

### Step 4: Deploy to Vercel

1. **Go to Vercel**:
   - Visit https://vercel.com
   - Click **"Sign Up"** and use your GitHub account

2. **Import Project**:
   - Click **"Add New..."** → **"Project"**
   - You'll see your GitHub repositories
   - Click **"Import"** on `financial-calculator-suite`

3. **Configure Build Settings**:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`

4. **Click "Deploy"** (Don't worry about environment variables yet)
   - Initial deployment will **fail** - this is expected!
   - We need to add environment variables first

### Step 5: Add Environment Variables

1. **Go to Project Settings**:
   - In Vercel dashboard, click your project
   - Go to **Settings** → **Environment Variables**

2. **Add these variables**:

   | Variable Name | Value | Notes |
   |--------------|-------|-------|
   | `DATABASE_URL` | `postgresql://user:pass@host/db` | From Neon (Step 3) |
   | `PGHOST` | `ep-abc-123.us-east-2.aws.neon.tech` | From Neon connection string |
   | `PGPORT` | `5432` | Default PostgreSQL port |
   | `PGUSER` | `your-username` | From Neon connection string |
   | `PGPASSWORD` | `your-password` | From Neon connection string |
   | `PGDATABASE` | `neondb` | Database name from Neon |
   | `SESSION_SECRET` | Generate random string | See below ⬇️ |
   | `NODE_ENV` | `production` | Production environment |

   **Generate SESSION_SECRET**:
   ```bash
   # Run this on your computer terminal
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Copy the output and paste as `SESSION_SECRET`

3. **Apply to All Environments**:
   - Check: ✅ Production
   - Check: ✅ Preview
   - Check: ✅ Development

4. **Click "Save"**

### Step 6: Run Database Migrations

1. **Go to Vercel Dashboard** → Your Project → **Settings** → **Functions**
2. Scroll to **"Serverless Function Region"** - note your region

3. **Trigger Database Migration**:
   - Option A: Redeploy (migrations run automatically)
     - Go to **Deployments** tab
     - Click **"Redeploy"** on latest deployment
   
   - Option B: Run manually from local computer:
     ```bash
     # Install dependencies
     npm install
     
     # Set environment variable (use your Neon DATABASE_URL)
     export DATABASE_URL="postgresql://user:pass@host/db"
     
     # Run migrations
     npm run db:push
     ```

### Step 7: Verify Deployment

1. **Check Deployment Status**:
   - In Vercel, go to **Deployments** tab
   - Latest deployment should show **"Ready"** ✅

2. **Visit Your App**:
   - Click the deployment URL (e.g., `financial-calculator-suite.vercel.app`)
   - Test all calculators:
     - ✅ SIP Calculator
     - ✅ SIP Step-up Calculator
     - ✅ Lump Sum Calculator
     - ✅ SWP Calculator
     - ✅ Comparison page
     - ✅ History page (save a calculation)

### Step 8: Add Custom Domain `tools.shashwatasati.com`

1. **In Vercel Dashboard**:
   - Go to your project → **Settings** → **Domains**
   - Click **"Add Domain"**
   - Enter: `tools.shashwatasati.com`
   - Click **"Add"**

2. **Vercel will show DNS configuration**:
   - You'll see either:
     - **CNAME record**: `cname.vercel-dns.com`
     - OR **A record**: IP addresses

3. **Add DNS Records** (in your domain provider):
   
   **Where to find DNS settings:**
   - Go to where you bought `shashwatasati.com` (GoDaddy, Namecheap, Cloudflare, etc.)
   - Look for **DNS Settings** or **DNS Management**

   **Add this record:**
   ```
   Type: CNAME
   Name: tools
   Value: cname.vercel-dns.com
   TTL: 3600 (or Auto)
   ```

4. **Wait for DNS Propagation**:
   - Usually takes **5-60 minutes**
   - Vercel will auto-verify and issue SSL certificate

5. **Verify Custom Domain**:
   - Visit `https://tools.shashwatasati.com`
   - Should show your app with **HTTPS** 🔒

---

## ✅ Post-Deployment Checklist

- [ ] App loads at custom domain `tools.shashwatasati.com`
- [ ] HTTPS (🔒) is working
- [ ] All 4 calculators work correctly
- [ ] Can save calculations (History page)
- [ ] Database is connected (no errors in console)
- [ ] Social sharing preview shows correct image
- [ ] Mobile favicon shows calculator icon

---

## 🐛 Troubleshooting

### Build Fails

**Error: "Build failed"**
```bash
# Check build logs in Vercel
# Common fix: Ensure all dependencies are in package.json dependencies, not devDependencies
```

**Solution:**
- Go to Vercel → Deployments → Click failed deployment → View logs
- If missing packages, ensure they're in `dependencies` (not `devDependencies`)

### Database Connection Error

**Error: "Cannot connect to database"**

**Solution:**
- Verify `DATABASE_URL` is correct (copy from Neon dashboard)
- Ensure it ends with `?sslmode=require`
- Check other `PG*` environment variables match Neon credentials

### Custom Domain Not Working

**Error: "ERR_NAME_NOT_RESOLVED"**

**Solution:**
- Wait 10-60 minutes for DNS propagation
- Check DNS settings are correct (CNAME pointing to `cname.vercel-dns.com`)
- Use https://dnschecker.org to verify DNS propagation globally

### App Works But History Not Saving

**Error: Calculations don't save**

**Solution:**
- Database migrations didn't run
- Run manually:
  ```bash
  npm install
  export DATABASE_URL="your-neon-database-url"
  npm run db:push
  ```

---

## 🔄 Future Updates

**To update your app after making changes:**

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

2. **Vercel auto-deploys**:
   - Every push to `main` branch automatically deploys
   - No manual steps needed!

---

## 💡 Tips & Best Practices

### Database Backups
- Neon free tier includes automatic backups
- Go to Neon dashboard → Your project → Backups
- Can restore to any point in last 24 hours

### Monitoring
- Vercel dashboard shows:
  - Deployment status
  - Error logs
  - Performance analytics

### Cost Optimization
- Vercel free tier limits:
  - ✅ 100GB bandwidth/month (plenty for calculator app)
  - ✅ Unlimited deployments
  - ✅ Automatic SSL certificates
- Neon free tier limits:
  - ✅ 512MB database storage
  - ✅ 100 hours compute/month (app uses very little)

---

## 🆘 Need Help?

1. **Vercel Documentation**: https://vercel.com/docs
2. **Neon Documentation**: https://neon.tech/docs
3. **GitHub Issues**: Create issue in your repository

---

## 🎉 Success!

Your Financial Calculator Suite is now:
- ✅ Hosted **FREE** on Vercel
- ✅ Using **FREE** PostgreSQL database
- ✅ Accessible at `tools.shashwatasati.com`
- ✅ Automatic HTTPS/SSL
- ✅ Auto-deploys from GitHub

**You're saving $20-25/month** compared to Replit paid hosting! 🎊

# Web Launch & Monetization Guide: Shrinkr

This guide shows you how to **host Shrinkr 100% free forever** for millions of visitors, and **how you will make money from people using it**.

---

## 💰 How You Make Money From Shrinkr

Photo & PDF compression tools (`ilovepdf`, `tinypng`, `smallpdf`) are among the **highest-earning web utilities in the world**. Here is how you monetize:

### 1. Google AdSense (Passive Ad Revenue) 💵
- Every time a user compresses a photo or PDF, they look at your screen for 5 to 15 seconds.
- We have already integrated **2 high-earning ad slots** inside `src/components/AdBanner.tsx`:
  - **Top Banner**: High visibility.
  - **Download Card Banner**: High engagement (placed right where users click to download).
- **How to activate**:
  1. Go to [https://www.google.com/adsense/](https://www.google.com/adsense/) and sign in with your Google account.
  2. Add your website URL.
  3. Once approved, open [`src/config/monetization.ts`](file:///f:/My%20projects/App%201/src/config/monetization.ts):
     - Set `enabled: true`
     - Paste your `adsenseClientId: "ca-pub-XXXXXXXXXXXXXXXX"`
  4. Google will automatically serve high-paying ads and send monthly earnings directly to your bank account!

### 2. Google Play Store AdMob (When Published as Android App) 📱
- When you upload Shrinkr to Google Play, Google AdMob displays banner or interstitial ads.
- Rewarded / Interstitial ads have an eCPM of $5–$25 per 1,000 views!

### 3. "Buy Me a Coffee" / Donations ☕
- Included in the monetization config is a donation link option (`MONETIZATION_CONFIG.donationUrl`) for users who want to tip you for providing a free, fast tool without subscriptions.

---

## 🌐 How to Launch 100% Free on the Web (Step-by-Step)

Because Shrinkr is **100% client-side** (all image/PDF compression runs inside the visitor's browser), **your server uses almost 0 bandwidth and 0 compute**. 

Hosting platforms like **Vercel** or **Cloudflare Pages** will host your site **100% free with unlimited visitors and zero monthly bills**.

### Step 1: Push Code to Your GitHub Account

Open PowerShell in `f:\My projects\App 1` and run:

```powershell
# 1. Initialize git
git init

# 2. Add all project files
git add .

# 3. Create initial commit
git commit -m "Initial commit: Shrinkr Web & Mobile App"

# 4. Create a new repository on your GitHub (e.g. name it "shrinkr")
# Then connect your remote repository and push:
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/shrinkr.git
git branch -M main
git push -u origin main
```

*(Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username)*

---

### Step 2: Deploy to Vercel in 60 Seconds (100% Free Forever)

1. Go to [https://vercel.com/signup](https://vercel.com/signup) and click **"Continue with GitHub"**.
2. On your Vercel dashboard, click **"Add New..."** ➔ **"Project"**.
3. Select your `shrinkr` repository from the list and click **"Import"**.
4. Leave all default settings as they are (Vercel will automatically detect `vite` and `dist`).
5. Click **"Deploy"**!

Within 45 seconds, your website will be live with:
- A free HTTPS address: `https://shrinkr-xxxx.vercel.app`
- Free global CDN (fast loading in USA, India, Europe, Asia, everywhere)
- Automatic updates every time you push to GitHub!

---

### Step 3: (Optional) Add a Custom Domain
You can link any custom domain (like `shrinkr.app`, `shrinkr.com`, or `shrinkr.in`) in Vercel for free under **Project Settings ➔ Domains**.

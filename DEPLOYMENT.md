# Deployment Guide - Render

This guide will help you deploy the StoreAdmin Catalog Portal to Render (free hosting).

## Prerequisites

1. A GitHub account
2. A Render account (sign up at https://render.com - it's free)

## Step 1: Push Your Code to GitHub

1. Initialize a git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit - StoreAdmin Catalog Portal"
```

2. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Create a new repository (e.g., `storeadmin-catalog-portal`)
   - Don't initialize with README, .gitignore, or license

3. Push your code to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/storeadmin-catalog-portal.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Render

1. **Sign in to Render:**
   - Go to https://render.com
   - Sign up or log in (you can use your GitHub account)

2. **Create a New Static Site:**
   - Click "New +" button
   - Select "Static Site"

3. **Connect Your Repository:**
   - Connect your GitHub account if not already connected
   - Select the repository you just created (`storeadmin-catalog-portal`)

4. **Configure the Build Settings:**
   - **Name:** `storeadmin-catalog-portal` (or any name you prefer)
   - **Branch:** `main` (or your default branch)
   - **Root Directory:** Leave empty (or `./` if required)
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
   - **Environment:** `Static`

5. **Advanced Settings (Optional):**
   - You can add environment variables if needed
   - For this app, no environment variables are required

6. **Click "Create Static Site"**

7. **Wait for Deployment:**
   - Render will automatically build and deploy your site
   - This usually takes 2-5 minutes
   - You can watch the build logs in real-time

8. **Get Your Live URL:**
   - Once deployment is complete, you'll get a URL like:
   - `https://storeadmin-catalog-portal.onrender.com`
   - Or a custom domain if you configure one

## Step 3: Configure React Router for Production

Since we're using React Router, we need to handle client-side routing. Render automatically handles this for static sites, but if you encounter 404 errors on direct navigation, you may need to add a redirect rule.

### Option 1: Using render.yaml (Recommended)
The `render.yaml` file is already included in the project. Render will use it automatically.

### Option 2: Manual Configuration
If needed, you can add a `_redirects` file in the `public` folder (but this is usually not needed for Render static sites).

## Step 4: Verify Deployment

1. Visit your deployed URL
2. Test all the features:
   - Home page loads correctly
   - Inventory page shows products
   - Catalogue page shows categories
   - Product details page works
   - Navigation between pages works

## Troubleshooting

### Build Fails
- Check the build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version (Render uses Node 18+ by default)

### 404 Errors on Direct Navigation
- This is usually handled automatically by Render for static sites
- If issues persist, contact Render support

### API Errors
- The app uses the DummyJSON API which is publicly accessible
- No CORS issues should occur as the API supports CORS

## Automatic Deployments

Render automatically deploys your site whenever you push to the connected branch (usually `main`). You can also trigger manual deployments from the Render dashboard.

## Free Tier Limitations

Render's free tier includes:
- ✅ Unlimited static sites
- ✅ Automatic SSL certificates
- ✅ Custom domains
- ✅ Automatic deployments from Git
- ⚠️ Sites may spin down after 15 minutes of inactivity (takes a few seconds to wake up)

## Alternative: Deploy to Vercel (Also Free)

If you prefer Vercel, the process is similar:

1. Go to https://vercel.com
2. Import your GitHub repository
3. Vercel auto-detects Vite/React projects
4. Click Deploy

Vercel also provides excellent free hosting with no spin-down time.

## Support

If you encounter any issues:
1. Check the build logs in Render dashboard
2. Verify your GitHub repository is public (for free tier)
3. Ensure all files are committed and pushed

---

**Your deployed application will be available at:**
`https://YOUR-APP-NAME.onrender.com`

Replace `YOUR-APP-NAME` with the name you chose during setup.


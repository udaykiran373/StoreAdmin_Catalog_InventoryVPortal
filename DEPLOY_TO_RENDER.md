# Deploy StoreAdmin to Render - Step by Step

## Your Repository
**GitHub:** https://github.com/udaykiran373/StoreAdmin_Catalog_InventoryVPortal

## 🚀 Deployment Steps

### Step 1: Verify Your Code is on GitHub
1. Go to: https://github.com/udaykiran373/StoreAdmin_Catalog_InventoryVPortal
2. Make sure all files are pushed (including `render.yaml`, `package.json`, etc.)

### Step 2: Sign Up / Login to Render
1. Go to: https://render.com
2. Click **"Get Started for Free"** or **"Sign In"**
3. Sign up using your GitHub account (recommended for easy repository access)

### Step 3: Create New Static Site
1. Once logged in, click the **"New +"** button (top right)
2. Select **"Static Site"** from the dropdown

### Step 4: Connect Your Repository
1. **Connect GitHub** (if not already connected):
   - Click "Connect account" or "Configure account"
   - Authorize Render to access your GitHub repositories
   - Select the repositories you want to deploy (or all repositories)

2. **Select Repository:**
   - Search for: `StoreAdmin_Catalog_InventoryVPortal`
   - Or: `udaykiran373/StoreAdmin_Catalog_InventoryVPortal`
   - Click on it to select

### Step 5: Configure Build Settings
Fill in the following:

- **Name:** `storeadmin-catalog-portal` (or any name you prefer)
- **Branch:** `main` (or `master` - check your default branch)
- **Root Directory:** Leave empty (or `./`)
- **Build Command:** 
  ```
  npm install && npm run build
  ```
- **Publish Directory:** 
  ```
  dist
  ```
- **Environment:** `Static` (should be selected by default)

### Step 6: Advanced Settings (Optional)
You can skip this for now, but if needed:
- **Auto-Deploy:** `Yes` (deploys on every push to main branch)
- **Pull Request Previews:** `No` (optional, for free tier)

### Step 7: Deploy!
1. Click **"Create Static Site"** button
2. Wait for the build to complete (2-5 minutes)
3. Watch the build logs in real-time

### Step 8: Get Your Live URL
Once deployment is complete:
- You'll see: **"Live"** status
- Your URL will be: `https://storeadmin-catalog-portal.onrender.com`
- Or: `https://YOUR-APP-NAME.onrender.com` (based on the name you chose)

## ✅ Verification Checklist

After deployment, verify:
- [ ] Home page loads correctly
- [ ] Inventory page shows products
- [ ] Catalogue page displays categories
- [ ] Product details page works
- [ ] Navigation between pages works
- [ ] Search functionality works
- [ ] Filtering works

## 🔗 Your Live Application

Once deployed, your application will be available at:
```
https://storeadmin-catalog-portal.onrender.com
```
(Replace with your actual Render URL)

## 📝 Important Notes

1. **First Deployment:** Takes 2-5 minutes
2. **Subsequent Deployments:** Automatic on every push to main branch
3. **Free Tier:** 
   - Sites may spin down after 15 min of inactivity
   - Takes a few seconds to wake up (first request after inactivity)
4. **Custom Domain:** You can add your own domain in Render settings later

## 🆘 Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure `package.json` exists and has correct dependencies
- Verify Node.js version (Render uses 18+ by default)

### 404 Errors
- Render handles React Router automatically
- If issues persist, check that `public/_redirects` file exists

### API Errors
- The DummyJSON API is publicly accessible
- No CORS issues should occur

## 🔄 Updating Your Site

To update your deployed site:
1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update description"
   git push origin main
   ```
3. Render will automatically detect the push and redeploy (usually takes 2-3 minutes)

## 📞 Need Help?

- **Render Docs:** https://render.com/docs
- **Render Support:** Available in dashboard
- **Build Logs:** Check in Render dashboard for detailed error messages

---

**Your Repository:** https://github.com/udaykiran373/StoreAdmin_Catalog_InventoryVPortal
**Render Dashboard:** https://dashboard.render.com


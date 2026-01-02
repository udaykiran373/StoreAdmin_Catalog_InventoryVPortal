# Quick Deployment Guide - Render

## 🚀 Fastest Way to Deploy

### Step 1: Push to GitHub (2 minutes)

```bash
# If you haven't initialized git yet
git init
git add .
git commit -m "Ready for deployment"

# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Render (3 minutes)

1. **Go to Render:** https://render.com
2. **Sign up/Login** (use GitHub for easy connection)
3. **Click "New +"** → **"Static Site"**
4. **Connect Repository:**
   - Connect GitHub if not already connected
   - Select your repository
5. **Configure:**
   - **Name:** `storeadmin-catalog-portal` (or any name)
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
6. **Click "Create Static Site"**
7. **Wait 2-5 minutes** for build to complete

### Step 3: Get Your Live URL

Once deployment completes, you'll get a URL like:
```
https://storeadmin-catalog-portal.onrender.com
```

## ✅ That's It!

Your app is now live! Render will automatically:
- ✅ Deploy on every push to main branch
- ✅ Provide free SSL certificate
- ✅ Handle routing automatically

## 📝 Notes

- **Free tier:** Sites may take a few seconds to wake up after 15 min of inactivity
- **Custom domain:** You can add your own domain in Render settings
- **Build logs:** Check the Render dashboard for any build issues

## 🆘 Troubleshooting

**Build fails?**
- Check build logs in Render dashboard
- Ensure `package.json` has all dependencies
- Verify Node.js version (Render uses 18+)

**404 on direct navigation?**
- Render handles this automatically for static sites
- If issues persist, the `public/_redirects` file is included

---

**Need more details?** See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive guide.


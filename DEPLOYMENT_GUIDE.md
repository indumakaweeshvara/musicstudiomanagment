# 🚀 Deployment Guide - Music Studio

Complete step-by-step guide to deploy your Music Studio application to production.

## 📋 Overview

We'll deploy:
- **Database:** MongoDB Atlas (Cloud)
- **Backend API:** Render.com (Free tier)
- **Frontend:** Vercel.com (Free tier)

**Total Time:** ~30-45 minutes

---

## Part 1: MongoDB Atlas Setup (10 minutes)

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** and create an account
3. Choose **FREE** tier (M0 Sandbox)

### Step 2: Create a Cluster

1. Click **"Build a Database"**
2. Choose **FREE** shared cluster
3. Select a cloud provider (AWS recommended)
4. Choose a region closest to you
5. Click **"Create Cluster"** (takes 3-5 minutes)

### Step 3: Create Database User

1. Go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **Password** authentication
4. Username: `musicstudio_admin`
5. Password: Generate a strong password (save it!)
6. User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### Step 4: Configure Network Access

1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ For production, restrict to specific IPs
4. Click **"Confirm"**

### Step 5: Get Connection String

1. Go to **Database** → Click **"Connect"**
2. Choose **"Connect your application"**
3. Driver: **Node.js**, Version: **5.5 or later**
4. Copy the connection string:
```
mongodb+srv://musicstudio_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```
5. Replace `<password>` with your actual password
6. Add database name: `/musicstudio` before the `?`

**Final connection string:**
```
mongodb+srv://musicstudio_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/musicstudio?retryWrites=true&w=majority
```

✅ **MongoDB Atlas Setup Complete!**

---

## Part 2: Backend Deployment (Render.com) (15 minutes)

### Step 1: Prepare Backend for Deployment

1. **Ensure package.json has correct scripts:**
```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
  }
}
```

2. **Create `.gitignore` in backend folder:**
```
node_modules/
dist/
.env
*.log
```

3. **Push code to GitHub** (if not already done)

### Step 2: Create Render Account

1. Go to [Render.com](https://render.com)
2. Sign up with GitHub account
3. Authorize Render to access your repositories

### Step 3: Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select the repository containing your backend
4. Configure:
   - **Name:** `music-studio-api` (or your choice)
   - **Region:** Choose closest to you
   - **Branch:** `main` (or your default branch)
   - **Root Directory:** `Music studio-BE` (if in subfolder)
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`

### Step 4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

```
MONGODB_URI = mongodb+srv://musicstudio_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/musicstudio?retryWrites=true&w=majority

JWT_SECRET = your_super_secret_jwt_key_minimum_32_characters_long_random_string

NODE_ENV = production

PORT = 5000

CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret

EMAIL_HOST = smtp.gmail.com
EMAIL_PORT = 587
EMAIL_USER = your_email@gmail.com
EMAIL_PASS = your_app_password

GEMINI_API_KEY = your_gemini_api_key
```

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Once deployed, you'll get a URL like:
   ```
   https://music-studio-api.onrender.com
   ```

### Step 6: Test Backend

Test your API:
```bash
curl https://music-studio-api.onrender.com/api/music
```

✅ **Backend Deployment Complete!**

**Save your backend URL:** `https://music-studio-api.onrender.com`

---

## Part 3: Frontend Deployment (Vercel) (10 minutes)

### Step 1: Prepare Frontend for Deployment

1. **Update `.env` with production API URL:**
```env
VITE_API_URL=https://music-studio-api.onrender.com/api
```

2. **Test build locally:**
```bash
cd "Music studio-FE/music-studio-fe"
npm run build
npm run preview
```

3. **Create `.gitignore` in frontend folder:**
```
node_modules/
dist/
.env.local
.env.production
*.log
```

4. **Push to GitHub** (if not already done)

### Step 2: Create Vercel Account

1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub account
3. Authorize Vercel to access repositories

### Step 3: Import Project

1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository
3. Select the repository
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `Music studio-FE/music-studio-fe` (if in subfolder)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Step 4: Add Environment Variable

Click **"Environment Variables"**

Add:
```
VITE_API_URL = https://music-studio-api.onrender.com/api
```

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for deployment (2-3 minutes)
3. Once deployed, you'll get a URL like:
   ```
   https://music-studio-xyz.vercel.app
   ```

### Step 6: Test Frontend

1. Visit your Vercel URL
2. Test all features:
   - Browse music
   - View packages
   - Submit contact form
   - Login to admin panel
   - Upload content (admin)

✅ **Frontend Deployment Complete!**

---

## Part 4: Post-Deployment Configuration

### Update CORS on Backend

If you get CORS errors, update backend `index.ts`:

```typescript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://music-studio-xyz.vercel.app' // Your Vercel URL
  ],
  credentials: true
}));
```

Redeploy backend on Render.

### Create Admin User

1. SSH into Render or run locally with production DB:
```bash
npx ts-node createAdmin.ts
```

2. Or manually create admin in MongoDB Atlas:
   - Go to Collections
   - Add document to `users` collection
   - Set `role: "admin"`

---

## Part 5: Update Documentation

### Update README.md

Replace placeholder URLs with actual deployment URLs:

```markdown
## 🌐 Deployed URLs

- **Frontend:** https://music-studio-xyz.vercel.app
- **Backend API:** https://music-studio-api.onrender.com
- **Admin Dashboard:** https://music-studio-xyz.vercel.app/admin
- **Database:** MongoDB Atlas (Cloud)
```

### Add Screenshots

1. Take screenshots of your deployed app
2. Add to README.md
3. Push to GitHub

---

## 🧪 Testing Checklist

Test all features in production:

### User Features
- [ ] Home page loads
- [ ] Music library displays
- [ ] Search works
- [ ] Packages page loads
- [ ] Booking form submits
- [ ] Contact form submits
- [ ] Testimonials display

### Admin Features
- [ ] Login works
- [ ] Dashboard displays stats
- [ ] Music upload works
- [ ] Music edit/delete works
- [ ] Bookings display
- [ ] Messages display

### Performance
- [ ] Pages load quickly
- [ ] Images load properly
- [ ] No console errors
- [ ] Mobile responsive

---

## 🐛 Troubleshooting

### Backend Issues

**Build fails on Render:**
- Check build logs
- Verify `package.json` scripts
- Ensure all dependencies are in `dependencies`, not `devDependencies`

**Database connection fails:**
- Verify MongoDB Atlas connection string
- Check network access (0.0.0.0/0)
- Ensure database user has correct permissions

**API returns 500 errors:**
- Check Render logs
- Verify environment variables
- Check MongoDB Atlas connection

### Frontend Issues

**Build fails on Vercel:**
- Check build logs
- Verify TypeScript errors
- Ensure all imports are correct

**API calls fail:**
- Check `VITE_API_URL` environment variable
- Verify CORS settings on backend
- Check network tab in browser

**Blank page:**
- Check browser console for errors
- Verify routing configuration
- Check build output

---

## 📊 Monitoring

### Render Dashboard
- View logs
- Monitor performance
- Check uptime

### Vercel Dashboard
- View deployment logs
- Monitor bandwidth
- Check analytics

### MongoDB Atlas
- Monitor database size
- Check connection count
- View performance metrics

---

## 🔄 Continuous Deployment

Both Render and Vercel support automatic deployments:

1. **Push to GitHub**
2. **Automatic deployment** triggers
3. **Live in 2-5 minutes**

To disable auto-deploy:
- Render: Settings → Build & Deploy
- Vercel: Settings → Git

---

## 💰 Cost Breakdown

All free tier limits:

| Service | Free Tier | Limits |
|---------|-----------|--------|
| MongoDB Atlas | 512 MB storage | Enough for development |
| Render | 750 hours/month | Sleeps after 15 min inactivity |
| Vercel | 100 GB bandwidth | Unlimited projects |

**Total Cost: $0/month** 🎉

---

## 🎓 Submission Checklist

Before submitting:

- [ ] All services deployed and working
- [ ] README.md updated with deployment URLs
- [ ] Screenshots added to documentation
- [ ] All features tested in production
- [ ] GitHub repository is public
- [ ] Commit history is clean and meaningful
- [ ] Environment variables documented
- [ ] Admin credentials created

---

## 📞 Support

If you encounter issues:

1. Check Render/Vercel logs
2. Review MongoDB Atlas metrics
3. Test API endpoints with Postman
4. Check browser console for errors

---

## 🎉 Congratulations!

Your Music Studio application is now live! 🚀

**Next Steps:**
1. Share your URLs with friends
2. Prepare for viva presentation
3. Document any challenges faced
4. Celebrate your achievement! 🎊

# 🎵 Music Studio Backend - Deployment Guide

Complete guide to deploy the backend to Render.com

## 🌐 Live Deployment

**Backend API:** https://your-backend-name.onrender.com _(Update after deployment)_

**Frontend:** https://indumakaweeshvara.github.io/musicstudiomanagment/

---

## 🚀 Quick Deploy to Render.com

### Step 1: Sign Up / Login to Render

1. Go to [render.com](https://render.com)
2. Click "Get Started for Free"
3. Sign up with your GitHub account

### Step 2: Create New Web Service

1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Connect your GitHub account if not already connected
4. Find and select your repository: **`musicstudiomanagment`**
5. Click **"Connect"**

### Step 3: Configure the Service

Render will auto-detect the `render.yaml` file. Verify these settings:

- **Name:** `music-studio-backend` (or any name you prefer)
- **Runtime:** Node
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Plan:** Free

### Step 4: Set Environment Variables

Click on "Environment" tab and add these variables:

#### Required Variables:

```
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_here_use_random_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
FRONTEND_URL=https://indumakaweeshvara.github.io/musicstudiomanagment
PORT=5000
```

#### How to Get These Values:

**MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster (if you don't have one)
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password

**JWT Secret:**
- Use any random secure string (example: `myMusicStudio2024SecretKey!@#$`)

**Cloudinary (for file uploads):**
1. Go to [Cloudinary](https://cloudinary.com)
2. Sign up for free account
3. Find Cloud Name, API Key, API Secret in dashboard

**Email (for contact form):**
1. Use Gmail account
2. Enable 2-Step Verification
3. Generate App Password: [Google Account](https://myaccount.google.com/apppasswords)
4. Use that app password (NOT your regular Gmail password)

### Step 5: Deploy!

1. Scroll to bottom
2. Click **"Create Web Service"**
3. Wait 5-10 minutes for deployment to complete
4. Your backend URL will be: `https://your-service-name.onrender.com`

---

## 🔄 Update Frontend with Backend URL

After backend is deployed:

1. Note your Render backend URL (e.g., `https://music-studio-backend-xyz.onrender.com`)

2. Go to frontend folder and create `.env.production`:
```bash
cd "Music studio-FE/music-studio-fe"
```

3. Create file `.env.production` with:
```
VITE_API_URL=https://your-actual-backend-url.onrender.com/api
```

4. Redeploy frontend:
```bash
npm run deploy
```

5. Update this README with actual backend URL

---

## 🧪 Test Your Deployment

After both are deployed:

1. Visit: https://indumakaweeshvara.github.io/musicstudiomanagment/
2. Try to register a new user
3. Try to login
4. Upload music/videos (if you set up Cloudinary)
5. Test contact form (if you set up email)

---

## 📊 Monitor Your Backend

- **Render Dashboard:** View logs, metrics, deployment status
- **Logs:** Click on your service → "Logs" tab to see real-time logs
- **Auto-Deploy:** Every `git push` will auto-deploy to Render

---

## 🔒 Security Notes

- Never commit `.env` files to git (already in `.gitignore`)
- Use strong JWT_SECRET
- Use app-specific passwords for email
- MongoDB Atlas: Whitelist Render's IP or use 0.0.0.0/0 (allow all)

---

## 💰 Free Tier Limits (Render)

- 750 hours/month free
- Goes to sleep after 15 min of inactivity
- First request after sleep takes ~30 seconds (cold start)
- Upgrade to paid plan ($7/month) for always-on service

---

## ❓ Common Issues

**Problem:** Backend not connecting to MongoDB  
**Solution:** Check MongoDB Atlas Network Access - allow connections from 0.0.0.0/0

**Problem:** CORS errors  
**Solution:** Already configured in `index.ts` - make sure FRONTEND_URL env variable is correct

**Problem:** File uploads not working  
**Solution:** Verify Cloudinary credentials are correct

**Problem:** Email not sending  
**Solution:** Use Gmail app password, not regular password

---

## 📝 Summary

| Step | Status | Notes |
|------|--------|-------|
| 1. Code on GitHub | ✅ Done | Already pushed |
| 2. Deploy to Render | ⏳ Your turn | Follow steps above |
| 3. Set ENV variables | ⏳ Your turn | Use values from services |
| 4. Update frontend | ⏳ After backend live | Redeploy with backend URL |
| 5. Test everything | ⏳ Final step | Verify all features work |

**Next:** Follow the steps above to deploy your backend! 🚀

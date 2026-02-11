# 🚀 Clerk Dashboard Quick Configuration Checklist

## Step 1: Sign In
- [ ] Go to https://dashboard.clerk.com
- [ ] Sign in with Google (marked as "Last used")
- [ ] Select application: **djflowerz-site.pages.dev**

## Step 2: Enable Authentication Methods

### Email & Password
- [ ] Navigate to: **User & Authentication** → **Email, Phone, Username**
- [ ] Enable **Email address** (set as required)
- [ ] Enable **Email verification**
- [ ] (Optional) Enable **Username**

### Social Connections (SSO)
- [ ] Navigate to: **User & Authentication** → **Social Connections**
- [ ] Click **Google** → Enable
- [ ] Click **GitHub** → Enable
- [ ] (Optional) Enable: Facebook, Apple, Microsoft

## Step 3: Configure Domains

- [ ] Navigate to: **Domains**
- [ ] Add production domain: `djflowerz-site.pages.dev`
- [ ] Add accounts domain: `accounts.djflowerz-site.pages.dev`
- [ ] Add development domain: `localhost:5173`

## Step 4: Set Up Paths

- [ ] Navigate to: **Paths**
- [ ] Sign-in path: `/sign-in`
- [ ] Sign-up path: `/sign-up`
- [ ] User profile path: `/user`
- [ ] After sign-in URL: `https://djflowerz-site.pages.dev/`
- [ ] After sign-up URL: `https://djflowerz-site.pages.dev/`

## Step 5: Configure Redirects

- [ ] Navigate to: **API Keys** → **Advanced** → **Allowed redirect URLs**
- [ ] Add: `https://djflowerz-site.pages.dev/*`
- [ ] Add: `https://accounts.djflowerz-site.pages.dev/*`
- [ ] Add: `http://localhost:5173/*`

## Step 6: Enable Account Portal (Hosted Pages)

- [ ] Navigate to: **Account Portal**
- [ ] Enable **Sign In** hosted page
- [ ] Enable **Sign Up** hosted page
- [ ] Enable **User Profile** hosted page
- [ ] Set custom domain: `accounts.djflowerz-site.pages.dev`

## Step 7: Customize Theme (Optional)

- [ ] Navigate to: **Customization** → **Theme**
- [ ] Set primary color: `#A855F7` (Purple)
- [ ] Set background: `#0B0B0F` (Dark)
- [ ] Upload DJ Flowerz logo (200x200px recommended)

## Step 8: Configure Sessions

- [ ] Navigate to: **Sessions**
- [ ] Set inactive session lifetime: **7 days**
- [ ] Set total session lifetime: **30 days**
- [ ] Enable **Multi-session support**

## Step 9: Set Up Webhooks (Optional)

- [ ] Navigate to: **Webhooks**
- [ ] Create endpoint: `https://djflowerz-site.pages.dev/api/webhooks/clerk`
- [ ] Subscribe to: `user.created`, `user.updated`, `user.deleted`
- [ ] Subscribe to: `session.created`, `session.ended`

## ✅ Verification

### Test Locally:
```bash
npm run dev
```
- [ ] Visit `http://localhost:5173/login`
- [ ] Test email/password sign-in
- [ ] Test Google OAuth
- [ ] Test GitHub OAuth
- [ ] Verify redirect back to home page
- [ ] Check user data in Firebase

### Test Production:
- [ ] Deploy to Cloudflare Pages
- [ ] Visit `https://djflowerz-site.pages.dev/login`
- [ ] Verify redirect to `accounts.djflowerz-site.pages.dev/sign-in`
- [ ] Complete sign-in
- [ ] Verify redirect back to main site
- [ ] Test admin access with `ianmuriithiflowerz@gmail.com`

## 🔑 Environment Variables (Already Configured)

```env
✅ VITE_CLERK_PUBLISHABLE_KEY=pk_live_Y2xlcmsuZGpmbG93ZXJ6LXNpdGUucGFnZXMuZGV2JA
✅ CLERK_SECRET_KEY=sk_live_REDACTED
✅ VITE_ADMIN_EMAIL=ianmuriithiflowerz@gmail.com
```

## 📱 Expected User Flow

1. **User clicks "Sign In"** → Redirects to hosted page
2. **User authenticates** (Email, Google, or GitHub)
3. **Clerk verifies credentials** → Creates session
4. **Redirects back to app** → User is signed in
5. **AuthContext syncs data** → Loads from Firebase
6. **User can access app** → Full functionality available

## 🎯 Admin Flow

1. **Admin signs in** with `ianmuriithiflowerz@gmail.com`
2. **System detects admin email** → Sets `isAdmin: true`
3. **Admin link appears** in navigation
4. **Admin can access** `/admin` dashboard
5. **Full admin privileges** granted

## 🔒 Security Features (Auto-Enabled by Clerk)

- ✅ HTTPS enforcement in production
- ✅ Secure session cookies
- ✅ Rate limiting on auth endpoints
- ✅ CSRF protection
- ✅ XSS protection
- ✅ Password strength requirements
- ✅ Email verification
- ✅ Brute force protection

## 📊 Monitoring (Available in Clerk Dashboard)

- **Active users**: Real-time user count
- **Sign-ups**: Daily/weekly/monthly metrics
- **Sign-ins**: Authentication activity
- **Failed attempts**: Security monitoring
- **Session duration**: User engagement metrics

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Redirect loop | Check redirect URLs in Clerk dashboard |
| SSO not working | Verify OAuth credentials for provider |
| User data not syncing | Check Firebase config and console errors |
| Admin access denied | Verify `VITE_ADMIN_EMAIL` matches exactly |
| 404 on auth pages | Ensure paths are configured correctly |
| CORS errors | Add domain to allowed redirect URLs |

## 📚 Quick Links

- **Clerk Dashboard**: https://dashboard.clerk.com
- **Clerk Docs**: https://clerk.com/docs
- **React SDK Docs**: https://clerk.com/docs/references/react/overview
- **OAuth Setup**: https://clerk.com/docs/authentication/social-connections/overview
- **Webhooks Guide**: https://clerk.com/docs/integrations/webhooks/overview

---

**Time to Complete**: ~15-20 minutes

**Difficulty**: ⭐⭐☆☆☆ (Easy)

**Status**: Browser already open at Clerk dashboard - Ready to configure!

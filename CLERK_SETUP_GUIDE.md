# Clerk Authentication Setup Guide

## 🎯 Overview
This guide will help you configure Clerk authentication for DJ Flowerz with SSO connections, custom sign-in/sign-up pages, and proper domain configuration.

## 📋 Prerequisites
- Clerk account (sign in at https://dashboard.clerk.com)
- Your Clerk Publishable Key: `pk_live_Y2xlcmsuZGpmbG93ZXJ6LXNpdGUucGFnZXMuZGV2JA`
- Domain: `djflowerz-site.pages.dev`
- Accounts subdomain: `accounts.djflowerz-site.pages.dev`

## 🔧 Clerk Dashboard Configuration Steps

### 1. Sign In to Clerk Dashboard
1. Go to https://dashboard.clerk.com
2. Sign in with your preferred method (Google recommended)
3. Select your application: **djflowerz-site.pages.dev**

### 2. Configure Authentication Methods

#### Navigate to: **User & Authentication** → **Email, Phone, Username**

**Enable the following:**
- ✅ **Email address** (Primary authentication)
  - Set as required
  - Enable email verification
  
- ✅ **Username** (Optional)
  - Allow users to set a username

#### Navigate to: **User & Authentication** → **Social Connections**

**Enable SSO Providers:**
- ✅ **Google** (OAuth 2.0)
  - Click "Enable"
  - Use Clerk's development credentials OR add your own OAuth credentials
  
- ✅ **GitHub** (OAuth 2.0)
  - Click "Enable"
  - Use Clerk's development credentials OR add your own OAuth credentials

- ✅ **Facebook** (Optional)
- ✅ **Apple** (Optional)
- ✅ **Microsoft** (Optional)

**Recommended Configuration:**
```
Primary: Email + Password
Social: Google, GitHub
```

### 3. Configure Domains

#### Navigate to: **Domains**

**Production Domain:**
- Primary domain: `djflowerz-site.pages.dev`
- Accounts portal: `accounts.djflowerz-site.pages.dev`

**Development Domain:**
- `localhost:5173` (for local development)

### 4. Configure Paths

#### Navigate to: **Paths**

**Sign-in path:**
```
/sign-in
```

**Sign-up path:**
```
/sign-up
```

**User profile path:**
```
/user
```

**After sign-in URL:**
```
https://djflowerz-site.pages.dev/
```

**After sign-up URL:**
```
https://djflowerz-site.pages.dev/
```

### 5. Configure Redirects

#### Navigate to: **API Keys** → **Advanced** → **Allowed redirect URLs**

Add the following URLs:
```
https://djflowerz-site.pages.dev
https://djflowerz-site.pages.dev/*
https://accounts.djflowerz-site.pages.dev
https://accounts.djflowerz-site.pages.dev/*
http://localhost:5173
http://localhost:5173/*
```

### 6. Customize Appearance (Optional)

#### Navigate to: **Customization** → **Theme**

**Brand Colors:**
- Primary color: `#A855F7` (Purple)
- Background: `#0B0B0F` (Dark)

**Logo:**
- Upload DJ Flowerz logo
- Recommended size: 200x200px

### 7. Configure Session Settings

#### Navigate to: **Sessions**

**Session lifetime:**
- Inactive: 7 days
- Total: 30 days

**Multi-session handling:**
- ✅ Enable multi-session support

### 8. Enable Hosted Pages

#### Navigate to: **Account Portal**

**Enable Clerk Hosted Pages:**
- ✅ Sign In
- ✅ Sign Up
- ✅ User Profile

**Custom Domain for Account Portal:**
```
accounts.djflowerz-site.pages.dev
```

### 9. Configure Webhooks (Optional but Recommended)

#### Navigate to: **Webhooks**

**Create endpoint:**
```
https://djflowerz-site.pages.dev/api/webhooks/clerk
```

**Subscribe to events:**
- ✅ `user.created`
- ✅ `user.updated`
- ✅ `user.deleted`
- ✅ `session.created`
- ✅ `session.ended`

## 🔑 Environment Variables

Ensure your `.env.local` has:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_live_Y2xlcmsuZGpmbG93ZXJ6LXNpdGUucGFnZXMuZGV2JA
CLERK_SECRET_KEY=sk_live_REDACTED

# Admin Email
VITE_ADMIN_EMAIL=ianmuriithiflowerz@gmail.com
```

## 🚀 Testing Your Setup

### Local Testing
1. Start your dev server: `npm run dev`
2. Navigate to `http://localhost:5173/login`
3. You should be redirected to Clerk's hosted sign-in page
4. Test sign-in with:
   - Email/Password
   - Google OAuth
   - GitHub OAuth

### Production Testing
1. Deploy to Cloudflare Pages
2. Navigate to `https://djflowerz-site.pages.dev/login`
3. Should redirect to `https://accounts.djflowerz-site.pages.dev/sign-in`
4. After sign-in, should redirect back to `https://djflowerz-site.pages.dev/`

## 🔒 Security Checklist

- ✅ Email verification enabled
- ✅ Strong password requirements
- ✅ Rate limiting enabled (Clerk default)
- ✅ HTTPS only in production
- ✅ Secure session cookies
- ✅ Admin access restricted to `ianmuriithiflowerz@gmail.com`

## 📱 User Flow

### Sign Up Flow:
1. User clicks "Sign Up" → Redirects to `accounts.djflowerz-site.pages.dev/sign-up`
2. User chooses authentication method (Email, Google, GitHub)
3. User completes sign-up
4. Redirects back to `djflowerz-site.pages.dev/`
5. User data synced to Firebase Firestore
6. User can access the application

### Sign In Flow:
1. User clicks "Sign In" → Redirects to `accounts.djflowerz-site.pages.dev/sign-in`
2. User enters credentials or uses SSO
3. Redirects back to `djflowerz-site.pages.dev/`
4. Session established
5. User data loaded from Firestore

### Admin Access:
1. Admin signs in with `ianmuriithiflowerz@gmail.com`
2. System detects admin email
3. Admin role assigned automatically
4. Admin link appears in navigation
5. Admin can access `/admin` dashboard

## 🛠️ Troubleshooting

### Issue: Redirect loop
**Solution:** Check that redirect URLs are properly configured in Clerk dashboard

### Issue: SSO not working
**Solution:** Verify OAuth credentials are set up correctly for each provider

### Issue: User data not syncing to Firestore
**Solution:** Check Firebase configuration and network requests in browser console

### Issue: Admin access not working
**Solution:** Verify `VITE_ADMIN_EMAIL` matches exactly in `.env.local`

## 📚 Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk React SDK](https://clerk.com/docs/references/react/overview)
- [Clerk Hosted Pages](https://clerk.com/docs/customization/account-portal/overview)
- [OAuth Configuration](https://clerk.com/docs/authentication/social-connections/overview)

## ✅ Completion Checklist

- [ ] Signed in to Clerk Dashboard
- [ ] Enabled Email authentication
- [ ] Enabled Google OAuth
- [ ] Enabled GitHub OAuth
- [ ] Configured production domains
- [ ] Set up redirect URLs
- [ ] Customized theme/branding
- [ ] Tested sign-up flow
- [ ] Tested sign-in flow
- [ ] Tested SSO connections
- [ ] Verified admin access
- [ ] Deployed to production

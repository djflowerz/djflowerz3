# 🚀 Quick Start Guide

## Prerequisites
- Node.js installed
- Firebase project created (flowpay-401a4)
- Clerk account configured
- Paystack account configured

## Step 1: Install Dependencies
```bash
cd "/Users/DJFLOWERZ/Downloads/dj-flowerz (3)"
npm install
```

## Step 2: Initialize Firestore Database

### Option A: Manual (Recommended)
1. Go to https://console.firebase.google.com/project/flowpay-401a4/firestore
2. Follow the instructions in `FIRESTORE_INIT_GUIDE.md`
3. Create the subscription plans, genres, and session types manually

### Option B: Automated (Requires temporary rule change)
1. Go to Firebase Console → Firestore → Rules
2. Temporarily change rules to allow all writes:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
3. Run: `npm run init-firestore`
4. **IMMEDIATELY** restore the original security rules!

## Step 3: Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Step 4: Login as Admin
1. Click "Sign In" in the header
2. Use email: `ianmuriithiflowerz@gmail.com`
3. Complete Clerk authentication
4. You'll be automatically recognized as admin

## Step 5: Access Admin Panel
1. Click "Admin" in the header (only visible to admin)
2. Or navigate to `http://localhost:5173/#/admin`

## Step 6: Add Your First Product
1. In Admin Panel → Products tab
2. Click "Add Product"
3. Upload an image (will go to Firebase Storage)
4. Fill in details
5. Save
6. Check the Store page - it should appear instantly!

## Step 7: Add Your First Mixtape
1. In Admin Panel → Mixtapes tab
2. Click "Add Mixtape"
3. Upload cover image and audio file
4. Add tracklist and metadata
5. Publish
6. Check the Mixtapes page - it should appear instantly!

## Step 8: Test Subscription Flow
1. Log out of admin account
2. Sign up as a regular user
3. Go to Music Pool page
4. Click "Subscribe"
5. Select a plan
6. You'll be redirected to Paystack payment page
7. Use Paystack test card: `4084084084084081`
8. After payment, check Firestore → subscriptions collection

## 🎯 What to Expect

### Real-Time Updates
- Add a product in admin → Instantly appears on store
- Update a mixtape → Changes reflect immediately
- Delete a track → Removed from all clients

### Data Persistence
- Refresh the page → Data remains
- Close browser → Data remains
- Open in another browser → Same data

### Admin Features
- Only `ianmuriithiflowerz@gmail.com` can access admin panel
- All other users see regular interface
- Admin can manage all content

## 📁 Project Structure

```
dj-flowerz (3)/
├── .env.local                 # Environment variables (configured)
├── lib/
│   ├── firebase.ts           # Firebase initialization
│   ├── firestore-service.ts  # Database operations
│   ├── storage-service.ts    # File uploads
│   └── paystack-service.ts   # Payment processing
├── context/
│   ├── AuthContext.tsx       # Clerk authentication
│   └── DataContext.tsx       # Firestore data management
├── scripts/
│   └── init-firestore.ts     # Database initialization
└── pages/
    ├── AdminDashboard.tsx    # Admin panel
    ├── Store.tsx             # Products page
    ├── Mixtapes.tsx          # Mixtapes page
    └── MusicPool.tsx         # Music pool page
```

## 🔍 Verification Checklist

After setup, verify:
- [ ] Can log in with Clerk
- [ ] Admin panel is accessible
- [ ] Can add products
- [ ] Can add mixtapes
- [ ] Products appear on store
- [ ] Mixtapes appear on mixtapes page
- [ ] Data persists after refresh
- [ ] Firebase Storage shows uploaded files
- [ ] Firestore shows created documents

## 🐛 Troubleshooting

### "Permission Denied" Error
- Check Firestore security rules
- Ensure you're logged in as admin
- Verify admin email in `.env.local`

### "Missing Clerk Key" Error
- Check `.env.local` has `VITE_CLERK_PUBLISHABLE_KEY`
- Restart dev server after changing `.env.local`

### Products Not Appearing
- Check browser console for errors
- Verify Firestore has `products` collection
- Check DataContext is loading data

### Firebase Storage Upload Fails
- Verify Firebase Storage rules
- Check admin authentication
- Ensure file size is reasonable

## 📚 Documentation

- **`BACKEND_INTEGRATION.md`** - Complete integration details
- **`FIRESTORE_INIT_GUIDE.md`** - Database initialization guide
- **`INTEGRATION_SUMMARY.md`** - Summary of all changes

## 🎉 You're Ready!

The application is now fully integrated with:
- ✅ Clerk authentication
- ✅ Firebase Firestore database
- ✅ Firebase Storage
- ✅ Paystack payments
- ✅ Real-time synchronization

Start adding your content and enjoy your fully functional DJ Flowerz platform!

---

**Need Help?**
- Email: djflowerz254@gmail.com
- WhatsApp: +254 789 783 258

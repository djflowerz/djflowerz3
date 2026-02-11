# Firebase Firestore Initialization Guide

Since Firestore security rules prevent direct writes from scripts, you have two options to initialize your database:

## Option 1: Manual Initialization (Recommended for First Time)

### 1. Go to Firebase Console
Visit: https://console.firebase.google.com/project/flowpay-401a4/firestore

### 2. Create Collections and Documents

#### A. Subscription Plans Collection (`subscriptionPlans`)

Create these documents:

**Document ID: `1week`**
```json
{
  "id": "1week",
  "name": "1 Week",
  "price": 200,
  "period": "1 week",
  "features": ["Access to Music Pool", "Telegram Community Access", "Weekly Drops"],
  "active": true
}
```

**Document ID: `1month`**
```json
{
  "id": "1month",
  "name": "1 Month",
  "price": 700,
  "period": "1 month",
  "features": ["Access to Music Pool", "Telegram Community Access", "Weekly Drops", "Priority Support"],
  "active": true
}
```

**Document ID: `3months`**
```json
{
  "id": "3months",
  "name": "3 Months",
  "price": 1800,
  "period": "3 months",
  "features": ["Access to Music Pool", "Telegram Community Access", "Weekly Drops", "Priority Support", "10% Discount"],
  "active": true
}
```

**Document ID: `6months`**
```json
{
  "id": "6months",
  "name": "6 Months",
  "price": 3500,
  "period": "6 months",
  "features": ["Access to Music Pool", "Telegram Community Access", "Weekly Drops", "Priority Support", "17% Discount", "Exclusive Content"],
  "active": true,
  "isBestValue": true
}
```

**Document ID: `12months`**
```json
{
  "id": "12months",
  "name": "12 Months",
  "price": 6000,
  "period": "12 months",
  "features": ["Access to Music Pool", "Telegram Community Access", "Weekly Drops", "Priority Support", "30% Discount", "Exclusive Content", "VIP Access"],
  "active": true
}
```

#### B. Genres Collection (`genres`)

**Document ID: `amapiano`**
```json
{
  "id": "amapiano",
  "name": "Amapiano",
  "coverUrl": "https://images.unsplash.com/photo-1571266028243-371695039148"
}
```

**Document ID: `afrobeats`**
```json
{
  "id": "afrobeats",
  "name": "Afrobeats",
  "coverUrl": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
}
```

**Document ID: `hiphop`**
```json
{
  "id": "hiphop",
  "name": "Hip Hop",
  "coverUrl": "https://images.unsplash.com/photo-1571266028243-371695039148"
}
```

**Document ID: `rnb`**
```json
{
  "id": "rnb",
  "name": "R&B",
  "coverUrl": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
}
```

**Document ID: `dancehall`**
```json
{
  "id": "dancehall",
  "name": "Dancehall",
  "coverUrl": "https://images.unsplash.com/photo-1571266028243-371695039148"
}
```

#### C. Session Types Collection (`sessionTypes`)

**Document ID: `voc_rec`**
```json
{
  "id": "voc_rec",
  "name": "Vocal Recording",
  "description": "Professional vocal booth session with engineer",
  "duration": 1,
  "price": 1500,
  "depositRequired": true,
  "equipmentIncluded": ["Neumann U87", "Engineer"],
  "active": true
}
```

**Document ID: `mix_mas`**
```json
{
  "id": "mix_mas",
  "name": "Mixing & Mastering",
  "description": "Full track mixing and mastering service",
  "duration": 4,
  "price": 5000,
  "depositRequired": true,
  "equipmentIncluded": ["Analog Outboard", "Pro Tools"],
  "active": true
}
```

**Document ID: `dj_prac`**
```json
{
  "id": "dj_prac",
  "name": "DJ Practice",
  "description": "Club standard setup practice session",
  "duration": 2,
  "price": 2000,
  "depositRequired": false,
  "equipmentIncluded": ["CDJ 3000s", "DJM 900"],
  "active": true
}
```

## Option 2: Temporarily Modify Security Rules

1. Go to Firebase Console → Firestore → Rules
2. Temporarily change to:
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
4. **IMPORTANT**: Restore the original security rules immediately after!

## Option 3: Use Admin Panel

Once you log in as admin (`ianmuriithiflowerz@gmail.com`), you can:
1. Add products through the admin panel
2. Add mixtapes through the admin panel
3. Add music pool tracks through the admin panel
4. The subscription plans will be loaded from the constants if Firestore is empty

## Verification

After initialization, verify in Firebase Console that you see:
- ✓ `subscriptionPlans` collection with 5 documents
- ✓ `genres` collection with 5 documents
- ✓ `sessionTypes` collection with 3 documents

## Next Steps

1. Log in with `ianmuriithiflowerz@gmail.com` to access admin panel
2. Start adding products, mixtapes, and music tracks
3. Test the payment flow
4. Deploy to production

---

**Note**: The security rules are designed to protect your data. Only use Option 2 temporarily and restore rules immediately after initialization.

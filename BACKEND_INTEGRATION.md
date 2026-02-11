# DJ Flowerz Platform - Backend Integration

This project has been integrated with real backend services replacing all dummy data.

## 🔧 Integrated Services

### 1. **Clerk Authentication**
- **Purpose**: User authentication and management
- **Admin Email**: `ianmuriithiflowerz@gmail.com`
- **Features**:
  - Sign up / Sign in
  - User profile management
  - Admin role detection
  - Session management

### 2. **Firebase**
- **Firestore Database**: Real-time data storage for all application data
- **Firebase Storage**: File storage for images, audio files, and downloads
- **Firebase Auth**: Phone verification support
- **Collections**:
  - `users` - User profiles
  - `subscriptions` - Active subscriptions
  - `products` - Store products
  - `mixtapes` - DJ mixtapes
  - `music_pool` - Music pool tracks
  - `orders` - Customer orders
  - `bookings` - Studio bookings
  - `sessionTypes` - Session types
  - `subscriptionPlans` - Subscription plans
  - `genres` - Music genres
  - And more...

### 3. **Paystack Payment Integration**
- **Purpose**: Payment processing for subscriptions and products
- **Subscription Plans**:
  - 1 Week: 200 KES
  - 1 Month: 700 KES
  - 3 Months: 1,800 KES
  - 6 Months: 3,500 KES (Best Value)
  - 12 Months: 6,000 KES
- **Features**:
  - Subscription payments
  - Product purchases
  - Payment verification
  - Webhook handling

### 4. **Neon Database** (Optional)
- **Purpose**: Additional database for advanced queries
- **API URL**: Configured in environment variables

## 📦 Installation

1. **Install Dependencies**:
```bash
npm install
```

2. **Initialize Firestore** (First time only):
```bash
npm run init-firestore
```

This will populate Firestore with:
- Subscription plans
- Music genres
- Session types

3. **Start Development Server**:
```bash
npm run dev
```

## 🔑 Environment Variables

All environment variables are already configured in `.env.local`:

- **Clerk**: Authentication keys
- **Firebase**: Project configuration
- **Paystack**: Payment keys and URLs
- **Neon**: Database API URL
- **Admin**: Admin email address
- **Subscription Plans**: Payment URLs for each plan

## 🚀 Deployment

### Firebase Setup

1. **Firestore Security Rules**: Already configured in Firebase Console
   - Users can read/write their own data
   - Admin has full access
   - Subscriptions are protected

2. **Storage Security Rules**: Already configured
   - Public read access for covers and public files
   - Admin-only write access
   - User-specific uploads for profile pictures

### Phone Verification

Firebase Phone Authentication is enabled. To use it:

1. Go to Firebase Console → Authentication → Sign-in method
2. Enable Phone provider
3. Configure reCAPTCHA settings
4. Add authorized domains

## 📱 Admin Panel

Access the admin panel at `/admin` route.

**Only the email `ianmuriithiflowerz@gmail.com` has admin access.**

### Admin Features:
- Manage products
- Upload mixtapes
- Add music pool tracks
- View orders and subscriptions
- Manage bookings
- Configure site settings
- View analytics

## 💳 Payment Flow

### Subscription Payment:
1. User selects a plan
2. Redirected to Paystack payment page
3. After payment, redirected to callback URL
4. Webhook updates subscription status in Firestore
5. User gains access to Music Pool

### Product Payment:
1. User adds products to cart
2. Proceeds to checkout
3. Payment initialized via Paystack API
4. Order created in Firestore
5. Digital products available for download

## 📊 Data Flow

### User Registration:
1. User signs up via Clerk
2. User profile created in Firestore (`users` collection)
3. Subscription status checked
4. User data synced with AuthContext

### Admin Upload (Mixtape):
1. Admin uploads cover image → Firebase Storage
2. Admin uploads audio file → Firebase Storage
3. Mixtape metadata saved to Firestore
4. Real-time update to all connected clients

### Music Pool Access:
1. User subscription checked in Firestore
2. If active, download links generated from Firebase Storage
3. Download logged in `downloads` collection

## 🔒 Security

- **Authentication**: Clerk handles all auth
- **Authorization**: Firestore rules enforce access control
- **Admin Access**: Only `ianmuriithiflowerz@gmail.com`
- **Payment Security**: Paystack handles all payment data
- **File Access**: Firebase Storage rules protect files

## 📝 Key Changes from Dummy Data

### Before (Dummy):
- Hardcoded user data in AuthContext
- Static arrays in DataContext
- No real authentication
- No payment processing
- No file storage

### After (Real Backend):
- Clerk authentication
- Firestore real-time database
- Firebase Storage for files
- Paystack payment integration
- Real-time data synchronization
- Persistent data across sessions

## 🛠️ Development

### Adding New Products:
1. Log in as admin
2. Go to Admin Panel → Products
3. Upload product image
4. Fill in product details
5. Save → Instantly available on store

### Adding Mixtapes:
1. Log in as admin
2. Go to Admin Panel → Mixtapes
3. Upload cover and audio file
4. Add tracklist and metadata
5. Publish → Instantly available

### Managing Subscriptions:
- Subscriptions are automatically managed via Paystack webhooks
- Admin can view all subscriptions in Admin Panel
- Expired subscriptions are automatically detected

## 🐛 Troubleshooting

### Authentication Issues:
- Check Clerk publishable key in `.env.local`
- Verify Clerk domain settings in Clerk Dashboard

### Firebase Issues:
- Verify Firebase config in `.env.local`
- Check Firestore security rules
- Ensure Firebase project is active

### Payment Issues:
- Verify Paystack keys (live vs test)
- Check webhook URL configuration
- Ensure callback URL is correct

## 📞 Support

For issues or questions:
- Email: djflowerz254@gmail.com
- WhatsApp: +254 789 783 258

## 🎉 Next Steps

1. Run `npm run init-firestore` to initialize the database
2. Log in with admin email to access admin panel
3. Start adding products, mixtapes, and music pool tracks
4. Test the payment flow with Paystack test cards
5. Deploy to production (Cloudflare Pages recommended)

---

**Note**: All dummy data has been replaced with real backend services. The UI/UX remains unchanged.

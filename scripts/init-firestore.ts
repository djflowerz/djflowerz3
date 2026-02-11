import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJ-yumwuCfGwxgjRhyCUIIc50_tcmEwb4",
    authDomain: "flowpay-401a4.firebaseapp.com",
    databaseURL: "https://flowpay-401a4-default-rtdb.firebaseio.com",
    projectId: "flowpay-401a4",
    storageBucket: "flowpay-401a4.firebasestorage.app",
    messagingSenderId: "990425156188",
    appId: "1:990425156188:web:0b95648801bdd2a7d3f499"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Subscription plans data
const subscriptionPlans = [
    {
        id: '1week',
        name: '1 Week',
        price: 200,
        period: '1 week',
        features: ['Access to Music Pool', 'Telegram Community Access', 'Weekly Drops'],
        active: true
    },
    {
        id: '1month',
        name: '1 Month',
        price: 700,
        period: '1 month',
        features: ['Access to Music Pool', 'Telegram Community Access', 'Weekly Drops', 'Priority Support'],
        active: true
    },
    {
        id: '3months',
        name: '3 Months',
        price: 1800,
        period: '3 months',
        features: ['Access to Music Pool', 'Telegram Community Access', 'Weekly Drops', 'Priority Support', '10% Discount'],
        active: true
    },
    {
        id: '6months',
        name: '6 Months',
        price: 3500,
        period: '6 months',
        features: ['Access to Music Pool', 'Telegram Community Access', 'Weekly Drops', 'Priority Support', '17% Discount', 'Exclusive Content'],
        active: true,
        isBestValue: true
    },
    {
        id: '12months',
        name: '12 Months',
        price: 6000,
        period: '12 months',
        features: ['Access to Music Pool', 'Telegram Community Access', 'Weekly Drops', 'Priority Support', '30% Discount', 'Exclusive Content', 'VIP Access'],
        active: true
    }
];

// Initialize subscription plans
async function initializeSubscriptionPlans() {
    console.log('Initializing subscription plans...');

    for (const plan of subscriptionPlans) {
        try {
            await setDoc(doc(db, 'subscriptionPlans', plan.id), plan);
            console.log(`✓ Created plan: ${plan.name}`);
        } catch (error) {
            console.error(`✗ Error creating plan ${plan.name}:`, error);
        }
    }

    console.log('Subscription plans initialized!');
}

// Initialize genres
const genres = [
    { id: 'amapiano', name: 'Amapiano', coverUrl: 'https://images.unsplash.com/photo-1571266028243-371695039148' },
    { id: 'afrobeats', name: 'Afrobeats', coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f' },
    { id: 'hiphop', name: 'Hip Hop', coverUrl: 'https://images.unsplash.com/photo-1571266028243-371695039148' },
    { id: 'rnb', name: 'R&B', coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f' },
    { id: 'dancehall', name: 'Dancehall', coverUrl: 'https://images.unsplash.com/photo-1571266028243-371695039148' }
];

async function initializeGenres() {
    console.log('Initializing genres...');

    for (const genre of genres) {
        try {
            await setDoc(doc(db, 'genres', genre.id), genre);
            console.log(`✓ Created genre: ${genre.name}`);
        } catch (error) {
            console.error(`✗ Error creating genre ${genre.name}:`, error);
        }
    }

    console.log('Genres initialized!');
}

// Initialize session types
const sessionTypes = [
    {
        id: 'voc_rec',
        name: 'Vocal Recording',
        description: 'Professional vocal booth session with engineer',
        duration: 1,
        price: 1500,
        depositRequired: true,
        equipmentIncluded: ['Neumann U87', 'Engineer'],
        active: true
    },
    {
        id: 'mix_mas',
        name: 'Mixing & Mastering',
        description: 'Full track mixing and mastering service',
        duration: 4,
        price: 5000,
        depositRequired: true,
        equipmentIncluded: ['Analog Outboard', 'Pro Tools'],
        active: true
    },
    {
        id: 'dj_prac',
        name: 'DJ Practice',
        description: 'Club standard setup practice session',
        duration: 2,
        price: 2000,
        depositRequired: false,
        equipmentIncluded: ['CDJ 3000s', 'DJM 900'],
        active: true
    }
];

async function initializeSessionTypes() {
    console.log('Initializing session types...');

    for (const session of sessionTypes) {
        try {
            await setDoc(doc(db, 'sessionTypes', session.id), session);
            console.log(`✓ Created session type: ${session.name}`);
        } catch (error) {
            console.error(`✗ Error creating session type ${session.name}:`, error);
        }
    }

    console.log('Session types initialized!');
}

// Main initialization function
async function initializeFirestore() {
    console.log('Starting Firestore initialization...\n');

    try {
        await initializeSubscriptionPlans();
        console.log('');
        await initializeGenres();
        console.log('');
        await initializeSessionTypes();
        console.log('\n✓ Firestore initialization complete!');
        console.log('\nYou can now:');
        console.log('1. Add products through the admin panel');
        console.log('2. Add mixtapes through the admin panel');
        console.log('3. Add music pool tracks through the admin panel');
        console.log('4. Configure site settings through the admin panel');
    } catch (error) {
        console.error('Error during initialization:', error);
    }

    process.exit(0);
}

// Run initialization
initializeFirestore();

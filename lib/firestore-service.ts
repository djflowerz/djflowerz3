import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    onSnapshot,
    Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import {
    Product,
    Mixtape,
    Track,
    Booking,
    SessionType,
    Video,
    Genre,
    StudioEquipment,
    ShippingZone,
    NewsletterSubscriber,
    Subscription,
    SubscriptionPlan,
    Order,
    User
} from '../types';

// Collection names
export const COLLECTIONS = {
    USERS: 'users',
    SUBSCRIPTIONS: 'subscriptions',
    PRODUCTS: 'products',
    MIXTAPES: 'mixtapes',
    MUSIC_POOL: 'music_pool',
    MUSIC_PACKS: 'musicPacks',
    DOWNLOADS: 'downloads',
    TIPS: 'tips',
    ADMIN_LOGS: 'adminLogs',
    SETTINGS: 'settings',
    BOOKINGS: 'bookings',
    SESSION_TYPES: 'sessionTypes',
    VIDEOS: 'videos',
    GENRES: 'genres',
    STUDIO_EQUIPMENT: 'studioEquipment',
    SHIPPING_ZONES: 'shippingZones',
    NEWSLETTER_SUBSCRIBERS: 'newsletterSubscribers',
    SUBSCRIPTION_PLANS: 'subscriptionPlans',
    ORDERS: 'orders'
};

// Generic CRUD operations
export const firestoreService = {
    // Get a single document
    async getDocument<T>(collectionName: string, docId: string): Promise<T | null> {
        try {
            const docRef = doc(db, collectionName, docId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() } as T;
            }
            return null;
        } catch (error) {
            console.error(`Error getting document from ${collectionName}:`, error);
            throw error;
        }
    },

    // Get all documents from a collection
    async getCollection<T>(collectionName: string): Promise<T[]> {
        try {
            const querySnapshot = await getDocs(collection(db, collectionName));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
        } catch (error) {
            console.error(`Error getting collection ${collectionName}:`, error);
            throw error;
        }
    },

    // Query documents with conditions
    async queryDocuments<T>(
        collectionName: string,
        conditions?: { field: string; operator: any; value: any }[],
        orderByField?: string,
        limitCount?: number
    ): Promise<T[]> {
        try {
            let q = query(collection(db, collectionName));

            if (conditions) {
                conditions.forEach(condition => {
                    q = query(q, where(condition.field, condition.operator, condition.value));
                });
            }

            if (orderByField) {
                q = query(q, orderBy(orderByField, 'desc'));
            }

            if (limitCount) {
                q = query(q, limit(limitCount));
            }

            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
        } catch (error) {
            console.error(`Error querying ${collectionName}:`, error);
            throw error;
        }
    },

    // Create or update a document
    async setDocument<T>(collectionName: string, docId: string, data: Partial<T>): Promise<void> {
        try {
            const docRef = doc(db, collectionName, docId);
            await setDoc(docRef, data, { merge: true });
        } catch (error) {
            console.error(`Error setting document in ${collectionName}:`, error);
            throw error;
        }
    },

    // Update a document
    async updateDocument<T>(collectionName: string, docId: string, data: Partial<T>): Promise<void> {
        try {
            const docRef = doc(db, collectionName, docId);
            await updateDoc(docRef, data as any);
        } catch (error) {
            console.error(`Error updating document in ${collectionName}:`, error);
            throw error;
        }
    },

    // Delete a document
    async deleteDocument(collectionName: string, docId: string): Promise<void> {
        try {
            const docRef = doc(db, collectionName, docId);
            await deleteDoc(docRef);
        } catch (error) {
            console.error(`Error deleting document from ${collectionName}:`, error);
            throw error;
        }
    },

    // Subscribe to real-time updates
    subscribeToCollection<T>(
        collectionName: string,
        callback: (data: T[]) => void,
        conditions?: { field: string; operator: any; value: any }[]
    ): () => void {
        let q = query(collection(db, collectionName));

        if (conditions) {
            conditions.forEach(condition => {
                q = query(q, where(condition.field, condition.operator, condition.value));
            });
        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
            callback(data);
        }, (error) => {
            console.error(`Error in subscription to ${collectionName}:`, error);
        });

        return unsubscribe;
    }
};

// Specific service functions for each collection
export const productService = {
    getAll: () => firestoreService.getCollection<Product>(COLLECTIONS.PRODUCTS),
    getById: (id: string) => firestoreService.getDocument<Product>(COLLECTIONS.PRODUCTS, id),
    create: (id: string, data: Partial<Product>) => firestoreService.setDocument(COLLECTIONS.PRODUCTS, id, data),
    update: (id: string, data: Partial<Product>) => firestoreService.updateDocument(COLLECTIONS.PRODUCTS, id, data),
    delete: (id: string) => firestoreService.deleteDocument(COLLECTIONS.PRODUCTS, id),
    subscribe: (callback: (data: Product[]) => void) => firestoreService.subscribeToCollection(COLLECTIONS.PRODUCTS, callback)
};

export const mixtapeService = {
    getAll: () => firestoreService.getCollection<Mixtape>(COLLECTIONS.MIXTAPES),
    getById: (id: string) => firestoreService.getDocument<Mixtape>(COLLECTIONS.MIXTAPES, id),
    create: (id: string, data: Partial<Mixtape>) => firestoreService.setDocument(COLLECTIONS.MIXTAPES, id, data),
    update: (id: string, data: Partial<Mixtape>) => firestoreService.updateDocument(COLLECTIONS.MIXTAPES, id, data),
    delete: (id: string) => firestoreService.deleteDocument(COLLECTIONS.MIXTAPES, id),
    subscribe: (callback: (data: Mixtape[]) => void) => firestoreService.subscribeToCollection(COLLECTIONS.MIXTAPES, callback)
};

export const musicPoolService = {
    getAll: () => firestoreService.getCollection<Track>(COLLECTIONS.MUSIC_POOL),
    getById: (id: string) => firestoreService.getDocument<Track>(COLLECTIONS.MUSIC_POOL, id),
    create: (id: string, data: Partial<Track>) => firestoreService.setDocument(COLLECTIONS.MUSIC_POOL, id, data),
    update: (id: string, data: Partial<Track>) => firestoreService.updateDocument(COLLECTIONS.MUSIC_POOL, id, data),
    delete: (id: string) => firestoreService.deleteDocument(COLLECTIONS.MUSIC_POOL, id),
    subscribe: (callback: (data: Track[]) => void) => firestoreService.subscribeToCollection(COLLECTIONS.MUSIC_POOL, callback)
};

export const subscriptionService = {
    getByUserId: (userId: string) => firestoreService.getDocument<Subscription>(COLLECTIONS.SUBSCRIPTIONS, userId),
    getAll: () => firestoreService.getCollection<Subscription>(COLLECTIONS.SUBSCRIPTIONS),
    create: (userId: string, data: Partial<Subscription>) => firestoreService.setDocument(COLLECTIONS.SUBSCRIPTIONS, userId, data),
    update: (userId: string, data: Partial<Subscription>) => firestoreService.updateDocument(COLLECTIONS.SUBSCRIPTIONS, userId, data),
    subscribe: (callback: (data: Subscription[]) => void) => firestoreService.subscribeToCollection(COLLECTIONS.SUBSCRIPTIONS, callback)
};

export const userService = {
    getById: (userId: string) => firestoreService.getDocument<User>(COLLECTIONS.USERS, userId),
    getAll: () => firestoreService.getCollection<User>(COLLECTIONS.USERS),
    create: (userId: string, data: Partial<User>) => firestoreService.setDocument(COLLECTIONS.USERS, userId, data),
    update: (userId: string, data: Partial<User>) => firestoreService.updateDocument(COLLECTIONS.USERS, userId, data),
    subscribe: (callback: (data: User[]) => void) => firestoreService.subscribeToCollection(COLLECTIONS.USERS, callback)
};

export const orderService = {
    getAll: () => firestoreService.getCollection<Order>(COLLECTIONS.ORDERS),
    getById: (id: string) => firestoreService.getDocument<Order>(COLLECTIONS.ORDERS, id),
    create: (id: string, data: Partial<Order>) => firestoreService.setDocument(COLLECTIONS.ORDERS, id, data),
    update: (id: string, data: Partial<Order>) => firestoreService.updateDocument(COLLECTIONS.ORDERS, id, data),
    subscribe: (callback: (data: Order[]) => void) => firestoreService.subscribeToCollection(COLLECTIONS.ORDERS, callback)
};

export const bookingService = {
    getAll: () => firestoreService.getCollection<Booking>(COLLECTIONS.BOOKINGS),
    getById: (id: string) => firestoreService.getDocument<Booking>(COLLECTIONS.BOOKINGS, id),
    create: (id: string, data: Partial<Booking>) => firestoreService.setDocument(COLLECTIONS.BOOKINGS, id, data),
    update: (id: string, data: Partial<Booking>) => firestoreService.updateDocument(COLLECTIONS.BOOKINGS, id, data),
    subscribe: (callback: (data: Booking[]) => void) => firestoreService.subscribeToCollection(COLLECTIONS.BOOKINGS, callback)
};

export const sessionTypeService = {
    getAll: () => firestoreService.getCollection<SessionType>(COLLECTIONS.SESSION_TYPES),
    create: (id: string, data: Partial<SessionType>) => firestoreService.setDocument(COLLECTIONS.SESSION_TYPES, id, data),
    update: (id: string, data: Partial<SessionType>) => firestoreService.updateDocument(COLLECTIONS.SESSION_TYPES, id, data),
    delete: (id: string) => firestoreService.deleteDocument(COLLECTIONS.SESSION_TYPES, id),
};

export const videoService = {
    getAll: () => firestoreService.getCollection<Video>(COLLECTIONS.VIDEOS),
    create: (id: string, data: Partial<Video>) => firestoreService.setDocument(COLLECTIONS.VIDEOS, id, data),
    delete: (id: string) => firestoreService.deleteDocument(COLLECTIONS.VIDEOS, id),
};

export const genreService = {
    getAll: () => firestoreService.getCollection<Genre>(COLLECTIONS.GENRES),
    update: (id: string, data: Partial<Genre>) => firestoreService.updateDocument(COLLECTIONS.GENRES, id, data),
};

export const studioEquipmentService = {
    getAll: () => firestoreService.getCollection<StudioEquipment>(COLLECTIONS.STUDIO_EQUIPMENT),
    create: (id: string, data: Partial<StudioEquipment>) => firestoreService.setDocument(COLLECTIONS.STUDIO_EQUIPMENT, id, data),
    update: (id: string, data: Partial<StudioEquipment>) => firestoreService.updateDocument(COLLECTIONS.STUDIO_EQUIPMENT, id, data),
    delete: (id: string) => firestoreService.deleteDocument(COLLECTIONS.STUDIO_EQUIPMENT, id),
};

export const shippingZoneService = {
    getAll: () => firestoreService.getCollection<ShippingZone>(COLLECTIONS.SHIPPING_ZONES),
    update: (id: string, data: Partial<ShippingZone>) => firestoreService.updateDocument(COLLECTIONS.SHIPPING_ZONES, id, data),
};

export const newsletterService = {
    getAll: () => firestoreService.getCollection<NewsletterSubscriber>(COLLECTIONS.NEWSLETTER_SUBSCRIBERS),
    create: (id: string, data: Partial<NewsletterSubscriber>) => firestoreService.setDocument(COLLECTIONS.NEWSLETTER_SUBSCRIBERS, id, data),
};

export const subscriptionPlanService = {
    getAll: () => firestoreService.getCollection<SubscriptionPlan>(COLLECTIONS.SUBSCRIPTION_PLANS),
    create: (id: string, data: Partial<SubscriptionPlan>) => firestoreService.setDocument(COLLECTIONS.SUBSCRIPTION_PLANS, id, data),
    update: (id: string, data: Partial<SubscriptionPlan>) => firestoreService.updateDocument(COLLECTIONS.SUBSCRIPTION_PLANS, id, data),
    delete: (id: string) => firestoreService.deleteDocument(COLLECTIONS.SUBSCRIPTION_PLANS, id),
};

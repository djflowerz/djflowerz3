import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, Mixtape, Booking, Track, SessionType, SiteConfig, Video, TelegramConfig, TelegramChannel, TelegramMapping, TelegramUser, TelegramLog, StudioEquipment, ShippingZone, NewsletterSubscriber, Genre, Subscription, Order, NewsletterCampaign, NewsletterSegment, SubscriptionPlan, StudioRoom, MaintenanceLog, Coupon, ReferralStats, User } from '../types';
import { PRODUCTS, FEATURED_MIXTAPES, POOL_TRACKS, YOUTUBE_VIDEOS, INITIAL_STUDIO_EQUIPMENT, INITIAL_SHIPPING_ZONES, MOCK_SUBSCRIBERS, INITIAL_GENRES, SUBSCRIPTION_PLANS } from '../constants';
import {
  productService,
  mixtapeService,
  musicPoolService,
  subscriptionService,
  userService,
  orderService,
  bookingService,
  sessionTypeService,
  videoService,
  genreService,
  studioEquipmentService,
  shippingZoneService,
  newsletterService,
  subscriptionPlanService,
  firestoreService,
  COLLECTIONS
} from '../lib/firestore-service';

// Initial Site Config Data (kept local as it's configuration)
const INITIAL_CONFIG: SiteConfig = {
  hero: {
    title: "DJ FLOWERZ",
    subtitle: "Nairobi's Premier DJ. Mixtapes, Music Pool & Merch.",
    ctaText: "Join Music Pool",
    bgImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop"
  },
  contact: {
    email: "djflowerz254@gmail.com",
    phone: "+254 789 783 258",
    whatsapp: "+254 789 783 258",
    address: "Nairobi, Kenya"
  },
  socials: {
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com"
  },
  home: {
    featuredMixtapes: { title: "Featured Mixtapes", subtitle: "Listen to the vibe before you subscribe.", ctaText: "View All" },
    musicPool: {
      title: "Unlock The Music Pool",
      description: "Get unlimited access to exclusive DJ edits, remixes, and tools. All plans include Telegram community access.",
      benefits: ['Weekly High-Quality Drops', 'Exclusive Edits & Remixes', 'Intro/Outro Clean Edits', 'Direct Telegram Access'],
      ctaText: "Unlock Access"
    },
    storePromo: { title: "Trending Merch", description: "Fresh drips and exclusive digital packs.", ctaText: "Shop All" },
    studioPromo: { title: "Bookings & Studio Sessions", description: "Need a DJ for your next event or studio time to record your hit? We provide professional services tailored to your needs.", ctaText: "Book Now" },
    tipJar: { title: "Support The Craft", message: "Enjoying the free mixes? Drop a tip to keep the servers running and the music flowing.", ctaText: "Tip Jar" }
  },
  about: {
    title: "The Man Behind The Mix",
    bio: "DJ Flowerz has been dominating the Nairobi club scene for over a decade. Known for his seamless transitions and ability to read any crowd, he has become a staple in the East African entertainment industry.",
    image: "https://images.unsplash.com/photo-1571266028243-371695039148?auto=format&fit=crop&q=80&w=1000",
    careerTimeline: [
      { year: "2015", event: "Started professional DJing in Westlands" },
      { year: "2018", event: "Launched DJ Flowerz Brand & Merch" },
      { year: "2020", event: "Founded the Music Pool Service" }
    ]
  },
  footer: {
    description: "The ultimate destination for exclusive mixtapes, premium music pool access, and official merchandise.",
    copyright: "© 2023 DJ FLOWERZ. All rights reserved."
  },
  legal: {
    terms: "These are the terms of service...",
    privacy: "We value your privacy...",
    refunds: "No refunds on digital items..."
  },
  seo: {
    siteTitle: "DJ FLOWERZ | Premium Music Experience",
    description: "Premium music platform for DJ FLOWERZ featuring mixtapes, music pool, store, and bookings.",
    keywords: "DJ, Nairobi, Music, Mixtapes, Afrobeat, Amapiano",
    ogImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04"
  }
};

// Mock data for features not yet in Firestore
const INITIAL_SESSIONS: SessionType[] = [
  { id: 'voc_rec', name: 'Vocal Recording', description: 'Professional vocal booth session with engineer', duration: 1, price: 1500, depositRequired: true, equipmentIncluded: ['Neumann U87', 'Engineer'], active: true },
  { id: 'mix_mas', name: 'Mixing & Mastering', description: 'Full track mixing and mastering service', duration: 4, price: 5000, depositRequired: true, equipmentIncluded: ['Analog Outboard', 'Pro Tools'], active: true },
  { id: 'dj_prac', name: 'DJ Practice', description: 'Club standard setup practice session', duration: 2, price: 2000, depositRequired: false, equipmentIncluded: ['CDJ 3000s', 'DJM 900'], active: true },
];

const MOCK_BOOKINGS: Booking[] = [];
const INITIAL_TG_CONFIG: TelegramConfig = { botToken: '', botUsername: '@DJFlowerzBot', status: 'Disconnected' };
const INITIAL_TG_CHANNELS: TelegramChannel[] = [];
const INITIAL_TG_MAPPINGS: TelegramMapping[] = [];
const INITIAL_TG_USERS: TelegramUser[] = [];
const INITIAL_TG_LOGS: TelegramLog[] = [];
const INITIAL_STUDIO_ROOMS: StudioRoom[] = [];
const INITIAL_MAINTENANCE_LOGS: MaintenanceLog[] = [];
const MOCK_CAMPAIGNS: NewsletterCampaign[] = [];
const MOCK_SEGMENTS: NewsletterSegment[] = [];
const INITIAL_COUPONS: Coupon[] = [];
const INITIAL_REFERRALS: ReferralStats[] = [];

interface DataContextType {
  // Data
  siteConfig: SiteConfig;
  products: Product[];
  mixtapes: Mixtape[];
  bookings: Booking[];
  sessionTypes: SessionType[];
  youtubeVideos: Video[];
  poolTracks: Track[];
  genres: Genre[];
  studioEquipment: StudioEquipment[];
  shippingZones: ShippingZone[];
  subscribers: NewsletterSubscriber[];
  subscriptions: Subscription[];
  subscriptionPlans: SubscriptionPlan[];
  studioRooms: StudioRoom[];
  maintenanceLogs: MaintenanceLog[];
  orders: Order[];
  newsletterCampaigns: NewsletterCampaign[];
  newsletterSegments: NewsletterSegment[];
  coupons: Coupon[];
  referralStats: ReferralStats[];
  users: User[];
  loading: boolean;

  // Telegram Data
  telegramConfig: TelegramConfig;
  telegramChannels: TelegramChannel[];
  telegramMappings: TelegramMapping[];
  telegramUsers: TelegramUser[];
  telegramLogs: TelegramLog[];

  // Actions
  updateSiteConfig: (data: Partial<SiteConfig>) => void;

  addProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  addMixtape: (mixtape: Mixtape) => Promise<void>;
  updateMixtape: (id: string, data: Partial<Mixtape>) => Promise<void>;
  deleteMixtape: (id: string) => Promise<void>;

  addPoolTrack: (track: Track) => Promise<void>;
  updatePoolTrack: (id: string, data: Partial<Track>) => Promise<void>;
  deletePoolTrack: (id: string) => Promise<void>;

  updateGenre: (id: string, data: Partial<Genre>) => Promise<void>;

  addBooking: (booking: Booking) => Promise<void>;
  updateBooking: (id: string, data: Partial<Booking>) => Promise<void>;

  addSessionType: (session: SessionType) => Promise<void>;
  updateSessionType: (id: string, data: Partial<SessionType>) => Promise<void>;
  deleteSessionType: (id: string) => Promise<void>;

  addVideo: (video: Video) => void;
  deleteVideo: (id: string) => void;

  addStudioEquipment: (equipment: StudioEquipment) => void;
  updateStudioEquipment: (id: string, data: Partial<StudioEquipment>) => void;
  deleteStudioEquipment: (id: string) => void;

  addSubscription: (sub: Subscription) => Promise<void>;
  updateSubscription: (id: string, data: Partial<Subscription>) => Promise<void>;
  addSubscriptionPlan: (plan: SubscriptionPlan) => Promise<void>;
  updateSubscriptionPlan: (id: string, data: Partial<SubscriptionPlan>) => Promise<void>;
  deleteSubscriptionPlan: (id: string) => Promise<void>;

  addStudioRoom: (room: StudioRoom) => void;
  updateStudioRoom: (id: string, data: Partial<StudioRoom>) => void;
  deleteStudioRoom: (id: string) => void;
  addMaintenanceLog: (log: MaintenanceLog) => void;
  updateMaintenanceLog: (id: string, data: Partial<MaintenanceLog>) => void;

  updateOrder: (id: string, data: Partial<Order>) => Promise<void>;

  addCampaign: (camp: NewsletterCampaign) => void;
  updateCampaign: (id: string, data: Partial<NewsletterCampaign>) => void;

  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (id: string, data: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;

  updateTelegramConfig: (config: Partial<TelegramConfig>) => void;
  addTelegramChannel: (channel: TelegramChannel) => void;
  updateTelegramChannel: (id: string, data: Partial<TelegramChannel>) => void;
  deleteTelegramChannel: (id: string) => void;

  updateShippingZone: (id: string, data: Partial<ShippingZone>) => void;
  addSubscriber: (email: string) => Promise<void>;

  updateUser: (id: string, data: Partial<User>) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [products, setProducts] = useState<Product[]>([]);
  const [mixtapes, setMixtapes] = useState<Mixtape[]>([]);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [sessionTypes, setSessionTypes] = useState<SessionType[]>(INITIAL_SESSIONS);
  const [youtubeVideos, setYoutubeVideos] = useState<Video[]>(YOUTUBE_VIDEOS);
  const [poolTracks, setPoolTracks] = useState<Track[]>([]);
  const [genres, setGenres] = useState<Genre[]>(INITIAL_GENRES);
  const [studioEquipment, setStudioEquipment] = useState<StudioEquipment[]>(INITIAL_STUDIO_EQUIPMENT);
  const [shippingZones, setShippingZones] = useState<ShippingZone[]>(INITIAL_SHIPPING_ZONES);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(MOCK_SUBSCRIBERS);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [newsletterCampaigns, setNewsletterCampaigns] = useState<NewsletterCampaign[]>(MOCK_CAMPAIGNS);
  const [newsletterSegments, setNewsletterSegments] = useState<NewsletterSegment[]>(MOCK_SEGMENTS);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // New States
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
  const [studioRooms, setStudioRooms] = useState<StudioRoom[]>(INITIAL_STUDIO_ROOMS);
  const [maintenanceLogs, setMaintenanceLogs] = useState<MaintenanceLog[]>(INITIAL_MAINTENANCE_LOGS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [referralStats, setReferralStats] = useState<ReferralStats[]>(INITIAL_REFERRALS);

  // Telegram State
  const [telegramConfig, setTelegramConfig] = useState<TelegramConfig>(INITIAL_TG_CONFIG);
  const [telegramChannels, setTelegramChannels] = useState<TelegramChannel[]>(INITIAL_TG_CHANNELS);
  const [telegramMappings, setTelegramMappings] = useState<TelegramMapping[]>(INITIAL_TG_MAPPINGS);
  const [telegramUsers, setTelegramUsers] = useState<TelegramUser[]>(INITIAL_TG_USERS);
  const [telegramLogs, setTelegramLogs] = useState<TelegramLog[]>(INITIAL_TG_LOGS);

  // Load data from Firestore on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Load all data in parallel
        const [
          productsData,
          mixtapesData,
          poolTracksData,
          subscriptionsData,
          ordersData,
          usersData,
          subscriptionPlansData,
          genresData,
          sessionTypesData
        ] = await Promise.all([
          productService.getAll().catch(() => PRODUCTS), // Fallback to constants if Firestore is empty
          mixtapeService.getAll().catch(() => FEATURED_MIXTAPES),
          musicPoolService.getAll().catch(() => POOL_TRACKS),
          subscriptionService.getAll().catch(() => []),
          orderService.getAll().catch(() => []),
          userService.getAll().catch(() => []),
          subscriptionPlanService.getAll().catch(() => SUBSCRIPTION_PLANS.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            period: p.period,
            features: p.features,
            active: true,
            isBestValue: (p as any).isBestValue
          }))),
          genreService.getAll().catch(() => INITIAL_GENRES),
          sessionTypeService.getAll().catch(() => INITIAL_SESSIONS)
        ]);

        setProducts(productsData);
        setMixtapes(mixtapesData);
        setPoolTracks(poolTracksData);
        setSubscriptions(subscriptionsData);
        setOrders(ordersData);
        setUsers(usersData);
        setSubscriptionPlans(subscriptionPlansData);
        setGenres(genresData);
        setSessionTypes(sessionTypesData);

        // Set up real-time listeners
        const unsubscribeProducts = productService.subscribe(setProducts);
        const unsubscribeMixtapes = mixtapeService.subscribe(setMixtapes);
        const unsubscribePoolTracks = musicPoolService.subscribe(setPoolTracks);
        const unsubscribeSubscriptions = subscriptionService.subscribe(setSubscriptions);
        const unsubscribeOrders = orderService.subscribe(setOrders);
        const unsubscribeUsers = userService.subscribe(setUsers);

        return () => {
          unsubscribeProducts();
          unsubscribeMixtapes();
          unsubscribePoolTracks();
          unsubscribeSubscriptions();
          unsubscribeOrders();
          unsubscribeUsers();
        };
      } catch (error) {
        console.error('Error loading data from Firestore:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Actions
  const updateSiteConfig = (data: Partial<SiteConfig>) => setSiteConfig(prev => ({ ...prev, ...data }));

  // Product actions
  const addProduct = async (product: Product) => {
    await productService.create(product.id, product);
  };

  const updateProduct = async (id: string, data: Partial<Product>) => {
    await productService.update(id, data);
  };

  const deleteProduct = async (id: string) => {
    await productService.delete(id);
  };

  // Mixtape actions
  const addMixtape = async (mixtape: Mixtape) => {
    await mixtapeService.create(mixtape.id, mixtape);
  };

  const updateMixtape = async (id: string, data: Partial<Mixtape>) => {
    await mixtapeService.update(id, data);
  };

  const deleteMixtape = async (id: string) => {
    await mixtapeService.delete(id);
  };

  // Pool track actions
  const addPoolTrack = async (track: Track) => {
    await musicPoolService.create(track.id, track);
  };

  const updatePoolTrack = async (id: string, data: Partial<Track>) => {
    await musicPoolService.update(id, data);
  };

  const deletePoolTrack = async (id: string) => {
    await musicPoolService.delete(id);
  };

  const updateGenre = async (id: string, data: Partial<Genre>) => {
    await genreService.update(id, data);
  };

  // Booking actions
  const addBooking = async (booking: Booking) => {
    await bookingService.create(booking.id, booking);
    setBookings(prev => [booking, ...prev]);
  };

  const updateBooking = async (id: string, data: Partial<Booking>) => {
    await bookingService.update(id, data);
    setBookings(prev => prev.map(b => b.id === id ? { ...b, ...data } : b));
  };

  // Session type actions
  const addSessionType = async (session: SessionType) => {
    await sessionTypeService.create(session.id, session);
    setSessionTypes(prev => [session, ...prev]);
  };

  const updateSessionType = async (id: string, data: Partial<SessionType>) => {
    await sessionTypeService.update(id, data);
    setSessionTypes(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  };

  const deleteSessionType = async (id: string) => {
    await sessionTypeService.delete(id);
    setSessionTypes(prev => prev.filter(s => s.id !== id));
  };

  // Video actions (local only for now)
  const addVideo = (video: Video) => setYoutubeVideos(prev => [video, ...prev]);
  const deleteVideo = (id: string) => setYoutubeVideos(prev => prev.filter(v => v.id !== id));

  // Studio equipment actions (local only for now)
  const addStudioEquipment = (equipment: StudioEquipment) => setStudioEquipment(prev => [equipment, ...prev]);
  const updateStudioEquipment = (id: string, data: Partial<StudioEquipment>) => setStudioEquipment(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
  const deleteStudioEquipment = (id: string) => setStudioEquipment(prev => prev.filter(e => e.id !== id));

  // Subscription actions
  const addSubscription = async (sub: Subscription) => {
    await subscriptionService.create(sub.userId, sub);
  };

  const updateSubscription = async (id: string, data: Partial<Subscription>) => {
    await subscriptionService.update(id, data);
  };

  const addSubscriptionPlan = async (plan: SubscriptionPlan) => {
    await subscriptionPlanService.create(plan.id, plan);
    setSubscriptionPlans(prev => [plan, ...prev]);
  };

  const updateSubscriptionPlan = async (id: string, data: Partial<SubscriptionPlan>) => {
    await subscriptionPlanService.update(id, data);
    setSubscriptionPlans(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const deleteSubscriptionPlan = async (id: string) => {
    await subscriptionPlanService.delete(id);
    setSubscriptionPlans(prev => prev.filter(p => p.id !== id));
  };

  // Studio rooms & maintenance (local only for now)
  const addStudioRoom = (room: StudioRoom) => setStudioRooms(prev => [room, ...prev]);
  const updateStudioRoom = (id: string, data: Partial<StudioRoom>) => setStudioRooms(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
  const deleteStudioRoom = (id: string) => setStudioRooms(prev => prev.filter(r => r.id !== id));
  const addMaintenanceLog = (log: MaintenanceLog) => setMaintenanceLogs(prev => [log, ...prev]);
  const updateMaintenanceLog = (id: string, data: Partial<MaintenanceLog>) => setMaintenanceLogs(prev => prev.map(l => l.id === id ? { ...l, ...data } : l));

  // Order actions
  const updateOrder = async (id: string, data: Partial<Order>) => {
    await orderService.update(id, data);
  };

  // Newsletter actions (local only for now)
  const addCampaign = (camp: NewsletterCampaign) => setNewsletterCampaigns(prev => [camp, ...prev]);
  const updateCampaign = (id: string, data: Partial<NewsletterCampaign>) => setNewsletterCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));

  // Marketing actions (local only for now)
  const addCoupon = (coupon: Coupon) => setCoupons(prev => [coupon, ...prev]);
  const updateCoupon = (id: string, data: Partial<Coupon>) => setCoupons(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
  const deleteCoupon = (id: string) => setCoupons(prev => prev.filter(c => c.id !== id));

  // Telegram actions (local only for now)
  const updateTelegramConfig = (config: Partial<TelegramConfig>) => setTelegramConfig(prev => ({ ...prev, ...config }));
  const addTelegramChannel = (channel: TelegramChannel) => setTelegramChannels(prev => [channel, ...prev]);
  const updateTelegramChannel = (id: string, data: Partial<TelegramChannel>) => setTelegramChannels(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
  const deleteTelegramChannel = (id: string) => setTelegramChannels(prev => prev.filter(c => c.id !== id));

  // Shipping & newsletter actions (local only for now)
  const updateShippingZone = (id: string, data: Partial<ShippingZone>) => setShippingZones(prev => prev.map(z => z.id === id ? { ...z, ...data } : z));
  const addSubscriber = async (email: string) => {
    const subscriber = {
      id: `sub_${Date.now()}`,
      email,
      dateSubscribed: new Date().toISOString().split('T')[0],
      status: 'active' as const,
      source: 'Manual'
    };
    await newsletterService.create(subscriber.id, subscriber);
    setSubscribers(prev => [subscriber, ...prev]);
  };

  // User actions
  const updateUser = async (id: string, data: Partial<User>) => {
    await userService.update(id, data);
  };

  return (
    <DataContext.Provider value={{
      siteConfig, products, mixtapes, bookings, sessionTypes, youtubeVideos, poolTracks, genres, studioEquipment, shippingZones, subscribers, subscriptions, orders, newsletterCampaigns, newsletterSegments,
      subscriptionPlans, studioRooms, maintenanceLogs, coupons, referralStats, users, loading,
      telegramConfig, telegramChannels, telegramMappings, telegramUsers, telegramLogs,
      updateSiteConfig, addProduct, updateProduct, deleteProduct,
      addMixtape, updateMixtape, deleteMixtape,
      addPoolTrack, updatePoolTrack, deletePoolTrack, updateGenre,
      addBooking, updateBooking,
      addSessionType, updateSessionType, deleteSessionType,
      addVideo, deleteVideo,
      addStudioEquipment, updateStudioEquipment, deleteStudioEquipment,
      addSubscription, updateSubscription, addSubscriptionPlan, updateSubscriptionPlan, deleteSubscriptionPlan,
      addStudioRoom, updateStudioRoom, deleteStudioRoom, addMaintenanceLog, updateMaintenanceLog,
      updateOrder, addCampaign, updateCampaign,
      addCoupon, updateCoupon, deleteCoupon,
      updateTelegramConfig, addTelegramChannel, updateTelegramChannel, deleteTelegramChannel,
      updateShippingZone, addSubscriber,
      updateUser
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
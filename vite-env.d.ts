/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CLERK_PUBLISHABLE_KEY: string
    readonly CLERK_SECRET_KEY: string
    readonly VITE_FIREBASE_API_KEY: string
    readonly VITE_FIREBASE_AUTH_DOMAIN: string
    readonly VITE_FIREBASE_DATABASE_URL: string
    readonly VITE_FIREBASE_PROJECT_ID: string
    readonly VITE_FIREBASE_STORAGE_BUCKET: string
    readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
    readonly VITE_FIREBASE_APP_ID: string
    readonly VITE_PAYSTACK_PUBLIC_KEY: string
    readonly PAYSTACK_SECRET_KEY: string
    readonly VITE_PAYSTACK_CALLBACK_URL: string
    readonly VITE_PAYSTACK_WEBHOOK_URL: string
    readonly VITE_NEON_API_URL: string
    readonly VITE_ADMIN_EMAIL: string
    readonly VITE_PLAN_12_MONTHS_URL: string
    readonly VITE_PLAN_6_MONTHS_URL: string
    readonly VITE_PLAN_3_MONTHS_URL: string
    readonly VITE_PLAN_1_MONTH_URL: string
    readonly VITE_PLAN_1_WEEK_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

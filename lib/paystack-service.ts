// Paystack payment service
export const paystackService = {
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,

    // Subscription plan URLs
    planUrls: {
        '12months': import.meta.env.VITE_PLAN_12_MONTHS_URL,
        '6months': import.meta.env.VITE_PLAN_6_MONTHS_URL,
        '3months': import.meta.env.VITE_PLAN_3_MONTHS_URL,
        '1month': import.meta.env.VITE_PLAN_1_MONTH_URL,
        '1week': import.meta.env.VITE_PLAN_1_WEEK_URL,
    },

    // Plan prices in KES
    planPrices: {
        '12months': 6000,
        '6months': 3500,
        '3months': 1800,
        '1month': 700,
        '1week': 200,
    },

    // Initialize Paystack payment for subscription
    initializeSubscription(planId: string, userEmail: string, userName: string) {
        const planUrl = this.planUrls[planId as keyof typeof this.planUrls];

        if (!planUrl) {
            throw new Error('Invalid plan ID');
        }

        // Redirect to Paystack payment page
        window.location.href = planUrl;
    },

    // Initialize Paystack payment for products
    async initializePayment(
        email: string,
        amount: number,
        metadata: {
            userId: string;
            userName: string;
            items: any[];
            orderId: string;
        }
    ): Promise<{ authorization_url: string; reference: string }> {
        try {
            const response = await fetch('https://api.paystack.co/transaction/initialize', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_PAYSTACK_PUBLIC_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    amount: amount * 100, // Convert to kobo/cents
                    currency: 'KES',
                    callback_url: import.meta.env.VITE_PAYSTACK_CALLBACK_URL,
                    metadata,
                }),
            });

            const data = await response.json();

            if (data.status) {
                return data.data;
            } else {
                throw new Error(data.message || 'Payment initialization failed');
            }
        } catch (error) {
            console.error('Error initializing payment:', error);
            throw error;
        }
    },

    // Verify payment
    async verifyPayment(reference: string): Promise<any> {
        try {
            const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_PAYSTACK_PUBLIC_KEY}`,
                },
            });

            const data = await response.json();

            if (data.status) {
                return data.data;
            } else {
                throw new Error(data.message || 'Payment verification failed');
            }
        } catch (error) {
            console.error('Error verifying payment:', error);
            throw error;
        }
    },

    // Get plan details by ID
    getPlanDetails(planId: string) {
        const prices = this.planPrices;
        const urls = this.planUrls;

        return {
            id: planId,
            price: prices[planId as keyof typeof prices],
            url: urls[planId as keyof typeof urls],
        };
    },
};

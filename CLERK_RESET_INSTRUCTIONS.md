# Clerk Reset & Production Setup

I was unable to automate the deletion due to a connection error. Please follow these steps to reset your Clerk applications and set up Production.

## Step 1: Delete Existing Applications
1. Go to the [Clerk Dashboard](https://dashboard.clerk.com/).
2. For each application listed:
   - Click "Settings" / "Configure".
   - Find "Delete Application" in the Danger Zone.
   - Confirm deletion.

## Step 2: Create New Application
1. Click **Create Application**.
2. Name it **"DJ Flowerz Production"**.
3. Select authentication methods (Email, Google, etc.).
4. Click **Create**.

## Step 3: Get Production Keys & Set to Production
1. In your new app, go to **API Keys** in the sidebar.
2. Toggle the environment switch at the top to **Production**.
   - *Note: This ensures you are using the Live/Production instance.*
3. Copy the **Publishable Key** (`pk_live_...`) and **Secret Key** (`sk_live_...`).

## Step 4: Provide Keys
Paste the keys in the chat below. I will update your configuration to use them.

---
**Important**: When using Production keys locally (`localhost:3000`), you may encounter CORS errors unless you verify `localhost:3000` is in the allowed origins or develop against a real domain. However, getting the keys is the first step.

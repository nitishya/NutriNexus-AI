# NutriNexus AI Deployment Guide

## 1. Firebase Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project named `NutriNexus AI`.
3. Enable **Authentication** (Email/Password & Google Sign-in).
4. Enable **Firestore Database** in production mode.
5. Go to **Project Settings > Service Accounts** and click **Generate new private key**.
6. Save the downloaded JSON file as `serviceAccountKey.json` in the `backend/` directory (DO NOT commit this file to GitHub).

## 2. Google Cloud Setup (Secret Manager)
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Select your Firebase project.
3. Enable the **Secret Manager API**.
4. Create a new secret named `FIREBASE_CREDENTIALS` and upload the contents of `serviceAccountKey.json`.
5. Create another secret named `GEMINI_API_KEY` with your Google Gemini API key.

## 3. Backend Deployment (Cloud Run)
Make sure you have the Google Cloud CLI (`gcloud`) installed and authenticated.

```bash
# Set your project ID
gcloud config set project nutrinexus-ai

# Build and submit the container
gcloud builds submit --tag gcr.io/nutrinexus-ai/nutrinexus-backend

# Deploy to Cloud Run
gcloud run deploy nutrinexus-backend \
  --image gcr.io/nutrinexus-ai/nutrinexus-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-secrets="FIREBASE_CREDENTIALS=FIREBASE_CREDENTIALS:latest,GEMINI_API_KEY=GEMINI_API_KEY:latest"
```

## 4. Frontend Deployment
The frontend is built with Vite. You can deploy it to Firebase Hosting, Vercel, or Netlify.

### Firebase Hosting
```bash
cd frontend
npm install -g firebase-tools
firebase login
firebase init hosting

# Build the project
npm run build

# Deploy
firebase deploy --only hosting
```

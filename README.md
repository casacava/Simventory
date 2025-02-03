# Simsventory - The Sims 4 Collection Tracker

## 🏡 About Simsventory
**Simsventory** is a web application that helps players track their collections in *The Sims 4*. Whether you are collecting fish, gems, gardening items, or other collectibles, Simsventory allows you to check off what you have collected and see your progress towards completing each collection.

This project is designed as a portfolio piece to showcase frontend engineering skills with modern technologies, including **Next.js, React, TypeScript, Firebase, and Tailwind CSS**.

## 🚀 Tech Stack
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Material UI
- **State Management:** Redux Toolkit
- **Backend & Database:** Firebase (Firestore NoSQL)
- **Authentication:** Firebase Auth
- **Deployment:** Vercel

## 🎯 Features
- ✅ **Collection Tracker UI** - Users can check off items they have collected
- 📊 **Progress Indicator** - Displays the completion percentage for each collection
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 🔐 **User Authentication** - Sign up and log in to save progress (Firebase Auth)
- 📂 **Firestore Database** - Data is stored in Firebase Firestore for persistence

## 📌 Planned Enhancements
- 🎨 Improved UI/UX with Material UI and animations
- 📊 Visual charts for tracking progress over time
- 🔄 Sync collections across multiple devices

## 📖 Getting Started
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/simsventory.git
cd simsventory
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Firebase
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable Firestore Database and Authentication.
3. Create a `.env.local` file and add your Firebase credentials:

```sh
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4️⃣ Run the Development Server
```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## 🚀 Deployment
This project is deployed with **Vercel**. To deploy manually, run:
```sh
vercel
```
Or connect your GitHub repository to Vercel for continuous deployment.

## 📜 License
This project is open-source and licensed under the **MIT License**.

---

💡 *Built with love for The Sims 4 community!* 💙


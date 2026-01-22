# GNOSIS Client

The **GNOSIS Client** is a mobile application built with **React Native + Expo** that enables users to verify claims, analyze information using AI, and explore supporting evidence across multiple formats. The application communicates with a **FastAPI** backend.

---

## 🧠 What the App Does

Users can:

- Ask factual questions or submit claims  
- Receive AI-generated analysis  
- View confidence scores  
- Explore **text, image, and video** evidence  
- Track misinformation spread visually  

---

## 🧱 Tech Stack

### Frontend
- React Native  
- Expo Router  
- TypeScript  
- Zustand (state management)  
- Axios (API calls)  
- Expo Vector Icons  

### Backend
- FastAPI  

---

## ✅ Prerequisites

Ensure the following are installed:

- Node.js **18+**
- npm or yarn
- Expo CLI
- Expo Go app (for physical device testing)

Install Expo CLI globally:

```bash
npm install -g expo-cli


Getting Started
1️⃣ Clone the Repository
git clone https://github.com/your-org/gnosis-client.git
cd gnosis-client

2️⃣ Install Dependencies

Using npm:

npm install


Or using yarn:

yarn install

3️⃣ Configure Backend API

Edit the file:

client/config/constants.ts

export const API_BASE_URL = "http://127.0.0.1:8000";
export const IMAGE_BASE_PATH = `${API_BASE_URL}/static/images`;

⚠️ Important Notes

Android Emulator

http://10.0.2.2:8000


Physical Device (same Wi-Fi network)

http://192.168.1.5:8000


Example:

export const API_BASE_URL = "http://192.168.1.5:8000";

4️⃣ Start the App
npx expo start


The Expo developer menu will open.
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const Keys = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: Keys,
  authDomain: "nwitter-cfafe.firebaseapp.com",
  projectId: "nwitter-cfafe",
  storageBucket: "nwitter-cfafe.firebasestorage.app",
  messagingSenderId: "831812175932",
  appId: "1:831812175932:web:bc783d0f868a34000adb39"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
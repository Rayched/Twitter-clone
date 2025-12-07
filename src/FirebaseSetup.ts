import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyA0UJCoCVawrR-QyRZ9jWWOKIuuU1ezF1A",
  authDomain: "nwitter-cfafe.firebaseapp.com",
  projectId: "nwitter-cfafe",
  storageBucket: "nwitter-cfafe.firebasestorage.app",
  messagingSenderId: "831812175932",
  appId: "1:831812175932:web:bc783d0f868a34000adb39"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
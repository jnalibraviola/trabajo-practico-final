import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIw0iieEFbOwzfoUAR-_UH3ANhvRFWeIE",
  authDomain: "moviles-acd95.firebaseapp.com",
  projectId: "moviles-acd95",
  storageBucket: "moviles-acd95.firebasestorage.app",
  messagingSenderId: "259973631393",
  appId: "1:259973631393:web:9675a27c7e93f7e74f0fe0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

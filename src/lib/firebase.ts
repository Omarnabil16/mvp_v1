import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD4IK6hcD8BWUx7RDJpuF7VB8ouAMlaGq8",
  authDomain: "thecomedycult-6cc85.firebaseapp.com",
  projectId: "thecomedycult-6cc85",
  storageBucket: "thecomedycult-6cc85.firebasestorage.app",
  messagingSenderId: "44352850098",
  appId: "1:44352850098:web:6fe426c7c74b0d1432a1ab",
  measurementId: "G-7ZZDBM9ZXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
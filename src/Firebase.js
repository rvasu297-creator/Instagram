import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBj76MSKKLEpEN2w1k4khEZvm8qtWi-RGM",
  authDomain: "instagram-758ef.firebaseapp.com",
  projectId: "instagram-758ef",
  storageBucket: "instagram-758ef.firebasestorage.app",
  messagingSenderId: "24966298378",
  appId: "1:24966298378:web:a3c72b5ba5e91cac64d8f3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
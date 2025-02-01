// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4Dzs8Ala4V5NGzlREanPX-VRg8ixKwW0",
  authDomain: "instagram-clone-227e0.firebaseapp.com",
  projectId: "instagram-clone-227e0",
  storageBucket: "instagram-clone-227e0.appspot.com",
  messagingSenderId: "229424080595",
  appId: "1:229424080595:web:d5cb19f5456daaadcb9626",
  measurementId: "G-1360NKYDZM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
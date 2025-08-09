// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYgGTPayWTUWp5R0Osu8YSVq2pV6FS6Xs",
  authDomain: "netflix-gpt-clonw.firebaseapp.com",
  projectId: "netflix-gpt-clonw",
  storageBucket: "netflix-gpt-clonw.firebasestorage.app",
  messagingSenderId: "35340755330",
  appId: "1:35340755330:web:09dea82165cf1fc1fdaf9b",
  measurementId: "G-FDL404D64B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
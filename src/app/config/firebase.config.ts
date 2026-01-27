import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtYRAQmH_G_LAqNNlv7eAZ5bxN6O4MVUI",
  authDomain: "ionic-todo-firebase-9da32.firebaseapp.com",
  projectId: "ionic-todo-firebase-9da32",
  storageBucket: "ionic-todo-firebase-9da32.firebasestorage.app",
  messagingSenderId: "167425955057",
  appId: "1:167425955057:web:b534813024354a6f808550",
  measurementId: "G-F2GEJD3MFE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { app, analytics, firestore };
export { firebaseConfig };

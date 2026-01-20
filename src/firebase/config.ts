// Імпортуємо необхідні функції з Firebase
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase конфігурація
const firebaseConfig = {
  apiKey: "AIzaSyBJVhr2tZQ0MhWtXh_bOLTGLJTT5A5LjkQ",
  authDomain: "webvy-site.firebaseapp.com",
  projectId: "webvy-site",
  storageBucket: "webvy-site.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:1234567890abcdef"
};

// Ініціалізуємо Firebase лише один раз
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Використовуємо існуючий екземпляр
}

// Отримуємо доступ до Firestore
const db = getFirestore(app);

// Експортуємо db для використання в інших компонентах
export { db };

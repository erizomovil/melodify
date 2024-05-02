// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxqrbIpBoZZ5HQWMBojlDZCqXN05hb5tg",
  authDomain: "melodify-2454c.firebaseapp.com",
  databaseURL: "https://melodify-2454c-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "melodify-2454c",
  storageBucket: "melodify-2454c.appspot.com",
  messagingSenderId: "338038469444",
  appId: "1:338038469444:web:a3cab0d59ff336956a9d11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;
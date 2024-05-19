// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBrmYJ9TCcNWq5NADjSgb6x6BZrjfXkNQ",
  authDomain: "melodify-d278a.firebaseapp.com",
  databaseURL: "https://melodify-d278a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "melodify-d278a",
  storageBucket: "melodify-d278a.appspot.com",
  messagingSenderId: "599673789296",
  appId: "1:599673789296:web:076deb4a848bc3e54d8db5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage();
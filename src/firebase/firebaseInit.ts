// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6oYXfyoeGLixcFMV3Kyn98zp2uye7hDw",
  authDomain: "where-s-waldo-e7bad.firebaseapp.com",
  projectId: "where-s-waldo-e7bad",
  storageBucket: "where-s-waldo-e7bad.appspot.com",
  messagingSenderId: "399263404205",
  appId: "1:399263404205:web:5992ca4832b04808edf624",
};

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

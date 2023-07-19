import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD_3722NjE6_gFJdRv4ky-Rk-ir_pA_2mA",
  authDomain: "aobyte-project.firebaseapp.com",
  projectId: "aobyte-project",
  storageBucket: "aobyte-project.appspot.com",
  messagingSenderId: "328088182174",
  appId: "1:328088182174:web:bb9f0a36ee4ec906a34a8f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCJc2zKFM32OJ_0TeEmgzHS6SWUD8tCQ14",
    authDomain: "react-hw6-eae4d.firebaseapp.com",
    projectId: "react-hw6-eae4d",
    storageBucket: "react-hw6-eae4d.firebasestorage.app",
    messagingSenderId: "88061922264",
    appId: "1:88061922264:web:5f1918f8eea0ebcc8740ad",
    measurementId: "G-VYJ0GDHG4Y"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

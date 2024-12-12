// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";
import { getFirestore, collection } from "firebase/firestore";
import firebaseConfig from "./firebase-config.json";
// import firebaseConfig2 from "./firebase-config2.json";

// Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const app2 = initializeApp(firebaseConfig2);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
// export const db2 = getFirestore(app2);

export const userRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
// export const userRef2 = collection(db2, "users");

import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD1_09StQwVPNFrulQtN6Pto6axj4oTTLY",
  authDomain: "iot-database-20197.firebaseapp.com",
  projectId: "iot-database-20197",
  storageBucket: "iot-database-20197.firebasestorage.app",
  messagingSenderId: "345037366984",
  appId: "1:345037366984:web:d8df667d22d5be6576a7fd",
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

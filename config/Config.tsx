import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyB4cCczLMczBcPUt17cmhvMWSk3xeFnNbE",
  authDomain: "listaproductos-56281.firebaseapp.com",
  databaseURL: "https://listaproductos-56281-default-rtdb.firebaseio.com",
  projectId: "listaproductos-56281",
  storageBucket: "listaproductos-56281.appspot.com",
  messagingSenderId: "1094725194542",
  appId: "1:1094725194542:web:b7d1ddddef87497580a0bf"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getDatabase(app);

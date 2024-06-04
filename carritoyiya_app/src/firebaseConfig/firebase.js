
import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAK2RoBG0uWRfuyflxIDRiOZUA7aj7yJMk",
  authDomain: "carritoyiya.firebaseapp.com",
  projectId: "carritoyiya",
  storageBucket: "carritoyiya.appspot.com",
  messagingSenderId: "63219971245",
  appId: "1:63219971245:web:8cb73b72c91d564aadc224"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

;



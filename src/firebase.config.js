import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACHWQ_RjNSPxgU4LZp5vDPuq8CvE95Xec",
  authDomain: "featured-ta.firebaseapp.com",
  projectId: "featured-ta",
  storageBucket: "featured-ta.appspot.com",
  messagingSenderId: "196735942006",
  appId: "1:196735942006:web:679959c933a3ae2e49ce57",
  measurementId: "G-9ZDT6K3S70",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;

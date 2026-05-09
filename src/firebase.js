import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyCdHfMpQjtg6ZeDy0RE5TYldqcgKG7A2VE",

  authDomain: "ai-itinerary-planner-2cb13.firebaseapp.com",

  projectId: "ai-itinerary-planner-2cb13",

  storageBucket: "ai-itinerary-planner-2cb13.firebasestorage.app",

  messagingSenderId: "331772741",

  appId: "1:331772741:web:941f0fd436ad69e20f842c"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;

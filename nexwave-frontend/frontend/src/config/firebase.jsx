import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDPsAZxBro2-n0Lv_UJkCdyMgdVCdbu0Fk",
    authDomain: "nexwave-22186.firebaseapp.com",
    projectId: "nexwave-22186",
    storageBucket: "nexwave-22186.appspot.com",
    messagingSenderId: "144664036247",
    appId: "1:144664036247:web:18752021c61d3665413ad2",
    measurementId: "G-GY2P35NWEF"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

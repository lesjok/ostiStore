import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBPSiUvALlJFUDXjs6Y8NCKvhTnXvdg1uA",
    authDomain: "osti-shop.firebaseapp.com",
    projectId: "osti-shop",
    storageBucket: "osti-shop.appspot.com",
    messagingSenderId: "634821399222",
    appId: "1:634821399222:web:ad749a7364aaca3eb54c17"
};

const app = initializeApp(firebaseConfig);
export default firebaseConfig;
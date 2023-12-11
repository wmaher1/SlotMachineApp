import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyA9SKt5e6nC8a9nzxQlq6DuRyJkf0jRsXg",
    authDomain: "slot-machine-407516.firebaseapp.com",
    projectId: "slot-machine-407516",
    storageBucket: "slot-machine-407516.appspot.com",
    messagingSenderId: "851868174218",
    appId: "1:851868174218:web:1865a0d2578bca057f6a73",
    measurementId: "G-96E3C4GP72"
  };


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };

  
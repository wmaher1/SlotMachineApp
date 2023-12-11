// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth'; // Include this line if you're using authentication
import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);

// Include only the services you need
export const database = getDatabase(app);
export const auth = getAuth(app);  // Include this line if you're using authentication

export default app;


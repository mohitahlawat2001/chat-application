import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyAh6VdG8676lR-_T2fiwGdA8KKPwmx2nUw",
    authDomain: "chat-lic.firebaseapp.com",
    databaseURL: "https://chat-lic-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-lic",
    storageBucket: "chat-lic.appspot.com",
    messagingSenderId: "565650128607",
    appId: "1:565650128607:web:52adf38d24d45ac32ab36a"
};
  
const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();

// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa739yIbJat9JiCiw02k6iXP-0lWbcxfQ",
  authDomain: "birthday-2076c.firebaseapp.com",
  projectId: "birthday-2076c",
  storageBucket: "birthday-2076c.appspot.com",
  messagingSenderId: "570423022570",
  appId: "1:570423022570:web:ef2cdecbd1508228fc9893"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
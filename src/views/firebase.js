import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCLHLFU41CvAv0imjVCgT2f41CY-FAgys0",
  authDomain: "proyectofinal-a7493.firebaseapp.com",
  projectId: "proyectofinal-a7493",
  storageBucket: "proyectofinal-a7493.appspot.com",
  messagingSenderId: "740945116038",
  appId: "1:740945116038:web:ce23e8b05ea625f5ed0a07",
  measurementId: "G-3QXK0EL0Y2"
};

app.initializeApp(firebaseConfig);
const dataBase = app.firestore();
const authe = app.auth();
export { dataBase, authe }
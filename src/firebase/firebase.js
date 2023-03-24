import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// Epicbae
const firebaseConfig = {
  apiKey: 'AIzaSyC3WDDQh-Msf3Sv1EdJFQ5J7ozXS0G-YQU',
  authDomain: 'epicbae-246b2.firebaseapp.com',
  databaseURL: 'https://epicbae-246b2.firebaseio.com',
  projectId: 'epicbae-246b2',
  storageBucket: 'epicbae-246b2.appspot.com',
  messagingSenderId: '925724026895',
  appId: '1:925724026895:web:f115b08931aba1eedbdb7a',
  measurementId: 'G-2M03LC22NH',
};

initializeApp (firebaseConfig);
const auth = getAuth ();
const db = getFirestore ();

export {auth, db};

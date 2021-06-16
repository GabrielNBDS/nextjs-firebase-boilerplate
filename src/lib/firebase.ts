import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBVizlkLbvGWMnlntS4Ll_HXbUv98nJDe8',
  authDomain: 'boilerplate-330bd.firebaseapp.com',
  projectId: 'boilerplate-330bd',
  storageBucket: 'boilerplate-330bd.appspot.com',
  messagingSenderId: '91935197771',
  appId: '1:91935197771:web:58c40cddb2e4e418b49bce',
  measurementId: 'G-T0XZ1ENBKF',
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    // eslint-disable-next-line no-console
    console.error('Firebase initialization error', err.stack);
  }
}

const fire = firebase;

export default fire;

const { analytics } = fire;
const db = fire.firestore();
const cdn = fire.storage().ref();

export { analytics, db, cdn, firebaseConfig };

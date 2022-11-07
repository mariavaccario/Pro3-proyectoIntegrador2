import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBzB5JbfqiQgOVXulZ8jmq1N2w03JuHQ8s",
    authDomain: "prog3-proyectointegrador.firebaseapp.com",
    projectId: "prog3-proyectointegrador",
    storageBucket: "prog3-proyectointegrador.appspot.com",
    messagingSenderId: "85225618599",
    appId: "1:85225618599:web:d6ca5a9a1a67bd6cf92f82"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
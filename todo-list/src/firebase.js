import { initializeApp } from "firebase/app";
import { initializeFirestore, CACHE_SIZE_UNLIMITED,enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCTXG2ex7y36GOEsp3U8r6gVjPssvmCvFU",
  authDomain: "todo-teinaki.firebaseapp.com",
  projectId: "todo-teinaki",
  storageBucket: "todo-teinaki.appspot.com",
  messagingSenderId: "552045533579",
  appId: "1:552045533579:web:199d342ad1379b7ee8778e"
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = initializeFirestore(firebaseApp, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED
});

enableIndexedDbPersistence(firestore)
  .catch((err) => {
      if (err.code === 'failed-precondition') {
          console.log('Multiple tabs open, persistence can only be enabled');
      } else if (err.code === 'unimplemented') {
          console.log('The current browser does not support all of the features required to enable persistence');
      }
  });

export const auth = getAuth(firebaseApp);
export default firestore;
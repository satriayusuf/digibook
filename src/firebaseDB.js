import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD-T4arA9-y2DCp-tpMUVpd0U8Q5Cy8Ovk",
    authDomain: "crudvue-898e3.firebaseapp.com",
    projectId: "crudvue-898e3",
    storageBucket: "crudvue-898e3.appspot.com",
    messagingSenderId: "922286977639",
    appId: "1:922286977639:web:e141de8c9079b88aa69ac2",
    measurementId: "G-E27QSY5VQ5" 
};

const firebaseApp = firebase.initializeApp(firebaseConfig);


export const db = firebaseApp.firestore();
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDkB4wpiXnznBYBRHAHmHABU1zzNbUzkE4",
    authDomain: "shop-c432d.firebaseapp.com",
    databaseURL: "https://shop-c432d.firebaseio.com",
    projectId: "shop-c432d",
    storageBucket: "shop-c432d.appspot.com",
    messagingSenderId: "325656585240",
    appId: "1:325656585240:web:872f9646c06abc66b9cf6d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }
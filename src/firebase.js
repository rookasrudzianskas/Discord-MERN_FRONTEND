import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBg8dZ85X5DHbzEvBfMB-N8_g9u5xuO4lc",
    authDomain: "rookas-discord-mern-app.firebaseapp.com",
    projectId: "rookas-discord-mern-app",
    storageBucket: "rookas-discord-mern-app.appspot.com",
    messagingSenderId: "639069515735",
    appId: "1:639069515735:web:24e2034dccb562f6abe592",
    measurementId: "G-W0XY7ZX4BX"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db
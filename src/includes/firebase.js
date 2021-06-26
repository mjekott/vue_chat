import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
	apiKey: 'AIzaSyD0IS9s7iudI0Bh-pJ_7VMgsuMIiGnZ5sw',
	authDomain: 'vue-chat-55b36.firebaseapp.com',
	projectId: 'vue-chat-55b36',
	storageBucket: 'vue-chat-55b36.appspot.com',
	messagingSenderId: '954514542884',
	appId: '1:954514542884:web:936c6b131db85133c3a3b1'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const messages = db.collection('messages');

export { auth, db, timestamp, messages };

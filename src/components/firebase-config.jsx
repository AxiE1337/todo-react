import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'process.env.REACT_APP_APIKEY',
  authDomain: 'REACT_APP_AUTHDOMAIN',
  projectId: 'REACT_APP_PROJECTID',
  storageBucket: 'REACT_APP_STORAGEBUCKET',
  messagingSenderId: 'REACT_APP_MESSAGINGSENDER',
  appId: 'REACT_APP_APPID',
  measurementId: 'REACT_APP_MEASUREMENT',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const config ={
apiKey: "AIzaSyAonp_nqDBiZeprHR5-Mq-7O3Or0FEE7U4",
authDomain: "fitnow-98fed.firebaseapp.com",
projectId: "fitnow-98fed",
storageBucket: "fitnow-98fed.appspot.com",
messagingSenderId: "305593364772",
appId: "1:305593364772:web:fd7d13ba6a04839fcc83b1",
measurementId: "G-LWZ5CGN44P"
}

initializeApp(config)

export const firestoreDb = getFirestore()
export const realtimeDb = getDatabase()
export const storage = getStorage()

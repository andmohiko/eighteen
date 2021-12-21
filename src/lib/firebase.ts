import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  TwitterAuthProvider
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getRemoteConfig } from 'firebase/remote-config'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

const firebaseApp = initializeApp(config)
export const db = getFirestore()
export const auth = getAuth()
export const remoteConfig = getRemoteConfig()
remoteConfig.settings.minimumFetchIntervalMillis = 3600000
remoteConfig.defaultConfig = {
  'latestVersion': '0.1.0'
}

export default firebaseApp

export const Login = () => {
  const provider = new TwitterAuthProvider()
  signInWithPopup(auth, provider)
    .then((result: any) => {
      console.log('login res', result.user.uid)
      return result
    })
    .catch(function (error) {
      console.log('error', error)
    })
}

export const firebaseUser = () => {
  return auth.currentUser
}

export const Logout = () => {
  auth.signOut().then(() => {
    window.location.reload()
  })
}

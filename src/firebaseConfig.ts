import * as firebase from "firebase"

const config = {
  apiKey: "AIzaSyCi_zrWJoLKgygB_69A-po2E6VSmhCP8hA",
  authDomain: "tmapp-29a01.firebaseapp.com",
  databaseURL: "https://tmapp-29a01.firebaseio.com",
  projectId: "tmapp-29a01",
  storageBucket: "tmapp-29a01.appspot.com",
  messagingSenderId: "826669437060",
  appId: "1:826669437060:web:e82560c52f1406b87ab2d1"
}

firebase.initializeApp(config)

export async function loginUser(email: string, password: string) {
  // authenticate with firebase
  try {
    const res = await firebase.auth().signInWithEmailAndPassword(email, password)
    console.log(res)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

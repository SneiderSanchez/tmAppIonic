import * as firebase from "firebase";
type GenericObject = { [key: string]: any };

const config = {
  apiKey: "AIzaSyAm7rF3gJd85gOW8GajBKxJpTn2ng1yn64",
  authDomain: "tmappionic.firebaseapp.com",
  databaseURL: "https://tmappionic.firebaseio.com",
  projectId: "tmappionic",
  storageBucket: "tmappionic.appspot.com",
  messagingSenderId: "5002814973",
  appId: "1:5002814973:web:0e56f35c86a55860bfa594",
  measurementId: "G-S2PKXPDC06",
};

firebase.initializeApp(config);

export async function loginUser(email: string, password: string) {
  // authenticate with firebase
  try {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function loginGoogle(state: Function) {
  const providerGoogle = new firebase.auth.GoogleAuthProvider();

  // login with google
  firebase
    .auth()
    .signInWithPopup(providerGoogle)
    .then(async (result: GenericObject) => {
      console.log(result.user);
      await guardarDatos(result.user);
    });
  const guardarDatos = async (user: GenericObject) => {
    const usuario = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    };

    firebase.database().ref(`/Users/${user.uid}`).set(usuario);
    state(true);
  };
}

export async function saveData(data: GenericObject, collection: string) {
  // authenticate with firebase
  firebase.database().ref(`${collection}/`).push(data);
}
export async function getAllData(collection: string, state: Function) {
  let formatedData: Array<any> = [];

  return firebase
    .database()
    .ref()
    .child(collection)
    .on("value", (allItems) => {
      formatedData = [];
      allItems.forEach((item) => {
        const key = item.key;
        const value = item.val();
        formatedData.push({ key, value });
      });
      state(formatedData);
    });
}

export async function deleteData(collection: string, key: string) {
  const itemToDelete = firebase.database().ref().child(collection).child(key);
  itemToDelete.remove();
}

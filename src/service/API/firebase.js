import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore, updateDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdX5A4FZqcCyqxiAyIAnnTlPk9hDwdFoY",
  authDomain: "logistics-f942f.firebaseapp.com",
  projectId: "logistics-f942f",
  storageBucket: "logistics-f942f.appspot.com",
  messagingSenderId: "892736312585",
  appId: "1:892736312585:web:a3f1fa8da1d02a56d36fd8",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password).then((res) => {
    const user = auth.currentUser;
    const userDate = doc(db, "users", user.uid);
    updateDoc(userDate, { isOnline: true });
  });
}
export function signUpFirebase(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
export function signOutFirebase() {
  const user = auth.currentUser;
  const userDate = doc(db, "users", user.uid);

  return updateDoc(userDate, { isOnline: false }).then((res) => {
    auth
      .signOut()
      .then((res) => {
        console.log("Dang Xuat firebase thanh cong");
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

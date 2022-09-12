import firebase from 'firebase/app';
import React, { createContext, useEffect, useState } from "react";
import Cargando from '../components/Cargando';
import firebaseConfig from "./constants";

export const contextApp = createContext({
  firebaseConfig: null,
  setFirebaseApp: () => {},
});

export const firebaseInit = async () => {
  return await new Promise((resolve, reject) => {
    try {
      if (!firebase.apps.length) {
        return resolve(firebase.initializeApp(firebaseConfig));
      } else {
        return resolve(firebase.apps[0]);
      }
    } catch (error) {
      if (!/already exist/.test(error.message)) {
        console.error("Firebase initialization error", error.stack);
      }
      return reject(null);
    }
  });
};

firebaseInit();

export const FirebaseProviderApp = ({ children }) => {
  const [firebaseApp, setFirebaseApp] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [showChild, setShowChild] = useState(false);
  const saveSettings = (values) => {
    setFirebaseApp(values);
  };

  useEffect(() => { 
    firebaseConfig.auth().onAuthStateChanged(function(user) {
        setUsuario(user);
        setShowChild(true);
    });
}, []);
if (!showChild) {
  return <Cargando/>;
} else {
  return (
    <contextApp.Provider value={{ usuario,firebaseApp, saveSettings }}>
      {children}
    </contextApp.Provider>
  );
}
};

const FirebaseApp = firebase;

export default FirebaseApp;

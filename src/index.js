import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
  
    apiKey: "AIzaSyDLJ-ejQzpl0yl6FwvozAoSncgqRA5hsck",
    authDomain: "pdd2021-d1d1e.firebaseapp.com",
    databaseURL: "https://pdd2021-d1d1e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pdd2021-d1d1e",
    storageBucket: "pdd2021-d1d1e.appspot.com",
    messagingSenderId: "964692028179",
    appId: "1:964692028179:web:b7be2764909dae3df548e6"
  }
);

export const Context = createContext(null)

const auth = firebase.auth()
const database = firebase.database()


ReactDOM.render(
    <Context.Provider value={{
        firebase,
        auth,
        database
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);


import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../../firebase.config"

export const loginInitialMethod = () => {
    if(!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((result) => {
    updateUserName(name)
  })
  .catch((error) => {
    const errorMessage = error.message;
    return errorMessage;
  });
}


export const loginWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  .then((result) => {
    const {displayName, email, photoURL} = result.user;
    const userInfo = {displayName, email, photoURL};
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    return userInfo;
  })
  .catch((error) => {
    const  errorMessage = error.message;
    return errorMessage;
  });
}


export const loginWithGooglePopup = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
  .then((result) => {
    const {displayName, email, photoURL} = result.user;
    const userInfo = { displayName, email, photoURL };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    return userInfo;
  }).catch((error) => {
    // Handle Errors here.
    // var errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    // var email = error.email;
    // // The firebase.auth.AuthCredential type that was used.
    // var credential = error.credential;
    // ...
    return errorMessage;
  });
}


export const loginWithFacebookPopup = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider)
  .then((result) => {
    // /** @type {firebase.auth.OAuthCredential} */
    // var credential = result.credential;
    // // The signed-in user info.
    // var user = result.user;
    // // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    // var accessToken = credential.accessToken;
    // ...
    const { displayName, email, photoURL } = result.user;
    const userInfo = { displayName, email, photoURL };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    return userInfo;
  })
  .catch((error) => {
    // Handle Errors here.
    // var errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    // var email = error.email;
    // // The firebase.auth.AuthCredential type that was used.
    // var credential = error.credential;
    // ...
    return errorMessage;
  });
}

const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
    displayName: name
    }).then(function() {
    console.log('update name');
    }).catch(function(error) {
    // An error happened.
    });
}


export const signOut = () => {
    firebase.auth().signOut().then(() => {
        localStorage.removeItem('userInfo')
        window.location.reload();
      }).catch((error) => {
        // An error happened.
      });
}
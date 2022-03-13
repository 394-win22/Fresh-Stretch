// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, push, set } from "firebase/database";
import { getStorage } from "firebase/storage";
import { useState, useEffect } from "react";
import {
	getAuth,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	onIdTokenChanged,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { connectAuthEmulator, signInWithCredential } from "firebase/auth";
import {connectDatabaseEmulator } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCWDZS0FgOqaTOa69nzATeioMRt1zwmAl0",
	authDomain: "fresh-stretch.firebaseapp.com",
	databaseURL: "https://fresh-stretch-default-rtdb.firebaseio.com",
	projectId: "fresh-stretch",
	storageBucket: "fresh-stretch.appspot.com",
	messagingSenderId: "996857465580",
	appId: "1:996857465580:web:edd34e785e920f3cdfb3c9",
};

const firebase = initializeApp(firebaseConfig)
const auth = getAuth(firebase);
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export const storage = getStorage(app);


// Initialize Firebase


if (window.Cypress) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000);

  signInWithCredential(auth, GoogleAuthProvider.credential(
    '{"sub": "9etFdDdg3D9vFoxys29tKOUZlLet", "email": "test2@a.com", "email_verified": true}'
  ));
}

export const deleteData = (path) => {
	set(ref(database, path), null);
};

export const setData = (path, value) => {
	set(ref(database, path), value);
};

export const pushData = (path, value) => {
	push(ref(database, path), value);
};

export const useData = (path, transform) => {
	const [localData, setlocalData] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();

	useEffect(() => {
		const dbRef = ref(database, path);
		// const devMode =
		// 	!process.env.NODE_ENV || process.env.NODE_ENV === "development";
		// if (devMode) {
		// 	console.log(`loading ${path}`);
		// }
		return onValue(
			dbRef,
			(snapshot) => {
				const val = snapshot.val();
				// if (devMode) {
				// 	console.log(val);
				// }
				setlocalData(transform ? transform(val) : val);
				setLoading(false);
				setError(null);
			},
			(error) => {
				setlocalData(null);
				setLoading(false);
				setError(error);
			}
		);
	}, [path, transform]);

	return [localData, loading, error];
};

export const getAllData = (data) => data;

export const getItemsFromUser = (userID, item) => `/${item}/${userID}`;

export const getClothingItem = (type, userID, clothingID) => {
	return `/${type}/${userID}/${clothingID}`;
};

export const signInWithGoogle = (navigate) => {
	signInWithPopup(getAuth(app), new GoogleAuthProvider())
	.then((result) => {
		// This gives you a Google Access Token. You can use it to access the Google API.
		const credential = GoogleAuthProvider.credentialFromResult(result);
		const token = credential.accessToken;
		sessionStorage.setItem(
			"Auth Token",
			token
		);
		// The signed-in user info.
		// const user = result.user;
		navigate('/')
	  }).catch((error) => {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;
		// The email of the user's account used.
		const email = error.email;
		// The AuthCredential type that was used.
		// const credential = GoogleAuthProvider.credentialFromError(error);
		console.log(errorCode, errorMessage, email);
		return false;
	  });

};

const firebaseSignOut = () => signOut(getAuth(app));
export { firebaseSignOut as signOut };

export const useUserState = () => {
	const [user, setUser] = useState();

	useEffect(() => {
		onIdTokenChanged(getAuth(app), setUser);
	}, []);

	return [user];
};

export const signInWithEmailAndPassWD = (inputs, navigate) => {
	const authentication = getAuth(app);
	signInWithEmailAndPassword(authentication, inputs.email, inputs.password)
		.then((response) => {
			sessionStorage.setItem(
				"Auth Token",
				response._tokenResponse.refreshToken
			);
			navigate('/');
		})
		.catch((error) => {
			if (
				error.code === "auth/wrong-password" ||
				error.code === "auth/user-not-found"
			) {
				return false;
			}
		});
};

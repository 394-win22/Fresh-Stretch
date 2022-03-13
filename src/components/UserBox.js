import { useState } from "react";
import { signOut } from "../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import sendEmail from "../utils/sendmail";
import "./UserBox.css";

const UserBox = () => {
	const auth = getAuth();
	let navigate = useNavigate();
	let [displayName, setdisplayName] = useState("Mystery User");
	let [email, setEmail] = useState("no@email.com");
	let [photoURL, setPhotoURL] = useState(
		"https://identicons.github.com/jasonlong.png"
	);
	let [emailVerified, setEmailVerified] = useState(false);
	let [creationTime, setCreationTime] = useState([]);

	onAuthStateChanged(auth, (authuser) => {
		if (authuser) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			// The user object has basic properties such as display name, email, etc.
			if (authuser.displayName) {
				setdisplayName(authuser.displayName);
			}
			setEmail(authuser.email);
			if (authuser.photoURL) {
				setPhotoURL(authuser.photoURL);
			}
			setEmailVerified(authuser.emailVerified);
			let creationTimeArray = authuser.metadata.creationTime.split(" ");
			setCreationTime(creationTimeArray[2] + " " + creationTimeArray[3]);
		}
	});

	const handleLogout = () => {
		sessionStorage.removeItem("Auth Token");
		signOut();
		navigate("/login");
	};

	const handleEmail = () => {
		let html = "";
		sendEmail(displayName, email, html);
	};

	return (
		<div className="container mt-4 mb-4 d-flex justify-content-center">
			<div className="card user-card p-4">
				<div className=" image d-flex flex-column justify-content-center align-items-center">
					<button className="btn btn-secondary">
						<img
							src={photoURL}
							height="100"
							width="100"
							alt="User Profile"
						/>
					</button>
					<span className="name mt-3">{displayName}</span>
					<span className="idd">{email}</span>
					<div className=" d-flex mt-2">
						<Button variant="contained" onClick={handleEmail}>
							Email
						</Button>
					</div>
					<div className=" d-flex mt-2">
						<Button
							variant="contained"
							color="error"
							onClick={handleLogout}
						>
							Logout
						</Button>
					</div>
					<div className=" px-2 rounded mt-4 date ">
						<span className="join">User Since {creationTime}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserBox;

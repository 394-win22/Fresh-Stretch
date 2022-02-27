import { signOut } from "../utils/firebase";
import { getAuth } from "firebase/auth";
import "./UserBox.css";

const UserBox = () => {
	const auth = getAuth();
	const user = auth.currentUser;

	let displayName = "Not Signed In";
	let email = "no@email.com";
	let photoURL = "https://identicons.github.com/jasonlong.png";
	let uid = "unknown";
	let emailVerified = false;

	if (user !== null) {
		// The user object has basic properties such as display name, email, etc.
		displayName = user.displayName;
		email = user.email;
		photoURL = user.photoURL;
		emailVerified = user.emailVerified;

		// The user's ID, unique to the Firebase project. Do NOT use
		// this value to authenticate with the backend server
		// Use User.getToken() instead.
		uid = user.uid;
	}

	return (
		<div className="container my-4 d-flex justify-content-center">
			<div className="card user-card p-4">
				<div className=" image d-flex flex-column justify-content-center align-items-center">
					<button className="btn btn-secondary">
						<img src={photoURL} height="100" width="100" />
					</button>
					<span className="name mt-3">{displayName}</span>
					{/* <span className="idd">{email}</span>
					<div className="d-flex flex-row justify-content-center align-items-center gap-2">
						<span className="idd1">{uid}</span>
						<span>
							<i className="fa fa-copy"></i>
						</span>
					</div>
					<div className=" d-flex mt-2">
						<button className="btn btn-dark">Edit Profile</button>
					</div> */}
					<div className="d-flex mt-2">
						<button className="btn btn-primary" disabled>
							Sign In
						</button>
					</div>
					{/* <div className=" d-flex mt-2">
						<a
							href="/login"
							className="btn btn-danger"
							onClick={() => signOut()}
						>
							Logout
						</a>
					</div>
					<div className="user-text mt-3">
						<span>Quidquid latine dictum sit, altum sonatur.</span>
					</div>
					<div className=" px-2 rounded mt-4 date ">
						<span className="join">Joined Jan,2022</span>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default UserBox;

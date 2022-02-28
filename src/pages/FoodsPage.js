import React from "react";
import { DeleteOutlined } from '@ant-design/icons'
import {
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
	Type as ListType,
  } from 'react-swipeable-list';
  import 'react-swipeable-list/dist/styles.css';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useData, setData } from "../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";



import "./FoodsPage.css";


const CalculateExpiration = (timeAdded, shelfLife) => {
	shelfLife = shelfLife * 24 * 60 * 60 * 1000;
	const expDate = new Date(timeAdded + shelfLife);

	const today = Date.now();
	const dif = expDate - today;

	const day = 1000 * 60 * 60 * 24;
	

	if (dif < 0) {
		return (
			<span style={{ color: "#ff4d62", fontWeight: "600" }}>EXPIRED</span>
		);
	} else {
		const difDays = Math.floor(dif / day);
		if (difDays === 0) {
			return (
				<span style={{ color: "#ff914d", fontWeight: "600" }}>
					TODAY
				</span>
			);
		} else if (difDays <= 3) {
			return (
				<span style={{ color: "#ff914d", fontWeight: "600" }}>
					{difDays}d
				</span>
			);
		} else {
			return difDays + "d";
		}
	}
};

const CalculateExpirationAbs = (timeAdded, shelfLife) => {
	shelfLife = shelfLife * 24 * 60 * 60 * 1000;
	const expDate = new Date(timeAdded + shelfLife);

	const today = Date.now();
	const dif = expDate - today;

	return dif;
};


// const leadingActions = () => (
// 	<LeadingActions>
// 	  <SwipeAction onClick={() => console.info('leading swipe action triggered')}>
// 		Action name
// 	  </SwipeAction>
// 	</LeadingActions>
//   );
  
  const trailingActions = (item, uid) => (
	<TrailingActions>
	  <SwipeAction
		destructive={true}
		onClick={() => setData(`/UserFood/${uid}/${item}`, null)}
	  >
		<div className="actionContent">
			<div className="itemColumnCentered">
				<span className="icon">
					<DeleteOutlined style={{ fontSize: '300%'}}/>
					Delete
				</span>
			</div>
				
		</div>
	  </SwipeAction>
	</TrailingActions>
  );
  

export default function DisplayFoods() {
	const auth = getAuth();
	let [uid, setUID] = useState(null);
	let navigate = useNavigate();
	useEffect(() => {
		let authToken = sessionStorage.getItem('Auth Token')

		if (!authToken) {
			navigate('/login')
		}
	}, [navigate])
	onAuthStateChanged(auth, (authuser) => {
		if (authuser) {
		  	// The user's ID, unique to the Firebase project. Do NOT use
        	// this value to authenticate with the backend server
        	// Use User.getToken() instead.
        	setUID(authuser.uid);
		}
	  });
	const [userFood, userFoodLoading, userFoodError] = useData(
		`/UserFood/${uid}`
	);

	// const handleOnClick = id => () => {
	// 	console.log('[handle on click]', id);
	//   };

	// const handleDelete = (itemID) => {
	// 	console.log("Delete item");
	// 	// setData(`/UserFood/${userID}/${itemID}`, null);
	// };

	const [foodInfo, foodInfoLoading, foodInfoError] = useData(`/FoodInfo`);

	if (userFoodError) return <h1>{userFoodError}</h1>;
	if (userFoodLoading) return <h1>Loading list of foods...</h1>;

	if (!userFood) {
		return (
			<div style={{ marginTop: "50%", textAlign: "center" }}>
				<p>Your fridge is empty.</p>
				<p>Click on the + icon to add some items.</p>
			</div>
		);
	}

	if (foodInfoError) return <h1>{foodInfoError}</h1>;
	if (foodInfoLoading) return <h1>Loading list of foods...</h1>;

	let compareItems = (item1, item2) => {
		var x = CalculateExpirationAbs(
			item1[1]["TimeAdded"],
			foodInfo[item1[1]["Name"]]["ShelfLife"]
		);
		var y = CalculateExpirationAbs(
			item2[1]["TimeAdded"],
			foodInfo[item2[1]["Name"]]["ShelfLife"]
		);
		return x < y ? -1 : x > y ? 1 : 0;
	};

	return (
		<>
			<Container>
				<Row id="header" className="py-3">
					<Col></Col>
					<Col>Food Item</Col>
					<Col>Use By</Col>
				</Row>
				{/* <div className="basic-swipeable-list__container"> */}
					<SwipeableList
					fullSwipe={true}
					type={ListType.IOS}>
						{Object.entries(userFood)
							.sort(compareItems)
							.map((item) => {
								return (
										<SwipeableListItem
											trailingActions={trailingActions(item[0],uid)}
											key={item[0]}
										>
											<div className="itemContent">
												{/* <div
													style={{ backgroundColor: "white" }}
													className="itemRow"
												> */}
													<div className="itemColumn">
														<object
															data={
																foodInfo[item[1]["Name"]][
																	"Icon"
																]
															}
															width="75"
															height="75"
															aria-label="food-icon"
														/>
													</div>
													<div className="itemColumn">{item[1]["Name"]}</div>
													<div className="itemColumn">
														{CalculateExpiration(
															item[1]["TimeAdded"],
															foodInfo[item[1]["Name"]][
																"ShelfLife"
															]
														)}
													</div>
												{/* </div> */}
											</div>
										</SwipeableListItem>
								);
							})}
					</SwipeableList>
				{/* </div> */}
			</Container>
		</>
	);
}

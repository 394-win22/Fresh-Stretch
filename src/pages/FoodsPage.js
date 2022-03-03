import {React, useState} from "react";
import {Modal, Button} from "react-bootstrap"
import { DeleteOutlined, PlusOutlined, MinusOutlined} from '@ant-design/icons'

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

import { userID, useData, setData } from "../utils/firebase";

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

const calcDays = (timeAdded, shelfLife) => {
	shelfLife = shelfLife * 24 * 60 * 60 * 1000;
	const expDate = new Date(timeAdded + shelfLife);

	const today = Date.now();
	const dif = expDate - today;

	const day = 1000 * 60 * 60 * 24;
	
	return Math.floor(dif / day);
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
  
  const trailingActions = (item) => (
	<TrailingActions>
	  <SwipeAction
		destructive={true}
		onClick={() => setData(`/UserFood/${userID}/${item}`, null)}
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
	const [showModal, setShowModal] = useState(false);

  	const handleClose = () => setShowModal(false);
  	const handleShow = () => setShowModal(true);
	const handleSave = () => {
		setShowModal(false)
	}

	const [userFood, userFoodLoading, userFoodError] = useData(
		`/UserFood/${userID}`
	);

	const [foodInfo, foodInfoLoading, foodInfoError] = useData(`/FoodInfo`);
	const [currFoodItem, setCurrFoodItem] = useState();
	const [changeDays, setChangeDays] = useState(0);
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

	const minusDay = () => {
		var days = parseInt(document.getElementById("daysInput").value)
		if(days > 0){
			setChangeDays((currDay) => {
				return currDay - 1
			})
		}
	}
	const plusDay = () => {
		var days = parseInt(document.getElementById("daysInput").value)
		if(days < 100){
			setChangeDays((currDay) => {
				return currDay + 1
			})
		}
	}

	return (
		<>
			<Container>
				{currFoodItem &&
					<Modal show={showModal} onHide={handleClose}>
						<Modal.Header closeButton>
						<Modal.Title>
							<div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
							<object
								data={
									foodInfo[currFoodItem[1]["Name"]][
										"Icon"
									]
								}
								width="35"
								height="35"
								aria-label="food-icon"
								style={{paddingRight:"10px", paddingBottom:"3px"}}
							/>
							<p>{currFoodItem[1]["Name"]}</p>
							</div>
						</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<h3>Tips for Storage</h3>
							{foodInfo[currFoodItem[1]["Name"]]["Tips"].map((tip)=>{
								return (<p>- {tip}</p>)
							})}
							<form>
								<label>
									Edit Days
									<div class="input-group">
										<span class="input-group-btn">
											<button type="button" class="btn btn-danger btn-number"  data-type="minus" data-field="days" onClick={() => minusDay()}>
												<MinusOutlined style={{paddingBottom:"5px"}} />
											</button>
										</span>
										<input id="daysInput" type="number" name="days" class="form-control input-number" value={parseInt(calcDays(currFoodItem[1]["TimeAdded"],foodInfo[currFoodItem[1]["Name"]]["ShelfLife"])) + changeDays} min="0" max="100" style={{fontSize:"12pt"}}></input>
										<span class="input-group-btn">
											<button type="button" class="btn btn-success btn-number" data-type="plus" data-field="days" onClick={()=>plusDay()}>
												<PlusOutlined style={{paddingBottom:"5px"}}/>
											</button>
										</span>
									</div>
								</label>
								{/* <input type="submit" value="Submit" /> */}
							</form>
						</Modal.Body>
						<Modal.Footer>
						<Button variant="secondary" onClick={() => {
							handleClose()
							
							setData(`/UserFood/${userID}/${currFoodItem[0]/"TimeAdded"}`, null)
						}}>
							Save
						</Button>
						<Button variant="primary" onClick={() => {
							handleClose()
							setData(`/UserFood/${userID}/${currFoodItem[0]}`, null)
						}}>
							Delete Item
						</Button>
						</Modal.Footer>
					</Modal>
				}
				<Row id="header" className="py-3">
					<Col></Col>
					<Col>Food Item</Col>
					<Col>Use Within</Col>
				</Row>
						{Object.entries(userFood)
							.sort(compareItems)
							.map((item) => {
								return (
									<div className="itemContent" onClick={()=>{
										setCurrFoodItem(item)
										handleShow()
									}}>
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
									</div>
								);
							})}
			</Container>
		</>
	);
}

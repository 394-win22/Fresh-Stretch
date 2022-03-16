import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";

import {
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
	Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import AddFood from "../AddFood/AddFood";

import {
	CalculateExpiration,
	CalculateExpirationAbs,
	CalculateDays,
} from "../../utils/expiration";

import { useData, setData } from "../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import "./FoodsList.css";

export default function DisplayFoods({ StorageLocation }) {
	const [showModal, setShowModal] = useState(false);

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const auth = getAuth();
	let [uid, setUID] = useState(null);
	let navigate = useNavigate();
	useEffect(() => {
		let authToken = sessionStorage.getItem("Auth Token");

		if (!authToken) {
			navigate("/login");
		}
	}, [navigate]);
	onAuthStateChanged(auth, (authuser) => {
		if (authuser) {
			setUID(authuser.uid);
		}
	});
	const [userFood, userFoodLoading, userFoodError] = useData(
		`/${StorageLocation}/${uid}`
	);

	const trailingActions = (item, uid) => (
		<TrailingActions>
			<SwipeAction
				destructive={true}
				onClick={() =>
					setData(`/${StorageLocation}/${uid}/${item}`, null)
				}
			>
				<div className="actionContent">
					<div className="itemColumnCentered">
						<span className="icon">
							<DeleteOutlined style={{ fontSize: "300%" }} />
							Delete
						</span>
					</div>
				</div>
			</SwipeAction>
		</TrailingActions>
	);

	const [foodInfo, foodInfoLoading, foodInfoError] = useData(
		`/FoodInfo/${StorageLocation}/`
	);
	const [currFoodItem, setCurrFoodItem] = useState();
	const [changeDays, setChangeDays] = useState(0);
	if (userFoodError) return <h1>{userFoodError}</h1>;
	if (userFoodLoading) return <h1>Loading list of foods...</h1>;

	if (!userFood) {
		return (
			<Container
				style={{ height: "80vh", width: "100vw" }}
				className="d-flex justify-content-center"
			>
				<Row className="justify-content-center align-self-center text-center">
					<AddFood StorageLocation={StorageLocation} />
					<p className="mt-2">
						Your {StorageLocation.toLowerCase()} is empty.
						<br />
						Click on the + icon to add some items.
					</p>
				</Row>
			</Container>
		);
	}

	if (foodInfoError) return <h1>{foodInfoError}</h1>;
	if (foodInfoLoading) return <h1>Loading list of foods...</h1>;

	let compareItems = (item1, item2) => {
		var item1Shelf;
		if (foodInfo[item1[1]["Name"]]) {
			item1Shelf = foodInfo[item1[1]["Name"]]["ShelfLife"];
		} else {
			item1Shelf = 2;
		}

		var item2Shelf;
		if (foodInfo[item2[1]["Name"]]) {
			item2Shelf = foodInfo[item2[1]["Name"]]["ShelfLife"];
		} else {
			item2Shelf = 2;
		}

		var x = CalculateExpirationAbs(item1[1]["TimeAdded"], item1Shelf);
		var y = CalculateExpirationAbs(item2[1]["TimeAdded"], item2Shelf);
		return x < y ? -1 : x > y ? 1 : 0;
	};

	const minusDay = () => {
		var days = parseInt(document.getElementById("daysInput").value);
		if (days > 0) {
			setChangeDays((currDay) => {
				return currDay - 1;
			});
		}
	};
	const plusDay = () => {
		var days = parseInt(document.getElementById("daysInput").value);
		if (days < 100) {
			setChangeDays((currDay) => {
				return currDay + 1;
			});
		}
	};

	var currIcon = "/icons/Other.svg";
	var currShelfLife = 2;
	if (currFoodItem && foodInfo[currFoodItem[1]["Name"]]) {
		currIcon = foodInfo[currFoodItem[1]["Name"]]["Icon"];
		currShelfLife = foodInfo[currFoodItem[1]["Name"]]["ShelfLife"];
	}

	return (
		<>
			<Container>
				{currFoodItem && (
					<Modal show={showModal} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<object
										data={currIcon}
										width="35"
										height="35"
										aria-label="food-icon"
										style={{
											paddingRight: "10px",
											paddingBottom: "3px",
										}}
									/>
									<p>{currFoodItem[1]["Name"]}</p>
								</div>
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{foodInfo[currFoodItem[1]["Name"]] && (
								<>
									<h3>How to tell if gone bad</h3>
									<ul>
										<li>
											{
												foodInfo[
													currFoodItem[1]["Name"]
												]["Bad"]
											}
										</li>
									</ul>
									<h3 data-cy="tips">Tips for Storage</h3>
									<ul>
										{foodInfo[currFoodItem[1]["Name"]][
											"Tips"
										].map((tip) => {
											return <li>{tip}</li>;
										})}
									</ul>
								</>
							)}
							<form>
								<label>
									<h3>Edit Days</h3>
									<div className="input-group">
										<span className="input-group-btn">
											<button
												data-cy="minusdays"
												type="button"
												className="btn btn-secondary btn-number"
												data-type="minus"
												data-field="days"
												onClick={() => minusDay()}
											>
												<MinusOutlined
													style={{
														paddingBottom: "5px",
													}}
												/>
											</button>
										</span>
										<input
											id="daysInput"
											type="number"
											name="days"
											className="form-control input-number"
											value={
												parseInt(
													CalculateDays(
														currFoodItem[1][
															"TimeAdded"
														],
														currShelfLife
													)
												) + changeDays
											}
											min="0"
											max="100"
											style={{ fontSize: "12pt" }}
											readOnly
										></input>
										<span className="input-group-btn">
											<button
												type="button"
												className="btn btn-secondary btn-number"
												data-type="plus"
												data-field="days"
												onClick={() => plusDay()}
											>
												<PlusOutlined
													style={{
														paddingBottom: "5px",
													}}
												/>
											</button>
										</span>
									</div>
								</label>
							</form>
						</Modal.Body>
						<Modal.Footer
							style={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<Button
								data-cy="delete"
								variant="secondary"
								onClick={() => {
									handleClose();
									setData(
										`/${StorageLocation}/${uid}/${currFoodItem[0]}`,
										null
									);
								}}
							>
								Delete Item
							</Button>
							<Button
								data-cy="save"
								style={{
									backgroundColor: "#80B470",
									borderColor: "#80B470",
								}}
								onClick={() => {
									handleClose();
									var oldTime = currFoodItem[1]["TimeAdded"];
									var delta = changeDays * 86400000;
									var newTime = oldTime + delta;
									setData(
										`/${StorageLocation}/${uid}/${currFoodItem[0]}/TimeAdded`,
										newTime
									);
								}}
							>
								Save
							</Button>
						</Modal.Footer>
					</Modal>
				)}
				<Row id="header" className="py-3">
					<Col>
						<AddFood
							padding-left="5em"
							StorageLocation={StorageLocation}
						/>
					</Col>
					<Col>Food Item</Col>
					<Col>Use Within</Col>
				</Row>
				<SwipeableList fullSwipe={true} type={ListType.IOS}>
					{Object.entries(userFood)
						.sort(compareItems)
						.map((item) => {
							var itemIcon = "/icons/Other.svg";
							var itemShelfLife = 2;

							if (foodInfo[item[1]["Name"]]) {
								itemIcon = foodInfo[item[1]["Name"]]["Icon"];
								itemShelfLife =
									foodInfo[item[1]["Name"]]["ShelfLife"];
							}

							return (
								<SwipeableListItem
									trailingActions={trailingActions(
										item[0],
										uid
									)}
									key={item[0]}
								>
									<div
										data-cy="foodlist"
										className="itemContent"
										onClick={() => {
											setCurrFoodItem(item);
											setChangeDays(0);
											handleShow();
										}}
									>
										<div className="itemColumn">
											<object
												data={itemIcon}
												width="75"
												height="75"
												aria-label="food-icon"
											/>
										</div>
										<div className="itemColumn"
											data-cy="foodname">
											{item[1]["Name"]}
										</div>
										<div
											className="itemColumn"
											data-cy="expiration"
										>
											{CalculateExpiration(
												item[1]["TimeAdded"],
												itemShelfLife
											)}
										</div>
									</div>
								</SwipeableListItem>
							);
						})}
				</SwipeableList>
			</Container>
		</>
	);
}

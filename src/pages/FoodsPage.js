import React from "react";
import SwipeToDelete from "react-swipe-to-delete-ios";

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
	const week = day * 7;

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

const getSvgs = (base) => {
	var dataURI = "data:image/svg+xml;base64," + base;
	console.log(base);
	var svg = atob(base);
	console.log(svg);
	return svg;
};

const handleDelete = (itemID) => {
	console.log("Delete item");
	// setData(`/UserFood/${userID}/${itemID}`, null);
};

export default function DisplayFoods() {
	const [userFood, userFoodLoading, userFoodError] = useData(
		`/UserFood/${userID}`
	);

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
				<Row>
					<Col></Col>
					<Col>Food Item</Col>
					<Col>Use By</Col>
				</Row>

				{Object.entries(userFood)
					.sort(compareItems)
					.map((item) => {
						return (
							<SwipeToDelete
								key={`${item[1]["Name"]}_${item[0]}`}
								height={85}
								onDelete={handleDelete(item[0])}
								deleteWidth={85}
							>
								<Row style={{ backgroundColor: "white" }}>
									<Col>
										<object
											data={
												foodInfo[item[1]["Name"]][
													"Icon"
												]
											}
											width="85"
											height="85"
										>
											{" "}
										</object>
									</Col>
									<Col>{item[1]["Name"]}</Col>
									<Col>
										{CalculateExpiration(
											item[1]["TimeAdded"],
											foodInfo[item[1]["Name"]][
												"ShelfLife"
											]
										)}
									</Col>
								</Row>
							</SwipeToDelete>
						);
					})}
			</Container>
		</>
	);
}

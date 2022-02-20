import React from "react";
// import { Table, Container, Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { userID, useData, getItemsFromUser } from "../utils/firebase";

import SwipeToDelete from "react-swipe-to-delete-ios";
// import SwipeToDelete from "react-swipe-to-delete-component";
// import "react-swipe-to-delete-component/dist/swipe-to-delete.css";

import { getSvgIconUtilityClass } from "@mui/material";

import AddFood from "../components/addFood.js";
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
	} else if (dif > week) {
		return Math.floor(dif / week) + "w";
	} else {
		const difDays = Math.floor(dif / day);
		if (difDays === 0) {
			return (
				<span style={{ color: "#80b470", fontWeight: "600" }}>
					TODAY
				</span>
			);
		} else {
			return difDays + "d";
		}
	}
};

const getSvgs = (base) => {
	var dataURI = "data:image/svg+xml;base64," + base;
	console.log(base);
	var svg = atob(base);
	console.log(svg);
	return svg;
};

const handleDelete = () => {
	return;
};

export default function DisplayFoods() {
	const [userFood, userFoodLoading, userFoodError] = useData(
		`/UserFood/${userID}`
	);

	const [foodInfo, foodInfoLoading, foodInfoError] = useData(`/FoodInfo`);

	if (userFoodError) return <h1>{userFoodError}</h1>;
	if (userFoodLoading) return <h1>Loading list of foods...</h1>;

	if (foodInfoError) return <h1>{foodInfoError}</h1>;
	if (foodInfoLoading) return <h1>Loading list of foods...</h1>;

	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-6">Icon</div>
					<div className="col-3">Name</div>
					<div className="col-3">Expires</div>
				</div>
			</div>
			{/* <Container>
				<Row>
					<Col xs={4}>Icon</Col>
					<Col xs={4}>Name</Col>
					<Col xs={4}>Expires</Col>
				</Row>
			</Container> */}
			{/* <tbody>
				{Object.entries(userFood).map((item) => {
					return (
						<SwipeToDelete
							height={100}
							onDelete={handleDelete}
							key={`${item[1]["Name"]}_${item[0]}`}
						>
							<tr>
								<td>
									<object
										data={foodInfo[item[1]["Name"]]["Icon"]}
										width="85"
										height="85"
									>
										{" "}
									</object>
								</td>
								<td>{item[1]["Name"]}</td>
								<td>
									{CalculateExpiration(
										item[1]["TimeAdded"],
										foodInfo[item[1]["Name"]]["ShelfLife"]
									)}
								</td>
							</tr>
						</SwipeToDelete>
					);
				})}
			</tbody> */}

			<AddFood />
		</>
	);
}

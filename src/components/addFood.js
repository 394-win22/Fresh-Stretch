import React, { useState } from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { Button, Container, Row, Col } from "react-bootstrap";

import { userID, useData, getItemsFromUser } from "../utils/firebase";

const AddFood = () => {
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const [foodInfo, foodInfoLoading, foodInfoError] = useData(`/FoodInfo`);
	if (foodInfoError) return <h1>{foodInfoError}</h1>;
	if (foodInfoLoading) return <h1>Loading list of foods...</h1>;

	console.log(foodInfo);

	return (
		<>
			<Button onClick={handleClickOpen}>Add Food</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add Food Items</DialogTitle>
				<DialogContent>
					<Container>
						<Row>
							{Object.entries(foodInfo).map((item) => {
								return item.flat()[0];
							})}
						</Row>
					</Container>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default AddFood;

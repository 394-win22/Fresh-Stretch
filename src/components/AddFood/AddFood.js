import React from "react";
import { Button, Container, Row } from "react-bootstrap";

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
} from "@mui/material";

import { PlusSquareFill } from "react-bootstrap-icons";

import { useData } from "../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Checklist from "./Checklist";
import SaveFood from "./SaveFood";

const AddFood = ({ StorageLocation }) => {
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

	const [open, setOpen] = React.useState(false);
	const [checked, setChecked] = React.useState([]);
	const [otherName, setOtherName] = useState("");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setChecked([]);
		setOpen(false);
		setOtherName("");
	};

	const [foodInfo, foodInfoLoading, foodInfoError] = useData(
		`/FoodInfo/${StorageLocation}/`
	);
	if (foodInfoError) return <h1>{foodInfoError}</h1>;
	if (foodInfoLoading) return <h1>Loading list of foods...</h1>;

	return (
		<>
			<PlusSquareFill
				onClick={handleClickOpen}
				size={45}
				color="#80b470"
				data-cy="addfood"
			></PlusSquareFill>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add Food Items</DialogTitle>
				<DialogContent>
					<Container>
						<Row>
							<Checklist
								foodInfo={foodInfo}
								checked={checked}
								setOtherName={setOtherName}
							/>
						</Row>
					</Container>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							SaveFood(
								Object.entries(foodInfo),
								checked,
								otherName,
								uid,
								StorageLocation
							);
							handleClose();
						}}
						style={{
							backgroundColor: "#FF914D",
							borderColor: "#FF914D",
						}}
					>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default AddFood;

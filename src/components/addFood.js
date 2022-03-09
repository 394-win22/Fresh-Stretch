import React from "react";
import { Button, Container, Row } from "react-bootstrap";

import {
	Checkbox,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	FormControlLabel,
	FormGroup,
	TextField,
} from "@mui/material";

import { PlusSquareFill } from "react-bootstrap-icons";

import { useData, pushData } from "../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checklist = ({ foodInfo, checked, setOtherName }) => {
	foodInfo = Object.entries(foodInfo);

	const handleToggle = (value) => () => {
		if (!checked.includes(value)) {
			checked.push(value);
		} else {
			checked.splice(value, 1);
		}
	};

	let numFoods = 0;

	return (
		<FormGroup>
			{Object.entries(foodInfo).map((value) => {
				numFoods += 1;
				const labelId = `checkbox-list-secondary-label-${value}`;
				return (
					<FormControlLabel
						key={value[0]}
						id={labelId}
						control={<Checkbox />}
						label={value[1][0]}
						labelPlacement="start"
						onChange={handleToggle(value[0])}
					/>
				);
			})}
			<FormControlLabel
				key={numFoods + 1}
				id={`checkbox-list-secondary-label-${numFoods + 1}`}
				control={<Checkbox />}
				label={
					<TextField
						placeholder="Other"
						variant="standard"
						size="small"
						onBlur={(ev) => {
							setOtherName(ev.target.value);
						}}
					/>
				}
				labelPlacement="start"
				onChange={handleToggle(numFoods + 1)}
			/>
		</FormGroup>
	);
};

const SaveFood = async (foodInfo, checked, otherName, uid, StorageLocation) => {
	console.log(foodInfo);

	for (var i in checked) {
		var today = new Date();
		var index = parseInt(checked[i]);

		console.log(index);

		try {
			await pushData(`/${StorageLocation}/${uid}`, {
				Name:
					index === foodInfo.length + 1
						? otherName
						: foodInfo[index][0],
				TimeAdded: today.getTime(),
			});
		} catch (error) {
			console.log(error);
		}
	}
};

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
		console.log(otherName);
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

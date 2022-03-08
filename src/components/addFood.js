import React from "react";
import { Button, Container, Row} from "react-bootstrap";

import { Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Form from 'react-bootstrap/Form'

import { PlusSquareFill } from "react-bootstrap-icons";

import { useData, pushData } from "../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


function CheckboxListSecondary({ foodInfo, checked, setChecked }) {
	foodInfo = Object.entries(foodInfo);

	const handleToggle = (value) => () => {
		
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
			console.log("index", checked)
		} else {
			newChecked.splice(currentIndex, 1);
		}
		setChecked(newChecked);
		if (currentIndex == numFoods+1){
			console.log("other is checked")
		}
	};
	// const handleOtherToggle = (value) => () => {
	// 	const currentIndex = checked.indexOf(value);
	// 	const newChecked = [...checked];

	// 	if (currentIndex === -1) {
	// 		newChecked.push(value);
	// 	} else {
	// 		newChecked.splice(currentIndex, 1);
	// 	}
	// 	setChecked(newChecked);
	// 	setOtherChecked(checked.indexOf(value));
	// }
	let numFoods = 0

	console.log("CHECKED", checked);
	return (
		<List
			dense
			sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
		>
			{Object.entries(foodInfo).map((value) => {
				numFoods += 1
				const labelId = `checkbox-list-secondary-label-${value}`;
				return (
					<ListItem
						key={value[0]}
						secondaryAction={
							<Checkbox
								edge="end"
								onChange={handleToggle(value[0])}
								checked={checked.indexOf(value[0]) !== -1}
								inputProps={{ "aria-labelledby": labelId }}
							/>
						}
						disablePadding
					>
						<ListItemButton>
							<ListItemAvatar>
								<Avatar>{value[1][0][0]}</Avatar>
							</ListItemAvatar>
							<ListItemText
								id={labelId}
								primary={`${value[1][0]}`}
							/>
						</ListItemButton>
					</ListItem>
				);
			})}
			<ListItem
						key={numFoods + 1}
						secondaryAction={
							<Checkbox
								edge="end"
								onChange={handleToggle((numFoods+1).toString())}

								checked={checked.indexOf(numFoods+1) !== -1}
								inputProps={{ "aria-labelledby": `checkbox-list-secondary-label-${numFoods+1}` }}
							/>
						}
						disablePadding
					>
						<ListItemButton>
							<ListItemAvatar>
								<Avatar>O</Avatar>
							</ListItemAvatar>
							<ListItemText
								id={`checkbox-list-secondary-label-${numFoods+1}`}
								primary="Other"
							/>
						</ListItemButton>
			</ListItem>
		</List>
	);
}

const saveFood = async (foodInfo, checked, uid, StorageLocation) => {
	for (var i in checked) {
		var today = new Date();
		var index = parseInt(checked[i]);
		try {
			await pushData(`/${StorageLocation}/${uid}`, {
				Name: foodInfo[index][0],
				TimeAdded: today.getTime(),
			});
		} catch (error) {
			console.log(error);
		}
		console.log("Food Saved");
	}
};

const AddFood = ({StorageLocation}) => {
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
	const [open, setOpen] = React.useState(false);

	const [checked, setChecked] = React.useState([]);
	//const [otherChecked, setOtherChecked] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const [foodInfo, foodInfoLoading, foodInfoError] = useData(`/FoodInfo/${StorageLocation}/`);
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
							<CheckboxListSecondary
								foodInfo={foodInfo}
								checked={checked}
								setChecked={setChecked}
								// setOtherChecked={setOtherChecked}
							/>
						</Row>
						
							{/* <Form>
								<Form.Group className="mb-3" controlId="formBasicEmail" >
									<Form.Label>Food Name</Form.Label>
									<Form.Control type="text" style={{borderColor:"darkGrey"}} />
									<Form.Text className="text-muted">
									</Form.Text>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBasicPassword">
									<Form.Label>Expiration Days</Form.Label>
									<Form.Control type="text" style={{borderColor:"darkGrey"}}/>
								</Form.Group>
							</Form> */}
											
					</Container>
					
					
				</DialogContent>
				<DialogActions>
					<Button
								onClick={() => {
									saveFood(
										Object.entries(foodInfo),
										checked,
										uid,
										StorageLocation
									);
									setOpen(false);
								}}
								style={{backgroundColor:"#FF914D",borderColor:"#FF914D"}}
							>
								Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default AddFood;

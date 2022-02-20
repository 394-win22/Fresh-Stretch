import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

import { PlusSquareFill } from "react-bootstrap-icons";

import { userID, useData, pushData } from "../utils/firebase";

function CheckboxListSecondary({ foodInfo, checked, setChecked }) {
	foodInfo = Object.entries(foodInfo);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};
	console.log(foodInfo);
	console.log("CHECKED", checked);
	return (
		<List
			dense
			sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
		>
			{Object.entries(foodInfo).map((value) => {
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
		</List>
	);
}

const saveFood = async (foodInfo, checked) => {
	for (var i in checked) {
		var today = new Date();
		var index = parseInt(checked[i]);
		try {
			await pushData(`/UserFood/${userID}`, {
				Name: foodInfo[index][0],
				TimeAdded: today.getTime(),
			});
		} catch (error) {
			console.log(error);
		}
		console.log("Food Saved");
	}
};

const AddFood = () => {
	const [open, setOpen] = React.useState(false);

	const [checked, setChecked] = React.useState([]);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const [foodInfo, foodInfoLoading, foodInfoError] = useData(`/FoodInfo`);
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
							/>
						</Row>
						<Button
							onClick={() => {
								saveFood(
									Object.entries(foodInfo),
									checked,
									userID
								);
								setOpen(false);
							}}
						>
							Confirm
						</Button>
					</Container>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default AddFood;

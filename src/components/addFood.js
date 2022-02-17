import React, { useState } from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { Button, Container, Row, Col } from "react-bootstrap";

import { userID, useData, getItemsFromUser } from "../utils/firebase";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';


function CheckboxListSecondary({foodInfo}) {
//   console.log(foodData);
    const [checked, setChecked] = React.useState([1]);

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

    return (
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {Object.entries(foodInfo).map((value) => {
            console.log(value)
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
            <ListItem
                key={value}
                secondaryAction={
                <Checkbox
                    edge="end"
                    onChange={handleToggle(value)}
                    checked={checked.indexOf(value) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                />
                }
                disablePadding
            >
                <ListItemButton>
                <ListItemAvatar>
                    <Avatar>{value[0][0]}</Avatar> 
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${value[0]}`} />
                </ListItemButton>
            </ListItem>
            );
        })}
        </List>
    );
}

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

	//console.log(foodInfo);

	return (
		<>
			<Button onClick={handleClickOpen}>Add Food</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add Food Items</DialogTitle>
				<DialogContent>
					<Container>
						<Row>
                            <CheckboxListSecondary foodInfo={foodInfo} />
						</Row>
					</Container>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default AddFood;

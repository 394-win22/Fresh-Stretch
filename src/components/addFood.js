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
import { Alert } from "bootstrap";
import { Today } from "@mui/icons-material";


function CheckboxListSecondary({foodInfo}) {

    const saveFood = (foodInfo, checked) => () => {
        
        for(var i in checked){
            index = checked[i];
            try{
                async function push(index, foodInfo, userId){
                    await pushData(`/UserFood/${userId}`, {
                    Name: foodInfo[index][0],
                    TimeAdded: Today.getTime(),
                });
                }
                push(index, foodinfo, userId)
            }
            catch(error){
                alert.show(error)
            };
            alert.show("Food Saved")
        }
    };

    foodInfo = Object.entries(foodInfo);
    const [checked, setChecked] = React.useState([]);

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
    console.log(foodInfo)
    console.log("CHECKED", checked)
    return (
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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
                    inputProps={{ 'aria-labelledby': labelId }}
                />
                }
                disablePadding
            >
                <ListItemButton>
                <ListItemAvatar>
                    <Avatar>{value[1][0][0]}</Avatar> 
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${value[1][0]}`} />
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
                        <Button onClick={() => saveFood(foodInfo, checked, userID)} >
                            Confirm
                        </Button>
					</Container>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default AddFood;

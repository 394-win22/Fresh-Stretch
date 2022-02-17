import React, { useState } from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { Button } from "react-bootstrap";




const AddFood = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return(
    <>
        <Button>Add Food</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add</DialogTitle>
            <DialogContent>
            </DialogContent>
        </Dialog>
    </>
)
}

export default AddFood

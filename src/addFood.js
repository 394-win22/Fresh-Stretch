import React, { useState } from "react";
//import {Dialog} from "@mui/material/Dialog"
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";




const AddFood = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return(

    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add</DialogTitle>
        <DialogContent>
        </DialogContent>
    </Dialog>
)
}

export default AddFood

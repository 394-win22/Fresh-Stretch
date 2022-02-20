import React from "react";
import { userID, useData, getItemsFromUser } from "../utils/firebase";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getSvgIconUtilityClass } from "@mui/material";
import AddFood from "../components/addFood.js";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "#ff914d",
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: "white",
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

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
	}
	else {
		const difDays = Math.floor(dif / day);
		if (difDays === 0) {
			return <span style={{ color: "#ff914d", fontWeight: "600" }}>TODAY</span>;
		} else if(difDays<= 3){
			return <span style={{ color: "#ff914d", fontWeight: "600" }}>{difDays}d</span>;
		}
		
		else {
			return difDays + "d";
		}
	}
};

const CalculateExpirationAbs = (timeAdded, shelfLife) => {
	shelfLife = shelfLife * 24 * 60 * 60 * 1000;
	const expDate = new Date(timeAdded + shelfLife);

	const today = Date.now();
	const dif = expDate - today;

	return dif;
};

const getSvgs=(base) =>{
	var dataURI = 'data:image/svg+xml;base64,' + base;
	console.log(base);
	var svg = atob(base);
	console.log(svg);
	return svg;
}

export default function DisplayFoods() {
	const [userFood, userFoodLoading, userFoodError] = useData(
		`/UserFood/${userID}`
	);

	const [foodInfo, foodInfoLoading, foodInfoError] = useData(`/FoodInfo`);

	if (userFoodError) return <h1>{userFoodError}</h1>;
	if (userFoodLoading) return <h1>Loading list of foods...</h1>;

	if (foodInfoError) return <h1>{foodInfoError}</h1>;
	if (foodInfoLoading) return <h1>Loading list of foods...</h1>;

	let compareItems = (item1, item2) => {
		var x = CalculateExpirationAbs(item1[1]["TimeAdded"],
		foodInfo[item1[1]["Name"]]["ShelfLife"]); 
		var y = CalculateExpirationAbs(item2[1]["TimeAdded"],
		foodInfo[item2[1]["Name"]]["ShelfLife"]);
  		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	};

	return (
		<>
			
			<TableContainer component={Paper} sx={{position: 'relative'}}>
				<Table  aria-label="customized table" sx={{position: 'relative'}}>
					<TableHead>
						<TableRow>
							<StyledTableCell align="center"></StyledTableCell>
							<StyledTableCell align="center">Food Item</StyledTableCell>
							<StyledTableCell align="center">Use By</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Object.entries(userFood).sort(compareItems).map((item) => {
							return (
								<StyledTableRow key={`${item[1]["Name"]}_${item[0]}`}>
									<StyledTableCell align="center">
										<object data={foodInfo[item[1]["Name"]]["Icon"]} width="85" height="85"> </object>
									</StyledTableCell>
									<StyledTableCell align="center">
										{item[1]["Name"]}
									</StyledTableCell>
									<StyledTableCell align="center">
										{CalculateExpiration(
											item[1]["TimeAdded"],
											foodInfo[item[1]["Name"]]["ShelfLife"]
										)}
									</StyledTableCell>
								</StyledTableRow>
							);
						})}
					</TableBody>
					
				</Table>
				
			</TableContainer>

			
		</>
	);
}

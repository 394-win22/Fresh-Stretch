import React from "react";
import { useData, getItemsFromUser } from "../firebase";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

function createData(icon, name, expires) {
	return { icon, name, expires };
}

const rows = [
	createData("Bananas", "Bananas", "2d"),
	createData("Apples", "Apples", "3w"),
	createData("Lettuce", "Lettuce", "4d"),
	createData("Asparagus", "Asparagus", "EXPIRED"),
	createData("Raspberries", "Raspberries", "6d"),
	createData("Potatoes", "Potatoes", "1d"),
	createData("Celery", "Celery", "1w"),
];

export default function DisplayFoods() {
	const [data, loading, error] = useData("/");

	if (error) return <h1>{error}</h1>;
	if (loading) return <h1>Loading list of foods...</h1>;

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 700 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell align="center">Icon</StyledTableCell>
						<StyledTableCell align="center">Name</StyledTableCell>
						<StyledTableCell align="center">
							Expires
						</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<StyledTableRow key={row.icon}>
							<StyledTableCell align="center">
								{row.name}
							</StyledTableCell>
							<StyledTableCell align="center">
								{row.name}
							</StyledTableCell>
							<StyledTableCell align="center">
								{row.expires}
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

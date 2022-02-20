import React from "react";
import "./Footer.css";

import { Link, useLocation } from "react-router-dom";
import { Home, AccountCircle } from "@mui/icons-material";
import KitchenIcon from '@mui/icons-material/Kitchen'

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

const tabs = [
	{
		route: "/",
		icon: KitchenIcon,
		label: "Home",
	},
];

const Footer = () => {
	const { pathname } = useLocation();

	let routeIndex = 0;
	for (let i = 0; i < tabs.length; i++) {
		if (pathname === tabs[i].route) {
			routeIndex = i;
		}
	}

	const [value, setValue] = React.useState(routeIndex);
	if (pathname === "/login") return null;

	return (
		<Box sx={{ pb: 7 }}>
			<CssBaseline />
			<Paper
				sx={{
					position: "fixed",
					bottom: 0,
					left: 0,
					right: 0,
					zIndex: 101,
				}}
				elevation={4}
			>
				<BottomNavigation
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
					sx={{
						backgroundColor: "#E1DDD3",
						borderTop: 0,
						borderColor: "#302B2D",
						color: "#413529",
					}}
					showLabels
				>
					{tabs.map((tab, index) => {
						const Icon = tab.icon;
						return (
							<BottomNavigationAction
								key={`tab-${index}`}
								component={Link}
								to={tab.route}
								label={tab.label}
								icon={<Icon />}
							/>
						);
					})}
				</BottomNavigation>
				<div className="footer-margin"></div>
			</Paper>
		</Box>
	);
};

export default Footer;

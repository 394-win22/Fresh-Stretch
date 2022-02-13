import React from "react";
import "./Footer.css";
import { Link, useLocation } from "react-router-dom";
import {
	Checkroom,
	Assistant,
	Favorite,
	AccountCircle,
} from "@mui/icons-material";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

const tabs = [
	{
		route: "/",
		icon: Checkroom,
		label: "Home",
	},
	{
		route: "/user",
		icon: AccountCircle,
		label: "User",
	},
];

function Footer() {
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
}

export default Footer;

import React from "react";
import "./Header.css";
import AddFood from "../components/addFood.js";

const Header = () => {
	return (
		<>
            <div className="header-margin">
			

			<div className="header">
				<AddFood padding-left="5em"/>
				<object data="Logo1.svg" width="150" height="85" text-align="center"> </object>
			</div>

			</div>
		</>
	);
};

export default Header;

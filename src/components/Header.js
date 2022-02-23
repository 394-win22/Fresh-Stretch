import React from "react";
import "./Header.css";
import AddFood from "../components/addFood.js";
import {Container, Row, Col} from "react-bootstrap"

const Header = () => {
	return (
		<>
            <div className="header">
				<Container>
				<Row className="justify-content-left align-items-center align-self-left">
					<Col className="col">
						<AddFood padding-left="5em"/>
					</Col>
					<Col className="align-self-center align-items-center justify-content-center col">
						<object data="Logo1.svg" width="150" height="85" text-align="center" aria-label="Logo"></object>
					</Col>
					<Col>
					</Col>
				</Row>
				</Container>
			</div>
			<div className="header-margin"></div>
		</>
	);
};

export default Header;

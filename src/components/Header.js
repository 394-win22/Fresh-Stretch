import React from "react";
import "./Header.css";
import {Container, Row, Col} from "react-bootstrap"

const Header = () => {
	return (
		<>
            <div className="header">
				<Container>
				<Row>
					<Col className="align-self-center align-items-center justify-content-center col">
						<object data="Logo1.svg" width="150" height="85" text-align="center" aria-label="Logo"></object>
					</Col>
				</Row>
				</Container>
			</div>
			<div className="header-margin"></div>
		</>
	);
};

export default Header;

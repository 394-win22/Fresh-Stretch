import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import FoodsPage from "./pages/FoodsPage";
import UserPage from "./pages/UserPage";

function App() {
	return (
		<div>
			<BrowserRouter>
			
				<Routes>
					<Route exact path="/login" element={<LoginPage />} />
					<Route path="/" element={<><Header/><FoodsPage /><Footer/></>} />
					<Route path="/user" element={<><Header/><UserPage /><Footer/></>} />
				</Routes>
		
			</BrowserRouter>
		</div>
	);
}

export default App;

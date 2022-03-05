import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import FridgePage from "./pages/FridgePage";
import PantryPage from "./pages/PantryPage";
import FreezerPage from "./pages/FreezerPage";
import UserPage from "./pages/UserPage";
import { useUserState } from "./utils/firebase";

function App() {
	return (
		<div>
			<BrowserRouter>
			
				<Routes>
					<Route exact path="/login" element={<LoginPage />} />
					<Route path="/" element={<><Header /><FridgePage /><Footer/></>} />
					<Route path="/freezer" element={<><Header /><FreezerPage /><Footer/></>} />
					<Route path="/pantry" element={<><Header /><PantryPage /><Footer/></>} />
					<Route path="/user" element={<><Header/><UserPage /><Footer/></>} />
				</Routes>
		
			</BrowserRouter>
		</div>
	);
}

export default App;

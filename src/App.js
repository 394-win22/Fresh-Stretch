import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import FoodsPage from "./pages/FoodsPage";
import UserPage from "./pages/UserPage";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<FoodsPage />} />
					<Route path="/user" element={<UserPage />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;

import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useData, getItemsFromUser } from "./firebase";

import Header from "./components/Header";
import Footer from "./components/Footer";

import DisplayFoods from "./displayFoods";
import UserPage from "./pages/UserPage";

function App() {
	const [data, loading, error] = useData("/");

	if (error) return <h1>{error}</h1>;
	if (loading) return <h1>Loading the schedule...</h1>;

	console.log(data);

	return (
		<div>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<DisplayFoods />} />
					<Route path="/user" element={<UserPage />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;

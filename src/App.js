import "./App.css";

import { useState, useEffect } from "react";

import NavBar from "./Components/NavBar/NavBar";
import DashBoard from "./Components/DashBoard/DashBoard";
import generateToken from "./getnToken";

function App() {
	const [display, setDisplay] = useState({
		pmi: false,
		sense: false,
	});

	function OnChangeData(name) {
		setDisplay((prev) => {
			for (const cheie in prev) {
				prev[cheie] = false;
			}
			return { ...prev, [name]: true };
		});
	}

	useEffect(() => {
		generateToken();
		if (new Date(localStorage.getItem("e_d")) < new Date()) {
			generateToken();
		}
	}, []);
	return (
		<div className="main">
			<NavBar change={OnChangeData} />
			<DashBoard onChangeDashboard={display} />
		</div>
	);
}

export default App;

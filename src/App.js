import "./App.css";

import { useState, useEffect } from "react";

import NavBar from "./Components/NavBar/NavBar";
import DashBoard from "./Components/DashBoard/DashBoard";
import generateToken from "./getnToken";
import generateRefresh from "./generateRefresh";

function App() {
	const [validate, setValidate] = useState(true);
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
		if (!localStorage.getItem("r")) {
			generateRefresh(generateToken);
		}
		if (new Date(`${localStorage.getItem("r_d")}`).getTime() < Date.now) {
			generateRefresh();
		}

		if (!localStorage.getItem("t")) {
			generateToken();
		}

		if (new Date(`${localStorage.getItem("e_d")}`).getTime() < Date.now()) {
			generateToken();
		}
		setValidate(true);
	}, []);
	return (
		<div className="main">
			<NavBar change={OnChangeData} />
			<DashBoard
				onChangeDashboard={display}
				valid={validate}
				changevalid={setValidate}
			/>
		</div>
	);
}

export default App;

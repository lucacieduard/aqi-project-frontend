import "./App.css";
import PmiDashBoard from "./Components/DashBoard/PMI dashboard/pmiDashboard";
import { useState, useEffect } from "react";
import SenseDashboard from "./Components/DashBoard/Sense dashboard/senseDashboard";
import NavBar from "./Components/NavBar/NavBar";
import DashBoard from "./Components/DashBoard/DashBoard";

function App() {
	const [pmiData, setPmiData] = useState([]);

	const unitatiMasura = {
		"PM 10": `µg/m3`,
		Temperature: "℃",
		"PM 1.0": "µg/m3",
		"Average Noise": "dBA",
		Humidity: "%",
		VOC: "ug/m3",
		Pressure: "hPa",
		"PM 2.5": "µg/m3",
		Luminosity: "lux",
		Signal: "dBm",
		"Maximum Noise": "dBA",
		CO2: "ppm",
	};

	// const fetchData = () => {
	// 	fetch("https://api.iotinabox.com/companies/21295/locations/28671/status", {
	// 		headers: {
	// 			Authorization: `Bearer ${localStorage.getItem("t")}`,
	// 		},
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			const pmiSensor = data[0].locations[0].devices[1].sensors;
	// 			const senseSensor = data[0].locations[0].devices[2].sensors;
	// 			const onlypmiSensors = [];
	// 			const onlySenseSensors = [];

	// 			for (var obj of pmiSensor) {
	// 				if (
	// 					obj.name !== "iZiAiR Identified Risk" &&
	// 					obj.name !== "iZiAiR Air Quality Level" &&
	// 					obj.name !== "iZiAiR Recommendation"
	// 				)
	// 					onlypmiSensors.push(obj);
	// 			}

	// 			for (var object of senseSensor) {
	// 				if (
	// 					object.name !== "iZiAiR Identified Risk" &&
	// 					object.name !== "iZiAiR Air Quality Level" &&
	// 					object.name !== "iZiAiR Recommendation" &&
	// 					object.name !== "Occupancy Rate"
	// 				)
	// 					onlySenseSensors.push(object);
	// 			}

	// 			var mypmiData = {
	// 				date_m: `${new Date(onlypmiSensors[0].ts).getHours()}:${new Date(
	// 					onlypmiSensors[0].ts
	// 				).getMinutes()}:${new Date(onlypmiSensors[0].ts).getSeconds()}`,
	// 				date_g: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
	// 			};

	// 			for (var sensor of onlypmiSensors) {
	// 				mypmiData = {
	// 					...mypmiData,
	// 					[sensor.name]: `${
	// 						sensor.name === "Pressure" ? sensor.v / 100 : sensor.v
	// 					}`,
	// 				};
	// 			}

	// 			var mySenseData = {
	// 				date_m: `${new Date(onlySenseSensors[0].ts).getHours()}:${new Date(
	// 					onlySenseSensors[0].ts
	// 				).getMinutes()}:${new Date(onlySenseSensors[0].ts).getSeconds()}`,
	// 				date_g: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
	// 			};

	// 			for (var sensor1 of onlySenseSensors) {
	// 				mySenseData = {
	// 					...mySenseData,
	// 					[sensor1.name]: `${
	// 						sensor1.name === "Pressure" ? sensor1.v / 100 : sensor1.v
	// 					}`,
	// 				};
	// 			}

	// 			//setPmiData((prev) => [...prev, mypmiData]);
	// 			setSenseData((prev) => [...prev, mySenseData]);
	// 		})
	// 		.catch((e) => {
	// 			generateToken();
	// 		});
	// };

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

	return (
		<>
			<NavBar change={OnChangeData} />
			<DashBoard test={display} />
			{/* <PmiDashBoard data={pmiData} unitatiMasura={unitatiMasura} /> */}
			{/* <SenseDashboard data={senseData} unitatiMasura={unitatiMasura} /> */}
		</>
	);
}

export default App;

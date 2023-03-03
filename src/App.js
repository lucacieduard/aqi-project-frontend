import "./App.css";
import { subDays } from "date-fns";
import PmiDashBoard from "./Components/PMI dashboard/pmiDashboard";
import { useState, useEffect } from "react";
import SenseDashboard from "./Components/Sense dashboard/senseDashboard";

function App() {
	const [pmiData, setPmiData] = useState([]);
	const [senseData, setSenseData] = useState([]);

	const channel = {
		518: "PM 10",
		501: "Temperature",
		516: "PM 1.0",
		504: "iZiAiR Air Quality Level",
		505: "iZiAiR Identified Risk",
		503: "CO2",
		512: "Average Noise",
		510: "Luminosity",
		508: "VOC",
		515: "Pressure",
		502: "Humidity",
		100: "Signal",
		513: "Maximum Noise",
		514: "iZiAiR Recommendation",
		517: "PM 2.5",
		511: "Occupancy Rate",
	};

	const generateToken = () => {
		fetch("https://api.iotinabox.com/v1.0/oauth/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				grant_type: "refresh_token",
				refresh_token: `${process.env.REACT_APP_REFRESH_TOKEN}`,
				client_id: "nexelec$public",
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Nu s-a putut genera un nou acces token");
				}
				return response.json();
			})
			.then((data) => {
				localStorage.setItem("t", data.access_token);
				fetchData();
			})
			.catch((error) => {
				console.error(error);
			});
	};

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

	const fetchData = () => {
		fetch("https://api.iotinabox.com/companies/21295/locations/28671/status", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("t")}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				const pmiSensor = data[0].locations[0].devices[1].sensors;
				const senseSensor = data[0].locations[0].devices[2].sensors;
				const onlypmiSensors = [];
				const onlySenseSensors = [];

				for (var obj of pmiSensor) {
					if (
						obj.name !== "iZiAiR Identified Risk" &&
						obj.name !== "iZiAiR Air Quality Level" &&
						obj.name !== "iZiAiR Recommendation"
					)
						onlypmiSensors.push(obj);
				}

				for (var object of senseSensor) {
					if (
						object.name !== "iZiAiR Identified Risk" &&
						object.name !== "iZiAiR Air Quality Level" &&
						object.name !== "iZiAiR Recommendation" &&
						object.name !== "Occupancy Rate"
					)
						onlySenseSensors.push(object);
				}

				var mypmiData = {
					date_m: `${new Date(onlypmiSensors[0].ts).getHours()}:${new Date(
						onlypmiSensors[0].ts
					).getMinutes()}:${new Date(onlypmiSensors[0].ts).getSeconds()}`,
					date_g: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
				};

				for (var sensor of onlypmiSensors) {
					mypmiData = {
						...mypmiData,
						[sensor.name]: `${
							sensor.name === "Pressure" ? sensor.v / 100 : sensor.v
						}`,
					};
				}

				var mySenseData = {
					date_m: `${new Date(onlySenseSensors[0].ts).getHours()}:${new Date(
						onlySenseSensors[0].ts
					).getMinutes()}:${new Date(onlySenseSensors[0].ts).getSeconds()}`,
					date_g: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
				};

				for (var sensor1 of onlySenseSensors) {
					mySenseData = {
						...mySenseData,
						[sensor1.name]: `${
							sensor1.name === "Pressure" ? sensor1.v / 100 : sensor1.v
						}`,
					};
				}

				setPmiData((prev) => [...prev, mypmiData]);
				setSenseData((prev) => [...prev, mySenseData]);
			})
			.catch((e) => {
				generateToken();
			});
	};

	const fetchHistory = () => {
		fetch(
			`https://api.iotinabox.com/companies/21295/locations/28671/things/4a5ee5e0-b4bb-11ec-b352-614e8a096bf2/history?start_date=${subDays(
				new Date(),
				1
			).getTime()}&end_date=${new Date().getTime()}&type=custom&units=mgpcm,dba,c,p,dbm,d,lux,hpa`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("t")}`,
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				const readings = data.readings;
				const senzorData = [];

				for (var obj of readings) {
					var newData = {
						date: `${
							new Date(obj.ts).getHours() < 10
								? `0${new Date(obj.ts).getHours()}`
								: new Date(obj.ts).getHours()
						}:${
							new Date(obj.ts).getMinutes() < 10
								? `0${new Date(obj.ts).getMinutes()}`
								: new Date(obj.ts).getMinutes()
						}`,
					};

					for (var sen of obj.sensors) {
						if (
							channel[sen.channel] !== "iZiAiR Identified Risk" &&
							channel[sen.channel] !== "iZiAiR Air Quality Level" &&
							channel[sen.channel] !== "iZiAiR Recommendation" &&
							channel[sen.channel] !== "Occupancy Rate"
						) {
							if (channel[sen.channel] === "Pressure") {
								newData = {
									...newData,
									[channel[sen.channel]]: sen.v / 100,
								};
							} else {
								newData = {
									...newData,
									[channel[sen.channel]]: sen.v,
								};
							}
						}
					}

					senzorData.push(newData);
				}

				setSenseData(senzorData);
			})
			.catch((e) => console.log(e));
	};

	useEffect(() => {
		if (localStorage.getItem("t") === null) {
			generateToken();
		} else {
			fetchHistory();
		}

		// const interval = setInterval(() => {
		// 	fetchData();
		// }, 3 * 10000);
		// return () => clearInterval(interval);
	}, []);

	return (
		<>
			{/* <PmiDashBoard data={pmiData} unitatiMasura={unitatiMasura} /> */}
			<SenseDashboard data={senseData} unitatiMasura={unitatiMasura} />
		</>
	);
}

export default App;

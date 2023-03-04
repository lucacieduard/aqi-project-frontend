import Chart from "../../Chart";
import DashData from "../../dashboard_data";
import { subDays } from "date-fns";
import channel from "../../../channel";
import { useState, useEffect } from "react";

export default function PmiDashBoard(props) {
	const [senseData, setSenseData] = useState([]);

	const fetchHistory = () => {
		fetch(
			`https://api.iotinabox.com/companies/21295/locations/28671/things/4a5ee5e0-b4bb-11ec-b352-614e8a096bf2/history?start_date=${new Date().getTime()}&end_date=${subDays(
				new Date(),
				1
			).getTime()}&type=custom&units=mgpcm,dba,c,p,dbm,d,lux,hpa`,
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
			//generateToken();
		} else {
			fetchHistory();
		}

		// const interval = setInterval(() => {
		// 	fetchData();
		// }, 3 * 10000);
		// return () => clearInterval(interval);
	}, []);

	return (
		<div className="dashboard">
			<DashData
				data={senseData}
				title="My Pmi Sensor"
				unitatiMasura={props.unitatiMasura}
			/>
			<div className="grafice">
				<Chart
					data={senseData}
					parametru="Temperature"
					unitatiMasura={props.unitatiMasura}
				/>
				<Chart
					data={senseData}
					parametru="PM 10"
					parametru2="PM 2.5"
					parametru3="PM 1.0"
					unitatiMasura={props.unitatiMasura}
				/>

				<Chart
					data={senseData}
					parametru="Humidity"
					unitatiMasura={props.unitatiMasura}
				/>
				<Chart
					data={senseData}
					parametru="Luminosity"
					unitatiMasura={props.unitatiMasura}
				/>
				<Chart
					data={senseData}
					parametru="Maximum Noise"
					unitatiMasura={props.unitatiMasura}
				/>
				<Chart
					data={senseData}
					parametru="Pressure"
					unitatiMasura={props.unitatiMasura}
				/>
				<Chart
					data={senseData}
					parametru="Signal"
					unitatiMasura={props.unitatiMasura}
				/>
				<Chart
					data={senseData}
					parametru="VOC"
					unitatiMasura={props.unitatiMasura}
				/>
				<Chart
					data={senseData}
					parametru="Average Noise"
					unitatiMasura={props.unitatiMasura}
				/>
			</div>
		</div>
	);
}

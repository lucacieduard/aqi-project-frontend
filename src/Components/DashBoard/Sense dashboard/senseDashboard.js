import Chart from "../../Chart";
import DashData from "../../dashboard_data";
import { subDays } from "date-fns";
import channel from "../../../channel";
import unitatiMasura from "../../../unitatiMasura";
import generateToken from "../../../getnToken";
import fetchHistory from "../../../fetchHistory";

import { useState, useEffect } from "react";

export default function SenseDashboard(props) {
	const [data, setData] = useState([]);

	async function fetchmydata() {
		let myData = await fetchHistory();
		setData(myData);
		return myData;
	}

	useEffect(() => {
		if (localStorage.getItem("t") === null) {
			generateToken(fetchmydata);
		} else {
			fetchmydata();
		}
	}, []);

	return (
		<div className="dashboard">
			<DashData
				data={data}
				title="My Sense Sensor"
				unitatiMasura={unitatiMasura}
			/>
			<div className="grafice">
				<Chart
					data={data}
					parametru="Temperature"
					unitatiMasura={unitatiMasura}
				/>
				<Chart
					data={data}
					parametru="PM 10"
					parametru2="PM 2.5"
					parametru3="PM 1.0"
					unitatiMasura={unitatiMasura}
				/>

				<Chart data={data} parametru="Humidity" unitatiMasura={unitatiMasura} />
				<Chart
					data={data}
					parametru="Luminosity"
					unitatiMasura={unitatiMasura}
				/>
				<Chart
					data={data}
					parametru="Maximum Noise"
					unitatiMasura={unitatiMasura}
				/>
				<Chart data={data} parametru="Pressure" unitatiMasura={unitatiMasura} />
				<Chart data={data} parametru="Signal" unitatiMasura={unitatiMasura} />
				<Chart data={data} parametru="VOC" unitatiMasura={unitatiMasura} />
				<Chart
					data={data}
					parametru="Average Noise"
					unitatiMasura={unitatiMasura}
				/>
				<Chart data={data} parametru="CO2" unitatiMasura={unitatiMasura} />
			</div>
		</div>
	);
}

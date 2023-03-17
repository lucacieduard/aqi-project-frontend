import fetchHistory from "../../../fetchHistory";
import { useEffect, useState } from "react";
import subDays from "date-fns/subDays";
import Chart from "../../Chart";
import unitatiMasura from "../../../unitatiMasura";
import DashData from "../../dashboard_data";
import { useParams } from "react-router-dom";
import TimeChange from "../../TImeChange/ChangeTime";
import LimitPM from "../../OfficialInfo/LimitPM";

export default function AirQualityDashBoard(props) {
	let { type } = useParams();
	let day;
	if (type === "day") {
		day = 1;
	}

	if (type === "week") {
		day = 7;
	}
	const [data, setData] = useState([]);
	const [visiblePM, setVisiblePM] = useState({
		"PM 10": true,
		"PM 2.5": true,
		"PM 1.0": true,
	});
	function changeHandler(e) {
		setVisiblePM((prev) => ({
			...prev,
			[e.target.name]: !prev[e.target.name],
		}));
	}

	async function fetchmydata(days) {
		props.loadingChange(true);

		let myData = await fetchHistory(
			`https://api.iotinabox.com/companies/21295/locations/28671/things/1e7e6260-b679-11ec-ae6d-092f3fe19d26/history?start_date=${subDays(
				new Date(),
				days
			).getTime()}&end_date=${new Date().getTime()}&type=custom&units=wh,p,m,hpa,mgpcm,dbm,c,uuid&timestamp=`
		);

		console.log(myData);

		setData([...myData]);
		props.loadingChange(false);
		return myData;
	}

	useEffect(() => {
		fetchmydata(day);
	}, [day]);

	return (
		<>
			{data.length === 0 && (
				<p style={{ textAlign: "center", marginTop: "2rem" }}>
					Nu exista date pe ultima zi
				</p>
			)}
			{!props.loading && data.length !== 0 && (
				<div className="dashboard">
					<DashData
						data={data}
						title="Air Quality Sensor"
						unitatiMasura={unitatiMasura}
						company_name="NEXELEC"
					/>
					<TimeChange
						day="/nexelec/air-quality/day"
						week="/nexelec/air-quality/week"
						active={type}
					/>
					<LimitPM />
					<div className="grafice">
						<div className="pm-graph c_style">
							<div className="pm-graph-info">
								<ul>
									<li>
										<input
											type="checkbox"
											id="PM 10"
											name="PM 10"
											checked={visiblePM["PM 10"]}
											onChange={changeHandler}
										/>
										<label>PM 10</label>
									</li>
									<li>
										<input
											type="checkbox"
											id="PM 2.5"
											name="PM 2.5"
											checked={visiblePM["PM 2.5"]}
											onChange={changeHandler}
										/>
										<label>PM 2.5</label>
									</li>
									<li>
										<input
											type="checkbox"
											id="PM 1.0"
											name="PM 1.0"
											checked={visiblePM["PM 1.0"]}
											onChange={changeHandler}
										/>
										<label>PM 1.0</label>
									</li>
								</ul>
							</div>
							<div className="chart_pms">
								<Chart
									data={data}
									parametru="PM 10"
									parametru2="PM 2.5"
									parametru3="PM 1.0"
									unitatiMasura={unitatiMasura}
									visible={visiblePM}
								/>
							</div>
						</div>
						<div className="duo_chart">
							<div className="duo_chart_chart c_style">
								<Chart
									data={data}
									parametru="Temperature"
									unitatiMasura={unitatiMasura}
								/>
							</div>
							<div className="duo_chart_chart c_style">
								<Chart
									data={data}
									parametru="Humidity"
									unitatiMasura={unitatiMasura}
								/>
							</div>
						</div>
						<div className="duo_chart">
							<div className="duo_chart_chart c_style">
								<Chart
									data={data}
									parametru="Pressure"
									unitatiMasura={unitatiMasura}
								/>
							</div>
							<div className="duo_chart_chart c_style">
								<Chart
									data={data}
									parametru="Signal"
									unitatiMasura={unitatiMasura}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

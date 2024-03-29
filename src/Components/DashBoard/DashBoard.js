import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "../../Spinner";
import AirQualityDashBoard from "./Nexelec/airQuality";
import PmiDashBoard from "./Nexelec/pmiDashboard";
import SenseDashboard from "./Nexelec/senseDashboard";
import generateRefresh from "../../generateRefresh";
import generateToken from "../../getnToken";
export default function DashBoard(props) {
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
		props.changevalid(true);
	}, []);

	const [isLoading, setIsLoading] = useState(false);

	return (
		<>
			<div className="dashBoard">
				{isLoading === true ? <Spinner /> : ""}
				<Routes>
					<Route path="/" element={"test"} />

					<Route path="nexelec">
						<Route path="pmi">
							<Route
								path=":type"
								element={
									<PmiDashBoard
										loadingChange={setIsLoading}
										loading={isLoading}
									/>
								}
							/>
						</Route>
						<Route path="sense">
							<Route
								path=":type"
								element={
									<SenseDashboard
										loadingChange={setIsLoading}
										loading={isLoading}
									/>
								}
							/>
						</Route>
						<Route path="air-quality">
							<Route
								path=":type"
								element={
									<AirQualityDashBoard
										loadingChange={setIsLoading}
										loading={isLoading}
									/>
								}
							/>
						</Route>
					</Route>
					<Route path="*" element={"not found"} />
				</Routes>
			</div>
		</>
	);
}

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "../../Spinner";
import AirQualityDashBoard from "./Nexelec/airQuality";
import PmiDashBoard from "./Nexelec/pmiDashboard";
import SenseDashboard from "./Nexelec/senseDashboard";

export default function DashBoard(props) {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<div className="dashBoard">
			{isLoading === true ? <Spinner /> : ""}
			<Routes>
				<Route path="/" element={"test"} />
				<Route path="/nexelec">
					<Route
						path="pmi"
						element={
							<PmiDashBoard loadingChange={setIsLoading} loading={isLoading} />
						}
					/>
					<Route
						path="sense"
						element={
							<SenseDashboard
								loadingChange={setIsLoading}
								loading={isLoading}
							/>
						}
					/>
					<Route
						path="air-quality"
						element={
							<AirQualityDashBoard
								loadingChange={setIsLoading}
								loading={isLoading}
							/>
						}
					/>
				</Route>
			</Routes>
		</div>
	);
}

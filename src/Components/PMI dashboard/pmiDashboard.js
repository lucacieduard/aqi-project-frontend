import Chart from "../Chart";
import DashData from "../dashboard_data";
export default function PmiDashBoard(props) {
	return (
		<div className="dashboard">
			<DashData
				data={props.data}
				title="My Pmi Sensor"
				unitatiMasura={props.unitatiMasura}
			/>
			<div className="grafice">
				<Chart
					data={props.data}
					parametru="Temperature"
					unitatiMasura={props.unitatiMasura}
				/>
				<Chart
					data={props.data}
					parametru="PM 10"
					parametru2="PM 2.5"
					parametru3="PM 1.0"
					unitatiMasura={props.unitatiMasura}
				/>

				<Chart
					data={props.data}
					parametru="Humidity"
					unitatiMasura={props.unitatiMasura}
				/>
				<Chart
					data={props.data}
					parametru="Luminosity"
					unitatiMasura={props.unitatiMasura}
				/>
				<Chart
					data={props.data}
					parametru="Maximum Noise"
					unitatiMasura={props.unitatiMasura}
				/>
				<Chart
					data={props.data}
					parametru="Pressure"
					unitatiMasura={props.unitatiMasura}
				/>
				<Chart
					data={props.data}
					parametru="Signal"
					unitatiMasura={props.unitatiMasura}
				/>
				<Chart
					data={props.data}
					parametru="VOC"
					unitatiMasura={props.unitatiMasura}
				/>
				<Chart
					data={props.data}
					parametru="Average Noise"
					unitatiMasura={props.unitatiMasura}
				/>
			</div>
		</div>
	);
}

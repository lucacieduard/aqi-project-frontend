import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
} from "recharts";

export default function Chart(props) {
	const unitati = props.unitatiMasura;
	const payload = [
		{
			value: `${props.parametru} (${unitati[props.parametru]})`,
			type: "line",
			id: "ID0`1",
		},
	];
	if (props.parametru2) {
		payload.push({
			value: `${props.parametru2} (${unitati[props.parametru2]})`,
			type: "line",
			id: "ID0`1",
		});
	}

	if (props.parametru3) {
		payload.push({
			value: `${props.parametru} (${unitati[props.parametru]})`,
			type: "line",
			id: "ID0`1",
		});
	}
	return (
		<LineChart width={900} height={350} data={props.data}>
			<Line
				type="basis"
				dataKey={props.parametru}
				stroke="#8884d8"
				dot={false}
				strokeWidth={2}
				name={props.name}
			/>
			{props.parametru2 && (
				<Line
					type="basis"
					dataKey={props.parametru2}
					stroke="red"
					strokeWidth={2}
					dot={false}
				/>
			)}

			{props.parametru3 && (
				<Line
					type="basis"
					dataKey={props.parametru3}
					stroke="green"
					strokeWidth={2}
					dot={false}
				/>
			)}

			<CartesianGrid opacity={0.5} />
			<XAxis dataKey="date" />
			<YAxis minTickGap={0.1} domain={["auto", "auto"]} type="number" />
			<Tooltip />
			<Legend verticalAlign="bottom" align="center" payload={payload} />
		</LineChart>
	);
}

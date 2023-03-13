import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ReferenceLine,
} from "recharts";
import { ResponsiveContainer } from "recharts";

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
		<ResponsiveContainer width="100%" height={250}>
			<LineChart
				data={props.data}
				margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
			>
				{props.parametru === "PM 10" ? (
					props.visible[props.parametru] && (
						<Line
							type="monotone"
							dataKey={props.parametru}
							stroke="#8884d8"
							dot={false}
							strokeWidth={1.2}
							name={props.name}
						/>
					)
				) : (
					<Line
						type="monotone"
						dataKey={props.parametru}
						stroke="#8884d8"
						dot={false}
						strokeWidth={1.2}
						name={props.name}
					/>
				)}
				{props.parametru2 && props.visible[props.parametru2] && (
					<Line
						type="monotone"
						dataKey={props.parametru2}
						stroke="red"
						strokeWidth={1.2}
						dot={false}
					/>
				)}
				{props.parametru3 && props.visible[props.parametru3] && (
					<Line
						type="monotone"
						dataKey={props.parametru3}
						stroke="green"
						strokeWidth={1.2}
						dot={false}
					/>
				)}
				<CartesianGrid opacity={0.5} />
				<XAxis
					dataKey="date"
					minTickGap={30}
					tickSize={15}
					tick={{ stroke: "#dddd", strokeWidth: 0.5 }}
				/>
				<YAxis
					minTickGap={0.1}
					domain={["auto", "auto"]}
					type="number"
					tickSize={7}
					width={50}
				/>
				<Tooltip offset={20} />
				<Legend verticalAlign="top" height={36} />
			</LineChart>
		</ResponsiveContainer>
	);
}

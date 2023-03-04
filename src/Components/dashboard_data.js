export default function DashData(props) {
	console.log(props.data);
	const dataLength = props.data.length;

	if (props.data.length !== 0) {
		var lastData = props.data[dataLength - 1];
	}

	return (
		<div className="dashboard_header">
			<h1 className="dash_title">{props.title}</h1>

			{props.data[0] && (
				<div className="dash_data">
					<p>Valori actuale:</p>
					<ul className="dash_values">
						{Object.entries(lastData).map(
							([item, subject], i) =>
								item !== "date" && (
									<li className="dash_value" key={i}>
										{item} -&gt; {subject} ({props.unitatiMasura[item]})
									</li>
								)
						)}
					</ul>
				</div>
			)}
		</div>
	);
}

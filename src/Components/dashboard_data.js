export default function DashData(props) {
	const dataLength = props.data.length;

	if (props.data.length !== 0) {
		var lastData = props.data[dataLength - 1];
	}

	return (
		<div className="dashboard_header">
			<h1 className="dash_title">{props.title}</h1>
			<div className="sensor_producer">
				<p className="producer">
					Producător:
					<a
						href="https://www.nexelec.fr/"
						target="
			"
					>
						{props.company_name}
					</a>
				</p>
				{lastData && (
					<p>
						Ultima actualizare :
						{` ${
							new Date(lastData.full_date).getHours() < 10
								? `0${new Date(lastData.full_date).getHours()}`
								: new Date(lastData.full_date).getHours()
						}:${
							new Date(lastData.full_date).getMinutes() < 10
								? `0${new Date(lastData.full_date).getMinutes()}`
								: new Date(lastData.full_date).getMinutes()
						}`}
					</p>
				)}
			</div>
			{props.data[0] && (
				<div className="dash_data">
					<ul className="dash_values">
						{Object.entries(lastData).map(
							([item, subject], i) =>
								item !== "date" &&
								item !== "full_date" && (
									<li className="dash_value" key={i}>
										<span className="data_name">{item}</span>
										<span className="data_value">
											{subject} ({props.unitatiMasura[item]})
										</span>
									</li>
								)
						)}
					</ul>
				</div>
			)}
		</div>
	);
}

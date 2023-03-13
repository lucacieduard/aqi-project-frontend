import { useState } from "react";
import { Link } from "react-router-dom";
import arrow from "../../../img/arrow-right-3098.svg";
export default function Company(props) {
	const [view, setView] = useState(false);

	function companySensorsHide() {
		setView((prev) => !prev);
	}
	return (
		<div className="sensor-company">
			<div className="sensor-company-name" onClick={companySensorsHide}>
				<img
					src={arrow}
					alt="arrow-icon"
					className={`arrow-icon ${view ? "rotate-arrow" : ""}`}
				/>
				<p className="company-name">{props.company_name}</p>
			</div>
			{view && (
				<ul className={`sensors`}>
					{props.param1 && (
						<li>
							<Link
								to={`${props.company_name.toLowerCase()}/${props.param1}/day`}
								onClick={(e) => {
									props.onClickSensor();
									setView(false);
								}}
							>
								{props.name1}
							</Link>
						</li>
					)}
					{props.param2 && (
						<li>
							<Link
								to={`${props.company_name.toLowerCase()}/${props.param2}/day`}
								onClick={(e) => {
									props.onClickSensor();
									setView(false);
								}}
							>
								{props.name2}
							</Link>
						</li>
					)}
					{props.param3 && (
						<li>
							<Link
								to={`${props.company_name.toLowerCase()}/${props.param3}/day`}
								onClick={(e) => {
									props.onClickSensor();
									setView(false);
								}}
							>
								{props.name3}
							</Link>
						</li>
					)}
				</ul>
			)}
		</div>
	);
}

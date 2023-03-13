import { Link } from "react-router-dom";

export default function TimeChange(props) {
	return (
		<div className="change_time_container">
			<span>Alege perioada</span>
			<div>
				<Link to={props.day}>
					<button
						className={`time_button ${props.active === "day" ? "active" : ""}`}
					>
						D
					</button>
				</Link>
				<Link to={props.week}>
					<button
						className={`time_button ${props.active === "week" ? "active" : ""}`}
					>
						W
					</button>
				</Link>
			</div>
		</div>
	);
}

import arrow from "../../img/arrow-right-3098.svg";
import { useState } from "react";
export default function LimitPM() {
	const [view, setView] = useState(false);
	function clickHandler() {
		setView((prev) => !prev);
	}
	return (
		<div className="limit-pm-container c_style">
			<div className="limit-pm-header" onClick={clickHandler}>
				<p>Indice particule în suspensie</p>
				<img
					src={arrow}
					alt=""
					className={`arrow-icon ${view ? "rotate-arrow" : ""}`}
				/>
			</div>
			{view && (
				<>
					<div className="limit-pm-content">
						<div className="limit-pm-type">
							<h3>PM10</h3>
							<ul>
								<li>
									<span>0-20</span>
									<span>Scăzut</span>
								</li>
								<li>
									<span> 20-40</span>
									<span>Mediu</span>
								</li>
								<li>
									<span>40-50</span>
									<span>Ridicat</span>
								</li>
								<li>
									<span>50-100</span>
									<span>Foarte Ridicat</span>
								</li>
								<li>
									<span>100-150</span>
									<span>Extrem</span>
								</li>
								<li>
									<span> 150-1200</span>
									<span>Foarte Extrem</span>
								</li>
							</ul>
						</div>
						<div className="limit-pm-type">
							<h3>PM2.5</h3>
							<ul>
								<li>
									<span>0-10</span>
									<span>Foarte scăzut</span>
								</li>
								<li>
									<span>10-20</span>
									<span>Scăzut</span>
								</li>
								<li>
									<span>20-25</span>
									<span>Mediu</span>
								</li>
								<li>
									<span>25-50</span>
									<span>Ridicat </span>
								</li>
								<li>
									<span>50-75</span>
									<span>Foarte Ridicat</span>
								</li>
								<li>
									<span>75-800</span>
									<span>Extrem</span>
								</li>
							</ul>
						</div>
					</div>
					<p style={{ marginTop: 10 }}>
						Sursă :{" "}
						<a
							href="https://www.calitateaer.ro/public/home-page/?__locale=ro"
							target="_blank"
							rel="noreferrer"
						>
							CalitateAer
						</a>
					</p>
				</>
			)}
		</div>
	);
}

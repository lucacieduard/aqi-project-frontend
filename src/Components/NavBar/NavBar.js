import { useState } from "react";
import Company from "./Companies/Company";
import logo from "../../img/logo-inoesy.jpg";
import senzorIcon from "../../img/sensor-icon-17.jpg";
import hamburger from "../../img/menu.png";
import { Link } from "react-router-dom";

export default function NavBar(props) {
	const [mobileMenu, setMobileMenu] = useState(false);
	function hideMobileMenu() {
		setMobileMenu((prev) => !prev);
	}

	return (
		<div className="navBar">
			<div className="nav-header">
				<Link to="/">
					<img src={logo} alt="logo" className="logo" />
				</Link>
				<button onClick={hideMobileMenu}>
					<img
						src={hamburger}
						alt="hamburger-icon"
						className="hamburger ham-h"
					/>
				</button>
			</div>

			<nav className={`nav-content ${mobileMenu ? "" : "hide"}`}>
				<div className="title-list-item">
					<img src={senzorIcon} alt="sensor-icon" className="title-icon" />

					<p className="category_name">Sensors</p>
				</div>
				<Company
					change={props.change}
					company_name="NEXELEC"
					param1="pmi"
					name1="My PMI Sensor"
					param2="sense"
					name2="My Sense Sensor"
					onClickSensor={hideMobileMenu}
					name3="Air Quality"
					param3="air-quality"
				/>
				{/* <Company
					change={props.change}
					company_name="NETIGO"
					onClickSensor={hideMobileMenu}
				/> */}
			</nav>
		</div>
	);
}

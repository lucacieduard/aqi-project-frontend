export default function NavBar(props) {
	function ClickHandler(name) {}
	return (
		<div className="navBar">
			<ul>
				<p>Sensors</p>
				<li
					name="pmi"
					onClick={(e) => {
						props.change(e.target.attributes.name.value);
					}}
				>
					PMI
				</li>
				<li
					name="sense"
					onClick={(e) => {
						props.change(e.target.attributes.name.value);
					}}
				>
					Sense
				</li>
			</ul>
		</div>
	);
}

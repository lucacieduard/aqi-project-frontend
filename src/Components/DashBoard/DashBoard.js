import PmiDashBoard from "./PMI dashboard/pmiDashboard";
import SenseDashboard from "./Sense dashboard/senseDashboard";

export default function DashBoard(props) {
	return (
		<div className="dashBoard">
			{props.test.pmi && <p>PMI</p>}
			{props.test.sense && <SenseDashboard />}
		</div>
	);
}

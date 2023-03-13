import { useState, useEffect } from "react";
import fetchHistory from "./fetchHistory";
import subDays from "date-fns/subDays";
export default function Test(props) {
	const [data, setData] = useState([]);

	useEffect(() => {
		async function fetchmydata(days) {
			let myData = await fetchHistory(
				`https://api.iotinabox.com/companies/21295/locations/28671/things/1a17b200-b4ba-11ec-876b-f5efab429af1/history?start_date=${subDays(
					new Date(),
					days
				).getTime()}&end_date=${new Date().getTime()}&type=custom&units=mgpcm,dba,c,p,dbm,d,lux,hpa&timestamp=`
			);
			setData([...myData]);
		}
		fetchmydata(30);
	}, []);
	return (
		<>
			<>{JSON.stringify(data)}</>
		</>
	);
}

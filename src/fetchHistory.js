import channel from "./channel";
import generateToken from "./getnToken";
import subDays from "date-fns/subDays";

const fetchHistory = async (callback) => {
	try {
		const response = await fetch(
			`https://api.iotinabox.com/companies/21295/locations/28671/things/4a5ee5e0-b4bb-11ec-b352-614e8a096bf2/history?start_date=${subDays(
				new Date(),
				1
			).getTime()}&end_date=${new Date().getTime()}&type=custom&units=mgpcm,dba,c,p,dbm,d,lux,hpa`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("t")}`,
				},
			}
		);
		const data = await response.json();
		const readings = data.readings;
		const senzorData = [];

		for (var obj of readings) {
			var newData = {
				date: `${
					new Date(obj.ts).getHours() < 10
						? `0${new Date(obj.ts).getHours()}`
						: new Date(obj.ts).getHours()
				}:${
					new Date(obj.ts).getMinutes() < 10
						? `0${new Date(obj.ts).getMinutes()}`
						: new Date(obj.ts).getMinutes()
				}`,
			};

			for (var sen of obj.sensors) {
				if (
					channel[sen.channel] !== "iZiAiR Identified Risk" &&
					channel[sen.channel] !== "iZiAiR Air Quality Level" &&
					channel[sen.channel] !== "iZiAiR Recommendation" &&
					channel[sen.channel] !== "Occupancy Rate"
				) {
					if (channel[sen.channel] === "Pressure") {
						newData = {
							...newData,
							[channel[sen.channel]]: sen.v / 100,
						};
					} else {
						newData = {
							...newData,
							[channel[sen.channel]]: sen.v,
						};
					}
				}
			}

			senzorData.push(newData);
		}

		return senzorData.reverse();
	} catch (e) {
		generateToken();
		callback();
	}
};

export default fetchHistory;

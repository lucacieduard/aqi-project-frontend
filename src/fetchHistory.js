import channel from "./channel";

const fetchHistory = async (link, timestamp) => {
	try {
		const senzorData = [];
		let verify = true;
		while (verify) {
			const response = await fetch(link + timestamp, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("t")}`,
				},
			});
			const data = await response.json();
			const readings = data.readings;

			for (var obj of readings) {
				var newData = {
					date: `${
						new Date(obj.ts).getDate() < 10
							? "0" + new Date(obj.ts).getDate()
							: new Date(obj.ts).getDate()
					}/${
						`${new Date(obj.ts).getMonth() + 1}` < 10
							? `0${new Date(obj.ts).getMonth() + 1}`
							: `${new Date(obj.ts).getMonth() + 1}`
					}/${new Date(obj.ts).getFullYear()} - ${
						new Date(obj.ts).getHours() < 10
							? `0${new Date(obj.ts).getHours()}`
							: new Date(obj.ts).getHours()
					}:${
						new Date(obj.ts).getMinutes() < 10
							? `0${new Date(obj.ts).getMinutes()}`
							: new Date(obj.ts).getMinutes()
					}`,
					full_date: new Date(obj.ts),
				};

				for (var sen of obj.sensors) {
					if (
						channel[sen.channel] !== "iZiAiR Identified Risk" &&
						channel[sen.channel] !== "iZiAiR Air Quality Level" &&
						channel[sen.channel] !== "iZiAiR Recommendation" &&
						channel[sen.channel] !== "Occupancy Rate" &&
						channel[sen.channel] !== "Location" &&
						channel[sen.channel] !== "Energy Stored" &&
						channel[sen.channel] !== "Baterry" &&
						channel[sen.channel] !== "Power Consumption"
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
			if (data.timestamp) {
				verify = true;
				timestamp = data.timestamp;
			} else {
				verify = false;
				return senzorData.reverse();
			}
		}
	} catch (e) {
		console.log(e);
	}
};

export default fetchHistory;

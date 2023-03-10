import channel from "./channel";

// function saveData(data) {
// 	for (let obj of data) senzorData.push(obj);
// }

const fetchHistory = async (link, timestamp) => {
	try {
		const response = await fetch(link + timestamp, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("t")}`,
			},
		});
		const data = await response.json();
		const senzorData = [];
		const readings = data.readings;

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
				full_date: obj.ts,
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
			timestamp = data.timestamp;
			fetchHistory(link, timestamp);
		} else {
			console.log(senzorData);
			return senzorData.reverse();
		}
	} catch (e) {
		console.log(e);
	}
};

export default fetchHistory;

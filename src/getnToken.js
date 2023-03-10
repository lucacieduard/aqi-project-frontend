function generateToken(callback) {
	fetch("https://api.iotinabox.com/v1.0/oauth/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: `${process.env.REACT_APP_REFRESH_TOKEN}`,
			client_id: "nexelec$public",
		}),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Nu s-a putut genera un nou acces token");
			}
			return response.json();
		})
		.then((data) => {
			localStorage.setItem("t", data.access_token);
			const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
			localStorage.setItem("e_d", expirationDate);
		})
		.catch((error) => {
			console.error(error);
		});
}

export default generateToken;

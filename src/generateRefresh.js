import generateToken from "./getnToken";

export default function generateRefresh(callback) {
	fetch("https://api.iotinabox.com/v1.0/oauth/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "password",
			client_id: "nexelec$public",
			username: `${process.env.REACT_APP_EMAIL}`,
			password: `${process.env.REACT_APP_PW}`,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			localStorage.setItem("r", data.refresh_token);
			const expirationDate = new Date(Date.now() + 86400000 * 14);
			localStorage.setItem("r_d", expirationDate);
			if (callback) callback();
		})
		.catch((error) => console.error(error));
}

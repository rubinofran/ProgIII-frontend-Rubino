import axios from "axios";
import { apiBaseUrl, apiTimeout } from "../constants";
/* import { Navigate } from "react-router-dom";
import localStorage from "./localStorage"; */

/* function errorMessage(err) {
	if (err.response && err.response.status === 401) {
		localStorage.delete();
		<Navigate to="/login" replace={true} />;
	}
	// if (err.response && err.response.status === 403) {
	// 	<Navigate to="/403" replace={true} />;
	// }
	// if (err.response && err.response.status === 404) {
	// 	<Navigate to="/404" replace={true} />;
	// }
	// if (err.response && err.response.status === 500) {
	// 	<Navigate to="/500" replace={true} />;
	// }
	return err;
} */

const api = axios.create({
	baseURL: apiBaseUrl,
	timeout: apiTimeout,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

export default api;

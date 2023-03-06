import axios from "axios";
import { apiBaseUrl, apiTimeout } from "../constants";

// Crea una instancia de axios con la url de la api y algunas configuraciones
const api = axios.create({
	baseURL: apiBaseUrl,
	timeout: apiTimeout,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		/* Authorization: "" */
	},
});

export default api;

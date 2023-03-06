import lscache from "lscache";
import api from "./api";

if (process.env.NODE_ENV !== "production") {
	lscache.enableWarnings(true);
}

const tokenKey = "__App__";
const duration = 1000 * 60 * 60 * 24; // 24hs en milisegundos es 86400000
const localStorageService = {};

// Configura el contenido del local storage
localStorageService.setLS = user => lscache.set(tokenKey, user, duration);

// Obtiene el contenido del local storage
localStorageService.getLS = () => lscache.get(tokenKey);

// Elimina el contenido del local storage
localStorageService.deleteLS = () => {
	api.defaults.headers.common['Authorization'] = "";
	lscache.flush();
}

/* localStorageService.getLSUser = () => lscache.get(tokenKey)?.user;
localStorageService.updateLSUser = (updatedUser) => {
	const storageData = lscache.get(tokenKey);
	storageData.user = updatedUser;
	localStorageService.set(storageData);
}; // unused */

export default localStorageService;

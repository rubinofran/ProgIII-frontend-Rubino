import lscache from "lscache";

// enable warnings
/* if (process.env.NODE_ENV !== "production") {
	lscache.enableWarnings(true);
} */

const tokenKey = "__App__";
const duration = 1000 * 60 * 60 * 24; // 24hs en milisegundos es 86400000
const localStorageService = {};

localStorageService.setLS = (user) => lscache.set(tokenKey, user, duration);
localStorageService.getLS = () => lscache.get(tokenKey);
localStorageService.deleteLS = () => lscache.flush();
/* localStorageService.getLSUser = () => lscache.get(tokenKey)?.user;
localStorageService.updateLSUser = (updatedUser) => {
	const storageData = lscache.get(tokenKey);
	storageData.user = updatedUser;
	localStorageService.set(storageData);
}; */

export default localStorageService;

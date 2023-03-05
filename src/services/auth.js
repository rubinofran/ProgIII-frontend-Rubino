import api from "./api";

const authService = {};

//
authService.validateUserAndCreateToken = payload => api.post("/auth/token/", { ...payload });

export default authService;
import api from "./api";

const loginService = {};

loginService.validateUserAndCreateToken = payload => api.post("/login/", { ...payload });

export default loginService;
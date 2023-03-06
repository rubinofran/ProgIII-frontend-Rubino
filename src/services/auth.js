import api from "./api";

const authService = {};

// Valida al usuario que intenta realizar el login y en caso de autenticación genera un token
authService.validateUserAndCreateToken = payload => api.post("/auth/token/", { ...payload });

export default authService;
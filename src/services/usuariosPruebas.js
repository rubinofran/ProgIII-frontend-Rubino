import api from "./api";

const usuarioPruebasService = {};

usuarioPruebasService.getAllUsuariosPruebas = () => api.get(`/usuariosPruebas/`);
usuarioPruebasService.getUsuarioPruebasById = id => api.get(`/usuariosPruebas/${id}`);
usuarioPruebasService.createUsuarioPruebas = payload => api.post("/usuariosPruebas/", { ...payload });
usuarioPruebasService.updateUsuarioPruebasById = (id, payload) => api.put(`/usuariosPruebas/${id}`, { ...payload });
usuarioPruebasService.deleteUsuarioPruebasById = id => api.delete(`/usuariosPruebas/${id}`);

usuarioPruebasService.validateUserAndCreateToken = payload => api.post("/usuariosPruebas/login/", { ...payload });

export default usuarioPruebasService;

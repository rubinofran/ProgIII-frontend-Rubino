import api from "./api";

const userService = {};

userService.getUsers = () => api.get(`/users/`);
userService.getUserById = id => api.get(`/users/${id}`);
userService.getUserByAlias = alias => api.get(`/users/findBy/${alias}`);
userService.createUser = payload => api.post("/users/", { ...payload });
userService.updateUserById = (id, payload) => api.put(`/users/${id}`, { ...payload });
userService.deleteUserById = id => api.delete(`/users/${id}`);
userService.validateUserAndCreateToken = payload => api.post("/users/login/", { ...payload });

export default userService;

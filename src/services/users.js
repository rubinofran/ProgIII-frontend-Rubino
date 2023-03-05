import api from "./api";

const userService = {};

//
userService.getUsers = (token) => {   
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get(`/users/userRoute/`);
}

//
userService.getUserById = (id, token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get(`/users/userRoute/${id}`);
}

//
userService.getUserByAlias = (alias, token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get(`/users/userRoute/findBy/${alias}`);
}

//
userService.createUser = payload => api.post("/users/", { ...payload });

//
userService.updateUserById = (id, payload, token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.put(`/users/userRoute/${id}`, { ...payload });
}

//
userService.deleteUserById = (id, token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.delete(`/users/userRoute/${id}`);
}

export default userService;

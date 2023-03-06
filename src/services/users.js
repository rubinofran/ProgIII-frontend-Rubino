import api from "./api";

const userService = {};

// Obtiene la lista completa de usuarios
userService.getUsers = (token) => {   
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get(`/users/userRoute/`);
}

// Obtiene un usuario según el ID
userService.getUserById = (id, token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get(`/users/userRoute/${id}`);
}

// Obtiene un usuario según el ALIAS
userService.getUserByAlias = (alias, token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get(`/users/userRoute/findBy/${alias}`);
}

// Crea un usuario
userService.createUser = payload => api.post("/users/", { ...payload });

// Actualiza un usuario según el ID con todos los valores que lleguen en payload
userService.updateUserById = (id, payload, token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.put(`/users/userRoute/${id}`, { ...payload });
}

// Elimina un usuario según el ID
userService.deleteUserById = (id, token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.delete(`/users/userRoute/${id}`);
}

export default userService;

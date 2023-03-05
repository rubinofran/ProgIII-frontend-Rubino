import api from "./api";

const transactionService = {};

transactionService.getAllTransactions = () => api.get("/transactions/");
transactionService.getAllTransactionsByUserId = id => api.get(`/transactions/all/${id}`);
transactionService.createTransaction = payload => api.post("/transactions/", { ...payload });
/* transactionService.getUserByAlias = alias => api.get(`/users/findBy/${alias}`);
transactionService.updateUserById = (id, payload) => api.put(`/users/${id}`, { ...payload });
transactionService.deleteUserById = id => api.delete(`/users/${id}`);
transactionService.validateUserAndCreateToken = payload => api.post("/users/login/", { ...payload }); */

export default transactionService;
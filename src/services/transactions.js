import api from "./api";

const transactionService = {};

//
transactionService.getAllTransactions = (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get("/transactions/transactionRoute/");
}

//
transactionService.getAllTransactionsByUserId = (id, token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get(`/transactions/transactionRoute/all/${id}`);
}

//
transactionService.createTransaction = (payload, token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.post("/transactions/transactionRoute/", { ...payload });
}

export default transactionService;
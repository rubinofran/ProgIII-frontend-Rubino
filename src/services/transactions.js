import api from "./api";

const transactionService = {};

// Obtiene la lista completa de transacciones
transactionService.getAllTransactions = (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get("/transactions/transactionRoute/");
}

// Obtiene una lista completa de transacciones según el ID del usuario
transactionService.getAllTransactionsByUserId = (id, token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get(`/transactions/transactionRoute/all/${id}`);
}

// Crea una transacción
transactionService.createTransaction = (payload, token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.post("/transactions/transactionRoute/", { ...payload });
}

export default transactionService;
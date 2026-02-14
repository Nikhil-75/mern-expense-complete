import API from "../utils/api";

// Backend-driven CRUD
export const getExpenses = () => API.get("/expenses"); // GET all
export const addExpense = (data) => API.post("/expenses", data); // POST new
export const updateExpense = (id, data) => API.put(`/expenses/${id}`, data); // PUT update
export const deleteExpense = (id) => API.delete(`/expenses/${id}`); // DELETE

const express = require("express");
const Router = express.Router();
const { AuthJWT } = require("../middleware/auth");
const { getDashboardData, createBudgetData, createExpenseData, deleteExpenseData } = require("../controller/financialController");

//Financial Expenses & Income
Router.get("/dashboard", AuthJWT, getDashboardData);
Router.post("/add/budget", AuthJWT, createBudgetData);
Router.post("/add/expenses", AuthJWT, createExpenseData);
Router.delete("/delete/expense/:expense_id", AuthJWT, deleteExpenseData);

//Tags Management

module.exports = Router;
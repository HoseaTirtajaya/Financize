const { financial_data, financial_expenses} = require("../models");

class financialController{
    static getDashboardData(req, res, next){
        let userId = req.decoded.id;

        financial_data.findAll({where: {user_id: userId}, include: [{model: financial_expenses}]})
        .then((financeData) => {
            let amount = 0;
            for(let i = 0; i < financeData.length; i++){
                for(let j = 0; j < financeData[i].financial_expenses.length; j++){
                    amount += parseFloat(financeData[i].financial_expenses.length > 0 ? financeData[i].financial_expenses[j].amount : 0);
                }
                financeData[i].dataValues.current_amount = amount;
                amount = 0;
            }
            res.status(200).json({message: "Success", finance: financeData})
        }).catch(next);
    }
    static createBudgetData(req, res, next){
        const { title, amount } = req.body;
        let userId = req.decoded.id;

        financial_data.create({type: "budget", name: title, amount, user_id: userId})
        .then((financeData) => {
            res.status(200).json({message: "Success", data: financeData.dataValues});
        }).catch(next);
    }
    static createExpenseData(req, res, next){
        const { desc, amount, budget_id } = req.body;

        financial_expenses.create({name: desc, amount, budget_id})
        .then((expenseData) => {
            res.status(200).json({message: "Success", data: expenseData.dataValues});
        }).catch(next);
    }

    static deleteExpenseData(req, res, next){
        let expenseId = req.params.expense_id;

        financial_expenses.destroy({where: {id: expenseId}})
        .then(() => {
            res.status(200).json({message: "Success"});
        }).catch(next);
    }
}

module.exports = financialController;
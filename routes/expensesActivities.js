const express = require('express')
const  ExpenseService= require('../services/activityExpense')

function actionApi(app) {
    const router = express.Router();
    app.use('/expense', router)

    const expenseService = new ExpenseService();

    // Routes activities
    router.get("/:expenseId", async function(req, res, next){
        const {expenseId}= req.params;

    try{
        const expense = await expenseService.getExpense(expenseId);

        res.status(200).json({
            expense,
            message: expense
            ?"Gasto Encontrado"
            :"No se encontro el Gasto con ese ID"
        });
    }catch(err){
        next(err);
    }
    });

    router.post("/getExpenses", async function(req,res,next){
        const {body: where} = req;
        try {
            const expenses = await expenseService.getExpenses(where);
            res.status(200).json({
                expenses,
                message:
                expenses.length>0
                    ? "Listado Gastos"
                    : "No se encuentran registros"
            })
        } catch (err) {
            next(err)
        }
    });

    router.post("/", async function (req, res, next) {
        const { body: data } = req;
        try {
          const expense = await expenseService.createExpense(data);
    
          res.status(201).json({ expense });
        } catch (error) {
          next(error);
        }
    });

    router.post(
        "/updateExpense/:id",
        async function (req, res, next) {
          const { body: data } = req;
          const { id } = req.params;
          try {
            const updated = await expenseService.updatExpense(
              data,
              id
            );    
            res.status(200).json({
              updated,
            });
          } catch (error) {
            next(error);
          }
        }
    );

    router.delete(
        "/:id",
        async function (req, res, next) {
          const { id } = req.params;
    
          try {
            const deleted = await expenseService.deleteExpense(
              id
            );
    
            res.status(200).json({ deleted });
          } catch (error) {
            next(error);
          }
        }
    );
    
    
}

module.exports = actionApi;
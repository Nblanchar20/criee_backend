const express = require('express')
const  BudgetService= require('../services/budget')

function actionApi(app) {
    const router = express.Router();
    app.use('/budget', router)

    const budgetService = new BudgetService();

    // Routes budgets
    router.get("/:budgetId", async function(req, res, next){
        const {budgetId}= req.params;

    try{
        const budget = await budgetService.getBudget(budgetId);

        res.status(200).json({
            budget,
            message: budget
            ?"Presupuesto Encontrado"
            :"No se encontro el presupuesto con ese ID"
        });
    }catch(err){
        next(err);
    }
    });

    router.post("/getBudgets", async function(req,res,next){
        const {body: where} = req;
        try {
            const budgets = await budgetService.getBudgets(where);
            res.status(200).json({
                budgets,
                message:
                budgets.length>0
                    ? "Listado de Presupuestos"
                    : "No se encuentran registros"
            })
        } catch (err) {
            next(err)
        }
    });

    router.post("/", async function (req, res, next) {
        const { body: data } = req;
        try {
          const budget = await budgetService.createBudget(data);
    
          res.status(201).json({ budget });
        } catch (error) {
          next(error);
        }
    });

    router.post(
        "/updateBudget/:id",
        async function (req, res, next) {
          const { body: data } = req;
          const { id } = req.params;
          try {
            const updated = await budgetService.updateBudget(
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
            const deleted = await budgetService.deleteBudget(
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
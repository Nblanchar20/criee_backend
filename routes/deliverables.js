const express = require('express')
const  DeliverableService= require('../services/deliverable')

function actionApi(app) {
    const router = express.Router();
    app.use('/deliverable', router)

    const deliverableService = new DeliverableService();

    // Routes deliverables
    router.get("/:deliverableId", async function(req, res, next){
        const {deliverableId}= req.params;

    try{
        const deliverable = await deliverableService.getDeliverable(deliverableId);

        res.status(200).json({
            deliverable,
            message: deliverable
            ?"Entregable Encontrado"
            :"No se encontro el Entregable con ese ID"
        });
    }catch(err){
        next(err);
    }
    });

    router.post("/getDeliverables", async function(req,res,next){
        const {body: where} = req;
        try {
            const deliverables = await deliverableService.getDeliverables(where);
            res.status(200).json({
                deliverables,
                message:
                deliverables.length>0
                    ? "Listados Entregables"
                    : "No se encuentran registros"
            })
        } catch (err) {
            next(err)
        }
    });

    router.post("/", async function (req, res, next) {
        const { body: data } = req;
        try {
          const deliverable = await deliverableService.createDeliverable(data);
    
          res.status(201).json({ deliverable });
        } catch (error) {
          next(error);
        }
    });

    router.post(
        "/updatedeliverable/:id",
        async function (req, res, next) {
          const { body: data } = req;
          const { id } = req.params;
          try {
            const updated = await deliverableService.updateDeliverable(
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
            const deleted = await deliverableService.deleteDeliverable(
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
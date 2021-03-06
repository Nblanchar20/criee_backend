const express = require('express')
const  ObjectiveService= require('../services/objective')

function actionApi(app) {
    const router = express.Router();
    app.use('/objective', router)

    const objectiveService = new ObjectiveService();

    // Routes objectives
    router.get("/:objectiveId", async function(req, res, next){
        const {objectiveId}= req.params;

    try{
        const objective = await objectiveService.getObjective(objectiveId);

        res.status(200).json({
            objective,
            message: objective
            ?"Objetivo Encontrado"
            :"No se encontro el Objetivo con ese ID"
        });
    }catch(err){
        next(err);
    }
    });

    router.post("/getObjectives", async function(req,res,next){
        const {body: where} = req;
        try {
            const objectives = await objectiveService.getObjectives(where);
            res.status(200).json({
                objectives,
                message:
                objectives.length>0
                    ? "Objetivos Listados"
                    : "No se encuentran registros"
            })
        } catch (err) {
            next(err)
        }
    });

    router.post("/", async function (req, res, next) {
        const { body: data } = req;
        try {
          const objective = await objectiveService.createObjective(data);
    
          res.status(201).json({ objective });
        } catch (error) {
          next(error);
        }
    });

    router.post(
        "/updateObjective/:id",
        async function (req, res, next) {
          const { body: data } = req;
          const { id } = req.params;
          try {
            const updated = await objectiveService.updateObjective(
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
            const deleted = await objectiveService.deleteObjective(
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
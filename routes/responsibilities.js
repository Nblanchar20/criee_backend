const express = require('express')
const  ResponsibilityService= require('../services/responsibility')

function actionApi(app) {
    const router = express.Router();
    app.use('/responsibility', router)

    const responsibilityService = new ResponsibilityService();

    // Routes responsibilities
    router.get("/:responsibilityId", async function(req, res, next){
        const {responsibilityId}= req.params;

    try{
        const responsibility = await responsibilityService.getResponsibility(responsibilityId);

        res.status(200).json({
            responsibility,
            message: responsibility
            ?"Responsabilidad Encontrado"
            :"No se encontro el Responsabilidad con ese ID"
        });
    }catch(err){
        next(err);
    }
    });

    router.post("/getresponsibilities", async function(req,res,next){
        const {body: where} = req;
        try {
            const responsibilities = await responsibilityService.getResponsibilities(where);
            res.status(200).json({
                responsibilities,
                message:
                responsibilities.length>0
                    ? "Responsabilidades Listados"
                    : "No se encuentran registros"
            })
        } catch (err) {
            next(err)
        }
    });

    router.post("/", async function (req, res, next) {
        const { body: data } = req;
        try {
          const responsibility = await responsibilityService.createResponsibility(data);
    
          res.status(201).json({ responsibility });
        } catch (error) {
          next(error);
        }
    });

    router.post(
        "/updateresponsibility/:id",
        async function (req, res, next) {
          const { body: data } = req;
          const { id } = req.params;
          try {
            const updated = await responsibilityService.updatResponsibility(
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
            const deleted = await responsibilityService.deleteResponsibility(
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
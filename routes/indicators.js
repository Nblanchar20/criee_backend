const express = require('express')
const  IndicatorService= require('../services/indicator')

function actionApi(app) {
    const router = express.Router();
    app.use('/indicator', router)

    const indicatorService = new IndicatorService();

    // Routes indicators
    router.get("/:indicatorId", async function(req, res, next){
        const {indicatorId}= req.params;

    try{
        const indicator = await indicatorService.getIndicator(indicatorId);

        res.status(200).json({
            indicator,
            message: indicator
            ?"Indicador Encontrado"
            :"No se encontro el Indicador con ese ID"
        });
    }catch(err){
        next(err);
    }
    });

    router.post("/getIndicators", async function(req,res,next){
        const {body: where} = req;
        try {
            const indicators = await indicatorService.getIndicators(where);
            res.status(200).json({
                indicators,
                message:
                indicators.length>0
                    ? "Indicadores Listados"
                    : "No se encuentran registros"
            })
        } catch (err) {
            next(err)
        }
    });

    router.post("/", async function (req, res, next) {
        const { body: data } = req;
        try {
          const indicator = await indicatorService.createIndicator(data);
    
          res.status(201).json({ indicator });
        } catch (error) {
          next(error);
        }
    });

    router.post(
        "/updateindicator/:id",
        async function (req, res, next) {
          const { body: data } = req;
          const { id } = req.params;
          try {
            const updated = await indicatorService.updatIndicator(
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
            const deleted = await indicatorService.deleteIndicator(
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
const express = require('express')
const  ActivityService= require('../services/activity')

function actionApi(app) {
    const router = express.Router();
    app.use('/activity', router)

    const activityService = new ActivityService();

    // Routes activities
    router.get("/:activityId", async function(req, res, next){
        const {activityId}= req.params;

    try{
        const activity = await activityService.getActivity(activityId);

        res.status(200).json({
            activity,
            message: activity
            ?"Actividad Encontrada"
            :"No se encontro la Actividad con ese ID"
        });
    }catch(err){
        next(err);
    }
    });

    router.post("/getActivities", async function(req,res,next){
        const {body: where} = req;
        try {
            const activities = await activityService.getActivities(where);
            res.status(200).json({
                activities,
                message:
                activities.length>0
                    ? "Listado Actividades"
                    : "No se encuentran registros"
            })
        } catch (err) {
            next(err)
        }
    });

    router.post("/", async function (req, res, next) {
        const { body: data } = req;
        try {
          const activity = await activityService.createActivity(data);
    
          res.status(201).json({ activity });
        } catch (error) {
          next(error);
        }
    });

    router.post(
        "/updateActivity/:id",
        async function (req, res, next) {
          const { body: data } = req;
          const { id } = req.params;
          try {
            const updated = await activityService.updatActivity(
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
            const deleted = await activityService.deleteActivity(
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
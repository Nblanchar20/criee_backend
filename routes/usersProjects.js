const express = require('express')
const  UserProjectService= require('../services/userProject')

function actionApi(app) {
    const router = express.Router();
    app.use('/userProject', router)

    const userProjectService = new UserProjectService();

    // Routes userProjects
    router.get("/:userProjectId", async function(req, res, next){
        const {userProjectId}= req.params;

    try{
        const userProject = await userProjectService.getUserProject(userProjectId);

        res.status(200).json({
            userProject,
            message: userProject
            ?"Registro Encontrado"
            :"No se encontro el Registro con ese ID"
        });
    }catch(err){
        next(err);
    }
    });

    router.post("/getuserProjects", async function(req,res,next){
        const {body: where} = req;
        try {
            const userProjects = await userProjectService.getUserProjects(where);
            res.status(200).json({
                userProjects,
                message:
                userProjects.length>0
                    ? "Registros Listados"
                    : "No se encuentran registros"
            })
        } catch (err) {
            next(err)
        }
    });

    router.post("/", async function (req, res, next) {
        const { body: data } = req;
        try {
          const userProject = await userProjectService.createUserProject(data);
    
          res.status(201).json({ userProject });
        } catch (error) {
          next(error);
        }
    });

    router.post(
        "/updateuserProject/:id",
        async function (req, res, next) {
          const { body: data } = req;
          const { id } = req.params;
          try {
            const updated = await userProjectService.updatUserProject(
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
            const deleted = await userProjectService.deleteUserProject(
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
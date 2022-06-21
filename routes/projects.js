const express = require('express')
const  ProjectService= require('../services/project')

function actionApi(app) {
    const router = express.Router();
    app.use('/project', router)

    const projectService = new ProjectService();

    // Routes Projects
    router.get("/:projectId", async function(req, res, next){
        const {projectId}= req.params;

    try{
        const project = await projectService.getProject(projectId);

        res.status(200).json({
            project,
            message: project
            ?"Proyecto Encontrado"
            :"No se encontro el proyecto con ese ID"
        });
    }catch(err){
        next(err);
    }
    });

    router.post("/getProject", async function(req,res,next){
        const {body: where} = req;
        try {
            const projects = await projectService.getProjects(where);
            res.status(200).json({
                projects,
                message:
                projects.length>0
                    ? "Proyectos Listados"
                    : "No se encuentran registros"
            })
        } catch (err) {
            next(err)
        }
    });

    router.post("/", async function (req, res, next) {
        const { body: data } = req;
        try {
          const project = await projectService.createProject(data);
    
          res.status(201).json({ project });
        } catch (error) {
          next(error);
        }
    });

    router.post(
        "/updateProject/:id",
        async function (req, res, next) {
          const { body: data } = req;
          const { id } = req.params;
          try {
            const updated = await projectService.updateProject(
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
            const deleted = await projectService.deleteProject(
              id
            );
    
            res.status(200).json({ deleted });
          } catch (error) {
            next(error);
          }
        }
    );
    
    router.get("/:projectId", async function(req, res, next){
        const {projectId}= req.params;

    try{
        const project = await projectService.getProject(projectId);

        res.status(200).json({
            project,
            message: project
            ?"Proyecto Encontrado"
            :"No se encontro el proyecto con ese ID"
        });
    }catch(err){
        next(err);
    }
    });

    router.post("/getProject", async function(req,res,next){
        const {body: where} = req;
        try {
            const projects = await projectService.getProjects(where);
            res.status(200).json({
                projects,
                message:
                projects.length>0
                    ? "Proyectos Listados"
                    : "No se encuentran registros"
            })
        } catch (err) {
            next(err)
        }
    });

    router.post("/", async function (req, res, next) {
        const { body: data } = req;
        try {
          const project = await projectService.createProject(data);
    
          res.status(201).json({ project });
        } catch (error) {
          next(error);
        }
    });

    router.post(
        "/updateProject/:id",
        async function (req, res, next) {
          const { body: data } = req;
          const { id } = req.params;
          try {
            const updated = await projectService.updateProject(
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
            const deleted = await projectService.deleteProject(
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
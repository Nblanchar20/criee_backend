const express = require('express')
const  RoleService= require('../services/role')

function actionApi(app) {
    const router = express.Router();
    app.use('/role', router)

    const roleService = new RoleService();

    // Routes roles
    router.get("/:roleId", async function(req, res, next){
        const {roleId}= req.params;

    try{
        const role = await roleService.getRole(roleId);

        res.status(200).json({
            role,
            message: role
            ?"Rol Encontrado"
            :"No se encontro el Rol con ese ID"
        });
    }catch(err){
        next(err);
    }
    });

    router.post("/getroles", async function(req,res,next){
        const {body: where} = req;
        try {
            const roles = await roleService.getRoles(where);
            res.status(200).json({
                roles,
                message:
                roles.length>0
                    ? "Roles Listados"
                    : "No se encuentran registros"
            })
        } catch (err) {
            next(err)
        }
    });

    router.post("/", async function (req, res, next) {
        const { body: data } = req;
        try {
          const role = await roleService.createRole(data);
    
          res.status(201).json({ role });
        } catch (error) {
          next(error);
        }
    });

    router.post(
        "/updaterole/:id",
        async function (req, res, next) {
          const { body: data } = req;
          const { id } = req.params;
          try {
            const updated = await roleService.updatRole(
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
            const deleted = await roleService.deleteRole(
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
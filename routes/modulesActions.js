const expresss = require("express");
const ModuleActionService = require("../services/modulesActions");

function actionModuleApi(app, protectedRoutes) {
  const router = expresss.Router();
  app.use("/moduleAction", router);

  const moduleActionService = new ModuleActionService();

  router.get("/:moduleId", protectedRoutes, async function (req, res, next) {
    const { moduleId } = req.params;

    try {
      const moduleAction = await moduleActionService.getActionModule(moduleId);

      res.status(200).json({
        moduleAction,
        message: moduleAction
          ? "Acciones encontradas"
          : "No se encontró ningúna acción con ese ID",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post(
    "/getActionsModules",
    protectedRoutes,
    async function (req, res, next) {
      const { body: where } = req;
      try {
        const actions = await moduleActionService.getActionsModules(where);

        res.status(200).json({
          actions,
          message:
            actions.length > 0
              ? "Acciones listadas"
              : "No se encontraron registros",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    "/getActionsModulesByModules",
    protectedRoutes,
    async function (req, res, next) {
      const { body: where } = req;
      try {
        const actions = await moduleActionService.getActionsModulesByModules(
          where
        );

        res.status(200).json({
          actions,
          message:
            actions.length > 0
              ? "Acciones listadas"
              : "No se encontraron registros",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post("/", protectedRoutes, async function (req, res, next) {
    const { body: data } = req;
    try {
      const created = await moduleActionService.createActionsModules(data);

      res.status(201).json({ created });
    } catch (error) {
      next(error);
    }
  });

  router.put("/:moduleId", protectedRoutes, async function (req, res, next) {
    const { body: data } = req;
    const { moduleId } = req.params;
    try {
      const updated = await moduleActionService.updateActionsModules(
        data,
        moduleId
      );

      res.status(201).json({ updated });
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:moduleId", protectedRoutes, async function (req, res, next) {
    const { moduleId } = req.params;
    const { body: data } = req;

    try {
      const deleted = await moduleActionService.deleteActionModule(
        moduleId,
        data
      );

      res.status(200).json({
        deleted,
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = actionModuleApi;

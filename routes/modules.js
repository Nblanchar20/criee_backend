const expresss = require("express");
const ModuleService = require("../services/modules");

function moduleApi(app,) {
  const router = expresss.Router();
  app.use("/module", router);

  const moduleService = new ModuleService();

  router.get("/:moduleId", async function (req, res, next) {
    const { moduleId } = req.params;

    try {
      const module = await moduleService.getModule(moduleId);

      res.status(200).json({
        module,
        message: module
          ? "Módulo encontrado"
          : "No se encontró ningún módulo con ese ID",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/getModules", async function (req, res, next) {
    const { body: where } = req;
    try {
      const modules = await moduleService.getModules(where);

      res.status(200).json({
        modules,
        message:
          modules.length > 0
            ? "Módulos listados"
            : "No se encontraron registros",
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = moduleApi;

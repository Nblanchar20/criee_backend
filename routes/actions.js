const expresss = require("express");
const ActionService = require("../services/actions");

function actionApi(app, ) {
  const router = expresss.Router();
  app.use("/action", router);

  const actionService = new ActionService();

  router.get("/:actionId", async function (req, res, next) {
    const { actionId } = req.params;

    try {
      const action = await actionService.getAction(actionId);

      res.status(200).json({
        action,
        message: action
          ? "Acción encontrada"
          : "No se encontró ninguna acción con ese ID",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/getActions", async function (req, res, next) {
    const { body: where } = req;
    try {
      const actions = await actionService.getActions(where);

      res.status(200).json({
        actions,
        message:
          actions.length > 0
            ? "Acciones listados"
            : "No se encontraron registros",
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = actionApi;

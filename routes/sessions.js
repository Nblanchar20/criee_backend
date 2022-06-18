const expresss = require("express");
const SessionService = require("../services/sessions");

function sessionApi(app) {
  const router = expresss.Router();
  app.use("/session", router);

  const sessionService = new SessionService();

  router.get("/:sessionId", async function (req, res, next) {
    const { sessionId } = req.params;

    try {
      const session = await sessionService.getSession(sessionId);

      res.status(200).json({
        session,
        message: session
          ? "Sesión encontrada"
          : "No se encontró ninguna sesión con ese ID",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/getSessions", async function (req, res, next) {
    const { body: where } = req;
    try {
      const sessions = await sessionService.getSessions(where);

      res.status(200).json({
        sessions,
        message:
          sessions.length > 0
            ? "Ssesiones listados"
            : "No se encontraron registros",
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = sessionApi;

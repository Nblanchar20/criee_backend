const expresss = require("express");
const UserGroupService = require("../services/userGroups");

function userGroupApi(app) {
  const router = expresss.Router();
  app.use("/userGroup", router);

  const userGroupService = new UserGroupService();

  router.get("/:groupId", async function (req, res, next) {
    const { groupId } = req.params;

    try {
      const group = await userGroupService.getGroup(groupId);

      res.status(200).json({
        group,
        message: group
          ? "Grupo encontrado"
          : "No se encontró ningún grupo con ese ID",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/getGroups", async function (req, res, next) {
    const { body: where } = req;
    try {
      const groups = await userGroupService.getGroups(where);

      res.status(200).json({
        groups,
        message:
          groups.length > 0
            ? "Grupo de usuarios listados"
            : "No se encontraron registros",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async function (req, res, next) {
    const { body: data } = req;
    try {
      const groupId = await userGroupService.createGroup(data);

      res.status(201).json({
        groupId,
      });
    } catch (error) {
      next(error);
    }
  });

  router.put("/:groupId", async function (req, res, next) {
    const { body: data } = req;
    const { groupId } = req.params;
    try {
      const groupUpdated = await userGroupService.updateGroup(data, groupId);

      res.status(201).json({
        groupId: groupUpdated,
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:groupId", async function (req, res, next) {
    const { groupId } = req.params;
    const { body: data } = req;

    try {
      const groupDeleted = await userGroupService.deleteGroup(groupId, data);

      res.status(200).json({
        groupDeleted,
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = userGroupApi;

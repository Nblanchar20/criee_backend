const expresss = require("express");
const PermissionService = require("../services/permissions");

function userGroupApi(app, protectedRoutes) {
  const router = expresss.Router();
  app.use("/permission", router);

  const permissionService = new PermissionService();

  router.get(
    "/:permissionId",
    protectedRoutes,
    async function (req, res, next) {
      const { permissionId } = req.params;

      try {
        const permission = await permissionService.getPermission(permissionId);

        res.status(200).json({
          permission,
          message: permission
            ? "Permiso encontrado"
            : "No se encontró ningún permiso con ese ID",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    "/getPermissions",
    protectedRoutes,
    async function (req, res, next) {
      const { body: where } = req;
      try {
        const permissions = await permissionService.getPermissions(where);

        res.status(200).json({
          permissions,
          message:
            permissions.length > 0
              ? "Permisos listados"
              : "No se encontraron registros",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    "/getPermissionsByUserGroup",
    protectedRoutes,
    async function (req, res, next) {
      const { body: where } = req;
      try {
        const permissions = await permissionService.getPermissionsByUserGroup(
          where
        );

        res.status(200).json({
          permissions,
          message:
            permissions.length > 0
              ? "Permisos listados"
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
      const created = await permissionService.createPermission(data);
      res.status(201).json({
        created,
      });
    } catch (error) {
      next(error);
    }
  });

  router.put(
    "/:permissionId",
    protectedRoutes,
    async function (req, res, next) {
      const { body: data } = req;
      const { permissionId } = req.params;
      try {
        const updated = await permissionService.updatePermission(
          data,
          permissionId
        );

        res.status(201).json({
          permissionId: updated,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/:permissionId",
    protectedRoutes,
    async function (req, res, next) {
      const { permissionId } = req.params;
      const { body: data } = req;

      try {
        const deleted = await permissionService.deletePermission(
          permissionId,
          data
        );

        res.status(200).json({
          deleted,
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = userGroupApi;

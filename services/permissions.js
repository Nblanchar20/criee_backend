const {
  sequelize,
  Permisos: permissionModel,
  GrupoUsuarios: userGroupModel,
  ModulosAcciones: actionModuleModel,
  Modulos: moduleModel,
  Acciones: actionModel,
} = require("../models");

class PermissionService {
  async getPermission(id) {
    const permission = await permissionModel.findOne({
      where: {
        id,
        estado: 1,
      },
      include: [
        {
          model: userGroupModel,
          as: "grupoUsuarios",
          where: { estado: 1 },
        },
        {
          model: actionModuleModel,
          as: "modulosAcciones",
          where: { estado: 1 },
        },
      ],
    });
    return permission;
  }

  async getPermissions(where) {
    const permissons = await permissionModel.findAll({
      where: { estado: 1, ...where },
      order: [["id", "DESC"]],
      include: [
        {
          model: userGroupModel,
          as: "grupoUsuarios",
          where: { estado: 1 },
        },
        {
          model: actionModuleModel,
          as: "modulosAcciones",
          where: { estado: 1 },
          include: [
            {
              model: moduleModel,
              as: "modulos",
              attributes: ["nombre"],
            },
            {
              model: actionModel,
              as: "acciones",
              attributes: ["nombre"],
            },
          ],
        },
      ],
    });
    return permissons;
  }

  async getPermissionsByUserGroup(where) {
    const permissons = await permissionModel.findAll({
      where: { estado: 1, ...where },
      order: [["id", "DESC"]],
      attributes: [
        "id",
        "id_grupos_usuarios",
        [sequelize.fn("COUNT", "id_modulos_acciones"), "count_acciones"],
      ],
      group: ["id_grupos_usuarios", "id_modulos"],
      include: [
        {
          model: userGroupModel,
          as: "grupoUsuarios",
          where: { estado: 1 },
        },
        {
          model: actionModuleModel,
          as: "modulosAcciones",
          where: { estado: 1 },
          include: [
            {
              model: moduleModel,
              as: "modulos",
              attributes: ["nombre"],
            },
          ],
        },
      ],
    });
    return permissons;
  }

  async createPermission(data) {
    const t = await sequelize.transaction();

    try {
      if (data.id_acciones) {
        const currentPermission = await permissionModel.findAll({
          include: [
            {
              model: userGroupModel,
              as: "grupoUsuarios",
              where: { id: data.id_grupos_usuarios },
            },
            {
              model: actionModuleModel,
              as: "modulosAcciones",
              where: { id_modulos: data.id_modulos },
            },
          ],
          where: { estado: 1 },
        });

        const idActionsCurrentPermission = currentPermission.map(
          (permission) => {
            if (permission.id_modulos_acciones)
              return permission.id_modulos_acciones;
          }
        );

        const deletedPermission = currentPermission.filter(
          (item) => !data.id_acciones.includes(item.id_modulos_acciones)
        );
        const createdPermission = data.id_acciones.filter(
          (item) => !idActionsCurrentPermission.includes(item)
        );

        if (deletedPermission) {
          await Promise.all(
            deletedPermission.map(async (item) => {
              await permissionModel.update(
                { estado: -1 },
                {
                  where: {
                    id: item.id,
                  },
                  transaction: t,
                }
              );
            })
          );
        }

        if (createdPermission) {
          await Promise.all(
            createdPermission.map(async (item) => {
              await permissionModel.create(
                {
                  id_grupos_usuarios: data.id_grupos_usuarios,
                  id_modulos_acciones: item,
                },
                {
                  transaction: t,
                }
              );
            })
          );
        }
      }
      await t.commit();
      return {
        success: true,
      };
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }

  async updatePermission(data, permissionId) {
    const t = await sequelize.transaction();

    try {
      await permissionModel.update(data, {
        where: {
          id: permissionId,
        },
        transaction: t,
      });
      await t.commit();

      return permissionId;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }

  async deletePermission(groupId, data) {
    const t = await sequelize.transaction();

    try {
      const currentPermission = await permissionModel.findAll({
        where: {
          id_grupos_usuarios: groupId,
          estado: 1,
        },
        include: [
          {
            model: actionModuleModel,
            as: "modulosAcciones",
            where: { id_modulos: data.id_modulos },
          },
        ],
      });

      const idActionsCurrentPermission = currentPermission.map((permission) => {
        if (permission.id) return permission.id;
      });

      await Promise.all(
        idActionsCurrentPermission.map(async (item) => {
          await permissionModel.update(
            { estado: -1 },
            {
              where: { id: item },
              transaction: t,
            }
          );
        })
      );

      await t.commit();
      return { success: true, groupId };
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }
}

module.exports = PermissionService;

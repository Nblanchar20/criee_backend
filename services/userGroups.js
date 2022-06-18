const { sequelize, GrupoUsuarios: userGroupModel } = require("../models");
const UserService = require("./users");
const PermissionService = require("./permissions");

class UserGroupService {
  async getGroup(id) {
    const group = await userGroupModel.findOne({
      where: {
        id,
        estado: 1,
      },
    });
    return group;
  }

  async getGroups(where) {
    const groups = await userGroupModel.findAll({
      where: { estado: 1, ...where },
      order: [["id", "DESC"]],
    });
    return groups;
  }

  async createGroup(groupData) {
    const t = await sequelize.transaction();

    try {
      const { id: newGroup } = await userGroupModel.create(groupData, {
        transaction: t,
      });

      await t.commit();
      return newGroup;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }

  async updateGroup(groupData, groupId) {
    const t = await sequelize.transaction();

    try {
      await userGroupModel.update(groupData, {
        where: {
          id: groupId,
        },
        transaction: t,
      });

      await t.commit();
      return groupId;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }

  async deleteGroup(groupId, data) {
    const t = await sequelize.transaction();
    const userService = new UserService();
    const permissionService = new PermissionService();

    try {
      const users = await userService.getUsers({ id_grupos_usuarios: groupId });
      const permissions = await permissionService.getPermissions({
        id_grupos_usuarios: groupId,
      });

      if (users.length === 0) {
        if (permissions.length === 0) {
          await userGroupModel.update(
            {
              estado: -1,
            },
            {
              where: {
                id: groupId,
              },
              transaction: t,
            }
          );

          await t.commit();
          return {
            success: true,
            groupId,
          };
        } else {
          await t.rollback();
          return {
            success: false,
            message:
              "El grupo de usuario no se puede eliminar porque tiene permisos asignados.",
          };
        }
      } else {
        await t.rollback();
        return {
          success: false,
          message:
            "El grupo de usuario no se puede eliminar porque tiene usuarios asignados.",
        };
      }
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }
}

module.exports = UserGroupService;

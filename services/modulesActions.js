const {
  sequelize,
  ModulosAcciones: moduleActionModel,
  Modulos: moduleModel,
  Acciones: actionModel,
} = require("../models");

class ModulesActionsService {
  async getActionModule(id_modulos) {
    const module = await moduleActionModel.findAll({
      where: { id_modulos, estado: 1 },
    });
    return module;
  }

  async getActionsModules(where) {
    const modulesActions = await moduleActionModel.findAll({
      where: { estado: 1, ...where },
      include: [
        {
          model: actionModel,
          as: "acciones",
          where: { estado: 1 },
          attributes: ["nombre"],
        },
      ],
      order: [["id", "DESC"]],
    });
    return modulesActions;
  }

  async getActionsModulesByModules(where) {
    const modulesActions = await moduleActionModel.findAll({
      where: { estado: 1, ...where },
      group: ["id_modulos"],
      attributes: [
        "id",
        "id_modulos",
        [sequelize.fn("COUNT", "id_acciones"), "count_acciones"],
      ],
      include: [
        {
          model: moduleModel,
          as: "modulos",
          where: { estado: 1 },
        },
      ],
      order: [["id", "DESC"]],
    });
    return modulesActions;
  }

  async createActionsModules(data) {
    const t = await sequelize.transaction();

    try {
      const currentModuleActions = await moduleActionModel.findAll({
        where: { id_modulos: data.id_modulos, estado: 1 },
      });
      const idCurrentModuleActions = currentModuleActions.map((item) => {
        if (item.id_acciones) return item.id_acciones;
      });

      const deletedActions = currentModuleActions.filter(
        (item) => !data.id_acciones.includes(item.id_acciones)
      );

      const createdActions = data.id_acciones.filter(
        (item) => !idCurrentModuleActions.includes(item)
      );

      await Promise.all(
        createdActions.map(async (item) => {
          await moduleActionModel.create(
            {
              id_acciones: item,
              id_modulos: data.id_modulos,
            },
            {
              transaction: t,
            }
          );
        })
      );

      await Promise.all(
        deletedActions.map(async (item) => {
          await moduleActionModel.update(
            { estado: -1 },
            {
              where: {
                id_acciones: item.id_acciones,
                id_modulos: data.id_modulos,
              },
              transaction: t,
            }
          );
        })
      );

      await t.commit();
      return true;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }

  async updateActionsModules(data, moduleId) {
    const t = await sequelize.transaction();

    try {
      await moduleActionModel.update(
        { id_modulos: data.id_modulos },
        {
          where: { id_modulos: moduleId },
          transaction: t,
        }
      );

      const currentModuleActions = await moduleActionModel.findAll({
        where: { id_modulos: moduleId, estado: 1 },
      });

      const idCurrentModuleActions = currentModuleActions.map((item) => {
        if (item.id_acciones) return item.id_acciones;
      });

      const deletedActions = currentModuleActions.filter(
        (item) => !data.id_acciones.includes(item.id_acciones)
      );

      const createdActions = data.id_acciones.filter(
        (item) => !idCurrentModuleActions.includes(item)
      );

      await Promise.all(
        createdActions.map(async (item) => {
          await moduleActionModel.create(
            {
              id_modulos: data.id_modulos,
              id_acciones: item,
            },
            {
              transaction: t,
            }
          );
        })
      );

      await Promise.all(
        deletedActions.map(async (item) => {
          await moduleActionModel.update(
            { estado: -1 },
            {
              where: { id_acciones: item.id_acciones, id_modulos: moduleId },
              transaction: t,
            }
          );
        })
      );

      await t.commit();
      return true;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }

  async deleteActionModule(moduleId, data) {
    const t = await sequelize.transaction();
    try {
      await moduleActionModel.update(
        {
          estado: -1,
        },
        {
          where: {
            id_modulos: moduleId,
          },
          transaction: t,
        }
      );
      await t.commit();
      return moduleId;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }
}

module.exports = ModulesActionsService;

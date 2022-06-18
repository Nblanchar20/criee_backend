const { Acciones: actionsModel } = require("../models");

class ActionsService {
  async getAction(id) {
    const action = await actionsModel.findOne({
      where: {
        id,
        estado: 1,
      },
    });
    return action;
  }

  async getActions(where) {
    const actions = await actionsModel.findAll({
      where: { estado: 1, ...where },
      order: [["nombre", "ASC"]],
    });
    return actions;
  }
}

module.exports = ActionsService;

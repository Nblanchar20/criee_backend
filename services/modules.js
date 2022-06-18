const { Modulos: moduleModel } = require("../models");

class ModuleService {
  async getModule(id) {
    const module = await moduleModel.findOne({
      where: { id, estado: 1 },
    });
    return module;
  }

  async getModules(where) {
    const modules = await moduleModel.findAll({
      where: { estado: 1, ...where },
      order: [["nombre", "ASC"]],
    });
    return modules;
  }
}

module.exports = ModuleService;

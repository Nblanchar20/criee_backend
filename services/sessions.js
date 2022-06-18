const {
  sequelize,
  Usuarios: userModel,
  Sesiones: sessionModel,
} = require("../models");

class SessionService {
  async getSession(id) {
    const session = await sessionModel.findOne({
      where: {
        id,
        estado: 1,
      },
    });
    return session;
  }

  async getSessions(where) {
    const sessions = await sessionModel.findAll({
      where: { estado: 1, ...where },
      order: [["id", "DESC"]],
      include: [
        {
          model: userModel,
          as: "usuarios",
          where: { estado: 1 },
        },
      ],
    });
    return sessions;
  }

  async createSession(data, transaction = null) {
    const t = transaction || (await sequelize.transaction());
    try {
      const { id: newSession } = await sessionModel.create(data, {
        transaction: t,
      });
      if (!transaction) await t.commit();
      return newSession;
    } catch (error) {
      if (!transaction) await t.rollback();
      throw new Error(error);
    }
  }
}

module.exports = SessionService;

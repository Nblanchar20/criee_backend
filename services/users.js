const {
    sequelize,
    Usuarios: userModel,
    GrupoUsuarios: userGroupModel,
    AprobacionUsuarios: userApproveModel,
  } = require("../models");
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");
  const { config } = require("../config");
  const { encrypt } = require("../utils/crypt");
  const SessionService = require("./sessions");
  const PermissionService = require("./permissions");
  const EmailService = require("./emails");
  const LogService = require("./log");
  
  const logService = new LogService();
  
  class UserService {
    async getUser(id) {
      const user = await userModel.findOne({
        where: {
          id,
          estado: 1,
        },
      });
      return user;
    }
  
    async getUsers(where) {
      const users = await userModel.findAll({
        where: { estado: 1, ...where },
        order: [["id", "DESC"]],
        include: [
          {
            model: userGroupModel,
            as: "grupoUsuarios",
            where: { estado: 1 },
          },
        ],
      });
      return users;
    }
  
    async createUser(userData) {
      const t = await sequelize.transaction();
  
      try {
        let userDocument = null;
        if (userData.documento !== "") {
          userDocument = await userModel.findOne({
            where: {
              documento: userData.documento,
              estado: 1,
            },
          });
        }
  
        const userEmail = await userModel.findOne({
          where: {
            email: userData.email,
            estado: 1,
          },
        });
        if (!userDocument) {
          if (!userEmail) {
            const passwordCrypt = await bcrypt.hash(userData.password, 10);
            const { id: newUser } = await userModel.create(
              { ...userData, password: passwordCrypt },
              {
                transaction: t,
              }
            );
  
            await t.commit();
            return {
              success: true,
              newUser,
            };
          } else {
            await t.rollback();
            return {
              success: false,
              message: "Ya existe un usuario con ese correo electrónico.",
            };
          }
        } else {
          await t.rollback();
          return {
            success: false,
            message: "Ya existe un usuario con ese documento.",
          };
        }
      } catch (error) {
        await t.rollback();
        throw new Error(error);
      }
    }
  
    async updateUser(userData, userId, ip = null) {
      const t = await sequelize.transaction();
  
      try {
        const user = await userModel.findOne({
          where: {
            id: userId,
            estado: 1,
          },
        });
  
        if (userData?.email && user?.email !== userData?.email) {
          const userEmail = await userModel.findOne({
            where: {
              email: userData.email,
              estado: 1,
            },
          });
          if (userEmail) {
            await t.rollback();
            return {
              success: false,
              message: "Ya existe un usuario con ese correo electrónico.",
            };
          }
        }
        let passwordCrypt = "";
  
        if (userData?.id_usuario_aprueba) {
          await userApproveModel.create({
            id_usuario_aprobado: userId,
            id_usuario_aprueba: userData.id_usuario_aprueba,
          });
          if (userData?.estado === 1) {
            await logService.createLog({
              ip,
              id_usuarios: userData.id_usuario_aprueba,
              id_modulos: 8,
              registro: `El usuario con id ${userData.id_usuario_aprueba} aprobó al usuario con id ${userId}.`,
            });
          } else {
            await logService.createLog({
              ip,
              id_usuarios: userData.id_usuario_aprueba,
              id_modulos: 8,
              registro: `El usuario con id ${userData.id_usuario_aprueba} canceló la aprobación del usurio con id ${userId}.`,
            });
          }
          
        }
  
        if (userData.password) {
          passwordCrypt = await bcrypt.hash(userData.password, 10);
        } else {
          passwordCrypt = user.password;
        }
  
        await userModel.update(
          { ...userData, password: passwordCrypt },
          {
            where: {
              id: userId,
            },
            transaction: t,
          }
        );
  
        await t.commit();
        const userUpdated = await userModel.findOne({
          where: { id: userId, estado: 1 },
          include: [
            {
              model: userGroupModel,
              as: "grupoUsuarios",
              where: { estado: 1 },
            },
          ],
        });
        return {
          success: true,
          userUpdated,
        };
      } catch (error) {
        await t.rollback();
        throw new Error(error);
      }
    }
  
    async deleteUser(userId) {
      const t = await sequelize.transaction();
  
      try {
        await userModel.update(
          {
            estado: -1,
          },
          {
            where: {
              id: userId,
            },
            transaction: t,
          }
        );
  
        await t.commit();
        return { success: true, userId };
      } catch (error) {
        await t.rollback();
        throw new Error(error);
      }
    }
  
    async signin(data) {
      const t = await sequelize.transaction();
      const sessionService = new SessionService();
      const permissionService = new PermissionService();
  
      try {
        const user = await userModel.findOne({
          where: { email: data.email, estado: 1 },
          include: [
            {
              model: userGroupModel,
              as: "grupoUsuarios",
              where: { estado: 1 },
            },
          ],
        });
  
        if (user) {
          if (!(await bcrypt.compare(data.password, user.password))) {
            await t.rollback();
            return { success: false, message: "Contraseña incorrecta" };
          }
          if (user.id_grupos_usuarios === 4) {
            await t.rollback();
            return { success: false, message: "El usuario no ha sido aprobado" };
          }
  
          const token = jwt.sign({ id: user.id }, config.secret);
  
          await sessionService.createSession(
            {
              token_sesion: token,
              id_usuarios: user.id,
            },
            t
          );
  
          const permissions = await permissionService.getPermissions({
            id_grupos_usuarios: user.id_grupos_usuarios,
          });
  
          await t.commit();
          return { success: true, user, token, permissions };
        } else {
          return {
            sucess: false,
            message: "El usuario no ha sido creado o está inactivo",
          };
        }
      } catch (error) {
        await t.rollback();
        throw new Error(error);
      }
    }
  
    async recoverAccount(where) {
      const emailService = new EmailService();
  
      const user = await userModel.findOne({
        where: {
          ...where,
          estado: 1,
        },
      });
  
      if (user) {
        await emailService.enviarEmailPersonalizado(
          "Recuperar cuenta",
          user.email,
          "../assets/emails/recoverEmail.html",
          "App",
          {
            verificationLink: `${config.urlFront}/account/forget/${encrypt(
              user.id
            )}`,
          }
        );
      }
      return user;
    }
  
    async changePassword({ currentPassword, password, userId }) {
      const t = await sequelize.transaction();
      try {
        const user = await this.getUser(userId);
  
        if (currentPassword) {
          if (!(await bcrypt.compare(currentPassword, user.password))) {
            throw new Error("Contraseña invalida");
          }
        }
  
        const passwordCrypt = await bcrypt.hash(password, 10);
        await userModel.update(
          { password: passwordCrypt },
          {
            where: { id: userId },
            transaction: t,
          }
        );
        await t.commit();
        return {
          success: true,
          userId,
        };
      } catch (error) {
        throw new Error(error);
      }
    }
  }
  
  module.exports = UserService;
  
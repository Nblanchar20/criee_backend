const expresss = require("express");
const UserService = require("../services/users");
const jwt = require("jsonwebtoken");
const { config } = require("../config");

function userApi(app) {
  const router = expresss.Router();
  app.use("/user", router);

  const userService = new UserService();

  router.get("/:userId",async function (req, res, next) {
    const { userId } = req.params;

    try {
      const user = await userService.getUser(userId);

      res.status(200).json({
        user,
        message: user
          ? "Usuario encontrado"
          : "No se encontró ningún usuario con ese ID",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/getUsers", async function (req, res, next) {
    const { body: where } = req;
    try {
      const users = await userService.getUsers(where);

      res.status(200).json({
        users,
        message:
          users.length > 0
            ? "Usuarios listados"
            : "No se encontraron registros",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async function (req, res, next) {
    const { body: data } = req;
    try {
      const userCreated = await userService.createUser(data);
      res.status(201).json({
        userCreated,
      });
    } catch (error) {
      next(error);
    }
  });


  router.post("/register", async function (req, res, next) {
    let { body: data } = req;
    try {
      data.id_grupos_usuarios = 4;
      const userCreated = await userService.createUser(data);
      res.status(201).json({
        userCreated,
      });
    } catch (error) {
      next(error);
    }
  });

  router.put("/:userId", async function (req, res, next) {
    const { body: data } = req;
    const { userId } = req.params;
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    try {
      const userUpdated = await userService.updateUser(data, userId, ip);

      res.status(201).json({
        userUpdated,
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:userId", async function (req, res, next) {
    const { userId } = req.params;
    const { body: data } = req;

    try {
      const userDeleted = await userService.deleteUser(userId, data);

      res.status(200).json({
        userId: userDeleted,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/signin", async function (req, res, next) {
    const { body: data } = req;
    try {
      const user = await userService.signin(data);
      res.status(201).json({
        user,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/forgetPassword", async function (req, res, next) {
    const { body: where } = req;

    try {
      const user = await userService.recoverAccount(where);

      if (user) {
        const payload = {
          sub: user.id,
          user,
        };

        const token = jwt.sign(payload, config.secret, {
          expiresIn: "20m",
        });

        res.cookie("token", token, {
          httpOnly: false,
          secure: false,
        });

        res.status(201).json({
          success: true,
          token,
          user,
          message: "Cuenta encontrada",
        });
      } else {
        res.status(200).json({
          success: false,
          user,
          message: "El correo electrónico no se encuentra registrado",
        });
      }
    } catch (err) {
      next(err);
    }
  });

  router.put(
    "/changePassword/:userId",
        async function (req, res, next) {
      const { body: data } = req;
      const { userId } = req.params;

      try {
        const userUpdated = await userService.changePassword({
          ...data,
          userId,
        });

        res.status(201).json({
          userUpdated,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put("/changePassword/forget/:userId", async function (req, res, next) {
    const { body: data } = req;
    const { userId } = req.params;

    try {
      jwt.verify(data.token, config.secret, async (err, user) => {
        if (err)
          res.status(401).json({
            error: true,
            message: "Token invalido!",
          });

        const userUpdated = await userService.changePassword({
          ...data.form,
          userId,
        });

        res.status(201).json({
          userUpdated,
        });
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = userApi;

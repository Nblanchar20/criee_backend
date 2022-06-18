"use strict";
module.exports = (sequelize, DataTypes) => {
  const UsuariosProyectos = sequelize.define(
    "UsuariosProyectos",
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      id_usuarios: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
      id_proyectos: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
      id_roles: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
      beneficiarios: {
        type: DataTypes.TINYINT(4),
        allowNull: false,
      },
      estado: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
        allowNull: false,
      },
    },
    {
      tableName: "criie_usuarios_has_proyecto",
      timestamps: false,
    }
  );
  UsuariosProyectos.associate = function (models) {
    UsuariosProyectos.belongsTo(models.Usuarios, {
      foreignKey: "id_usuarios",
      as: "usuarios",
    });
    UsuariosProyectos.belongsTo(models.Proyectos, {
      foreignKey: "id_proyectos",
      as: "proyectos",
    });
    UsuariosProyectos.belongsTo(models.Roles, {
      foreignKey: "id_roles",
      as: "roles",
    });
  }
  return UsuariosProyectos;
};

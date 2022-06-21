const {sequelize,
    Roles: roleModel
   } =require('../models');

class RoleService{

  // Servicios roles
  async getRole(id){
      const role = await roleModel.findOne({
          where: {
              id,
              estado: 1,
          },
      });
      return role
  }
  async getRoles(where){
      const roles = await roleModel.findAll({
          where: {...where}, 
          order: [["id", "DESC"]],
      });
      return roles;
  }
  async createRole(data) {
      const t = await sequelize.transaction();    
      try {
        const { id: roleId } = await roleModel.create(
          { ...data },
          {
            transaction: t,
          }
        );    
        await t.commit();
        return roleId;
      } catch (error) {
        await t.rollback();
        throw new Error(error);
      }
  }

  async updatRole(data, roleId) {
    const t = await sequelize.transaction();  
    try {
      await roleModel.update(
        { ...data },
        {
          where: { id: roleId },
          transaction: t,
        }
      );  
      await t.commit();
      return roleId;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }

  async deleteRole(roleId) {
    const t = await sequelize.transaction();

    try {
      await roleModel.update(
        { estado: -1 },
        {
          where: { id: roleId },
          transaction: t,
        }
      );
      await t.commit();
      return roleId;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }
  
}
module.exports = RoleService;
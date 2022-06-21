const {sequelize,
    Responsabilidades: responsibilityModel,
    Roles: roleModel
   } =require('../models');

class ResponsibilityService{

  // Servicios responsibilities
  async getResponsibility(id){
      const responsibility = await responsibilityModel.findOne({
          where: {
              id,
              estado: 1,
          },
          include:{
            model: roleModel,
            as: "roles",            
            where:{ estado:1 }
          }
      });
      return responsibility
  }
  async getResponsibilities(where){
      const responsibilities = await responsibilityModel.findAll({
          where: {...where}, 
          order: [["id", "DESC"]],          
          include:{
            model: roleModel,
            as: "roles",            
            where:{ estado:1 }
          }
      });
      return responsibilities;
  }
  async createResponsibility(data) {
      const t = await sequelize.transaction();    
      try {
        const { id: responsibilityId } = await responsibilityModel.create(
          { ...data },
          {
            transaction: t,
          }
        );    
        await t.commit();
        return responsibilityId;
      } catch (error) {
        await t.rollback();
        throw new Error(error);
      }
  }

  async updatResponsibility(data, responsibilityId) {
    const t = await sequelize.transaction();  
    try {
      await responsibilityModel.update(
        { ...data },
        {
          where: { id: responsibilityId },
          transaction: t,
        }
      );  
      await t.commit();
      return responsibilityId;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }

  async deleteResponsibility(responsibilityId) {
    const t = await sequelize.transaction();

    try {
      await responsibilityModel.update(
        { estado: -1 },
        {
          where: { id: responsibilityId },
          transaction: t,
        }
      );
      await t.commit();
      return responsibilityId;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }
  
}
module.exports = ResponsibilityService;
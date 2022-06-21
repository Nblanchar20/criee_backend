const {sequelize,
    UsuariosProyectos: userProjectModel,
    Proyectos: projectModel,
    Usuarios: userModel,
    Roles: roleModel

   } =require('../models');

class UserProjectService{

  // Servicios userProjects
  async getUserProject(id){
      const userProject = await userProjectModel.findOne({
          where: {
              id,
              estado: 1,
          },
          include:[{
            model: projectModel,
            as: "proyectos",            
            where:{ estado:1 }
          },{
            model: userModel,
            as: "usuarios",            
            where:{ estado:1 }
          },{
            model: roleModel,
            as: "roles",            
            where:{ estado:1 }
          }]
      });
      return userProject
  }
  async getUserProjects(where){
      const userProjects = await userProjectModel.findAll({
          where: {...where}, 
          order: [["id", "DESC"]],          
          include:[{
            model: projectModel,
            as: "proyectos",            
            where:{ estado:1 }
          },{
            model: userModel,
            as: "usuarios",            
            where:{ estado:1 }
          },{
            model: roleModel,
            as: "roles",            
            where:{ estado:1 }
          }]
      });
      return userProjects;
  }
  async createUserProject(data) {
      const t = await sequelize.transaction();    
      try {
        const { id: userProjectId } = await userProjectModel.create(
          { ...data },
          {
            transaction: t,
          }
        );    
        await t.commit();
        return userProjectId;
      } catch (error) {
        await t.rollback();
        throw new Error(error);
      }
  }

  async updatUserProject(data, userProjectId) {
    const t = await sequelize.transaction();  
    try {
      await userProjectModel.update(
        { ...data },
        {
          where: { id: userProjectId },
          transaction: t,
        }
      );  
      await t.commit();
      return userProjectId;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }

  async deleteUserProject(userProjectId) {
    const t = await sequelize.transaction();

    try {
      await userProjectModel.update(
        { estado: -1 },
        {
          where: { id: userProjectId },
          transaction: t,
        }
      );
      await t.commit();
      return userProjectId;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }
  
}
module.exports = UserProjectService;
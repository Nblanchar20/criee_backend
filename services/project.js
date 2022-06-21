const {sequelize,
       Proyectos: projectModel,
      } =require('../models');

class ProjectService{

  // Servicios Projects
  async getProject(id){
        const project = await projectModel.findOne({
            where: {
                id,
                estado: 1,
            },
        });
        return project
    }
    async getProjects(where){
        const projects = await projectModel.findAll({
            where: {...where}, 
            order: [["id", "DESC"]],
        });
        return projects;
    }
    async createProject(data) {
        const t = await sequelize.transaction();    
        try {
          const { id: ProjectId } = await projectModel.create(
            { ...data },
            {
              transaction: t,
            }
          );    
          await t.commit();
          return ProjectId;
        } catch (error) {
          await t.rollback();
          throw new Error(error);
        }
    }

    async updateProject(data, projectId) {
      const t = await sequelize.transaction();  
      try {
        await projectModel.update(
          { ...data },
          {
            where: { id: projectId },
            transaction: t,
          }
        );  
        await t.commit();
        return projectId;
      } catch (error) {
        await t.rollback();
        throw new Error(error);
      }
    }

    async deleteProject(projectId) {
      const t = await sequelize.transaction();
  
      try {
        await projectModel.update(
          { estado: -1 },
          {
            where: { id: projectId },
            transaction: t,
          }
        );
        await t.commit();
        return projectId;
      } catch (error) {
        await t.rollback();
        throw new Error(error);
      }
  }  

}
module.exports = ProjectService;
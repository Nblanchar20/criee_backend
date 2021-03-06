const {sequelize,
    Objetivos: objectiveModel,
    Proyectos: projectModel
   } =require('../models');

class ObjectiveService{

// Servicios objectives
async getObjective(id){
     const objective = await objectiveModel.findOne({
         where: {
             id,
             estado: 1,
         },
         include:{
          model: projectModel,
          as: "proyectos",            
          where:{ estado:1 }
        }
     });
     return objective
 }
 async getObjectives(where){
     const objectives = await objectiveModel.findAll({
         where: {...where}, 
         order: [["id", "DESC"]],
         include:{
          model: projectModel,
          as: "proyectos",            
          where:{ estado:1 }
        }
     });
     return objectives;
 }
 async createObjective(data) {
     const t = await sequelize.transaction();    
     try {
       const { id: objectiveId } = await objectiveModel.create(
         { ...data },
         {
           transaction: t,
         }
       );    
       await t.commit();
       return objectiveId;
     } catch (error) {
       await t.rollback();
       throw new Error(error);
     }
 }

 async updateObjective(data, objectiveId) {
   const t = await sequelize.transaction();  
   try {
     await objectiveModel.update(
       { ...data },
       {
         where: { id: objectiveId },
         transaction: t,
       }
     );  
     await t.commit();
     return objectiveId;
   } catch (error) {
     await t.rollback();
     throw new Error(error);
   }
 }

 async deleteObjective(objectiveId) {
   const t = await sequelize.transaction();

   try {
     await objectiveModel.update(
       { estado: -1 },
       {
         where: { id: objectiveId },
         transaction: t,
       }
     );
     await t.commit();
     return objectiveId;
   } catch (error) {
     await t.rollback();
     throw new Error(error);
   }
}  

}
module.exports = ObjectiveService;
const {sequelize,
    Entregables: deliverableModel,
    Proyectos: projectModel
   } =require('../models');

class DeliverableService{

// Servicios deliverables
async getDeliverable(id){
     const deliverable = await deliverableModel.findOne({
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
     return deliverable
 }
 async getDeliverables(where){
     const deliverables = await deliverableModel.findAll({
         where: {...where}, 
         order: [["id", "DESC"]],
         include:{
          model: projectModel,
          as: "proyectos",            
          where:{ estado:1 }
        }
     });
     return deliverables;
 }
 async createDeliverable(data) {
     const t = await sequelize.transaction();    
     try {
       const { id: deliverableId } = await deliverableModel.create(
         { ...data },
         {
           transaction: t,
         }
       );    
       await t.commit();
       return deliverableId;
     } catch (error) {
       await t.rollback();
       throw new Error(error);
     }
 }

 async updateDeliverable(data, deliverableId) {
   const t = await sequelize.transaction();  
   try {
     await deliverableModel.update(
       { ...data },
       {
         where: { id: deliverableId },
         transaction: t,
       }
     );  
     await t.commit();
     return deliverableId;
   } catch (error) {
     await t.rollback();
     throw new Error(error);
   }
 }

 async deleteDeliverable(deliverableId) {
   const t = await sequelize.transaction();

   try {
     await deliverableModel.update(
       { estado: -1 },
       {
         where: { id: deliverableId },
         transaction: t,
       }
     );
     await t.commit();
     return deliverableId;
   } catch (error) {
     await t.rollback();
     throw new Error(error);
   }
}  

}
module.exports = DeliverableService;
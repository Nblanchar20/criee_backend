const {sequelize,
    Actividades: activityModel,
    Indicadores: indicatorModel,
   } =require('../models');

class ActivityService{
  
    // Servicios activities
    async getActivity(id){
      const activity = await activityModel.findOne({
          where: {
              id,
              estado: 1,
          },          
          include:{
            model: indicatorModel,
            as: "indicadores",            
            where:{ estado:1 }
          }
      });
      return activity
  }
  async getActivities(where){
      const activities = await activityModel.findAll({
          where: {...where}, 
          order: [["id", "DESC"]],
          include:{
            model: indicatorModel,
            as: "indicadores",            
            where:{ estado:1 }
          }
      });
      return activities;
  }
  async createActivity(data) {
      const t = await sequelize.transaction();    
      try {
        const { id: activityId } = await activityModel.create(
          { ...data },
          {
            transaction: t,
          }
        );    
        await t.commit();
        return activityId;
      } catch (error) {
        await t.rollback();
        throw new Error(error);
      }
  }

  async updatActivity(data, activityId) {
    const t = await sequelize.transaction();  
    try {
      await activityModel.update(
        { ...data },
        {
          where: { id: activityId },
          transaction: t,
        }
      );  
      await t.commit();
      return activityId;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }

  async deleteActivity(activityId) {
    const t = await sequelize.transaction();

    try {
      await activityModel.update(
        { estado: -1 },
        {
          where: { id: activityId },
          transaction: t,
        }
      );
      await t.commit();
      return activityId;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }

}
module.exports = ActivityService;
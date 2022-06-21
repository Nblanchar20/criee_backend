const {sequelize,
    Indicadores: indicatorModel,
    Proyectos: projectModel
   } =require('../models');

class IndicatorService{

  // Servicios indicators
  async getIndicator(id){
      const indicator = await indicatorModel.findOne({
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
      return indicator
  }
  async getIndicators(where){
      const indicators = await indicatorModel.findAll({
          where: {...where}, 
          order: [["id", "DESC"]],          
          include:{
            model: projectModel,
            as: "proyectos",            
            where:{ estado:1 }
          }
      });
      return indicators;
  }
  async createIndicator(data) {
      const t = await sequelize.transaction();    
      try {
        const { id: indicatorId } = await indicatorModel.create(
          { ...data },
          {
            transaction: t,
          }
        );    
        await t.commit();
        return indicatorId;
      } catch (error) {
        await t.rollback();
        throw new Error(error);
      }
  }

  async updatIndicator(data, indicatorId) {
    const t = await sequelize.transaction();  
    try {
      await indicatorModel.update(
        { ...data },
        {
          where: { id: indicatorId },
          transaction: t,
        }
      );  
      await t.commit();
      return indicatorId;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }

  async deleteIndicator(indicatorId) {
    const t = await sequelize.transaction();

    try {
      await indicatorModel.update(
        { estado: -1 },
        {
          where: { id: indicatorId },
          transaction: t,
        }
      );
      await t.commit();
      return indicatorId;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }
  
}
module.exports = IndicatorService;
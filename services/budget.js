const {sequelize,
    Presupuesto: budgetModel,
    Proyectos: projectModel
   } =require('../models');

class BudgetService{

  // Servicios budgets
  async getBudget(id){
      const budget = await budgetModel.findOne({
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
      return budget
  }
  async getBudgets(where){
      const budgets = await budgetModel.findAll({
          where: {...where}, 
          order: [["id", "DESC"]],
          include:{
            model: projectModel,
            as: "proyectos",            
            where:{ estado:1 }
          }
      });
      return budgets;
  }
  async createBudget(data) {
      const t = await sequelize.transaction();    
      try {
        const { id: budgetId } = await budgetModel.create(
          { ...data },
          {
            transaction: t,
          }
        );    
        await t.commit();
        return budgetId;
      } catch (error) {
        await t.rollback();
        throw new Error(error);
      }
  }

  async updateBudget(data, budgetId) {
    const t = await sequelize.transaction();  
    try {
      await budgetModel.update(
        { ...data },
        {
          where: { id: budgetId },
          transaction: t,
        }
      );  
      await t.commit();
      return budgetId;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }

  async deleteBudget(budgetId) {
    const t = await sequelize.transaction();

    try {
      await budgetModel.update(
        { estado: -1 },
        {
          where: { id: budgetId },
          transaction: t,
        }
      );
      await t.commit();
      return budgetId;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }
  
}
module.exports = BudgetService;
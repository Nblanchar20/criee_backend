const {sequelize,
    GastosActividades: expenseModel,
    Actividades: activityModel
   } =require('../models');

class ExpenseService{
  
    // Servicios Expenses activities
    async getExpense(id){
      const expense = await expenseModel.findOne({
          where: {
              id,
              estado: 1,
          },
          include:{
            model: activityModel,
            as: "actividades",            
            where:{ estado:1 }
          }
      });
      return expense
  }
  async getExpenses(where){
      const expenses = await expenseModel.findAll({
          where: {...where}, 
          order: [["id", "DESC"]],
          include:{
            model: activityModel,
            as: "actividades",            
            where:{ estado:1 }
          }
      });
      return expenses;
  }
  async createExpense(data) {
      const t = await sequelize.transaction();    
      try {
        const { id: expenseId } = await expenseModel.create(
          { ...data },
          {
            transaction: t,
          }
        );    
        await t.commit();
        return expenseId;
      } catch (error) {
        await t.rollback();
        throw new Error(error);
      }
  }

  async updatExpense(data, expenseId) {
    const t = await sequelize.transaction();  
    try {
      await expenseModel.update(
        { ...data },
        {
          where: { id: expenseId },
          transaction: t,
        }
      );  
      await t.commit();
      return expenseId;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }

  async deleteExpense(expenseId) {
    const t = await sequelize.transaction();

    try {
      await expenseModel.update(
        { estado: -1 },
        {
          where: { id: expenseId },
          transaction: t,
        }
      );
      await t.commit();
      return expenseId;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }

}
module.exports = ExpenseService;
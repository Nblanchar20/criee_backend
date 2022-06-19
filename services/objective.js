const {sequelize, Objetivos: objetivoModel} =require('../models');

class objetiveService{

    async getObjetivo(id){
        const objetivo = await objetivoModel.findOne({
            where: {
                id,
                estado: 1,
            },
        });
        return objetivo
    }

}
module.exports = objetiveService;
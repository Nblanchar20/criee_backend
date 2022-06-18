const {sequelize, Proyectos: proyectoModel} =require('../models');

class ProyectoService{

    async getProyecto(id){
        const proyecto = await proyectoModel.finfOne({
            where: {
                id,
                estado: 1,
            },
        });
        return proyecto
    }

}
module.exports = ProyectoService;
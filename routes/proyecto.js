const express = require('express')
const  ProyectoService= require('../services/proyecto')

function actionApi(app) {
    const router = express.Router();
    app.use('/api/proyecto', router)

    const proyectoService = new ProyectoService();

}

module.exports = actionApi;
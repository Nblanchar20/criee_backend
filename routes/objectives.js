const express = require('express')
const  ObjetiveService= require('../services/objective')

function actionApi(app) {
    const router = express.Router();
    app.use('/api/objetive', router)

    const objetiveService = new ObjetiveService();

}

module.exports = actionApi;
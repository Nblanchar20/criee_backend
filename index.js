const express = require('express');
const cors = require('cors');
//const helmet = require('helmet');
const app = express();

const { config } = require('./config/index');


const actionApi = require('./routes/actions');

const moduleApi = require('./routes/modules');
const moduleActionApi = require("./routes/modulesActions");
const ObjetivoApi = require('./routes/objectives');
const parameterApi = require("./routes/parameters");
const permissionApi = require("./routes/permissions");
const proyectoApi = require('./routes/projects');
const sessionApi = require("./routes/sessions");
/* const userGroupApi = require("./routes/userGroups"); */
 
/*const fileApi = require('./routes/files'); */
app.use(cors());
//app.use(helmet());
/**
 * Middleware body parser. It let to Express get info with JSON format
 */
app.use(express.json({ limit: '700kb' })); // for parsing application/json
/**
 * Routes are middlewares
 */

/* app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler); */



/* 
fileApi(app)*/
actionApi(app)
moduleApi(app)
moduleActionApi(app)
ObjetivoApi(app)
parameterApi(app)
permissionApi(app)
proyectoApi(app)
sessionApi(app)
/* userGroupApi(app) */

app
  .listen(config.port, function () {
    // eslint-disable-next-line no-console
    console.log(`Listening http://localhost:${config.port}`);
  })
  .setTimeout(0);

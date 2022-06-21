const express = require('express');
const cors = require('cors');
//const helmet = require('helmet');
const app = express();

const { config } = require('./config/index');


const actionApi = require('./routes/actions');

const moduleApi = require('./routes/modules');
const moduleActionApi = require("./routes/modulesActions");
const objetivoApi = require('./routes/objectives');
const parameterApi = require("./routes/parameters");
const permissionApi = require("./routes/permissions");
const proyectoApi = require('./routes/projects');
const sessionApi = require("./routes/sessions");
const indicatorApi = require("./routes/indicators");
const activitiesAPi = require("./routes/activities");
const expensesActivitiesApi =require("./routes/expensesActivities");
const budgetsApi= require("./routes/budgets");
const deliverablesApi= require("./routes/deliverables");
const usersApi= require("./routes/users")
const userGroupApi = require("./routes/userGroups");
const rolesApi= require("./routes/roles");
const usersProjectsApi= require("./routes/usersProjects");
const responsibilitiesApi= require("./routes/responsibilities");
 
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
objetivoApi(app)
parameterApi(app)
permissionApi(app)
proyectoApi(app)
sessionApi(app)
indicatorApi(app)
activitiesAPi(app)
expensesActivitiesApi(app)
budgetsApi(app)
deliverablesApi(app)
usersApi(app)
userGroupApi(app)
rolesApi(app)
usersProjectsApi(app)
responsibilitiesApi(app)

app
  .listen(config.port, function () {
    // eslint-disable-next-line no-console
    console.log(`Listening http://localhost:${config.port}`);
  })
  .setTimeout(0);

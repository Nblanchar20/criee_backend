const express = require('express');
const cors = require('cors');/* 
const helmet = require('helmet'); */
const app = express();

const { config } = require('./config/index');
const proyectoApi = require('./routes/projects');
const ObjetivoApi = require('./routes/objectives');
proyectoApi(app) 
ObjetivoApi(app) 
/* const userApi = require('./routes/users');
const userGroupApi = require('./routes/usersGroup');
const actionApi = require('./routes/actions');
const moduleApi = require('./routes/modules');
const permissionsApi = require('./routes/permissions');
const organizationApi = require('./routes/organizations');
const templateBadgeApi = require('./routes/templatesBadges');
const othersApi = require('./routes/others');
const habilitiesApi = require('./routes/habilities');
const templateHabilities = require('./routes/templateHabilities');
const criteriaApi = require('./routes/criteria');
const recommendationsApi = require('./routes/recommendations');
const collectionsApi = require('./routes/collections');
const fileApi = require('./routes/files');
const badgesIssuedApi = require('./routes/badgesIssued');
const groupsBadgesIssuedApi = require('./routes/groupsBadgesIssued');
const badgesApi = require('./routes/badges');
const shareApi = require('./routes/share');
const blockchainApi = require('./routes/blockchain');
const certificatesApi = require('./routes/certificates');
const certificateTemplateApi = require('./routes/certificateTemplates');
const certificateTemplateHistoryApi = require('./routes/certificateTemplateHistory');
const healthCheckApi = require('./routes/healthCheck');
const { errorHandler, logErrors, wrapErrors } = require('./utils/middleware/errorHandler');
const badgesTemplatesGroupsTemplatesApi = require('./routes/badgesTemplatesGroupsTemplates');
const socialNetworksApi = require('./routes/socialNetworks');
const templateBadgeHistoryApi = require('./routes/templateBadgeHistory');
const parameterValueParameterApi = require('./routes/parameterValueParameter');
const contractApi = require('./routes/contract');
const certificatesIssuedApi = require('./routes/certificatesIssued');
const certificatesFieldsValuesApi = require('./routes/certificatesFieldsValues');
const certificatesTemplatesGroupsTemplatesApi = require('./routes/certificatesTemplatesGroupsTemplates');
const notificationsApi = require('./routes/notifications');
const documentTemplateApi = require('./routes/documentsTemplates');
const documentTemplateHistoryApi = require('./routes/documentsTemplateHistory');
const documentsFieldsValuesApi = require('./routes/documentsFieldsValues');
const documentsFieldsAdditionalsApi = require('./routes/documentsFieldAdditionals');
const documentsFieldsApi = require('./routes/documentsFields');
const documentsTemplatesGroupsTemplatesApi = require('./routes/documentsTemplatesGroupsTemplates');
const documentsApi = require('./routes/documents');
const documentsCertifyApi = require('./routes/documentsCertify');
const documentsCollectionsApi = require('./routes/documentsCollections');
const carnetsApi = require('./routes/carnets');
const carnetsIssuedApi = require('./routes/carnetsIssued');
const carnetTemplateApi = require('./routes/carnetTemplates');
const carnetTemplateHistoryApi = require('./routes/carnetTemplateHistory');
const helpCenterApi = require('./routes/helpCenter');
const carnetsFieldsAdditionalsApi = require('./routes/carnetsFieldsAdditionals');
const tokenApi = require('./routes/tokens');
const reminderParameterApi = require('./routes/reminderParameters');
const certificatesFieldsAdditionalsApi = require('./routes/certificatesFieldsAdditionals');
 */
app.use(cors());
/* app.use(helmet());
 *//**
 * Middleware body parser. It let to Express get info with JSON format
 */
app.use(express.json({ limit: '700kb' })); // for parsing application/json
/**
 * Routes are middlewares
 */
/* userApi(app);
userGroupApi(app);
actionApi(app);
moduleApi(app);
permissionsApi(app);
organizationApi(app);
othersApi(app);
habilitiesApi(app);
templateHabilities(app);
criteriaApi(app);
recommendationsApi(app);
collectionsApi(app);
fileApi(app);
shareApi(app);
socialNetworksApi(app);
parameterValueParameterApi(app);
contractApi(app);
notificationsApi(app);
blockchainApi(app);
tokenApi(app);

badgesApi(app);
badgesIssuedApi(app);
templateBadgeApi(app);
groupsBadgesIssuedApi(app);
badgesTemplatesGroupsTemplatesApi(app);
templateBadgeHistoryApi(app);

certificatesApi(app);
certificateTemplateApi(app);
certificateTemplateHistoryApi(app);
certificatesIssuedApi(app);
certificatesFieldsValuesApi(app);
certificatesTemplatesGroupsTemplatesApi(app);
certificatesFieldsAdditionalsApi(app);

documentTemplateApi(app);
documentTemplateHistoryApi(app);
documentsFieldsValuesApi(app);
documentsFieldsAdditionalsApi(app);
documentsFieldsApi(app);
documentsTemplatesGroupsTemplatesApi(app);
documentsApi(app);
documentsCertifyApi(app);
documentsCollectionsApi(app);

carnetsApi(app);
carnetTemplateApi(app);
carnetTemplateHistoryApi(app);
carnetsIssuedApi(app);
carnetsFieldsAdditionalsApi(app);

helpCenterApi(app);
healthCheckApi(app);

reminderParameterApi(app);
 */
/* app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler); */

app
  .listen(config.port, function () {
    // eslint-disable-next-line no-console
    console.log(`Listening http://localhost:${config.port}`);
  })
  .setTimeout(0);

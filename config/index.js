require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  originCors: process.env.ORIGIN_CORS,
  urlFront: process.env.URL_FRONT,
  urlScheduled: process.env.URL_SCHEDULED,
  registerBlockchain: process.env.REGISTER_BLOCKCHAIN.toLowerCase() === 'true',
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  sequelizeLogging: process.env.SQ_LOGGING.toLowerCase() === 'true',
  authJwtSecret: process.env.AUTH_JWT_SECRET,
  defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
  defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,
  publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
  adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN,
  blockchainKey: process.env.BLOCKCHAIN_KEY,
  woleetToken: process.env.WOLEET_TOKEN,
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucketName: process.env.BUCKET_NAME,
  nodemailerHost: process.env.NODEMAILER_HOST,
  nodemailerPort: process.env.NODEMAILER_PORT,
  nodemailerUser: process.env.NODEMAILER_USER,
  nodemailerPassword: process.env.NODEMAILER_PASSWORD,
  nodemailerSender: process.env.NODEMAILER_SENDER,
  linkedinClientId: process.env.LINKEDIN_CLIENT_ID,
  linkedinClientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  sendinblueApiKey: process.env.SENDINBLUE_API_KEY,
  emailIssue: process.env.EMAIL_ISSUES_NOTIFICATION,
  sendEmail: process.env.SEND_EMAIL.toLowerCase() === 'true',
  sendReminder: process.env.SEND_REMINDER.toLocaleLowerCase()=== 'true',
};

module.exports = { config };

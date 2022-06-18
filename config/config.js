const { config } = require('./index');

module.exports = {
  development: {
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    host: config.dbHost,
    port: config.dbPort,
    dialect: 'mysql',
    emailIssue: config.emailIssue,
  },
  test: {
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    host: config.dbHost,
    port: config.dbPort,
    dialect: 'mysql',
    emailIssue: config.emailIssue,
  },
  production: {
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    host: config.dbHost,
    port: config.dbPort,
    dialect: 'mysql',
    emailIssue: config.emailIssue,
  },
};

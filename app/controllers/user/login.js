const bcrypt = require('bcrypt');
const response = require('../../utils/commonResponseStructure');
const connection = require('../../utils/connection');
const utils = require('../../utils/utils');
const logger = require('../../utils/logger');


exports.login = async function login(req, res) {
  const requestPayloadBody = req.body;
  const { password } = requestPayloadBody;
  logger.info('Start process of /user/login endpoint with request payload');
  if (utils.checkIfObjectEmpty(requestPayloadBody)) {
    const message = 'Request payload can\'t be empty';
    logger.info(`Request is rejected because ${message}`);
    response.badRequest(message, res);
  } else if (
    utils.checkIfPropertyEmpty(requestPayloadBody.username)
    || typeof requestPayloadBody.username !== 'string'
  ) {
    const message = 'Username shouldn\'t be empty and must be in string';
    logger.info(`Request is rejected because ${message}`);
    response.badRequest(message, res);
  } else if (
    utils.checkIfPropertyEmpty(requestPayloadBody.password)
    || typeof requestPayloadBody.password !== 'string'
  ) {
    const message = 'Password shouldn\'t be empty and must be in string';
    logger.info(`Request is rejected because ${message}`);
    response.badRequest(message, res);
  } else {
    try {
      connection.query(
        {
          sql: 'SELECT password FROM users WHERE username = ?',
          timeout: 30000,
        },
        [requestPayloadBody.username],
        (error, rows) => {
          if (error && error.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
            const message = 'Failed to get data. Data processing take so long !';
            logger.info('Failed to query data from table user : timeout');
            response.timeout(message, res);
          } else if (error) {
            const message = 'Failed to process your request, some internal error';
            logger.info(`Failed to process request, some internal error happening : ${error}`);
            response.error(message, res);
          } else if (!error && rows.length === 0) {
            logger.info('Success queried data from table user, but no data found');
            response.empty(res);
          } else if (!error && rows.affectedRows === 0) {
            const message = 'Failed to process your request, no data affected';
            logger.info('Failed to process request, no data affected');
            response.forbidden(message, res);
          } else {
            const isCredentialValid = bcrypt.compareSync(password, rows[0].password);
            if (!isCredentialValid) {
              const message = 'Failed to process login request, credentials isn\'t valid';
              logger.info(message);
              response.error(message, res);
              return;
            }
            const dataToReturn = {
              UUID: req.sessionID,
              username: requestPayloadBody.username,
            };
            const message = `UUID generated for user ${requestPayloadBody.username}`;
            logger.info(`Success queried data details from table user and UUID generated for username : ${requestPayloadBody.username}`);
            req.session.uniqueID = req.sessionID;
            req.session.authenticated = true;
            req.session.username = requestPayloadBody.username;
            response.ok(dataToReturn, message, res);
          }
        },
      );
    } catch (error) {
      const message = 'Failed to process your request, some internal error';
      logger.info(`Process of /user/login endpoint got an issue : ${error}`);
      response.error(message, error);
    }
  }
  logger.info('Stop process of /user/login endpoint');
};

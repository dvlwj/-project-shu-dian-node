const bcrypt = require('bcrypt');
const response = require('../../utils/commonResponseStructure');
const connection = require('../../utils/connection');
const utils = require('../../utils/utils');
const logger = require('../../utils/logger');

exports.create = async function createData(req, res) {
  const requestPayloadBody = req.body;
  const requestPayloadBodyInString = JSON.stringify(requestPayloadBody);
  const { password } = requestPayloadBody;
  logger.info(`Start process of /user/create endpoint with request payload : ${requestPayloadBodyInString}`);
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
    logger.info('Starting to run the query to create new data in user table');
    const passwordEncrypted = await bcrypt.hash(password, 10);
    try {
      connection.query(
        {
          sql: 'INSERT INTO users (username, password, created_by) values (?, ?, "system")',
          timeout: 30000,
        },
        [requestPayloadBody.username, passwordEncrypted],
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
            const data = rows;
            const dataInJSONString = JSON.stringify(data);
            const dataInJSONStringMinimified = dataInJSONString.replace(/\n/g, '');
            const message = 'Data has been successfully created';
            logger.info('Success queried data details from table user');
            logger.info(`Queried data from db to return : ${dataInJSONStringMinimified}`);
            response.ok(rows, message, res);
          }
        },
      );
    } catch (error) {
      const message = 'Failed to process your request, some internal error';
      logger.info(`Process of /list/create endpoint got an issue : ${error}`);
      response.error(message, error);
    }
  }
  logger.info('Stop process of /list/create endpoint');
};

const response = require('../../utils/commonResponseStructure');
const connection = require('../../utils/connection');
const utils = require('../../utils/utils');
const logger = require('../../utils/logger');

exports.create = function createData(req, res) {
  const requestPayloadBody = req.body;
  const requestPayloadBodyInString = JSON.stringify(requestPayloadBody);
  logger.info(`Start process of /list/create endpoint with request payload : ${requestPayloadBodyInString}`);
  if (utils.checkIfObjectEmpty(requestPayloadBody)) {
    const message = 'Request payload can\'t be empty';
    logger.info(`Request is rejected because ${message}`);
    response.badRequest(message, res);
  } else if (
    utils.checkIfPropertyEmpty(requestPayloadBody.subject)
    || typeof requestPayloadBody.subject !== 'string'
  ) {
    const message = 'Subject shouldn\'t be empty and must be in string';
    logger.info(`Request is rejected because ${message}`);
    response.badRequest(message, res);
  } else {
    logger.info('Starting to run the query to create new data in to_do_list table');
    try {
      connection.query(
        {
          sql: 'INSERT INTO to_do_list (subject, created_by) values (?, "david")',
          timeout: 30000,
        },
        [requestPayloadBody.subject],
        (error, rows) => {
          if (error && error.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
            const message = 'Failed to get data. Data processing take so long !';
            logger.info('Failed to query data from table to_do_list : timeout');
            response.timeout(message, res);
          } else if (error) {
            const message = 'Failed to process your request, some internal error';
            logger.info(`Failed to process request, some internal error happening : ${error}`);
            response.error(message, res);
          } else if (!error && rows.length === 0) {
            logger.info('Success queried data from table to_do_list, but no data found');
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
            logger.info('Success queried data details from table to_do_list');
            logger.info(`Queried data from db to return : ${dataInJSONStringMinimified}`);
            response.ok(rows, message, res);
          }
          logger.info('Stop process of /list/create endpoint');
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

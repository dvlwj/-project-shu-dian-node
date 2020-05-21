const response = require('../../utils/commonResponseStructure');
const connection = require('../../utils/connection');
const logger = require('../../utils/logger');
const utils = require('../../utils/utils');

exports.getDetails = function getDetails(req, res) {
  logger.info('Start process of /list/getDetails endpoint');
  logger.info('Starting to run the query to check details from to_do_list table');
  if (utils.checkIfAuthenticated(req, res)) {
    try {
      const requestPayloadBody = req.body;
      connection.query(
        {
          sql: 'SELECT * FROM to_do_list WHERE id = ? AND active',
          timeout: 30000,
        },
        [requestPayloadBody.id],
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
          } else {
            const data = rows;
            const dataInJSONString = JSON.stringify(data);
            const dataInJSONStringMinimified = dataInJSONString.replace(/\n/g, '');
            const message = 'Successfully get data';
            logger.info('Success queried data details from table to_do_list');
            logger.info(`Queried data from db to return :  ${dataInJSONStringMinimified}`);
            response.ok(rows, message, res);
          }
          logger.info('Stop process of /list/getDetails endpoint');
        },
      );
    } catch (error) {
      const message = 'Failed to process your request, some internal error';
      logger.info(`Process of /list/getDetails endpoint got an issue : ${error}`);
      response.error(message, error);
      logger.info('Stop process of /list/getDetails endpoint');
    }
  }
};

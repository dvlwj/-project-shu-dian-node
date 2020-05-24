const response = require('../../utils/commonResponseStructure');
const utils = require('../../utils/utils');
const connection = require('../../utils/connection');
const logger = require('../../utils/logger');

exports.get = function get(req, res) {
  logger.info('Start process of /list endpoint');
  if (utils.checkIfAuthenticated(req, res)) {
    logger.info('Starting to run the query to check from to_do_list table');
    try {
      connection.query(
        {
          sql: 'SELECT id, subject FROM to_do_list WHERE active and created_by = ?',
          timeout: 30000,
        },
        [req.session.username],
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
            logger.info(`Success queried data from table to_do_list, with row(s) of ${data.length}`);
            logger.info('Queried data from db to return :', dataInJSONStringMinimified);
            response.ok(rows, message, res);
          }
          logger.info('Stop process of /list endpoint');
        },
      );
    } catch (error) {
      const message = 'Failed to process your request, some internal error';
      logger.info(`Process of /list endpoint got an issue : ${error}`);
      response.error(message, error);
      logger.info('Stop process of /list endpoint');
    }
  } else {
    response.unauthorized(res);
  }
};

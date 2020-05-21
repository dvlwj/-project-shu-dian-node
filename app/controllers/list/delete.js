const response = require('../../utils/commonResponseStructure');
const connection = require('../../utils/connection');
const logger = require('../../utils/logger');
const utils = require('../../utils/utils');

exports.delete = function deleteData(req, res) {
  logger.info('Start process of /list/delete endpoint');
  logger.info('Starting to run the query to delete data in to_do_list table');
  if (utils.checkIfAuthenticated(req, res)) {
    try {
      const requestPayloadBody = req.body;
      connection.query(
        {
          sql: 'UPDATE to_do_list SET active = 0, updated_by = ?, updated_on = CURRENT_TIMESTAMP WHERE id = ?',
          timeout: 30000,
        },
        [req.session.username, requestPayloadBody.id],
        (error, rows) => {
          if (error && error.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
            const message = 'Failed to get data. Data processing take so long !';
            logger.info('Failed to query data from table to_do_list : timeout');
            response.timeout(message, res);
          } else if (error) {
            const message = 'Failed to process your request, some internal error';
            logger.info(`Failed to process request, some internal error happening : ${error}`);
            response.error(message, res);
          } else if (!error && rows.affectedRows === 0) {
            const message = 'Failed to process your request, no data affected';
            logger.info('Failed to process request, no data affected');
            response.forbidden(message, res);
          } else {
            const data = rows;
            const dataInJSONString = JSON.stringify(data);
            const dataInJSONStringMinimified = dataInJSONString.replace(/\n/g, '');
            const message = 'Success delete data from table to_do_lis';
            logger.info('Success delete data from table to_do_list');
            logger.info(`Queried data from db to return : ${dataInJSONStringMinimified}`);
            response.ok(rows, message, res);
          }
          logger.info('Stop process of /list/delete endpoint');
        },
      );
    } catch (error) {
      const message = 'Failed to process your request, some internal error';
      logger.info(`Process of /list/delete endpoint got an issue : ${error}`);
      response.error(message, error);
      logger.info('Stop process of /list/delete endpoint');
    }
  }
};

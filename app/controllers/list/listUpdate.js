const response = require('../../utils/commonResponseStructure');
const connection = require('../../utils/connection');
const utils = require('../../utils/utils');
// const { check, validationResult } = require('express-validator');


exports.updateDetails = function updateDetails(req, res) {
  const requestPayloadBody = req.body;
  const requestPayloadBodyInString = JSON.stringify(requestPayloadBody);
  console.log(`==== Start process of /list/updateDetails endpoint with request payload : ${requestPayloadBodyInString}`);
  if (utils.checkIfObjectEmpty(requestPayloadBody)) {
    const message = 'Request payload can\'t be empty';
    console.log(`Request is rejected because ${message}`);
    response.badRequest(message, res);
  } else if (
    utils.checkIfPropertyEmpty(requestPayloadBody.id) ||
    !Number.isInteger(requestPayloadBody.id)
  ) {
    const message = 'Id is mandatory and must be in Integer';
    console.log(`Request is rejected because ${message}`);
    response.badRequest(message, res);
  } else if (utils.checkIfPropertyEmpty(requestPayloadBody.status) ||
    typeof requestPayloadBody.status !== 'string') {
    const message = 'Status can\'t be empty and must be in string';
    console.log(`Request is rejected because ${message}`);
    response.badRequest(message, res);
  } else if (!['todo', 'done'].includes(requestPayloadBody.status)) {
    const message = 'Status must be either todo or done';
    console.log(`Request is rejected because ${message}`);
    response.badRequest(message, res);
  } else if (
    utils.checkIfPropertyEmpty(requestPayloadBody.subject) ||
    typeof requestPayloadBody.subject !== 'string'
  ) {
    const message = 'Subject shouldn\'t be empty and must be in string';
    console.log(`Request is rejected because ${message}`);
    response.badRequest(message, res);
  } else {
    console.log('===== Starting to run the query to update details in to_do_list table');
    try {
      connection.query(
        {
          sql: 'UPDATE to_do_list SET status = ?, subject = ?, updated_on = CURRENT_TIMESTAMP WHERE id = ? AND active',
          timeout: 30000,
        },
        [requestPayloadBody.status, requestPayloadBody.subject, requestPayloadBody.id],
        (error, rows) => {
          if (error && error.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
            const message = 'Failed to get data. Data processing take so long !';
            console.log('===== Failed to query data from table to_do_list : timeout');
            response.timeout(message, res);
          } else if (error) {
            const message = 'Failed to process your request, some internal error';
            console.log('===== Failed to process request, some internal error happening : ', error);
            response.error(message, res);
          } else if (!error && rows.length === 0) {
            console.log('===== Success queried data from table to_do_list, but no data found');
            response.empty(res);
          } else if (!error && rows.affectedRows === 0) {
            const message = 'Failed to process your request, no data affected';
            console.log('===== Failed to process request, no data affected');
            response.forbidden(message, res);
          } else {
            const data = rows;
            const dataInJSONString = JSON.stringify(data);
            const dataInJSONStringMinimified = dataInJSONString.replace(/\n/g, '');
            const message = 'Data has been successfully updated';
            console.log('===== Success queried data details from table to_do_list');
            console.log('===== Queried data from db to return :', dataInJSONStringMinimified);
            response.ok(rows, message, res);
          }
          console.log('==== Stop process of /list/getDetails endpoint');
        },
      );
    } catch (error) {
      const message = 'Failed to process your request, some internal error';
      console.log('===== Process of /list/getDetails endpoint got an issue :', error);
      response.error(message, error);
    }
  }
  console.log('==== Stop process of /list/updateDetails endpoint');
};

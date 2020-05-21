const response = require('../../utils/commonResponseStructure');
const connection = require('../../utils/connection');

exports.delete = function deleteData(req, res) {
  console.log('==== Start process of /list/delete endpoint');
  console.log('===== Starting to run the query to delete data in to_do_list table');
  try {
    const requestPayloadBody = req.body;
    connection.query(
      {
        sql: 'UPDATE to_do_list SET active = 0 WHERE id = ?',
        timeout: 30000,
      },
      [requestPayloadBody.id],
      (error, rows) => {
        if (error && error.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
          const message = 'Failed to get data. Data processing take so long !';
          console.log('===== Failed to query data from table to_do_list : timeout');
          response.timeout(message, res);
        } else if (error) {
          const message = 'Failed to process your request, some internal error';
          console.log('===== Failed to process request, some internal error happening : ', error);
          response.error(message, res);
        } else if (!error && rows.affectedRows === 0) {
          const message = 'Failed to process your request, no data affected';
          console.log('===== Failed to process request, no data affected');
          response.forbidden(message, res);
        } else {
          const data = rows;
          const dataInJSONString = JSON.stringify(data);
          const dataInJSONStringMinimified = dataInJSONString.replace(/\n/g, '');
          const message = 'Success delete data from table to_do_lis';
          console.log('===== Success delete data from table to_do_list');
          console.log('===== Queried data from db to return :', dataInJSONStringMinimified);
          response.ok(rows, message, res);
        }
        console.log('==== Stop process of /list/delete endpoint');
      },
    );
  } catch (error) {
    const message = 'Failed to process your request, some internal error';
    console.log('===== Process of /list/delete endpoint got an issue : ', error);
    response.error(message, error);
    console.log('==== Stop process of /list/delete endpoint');
  }
};

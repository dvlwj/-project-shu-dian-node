const response = require('../../utils/commonResponseStructure');
const connection = require('../../utils/connection');

exports.get = function get(req, res) {
  console.log('==== Start process of /list endpoint');
  console.log('===== Starting to run the query to check from to_do_list table');
  try {
    connection.query(
      {
        sql: 'SELECT id, subject FROM to_do_list WHERE active',
        timeout: 30000,
      },
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
          response.empty(message, res);
        } else {
          const data = rows;
          const dataInJSONString = JSON.stringify(data);
          const dataInJSONStringMinimified = dataInJSONString.replace(/\n/g, '');
          const message = 'Successfully get data';
          console.log('===== Success queried data from table to_do_list, with row(s) of', data.length);
          console.log('===== Queried data from db to return :', dataInJSONStringMinimified);
          response.ok(rows, message, res);
        }
        console.log('==== Stop process of /list endpoint');
      },
    );
  } catch (error) {
    const message = 'Failed to process your request, some internal error';
    console.log('===== Process of /list endpoint got an issue :', error);
    response.error(message, error);
    console.log('==== Stop process of /list endpoint');
  }
};

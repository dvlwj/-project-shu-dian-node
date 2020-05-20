const response = require('../../utils/commonResponseStructure');
const connection = require('../../utils/connection');

exports.getDetails = function getDetails(req, res) {
  console.log('==== Start process of /list/getDetails endpoint');
  console.log('===== Starting to run the query to check details from to_do_list table');
  try {
    const requestPayloadBody = req.body;
    connection.query(
      {
        sql: 'SELECT * FROM to_do_list WHERE id = ? AND active',
        timeout: 30000,
      },
      [requestPayloadBody.id],
      (error, rows) => {
        if (error) {
          console.log(error);
        } else if (error && error.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
          console.log('===== Failed to query data details from table to_do_list : timeout');
          res.timeout('===== Failed to get data. Data processing take so long !');
        } else if (rows.length === 0) {
          console.log('===== Success queried data from table to_do_list, but no data found');
          response.empty('No data found', res);
        } else {
          const data = rows;
          const dataInJSONString = JSON.stringify(data);
          const dataInJSONStringMinimified = dataInJSONString.replace(/\n/g, '');
          console.log('===== Success queried data details from table to_do_list');
          console.log('===== Queried data from db to return :', dataInJSONStringMinimified);
          response.ok(rows, res);
        }
        console.log('==== Stop process of /list/getDetails endpoint');
      },
    );
  } catch (error) {
    console.log(`===== Process of /list/getDetails endpoint got an issue :${error}`);
    response.error(error);
    console.log('==== Stop process of /list/getDetails endpoint');
  }
};

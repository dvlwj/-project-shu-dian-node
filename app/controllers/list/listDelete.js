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
        if (error) {
          console.log(error);
        } else if (error && error.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
          console.log('===== Failed to query delete data in table to_do_list : timeout');
          res.timeout('===== Failed to delete data. Data processing take so long !');
        } else {
          const data = rows;
          const dataInJSONString = JSON.stringify(data);
          console.log("jajajaja",dataInJSONString);
          console.log('===== Success delete data from table to_do_list');
          response.ok(rows, res);
        }
        console.log('==== Stop process of /list/delete endpoint');
      },
    );
  } catch (error) {
    console.log(`===== Process of /list/delete endpoint got an issue :${error}`);
    response.error(error);
    console.log('==== Stop process of /list/delete endpoint');
  }
};

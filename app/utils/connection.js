var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "example",
  database: "shu_dian_dev_db"
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;
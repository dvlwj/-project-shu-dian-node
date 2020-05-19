var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost:8989",
  user: "root",
  password: "example",
  database: "shu_dian_dev_db"
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;
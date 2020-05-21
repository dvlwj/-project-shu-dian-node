'use strict';

var response = require('./res');
var connection = require('../../utils/connection');

exports.list = function(req, res) {
    console.log("Opening");
    connection.query('SELECT * FROM to_do_list', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            console.log()
            response.ok(rows, res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};
'use strict';

var response = require('../../utils/response');
var connection = require('../../utils/connection');

exports.get = function(req, res) {
    console.log("==== Start process of /list endpoint");
    console.log("===== Starting to run the query to check from to_do_list table");
    try {
        connection.query(
            {
                sql:'SELECT id, subject FROM to_do_list',
                timeout: 30000
            },
            function (error, rows, fields){
                if(error){
                    console.log(error);
                } else if (error && error.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                    console.log("===== Failed to query data from table to_do_list : timeout");
                    res.timeout("===== Failed to get data. Data processing take so long !");
                } 
                else{
                    let data = rows;
                    let dataInJSONString = JSON.stringify(data);
                    let dataInJSONStringMinimified = dataInJSONString.replace(/\n/g,"");
                    console.log("===== Success queried data from table to_do_list, with row(s) of", data.length);
                    console.log("===== Queried data from db to return :", dataInJSONStringMinimified);
                    response.ok(rows, res);
                }
                console.log("==== Stop process of /list endpoint");
            }
        );
    } catch (error) {
        console.log("===== Process of /list endpoint got an issue :",error);
        response.error(error);
        console.log("==== Stop process of /list endpoint");
    }
};

exports.getDetails = function(req, res){
    console.log("==== Start process of /list/getDetails endpoint");
    console.log("===== Starting to run the query to check details from to_do_list table");
    try {
        let requestPayloadBody = req.body;
        connection.query(
            {
                sql:'SELECT * FROM to_do_list where id = ?',
                timeout: 30000
            },
            [requestPayloadBody.id],
            function (error, rows, fields){
                if(error){
                    console.log(error);
                } else if (error && error.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                    console.log("===== Failed to query data details from table to_do_list : timeout");
                    res.timeout("===== Failed to get data. Data processing take so long !");
                } 
                else{
                    let data = rows;
                    let dataInJSONString = JSON.stringify(data);
                    let dataInJSONStringMinimified = dataInJSONString.replace(/\n/g,"");
                    console.log("===== Success queried data details from table to_do_list");
                    console.log("===== Queried data from db to return :", dataInJSONStringMinimified);
                    response.ok(rows, res);
                }
                console.log("==== Stop process of /list/getDetails endpoint");
            }
        );
    } catch (error) {
        console.log("===== Process of /list/getDetails endpoint got an issue :"+error);
        response.error(error);
        console.log("==== Stop process of /list/getDetails endpoint");
    }
};

exports.delete = function(req, res){
    console.log("==== Start process of /list/delete endpoint");
    console.log("===== Starting to run the query to delete data in to_do_list table");
    try {
        let requestPayloadBody = req.body;
        connection.query(
            {
                sql:'DELETE FROM to_do_list where id = ?',
                timeout: 30000
            },
            [requestPayloadBody.id],
            function (error, rows, fields){
                if(error){
                    console.log(error);
                } else if (error && error.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                    console.log("===== Failed to query delete data in table to_do_list : timeout");
                    res.timeout("===== Failed to delete data. Data processing take so long !");
                } 
                else{
                    let data = rows;
                    let dataInJSONString = JSON.stringify(data);
                    let dataInJSONStringMinimified = dataInJSONString.replace(/\n/g,"");
                    console.log("===== Success delete data from table to_do_list");
                    response.ok(rows, res);
                }
                console.log("==== Stop process of /list/delete endpoint");
            }
        );
    } catch (error) {
        console.log("===== Process of /list/delete endpoint got an issue :"+error);
        response.error(error);
        console.log("==== Stop process of /list/delete endpoint");
    }
};
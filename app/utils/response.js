'use strict';

exports.ok = function(values, res) {
  var data = {
      'status': 200,
      'data': values
  };
  res.json(data);
  res.end();
};

exports.error = function(message){
  var data = {
    'status': 500,
    'message': message
  };
  res.json(data);
  res.end();
}

exports.timeout = function(message){
  var data = {
    'status': 408,
    'message': message
  };
  res.json(data);
  res.end();
}
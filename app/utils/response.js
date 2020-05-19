'use strict';

exports.ok = function(values, res) {
  var data = null;
  if(values.length > 1){
    data = {
      'status': 200,
      'data': values
    };
  } else {
    data = {
      'status': 200,
      'data': values[0]
    };
  }
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
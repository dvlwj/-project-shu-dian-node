exports.ok = function ok(values, res) {
  let data = null;
  if (values.length > 1) {
    data = {
      status: 200,
      data: values,
    };
  } else {
    data = {
      status: 200,
      data: values[0],
    };
  }
  res.json(data);
  res.end();
};

exports.error = function error(message) {
  const data = {
    status: 500,
    message,
  };
};

exports.timeout = function timeout(message) {
  let data = {
    status: 408,
    message,
  };
};

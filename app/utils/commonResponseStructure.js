exports.ok = function ok(values, message, res) {
  const data = {
    message,
    data: values.length > 1 ? values : values[0],
  };
  res.status(200);
  res.json(data);
  res.end();
};

exports.error = function error(message, res) {
  const data = {
    message,
  };
  res.status(500);
  res.json(data);
  res.end();
};

exports.timeout = function timeout(message, res) {
  const data = {
    message,
  };
  res.status(408);
  res.json(data);
  res.end();
};

exports.empty = function empty(res) {
  res.status(204);
  res.end();
};

exports.forbidden = function forbidden(message, res) {
  const data = {
    message,
  };
  res.status(403);
  res.json(data);
  res.end();
};

exports.unauthorized = function unauthorized(res) {
  const data = {
    message: 'Credentials invalid. Please try again with valid credentials',
  };
  res.status(401);
  res.json(data);
  res.end();
};

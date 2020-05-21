const response = require('./commonResponseStructure');
const logger = require('./logger');

exports.checkIfObjectEmpty = function checkIfObjectEmpty(data) {
  return Object.keys(data).length === 0;
};
exports.checkIfPropertyEmpty = function checkIfPropertyEmpty(data) {
  return data === undefined;
};
exports.checkIfAuthenticated = function checkIfAuthenticated(req, res) {
  if (req.session.uniqueID === req.body.sessionID && req.session.authenticated) {
    logger.info('Credentials verified, will let\' request continue');
    return true;
  }
  logger.info('Credentials is wrong, stop request');
  response.unauthorized(res);
};

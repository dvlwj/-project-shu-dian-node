const userGet = require('./create');
const userLogin = require('./login');

exports.create = userGet.create;
exports.login = userLogin.login;

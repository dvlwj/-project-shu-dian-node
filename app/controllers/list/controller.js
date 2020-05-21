const listGet = require('./listGet');
const listGetDetails = require('./listGetDetails');
const listDelete = require('./listDelete');
const listUpdate = require('./listUpdate');
const listCreate = require('./listCreate');

exports.get = listGet.get;
exports.getDetails = listGetDetails.getDetails;
exports.delete = listDelete.delete;
exports.update = listUpdate.updateDetails;
exports.create = listCreate.create;

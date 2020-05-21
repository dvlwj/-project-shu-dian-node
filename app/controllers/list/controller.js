const listGet = require('./get');
const listGetDetails = require('./getDetails');
const listDelete = require('./delete');
const listUpdate = require('./update');
const listCreate = require('./create');

exports.get = listGet.get;
exports.getDetails = listGetDetails.getDetails;
exports.delete = listDelete.delete;
exports.update = listUpdate.updateDetails;
exports.create = listCreate.create;

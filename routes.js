'use strict';

module.exports = function(app) {
    var routeGeneral = require('./app/controllers/generals/controller');
    var routeList = require('./app/controllers/list/controller');
    var routeDetails = require('./app/controllers/details/controller');
    app.route('/')
        .get(routeGeneral.index);
    app.route('/list')
        .get(routeList.get);
    app.route('/list/{id}')
        .get(routeDetails.get);
};
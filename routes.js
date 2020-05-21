module.exports = function route(app) {
  const routeGeneral = require('./app/controllers/generals/controller');
  const routeList = require('./app/controllers/list/controller');
  app.route('/')
    .get(routeGeneral.index);
  app.route('/list')
    .get(routeList.get);
  app.route('/list/getDetails')
    .post(routeList.getDetails);
  app.route('/list/delete')
    .delete(routeList.delete);
  app.route('/list/update')
    .put(routeList.update);
};

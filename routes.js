const routeUser = require('./app/controllers/user/controller');
const routeList = require('./app/controllers/list/controller');

module.exports = function route(app) {
  // app.route('/')
  //   .get(routeGeneral.index);
  app.route('/user/create')
    .post(routeUser.create);
  app.route('/user/login')
    .post(routeUser.login);
  app.route('/list')
    .post(routeList.get);
  app.route('/list/getDetails')
    .post(routeList.getDetails);
  app.route('/list/delete')
    .delete(routeList.delete);
  app.route('/list/update')
    .put(routeList.update);
  app.route('/list/create')
    .post(routeList.create);
};

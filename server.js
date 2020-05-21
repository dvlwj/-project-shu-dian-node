const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const uuid = require('uuid');
const logger = require('./app/utils/logger');
const routes = require('./routes');
const utils = require('./app/utils/utils');

const app = express();
const port = process.env.PORT || 3000;
const uniqueID = uuid.v4();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(session({
  genid: () => uniqueID,
  store: new FileStore(),
  key: '5800ca8a-042e-4254-a4e0-69d58a71df61',
  secret: 'try hard',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60000,
  },
}));

routes(app);

app.listen(port, () => {
  logger.info(`RESTful API started. Shu Dian API Service is live on: ${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./app/utils/logger');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

routes(app);

app.listen(port, () => {
  logger.info(`RESTful API started. Shu Dian API Service is live on: ${port}`);
});

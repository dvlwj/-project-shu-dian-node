const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const uuid = require('uuid');
const cors = require('cors');
const logger = require('./app/utils/logger');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;
const uniqueID = uuid.v4();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public', {
  etag: true, // Just being explicit about the default.
  lastModified: true, // Just being explicit about the default.
  setHeaders: (res, path) => {
    const hashRegExp = new RegExp('\\.[0-9a-f]{8}\\.');

    if (path.endsWith('.html')) {
      // All of the project's HTML files end in .html
      res.setHeader('Cache-Control', 'no-cache');
    } else if (hashRegExp.test(path)) {
      // If the RegExp matched, then we have a versioned URL.
      res.setHeader('Cache-Control', 'max-age=31536000');
    }
  },
}));

// app.options('*', cors());
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:8081',
];
app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not '
        + 'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  }),
);
// app.use((req, res, next) => {
//   // res.header('Access-Control-Allow-Origin', '*');
//   // const allowedOrigins = ['http://localhost:8081', 'http://localhost:8080', 'http://localhost:3000'];
//   // const { origin } = req.headers;
//   // if (allowedOrigins.indexOf(origin) > -1) {
//   //   res.setHeader('Access-Control-Allow-Origin', origin);
//   // }
//   // res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Credentials', true);
//   next();
// });
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

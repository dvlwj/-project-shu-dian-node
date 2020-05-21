const winston = require('winston');
const rootPath = require('app-root-path');

const loggerOption = {
  file: {
    level: 'info',
    filename: `${rootPath}/logs/shu-dian-service.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.simple(),
    winston.format.printf(
      (info) => `[${info.service}] - ${info.timestamp} - ${info.level} :  ${info.message}`,
    ),
  ),
  defaultMeta: {
    service: 'main-service',
  },
  transports: [
    new winston.transports.File(loggerOption.file),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console(loggerOption.console));
}

logger.stream = {
  write(message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;

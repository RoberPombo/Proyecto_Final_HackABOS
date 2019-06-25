'use strict';

// Imports modules npm. ============================================================================
const { createLogger, format, transports } = require('winston');
// Declared environment variables ==================================================================
const { NODE_ENV: nodeEnv } = process.env;


const fileConfig = type => new transports.File({
  maxsize: 5120000,
  maxFiles: 5,
  filename: `${__dirname}/../logs/${type}-log.log`,
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(info => `${info.level}: = ${info.message} = [${info.timestamp}]`),
  ),
});


const loggerConsole = createLogger({
  transports: [
    fileConfig('info'),
    new transports.Console({
      format: format.combine(
        format.simple(),
        format.colorize({ all: true }),
        format.timestamp(),
        format.printf(info => `[${info.timestamp}] = ${info.level}: = ${info.message}`),
      ),

    }),
  ],
});
const loggerError = createLogger({
  transports: [
    fileConfig('error'),
  ],
});
const loggerDebug = createLogger({
  transports: [
    fileConfig('debug'),
  ],
});


const Console = {
  debug: message => ((nodeEnv === 'dev') ? console.info(message) : loggerDebug.info(message)),
  log: message => ((nodeEnv === 'dev') ? console.log(message) : loggerConsole.info(message)),
  error: message => ((nodeEnv === 'dev') ? console.error(message) : loggerError.error(message)),
};


module.exports = {
  Console,
};

import fs from 'fs';
import path from 'path';
import winston, { format } from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

import { __DEV__ } from './runtimeInfo';

// logs dir
const logDir: string = __DEV__ ? path.join(__dirname, '../../logs') : path.join(__dirname, '../../logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const LOGGER_LEVEL = {
  trace: 'trace',
  http: 'http',
};

let customTransports: any = [];

customTransports = [
  new winstonDaily({
    level: 'info',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + '/info',
    filename: `%DATE%.log`,
    maxFiles: 14,
    json: true,
    zippedArchive: true,
  }),
  // debug log setting
  new winstonDaily({
    level: 'debug',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + '/debug',
    filename: `%DATE%.log`,
    maxFiles: 14,
    json: true,
    zippedArchive: true,
  }),
  // error log setting
  new winstonDaily({
    level: 'error',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + '/error',
    filename: `%DATE%.log`,
    maxFiles: 14,
    handleExceptions: true,
    json: true,
    zippedArchive: true,
  }),
  // warn log setting
  new winstonDaily({
    level: 'warn',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + '/warn',
    filename: `%DATE%.log`,
    maxFiles: 14,
    handleExceptions: true,
    json: true,
    zippedArchive: true,
  }),
  // trace log setting
  new winstonDaily({
    level: LOGGER_LEVEL.trace,
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + '/' + LOGGER_LEVEL.trace,
    filename: `%DATE%.log`,
    maxFiles: 14,
    handleExceptions: true,
    json: true,
    zippedArchive: true,
  }),
  // http log setting
  new winstonDaily({
    level: LOGGER_LEVEL.http,
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + '/' + LOGGER_LEVEL.http,
    filename: `%DATE%.log`,
    maxFiles: 14,
    handleExceptions: true,
    json: true,
    zippedArchive: true,
  }),
];

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

// Define custom log levels and colors
const customLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 1,
  trace: 0,
};

winston.addColors({
  trace: 'blue',
  debug: 'green',
  info: 'cyan',
  warn: 'yellow',
  error: 'red',
  http: 'magenta',
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, debug: 5, silly: 6, trace: 7
 */
export const logger = winston.createLogger({
  levels: customLevels, // Set custom log levels
  format: format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: customTransports,
  exitOnError: false, // Continue logging even if an error occurs
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
  }),
);

export const stream = {
  write: (message: string) => {
    const ignoreUrls = ['health'];
    try {
      const isIgnoredUrl = ignoreUrls.some(x => message.includes(x));
      if (isIgnoredUrl) return;
    } catch (e) {
      console.error(e);
    }
    logger.log(LOGGER_LEVEL.http, message.substring(0, message.lastIndexOf('\n')));
  },
};

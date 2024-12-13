import chalk from 'chalk';

import { logger } from './logger';
import { __DEV__ } from './runtimeInfo';

/**
 * Logger Class
 */

export const logErrorCritical = (msg: string) => {
  if (__DEV__) {
    logger.error(chalk.black.bgRed(`${msg}`));
  } else {
    logger.error(`${msg}`);
  }
};

export const logError = (msg: string) => {
  if (__DEV__) {
    logger.error(chalk.red(`${msg}`));
  } else {
    logger.error(`${msg}`);
  }
};

export const logWarning = (msg: string) => {
  if (__DEV__) {
    logger.warn(chalk.yellow(`${msg}`));
  } else {
    logger.warn(`${msg}`);
  }
};

export const logWarningCritical = (msg: string) => {
  if (__DEV__) {
    logger.warn(chalk.black.bgYellow(`${msg}`));
  } else {
    logger.warn(`${msg}`);
  }
};

export const logInfo = (msg: string) => {
  if (__DEV__) {
    logger.info(chalk.cyanBright(`${msg}`));
  } else {
    logger.info(`${msg}`);
  }
};

export const logInfoCritical = (msg: string) => {
  if (__DEV__) {
    logger.info(chalk.black.bgCyan(`${msg}`));
  } else {
    logger.info(`${msg}`);
  }
};

export const logSuccess = (msg: string) => {
  if (__DEV__) {
    logger.info(chalk.greenBright(`${msg}`));
  } else {
    logger.info(`${msg}`);
  }
};

export const logSuccessCritical = (msg: string) => {
  if (__DEV__) {
    logger.info(chalk.black.bgGreen(`${msg}`));
  } else {
    logger.info(`${msg}`);
  }
};

export const logMessage = (msg: string) => {
  if (__DEV__) {
    logger.info(chalk.black.bgMagenta(`${msg}`));
  } else {
    logger.info(`${msg}`);
  }
};

export const logInfoSchedular = (msg: string) => {
  if (__DEV__) {
    logger.info(chalk.magentaBright(`${msg}`));
  } else {
    logger.info(`${msg}`);
  }
};

import { logger } from '../utils/logger';

/**
 * Handles error by printing to console and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
export const handleError = (res: any = {}, err: any = {}, userMessage?: any) => {
  const errorObject: any = {
    msg: err.message,
    err: err.stack,
  };

  if (userMessage || err.userMessage || null) {
    errorObject.userMessage = userMessage || err.userMessage || null;
  }

  if (err?.message === 'VALIDATION_ERROR') {
    console.error(err);
    res.status(422).json({
      err,
    });
    return;
  }

  console.log(`ERR MESSAGE :: ${err?.message}`);
  console.log(`ERR STACK :: ${truncateString(String(err.stack || err || ''), 250)}`);

  if (userMessage) {
    console.log(`MESSAGE :: userMessage`);
  }

  const errCode = err.code || err.status;

  if (errCode && errCode === 500) {
    logger.error(err.stack);
  }

  if (err && errCode) {
    res.status(errCode).json({
      error: errorObject,
    });
    return;
  }
  res.status(errCode || 500).json({
    error: errorObject,
  });
  return;
};

export function truncateString(str: string, n: number) {
  return str.length > n ? `${str.substr(0, n - 1)}...` : str;
}

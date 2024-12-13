import { ZodError } from 'zod';
import { logErrorCritical } from './console-logger';

/**
 * Builds error object for zod validation
 * @param {ZodError} code - error code
 * @returns {any} - error object
 */
export const buildZodValidationErrObject = (errors: ZodError): any => {
  // get first issue from the validations
  const { path, message: userMessage } = errors?.issues[0];
  const errorObject: any = {
    code: 403,
    message: 'VALIDATION_ERROR',
    item: path.slice(-1)[0] as string, // get last item ex: path will return ['body', 'password'] means password field in body
    userMessage,
  };

  return errorObject;
};

/**
 * Builds error object
 * @param {number} code - error code
 * @param {string} message - error text
 */
export const buildErrObject = (code: any = '', message = '', item = '', userMessage = undefined) => {
  logErrorCritical(code);
  console.log(message);
  return {
    code,
    message,
    item,
    userMessage,
  };
};

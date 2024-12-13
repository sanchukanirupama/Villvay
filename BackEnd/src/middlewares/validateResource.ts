/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

import { buildZodValidationErrObject } from '@utils/buildErrObject';

import { handleError } from './handlers';

/**
 * Validate the request body using the schema and un defined data in object will be stripped
 * @param {AnyZodObject} schema - Schema required for validation
 * @returns
 */
export const validateResource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedReqData = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    req.body = validatedReqData?.body || {};
    req.query = validatedReqData?.query || {};
    req.params = validatedReqData?.params || {};

    next();
  } catch (errors: any) {
    const validationError = buildZodValidationErrObject(errors);
    handleError(res, validationError);
  }
};

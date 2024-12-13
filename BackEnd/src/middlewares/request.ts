import { IRequest } from "@interfaces/express.interface";
import {
  logError,
  logErrorCritical,
  logInfo,
  logWarning,
} from "@utils/console-logger";

export const handleRequestComplete = (req: any, res: any) => {
  try {
    const ignoreUrls = ["health"];

    const isIgnoredUrl = ignoreUrls.some((x) => req.originalUrl.includes(x));
    if (isIgnoredUrl) return;

    const allErrorCodes = [403, 404, 422, 500, 409];

    if (res.statusCode === 403) {
      logErrorCritical(
        `Request Completed | ${res.req.originalUrl || ""} | METHOD : ${
          res.req.method
        } | STATUS : ${res.statusCode}`
      );
    } else if (res.statusCode === 401) {
      logWarning(
        `Request Completed | ${res.req.originalUrl || ""} | METHOD : ${
          res.req.method
        } | STATUS : ${res.statusCode}`
      );
    } else if (allErrorCodes.includes(res.statusCode)) {
      logError(
        `Request Completed | ${res.req.originalUrl || ""} | METHOD : ${
          res.req.method
        } | STATUS : ${res.statusCode}`
      );
    } else {
      logInfo(
        `Request Completed | ${res.req.originalUrl || ""} | METHOD : ${
          res.req.method
        } | STATUS : ${res.statusCode}`
      );
    }
  } catch (e) {
    console.log(e);
  }
};

export const handleRequestStart = (req: any) => {
  try {
    const ignoreUrls = ["health"];

    const isIgnoredUrl = ignoreUrls.some((x) => req.originalUrl.includes(x));
    if (isIgnoredUrl) return;

    const remoteAddress =
      req.headers["x-forwarded-for"] || req?.connection?.remoteAddress || null;

    logInfo(
      `New Request | ${req.originalUrl} | METHOD : ${req.method} | IP : ${remoteAddress}`
    );
  } catch (e) {
    console.log(e);
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const requestHeaderAppend = async (req: any) => {
  try {
  } catch (e) {
    console.log(e);
    console.log("req.headers");
  }
};

/**
 * Builds a user request object by extracting data from a JWT token and setting request properties.
 *
 * @param {IRequest} req - The incoming HTTP request object.
 * @param {UserJwtData} jwtData - The decoded JWT data containing user information.
 * @returns {IRequest} The modified request object with user data and database connection.
 */
export function buildUserRequest(req: IRequest, jwtData: any): IRequest {
  const { id, email, role } = jwtData;

  req.user = { id, email, role };

  return req;
}

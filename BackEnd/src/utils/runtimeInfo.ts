import { NODE_ENV } from '@configs';

const DEV_ENV = () => {
  if (NODE_ENV === 'development') {
    return true;
  }
  return false;
};

const STAGING_ENV = () => {
  if (NODE_ENV === 'staging') {
    return true;
  }
  return false;
};

const PROD_ENV = () => {
  if (NODE_ENV === 'production') {
    return true;
  }
  return false;
};

const QA_ENV = () => {
  if (NODE_ENV === 'qa') {
    return true;
  }
  return false;
};

const GET_ENV = () => {
  if (NODE_ENV) {
    return NODE_ENV;
  }
  return 'development';
};

export const __DEV__ = DEV_ENV();
export const __STAGING__ = STAGING_ENV();
export const __PROD__ = PROD_ENV();
export const __ENV__ = GET_ENV();
export const __QA__ = QA_ENV();

export function shortenEnv(env: string) {
  if (env === 'production') {
    return 'prod';
  }
  if (env === 'development') {
    return 'dev';
  }
  return env;
}

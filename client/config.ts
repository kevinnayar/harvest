import * as dotenv from 'dotenv';

dotenv.config();

const isDevMode: boolean = process.env.NODE_ENV === 'development';

const apiProtocol = process.env.API_PROTOCOL;
const apiHost = process.env.API_HOST;
const apiPort = process.env.API_PORT;

const appProtocol = process.env.APP_PROTOCOL;
const appHost = process.env.APP_HOST;
const appPort = process.env.APP_PORT;

export default {
  isDevMode,
  apiUrl: `${apiProtocol}://${apiHost}:${apiPort}`,
  baseUrl: `${appProtocol}://${appHost}:${appPort}`,
  cognito: {
    // AWS_REGION: process.env.AWS_REGION,
    // AWS_COGNITO_POOL_ID: process.env.AWS_COGNITO_POOL_ID,
    // AWS_COGNITO_POOL_ARN: process.env.AWS_COGNITO_POOL_ARN,
    // AWS_COGNITO_APP_CLIENT_ID: process.env.AWS_COGNITO_APP_CLIENT_ID,
    // AWS_COGNITO_IDENTITY_POOL_ID: process.env.AWS_COGNITO_IDENTITY_POOL_ID,
  },
};

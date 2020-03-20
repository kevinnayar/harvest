import * as dotenv from 'dotenv';

dotenv.config();

const isDevMode: boolean = process.env.NODE_ENV === 'development';

export default {
  isDevMode,
  cognito: {
    AWS_REGION: process.env.DEV_AWS_REGION,
    AWS_COGNITO_POOL_ID: process.env.DEV_AWS_COGNITO_POOL_ID,
    AWS_COGNITO_POOL_ARN: process.env.DEV_AWS_COGNITO_POOL_ARN,
    AWS_COGNITO_APP_CLIENT_ID: process.env.DEV_AWS_COGNITO_APP_CLIENT_ID,
    AWS_COGNITO_IDENTITY_POOL_ID: process.env.DEV_AWS_COGNITO_IDENTITY_POOL_ID,
  },
};

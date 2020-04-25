import * as dotenv from 'dotenv';
import * as express from 'express';
import * as cors from 'cors';
import * as api from './api/api';

import { apiFormatError, strictStringOrThrow, numberOrThrow } from '../utils/apiUtils';
import { TypeDBConfig } from '../types/baseTypes';

dotenv.config();

function validDBConfig(): TypeDBConfig {
  const database = strictStringOrThrow(process.env.PGDATABASE, 'No DATABASE config env variable');
  const host = strictStringOrThrow(process.env.PGHOST, 'No DATABASE HOST config env variable');
  const port = numberOrThrow(parseInt(process.env.PGPORT || '5432', 10), 'No DATABASE PORT config env variable');
  const user = strictStringOrThrow(process.env.PGUSER, 'No DATABASE USER config env variable');
  return {
    database,
    host,
    port,
    user,
  };
}

function main() {
  try {
    const apiProtocol = strictStringOrThrow(process.env.API_PROTOCOL, 'No API PROTOCOL env variable');
    const apiHost = strictStringOrThrow(process.env.API_HOST, 'No API HOST env variable');
    const apiPort = strictStringOrThrow(process.env.API_PORT, 'No API PORT env variable');
    const apiUrl = `${apiProtocol}://${apiHost}:${apiPort}`;

    const appProtocol = strictStringOrThrow(process.env.APP_PROTOCOL, 'No APP PROTOCOL env variable');
    const appHost = strictStringOrThrow(process.env.APP_HOST, 'No APP HOST env variable');
    const appPort = strictStringOrThrow(process.env.APP_PORT, 'No APP PORT env variable');
    const appUrl = `${appProtocol}://${appHost}:${appPort}`;

    const app = express();

    const corsOptions = {
      origin: appUrl,
      optionsSuccessStatus: 200,
    };

    app.use(cors(corsOptions));

    const dbConfig = validDBConfig();

    api.register(app, dbConfig);

    const server = app.listen(apiPort, (err) => {
      if (err) throw new Error(`Error starting server: ${apiFormatError(err)}`);
      console.info(`\n  🌎   API is running at ${apiUrl}\n`);
    });

    server.keepAliveTimeout = 0;
    server.timeout = 60 * 60 * 1000;
  } catch (err) {
    throw new Error(`\n  💀   ERROR: ${apiFormatError(err)}\n`);
  }
}

main();

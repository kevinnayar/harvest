import * as dotenv from 'dotenv';
import * as express from 'express';
import * as cors from 'cors';
import * as api from './api/api';

import { InternalServerErrorException } from '../utils/exceptionUtils';
import { apiErrorToString } from '../utils/apiUtils';
import { TypeDBConfig } from '../types/baseTypes';

dotenv.config();

function validApiPort(): string {
  const apiPort = process.env.API_PUBLIC_PORT;
  if (apiPort === undefined) throw InternalServerErrorException('No PORT env variable');
  return apiPort;
}

function validApiHost(): string {
  const apiHost = process.env.API_HOST;
  if (apiHost === undefined) throw InternalServerErrorException('No HOST env variable');
  return apiHost;
}

function validDBConfig(): TypeDBConfig {
  const database = process.env.PGDATABASE;
  if (database === undefined) throw InternalServerErrorException('No DATABASE config env variable');

  const host = process.env.PGHOST;
  if (host === undefined) throw InternalServerErrorException('No DATABASE HOST config env variable');

  const port = parseInt(process.env.PGPORT || '5432', 10);
  if (port === undefined) throw InternalServerErrorException('No DATABASE PORT config env variable');

  const user = process.env.PGUSER;
  if (user === undefined) throw InternalServerErrorException('No DATABASE USER config env variable');

  return {
    database,
    host,
    port,
    user,
  };
}

function main() {
  const apiPort = validApiPort();
  const apiHost = validApiHost();
  const dbConfig = validDBConfig();

  const app = express();

  const corsOptions = {
    origin: apiHost,
    methods: 'GET',
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  api.register(app, dbConfig);

  const server = app.listen(apiPort, (err) => {
    if (err) throw InternalServerErrorException(`Error starting server: ${apiErrorToString(err)}`);

    console.info('\n');
    console.info(`  🌎   API is running on port ${apiPort}\n`);
    console.info(`  💻   Send request to http://${apiHost}:${apiPort}\n`);
    console.info('\n');
  });

  server.keepAliveTimeout = 0;
  server.timeout = 60 * 60 * 1000;
}

main();

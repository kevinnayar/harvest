import * as AWS from 'aws-sdk';
import { Application } from 'express';
import * as _pgPromise from 'pg-promise';
import { IMain, IDatabase } from 'pg-promise';
import { TypeDBConfig } from '../../types/baseTypes';

import config from '../../client/config';

import _auth from './auth/auth';
import _plantQueries from './entities/plant/plantQueries';
import _userCommands from './entities/user/userCommands';
import _userQueries from './entities/user/userQueries';
import _zoneQueries from './entities/zone/zoneQueries';

export const register = (app: Application, dbConfig: TypeDBConfig) => {
  const pgPromise: IMain = _pgPromise();
  const db: IDatabase<{}, any> = pgPromise(dbConfig);

  AWS.config.region = config.cognito.AWS_REGION;
  AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'personal' });

  const auth = _auth(db);
  const plantQueries = _plantQueries(db);
  const userCommands = _userCommands(db);
  const userQueries = _userQueries(db);
  const zoneQueries = _zoneQueries(db);

  // unauthenticated
  app.get(`/api/zones/:zipcode`, zoneQueries.getZoneByZipcode);
  app.post(`/api/users/create`, userCommands.createNewUser);

  // authenticated
  app.get(`/api/plants/:plantId`, auth.validateUser, plantQueries.getPlantById);
  app.get(`/api/users/:userId`, auth.validateUser, userQueries.getUserById);
  app.get(`/api/users/:userId/plants`, auth.validateUser, userQueries.getPlantsByUserId);
};

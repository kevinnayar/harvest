import { Application } from 'express';
import * as _pgPromise from 'pg-promise';
import { IMain, IDatabase } from 'pg-promise';

import _auth from './auth/auth';
import _plantQueries from './entities/plant/plantQueries';
import _userCommands from './entities/user/userCommands';
import _userQueries from './entities/user/userQueries';
import _zoneQueries from './entities/zone/zoneQueries';

import { TypeDBConfig } from '../../types/baseTypes';

export const register = (app: Application, config: TypeDBConfig) => {
  const pgPromise: IMain = _pgPromise();
  const db: IDatabase<{}, any> = pgPromise(config);

  const auth = _auth(db);
  const plantQueries = _plantQueries(db);
  const userCommands = _userCommands(db);
  const userQueries = _userQueries(db);
  const zoneQueries = _zoneQueries(db);

  // unauthenticated
  app.get(`/api/zones/:zipcode`, zoneQueries.getZoneByZipcode);

  // authenticated
  app.get(`/api/plants/:plantId`, auth.validateUser, plantQueries.getPlantById);
  app.get(`/api/users/:userId`, auth.validateUser, userQueries.getUserById);
  app.get(`/api/users/:userId/plants`, auth.validateUser, userQueries.getPlantsByUserId);
  app.post(`/api/users/:userId`, auth.validateUser, userCommands.getUserById);
};

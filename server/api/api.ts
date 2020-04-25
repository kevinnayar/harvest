import { Application } from 'express';
import * as _pgPromise from 'pg-promise';
import { IMain, IDatabase } from 'pg-promise';

import _userQueries from './entities/user/userQueries';
import _plantQueries from './entities/plant/plantQueries';
import _zoneQueries from './entities/zone/zoneQueries';

import { TypeDBConfig } from '../../types/baseTypes';

export const register = (app: Application, config: TypeDBConfig) => {
  const pgPromise: IMain = _pgPromise();
  const db: IDatabase<{}, any> = pgPromise(config);
  
  const userQueries = _userQueries(db);
  app.get(`/api/users/:userId`, userQueries.getUserById);
  app.get(`/api/users/:userId/plants`, userQueries.getPlantsByUserId);

  const plantQueries = _plantQueries(db);
  app.get(`/api/plants/:plantId`, plantQueries.getPlantById);

  const zoneQueries = _zoneQueries(db);
  app.get(`/api/zones/:zipcode`, zoneQueries.getZoneByZipcode);
};

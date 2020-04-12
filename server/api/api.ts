import { Application } from 'express';
import * as _pgPromise from 'pg-promise';
import { IMain, IDatabase } from 'pg-promise';

import UserQueries from './entities/user/userQueries';
import PlantQueries from './entities/plant/plantQueries';

import { TypeDBConfig } from '../../types/baseTypes';

export const register = (app: Application, config: TypeDBConfig) => {
  const pgPromise: IMain = _pgPromise();
  const db: IDatabase<{}, any> = pgPromise(config);
  
  const userQueries = new UserQueries(db);
  app.get(`/api/users/:userId`, userQueries.getUserById);
  app.get(`/api/users/:userId/plants`, userQueries.getPlantsByUserId);

  const plantQueries = new PlantQueries(db);
  app.get(`/api/plants/:plantId`, plantQueries.getPlantById);
  app.get(`/api/plantzones/:zipcode`, plantQueries.getPlantZoneByZipcode);
};

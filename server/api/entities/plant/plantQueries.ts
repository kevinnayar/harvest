import { Request, Response } from 'express';
import { IDatabase } from 'pg-promise';

import { dbGetPlantById, dbGetPlantZoneByZipcode } from './plantDB';
import { apiErrorToString, strictStringOrThrow, predicateOrThrow, convertSqlToEntity } from '../../../../utils/apiUtils';
import { NotFoundException } from '../../../../utils/exceptionUtils';

export default class PlantQueries {
  db: IDatabase<{}, any>;

  constructor(db: IDatabase<{}, any>) {
    this.db = db;
  }

  getPlantById = async (req: Request<{ plantId: string }>, res: Response) => {
    try {
      const plantId = strictStringOrThrow(req.params.plantId, 'Plant ID is required and cannot be empty.');
      const rows = await dbGetPlantById(this.db, plantId);

      return rows.length === 1
        ? res
          .status(200)
          .json(convertSqlToEntity('TypePlantEntity', rows[0]))
        : res
          .status(404)
          .json(NotFoundException('Could not find plant.'));
    } catch (err) {
      return res.status(404).json(NotFoundException(apiErrorToString(err)));
    }
  };

  getPlantZoneByZipcode = async (req: Request<{ zipcode: string }>, res: Response) => {
    try {
      const isZipcode = (value: string) => typeof value === 'string' && value.length === 5 && !Number.isNaN(parseInt(value, 10));
      const zipcode = predicateOrThrow(isZipcode, req.params.zipcode, 'Zipcode is missing or in invalid format.');
      const rows = await dbGetPlantZoneByZipcode(this.db, zipcode);

      return rows.length === 1
        ? res
          .status(200)
          .json(convertSqlToEntity('TypePlantZoneEntity', rows[0]))
        : res
          .status(404)
          .json(NotFoundException(`Could not find plant zone for zipcode: ${zipcode}.`));
    } catch (err) {
      return res.status(404).json(NotFoundException(apiErrorToString(err)));
    }
  };
}

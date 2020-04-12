import { Request, Response } from 'express';
import { IDatabase } from 'pg-promise';

import { dbGetUserById, dbGetPlantsByUserId } from './userDB';
import { apiErrorToString, strictStringOrThrow, convertSqlToEntity } from '../../../../utils/apiUtils';
import { NotFoundException } from '../../../../utils/exceptionUtils';

export default class UserQueries {
  db: IDatabase<{}, any>;

  constructor(db: IDatabase<{}, any>) {
    this.db = db;
  }

  getUserById = async (req: Request<{ userId: string }>, res: Response) => {
    try {
      const userId = strictStringOrThrow(req.params.userId, 'User ID is required and cannot be empty.');
      const rows = await dbGetUserById(this.db, userId);
      
      return rows.length === 1
        ? res
          .status(200)
          .json(convertSqlToEntity('TypeUserEntity', rows[0]))
        : res
          .status(404)
          .json(NotFoundException('Could not find user.'));
    } catch (err) {
      return res.status(404).json(NotFoundException(apiErrorToString(err)));
    }
  };

  getPlantsByUserId = async (req: Request<{ userId: string }>, res: Response) => {
    try {
      const userId = strictStringOrThrow(req.params.userId, 'User ID is required and cannot be empty.');
      const rows = await dbGetPlantsByUserId(this.db, userId);

      return rows.length > 0
        ? res
          .status(200)
          .json(rows.map(row => convertSqlToEntity('TypePlantEntity', row)))
        : res
          .status(404)
          .json(NotFoundException('No plants found for this user.'));
    } catch (err) {
      return res.status(404).json(NotFoundException(apiErrorToString(err)));
    }
  };
}

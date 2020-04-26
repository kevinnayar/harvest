import { Request, Response } from 'express';
import { IDatabase } from 'pg-promise';
import { dbGetUserById, dbGetPlantsByUserId } from './userDb';
import { apiFormatError, strictStringOrThrow } from '../../../../utils/apiUtils';
import { convertSqlToEntityUser, convertSqlToEntityPlant } from '../../../../utils/entityUtils';
import { NotFoundException, BadRequestException } from '../../../../utils/exceptionUtils';

export default function(db: IDatabase<{}, any>) {
  async function getUserById(req: Request<{ userId: string }>, res: Response) {
    try {
      const userId = strictStringOrThrow(req.params.userId, 'User ID is required and cannot be empty.');
      const rows = await dbGetUserById(db, userId);
      
      return rows.length === 1
        ? res.status(200).json(convertSqlToEntityUser(rows[0]))
        : res.status(404).json(NotFoundException('Could not find user.'));
    } catch (err) {
      return res.status(400).json(BadRequestException(apiFormatError(err)));
    }
  };

  async function getPlantsByUserId(req: Request<{ userId: string }>, res: Response) {
    try {
      const userId = strictStringOrThrow(req.params.userId, 'User ID is required and cannot be empty.');
      const rows = await dbGetPlantsByUserId(db, userId);

      return rows.length > 0
        ? res.status(200).json(rows.map((row) => convertSqlToEntityPlant(row)))
        : res.status(404).json(NotFoundException('No plants found for this user.'));
    } catch (err) {
      return res.status(400).json(BadRequestException(apiFormatError(err)));
    }
  };

  return {
    getUserById,
    getPlantsByUserId,
  };
}

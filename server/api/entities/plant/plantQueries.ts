import { Request, Response } from 'express';
import { IDatabase } from 'pg-promise';
import { dbGetPlantById } from './plantDb';
import { apiFormatError, strictStringOrThrow } from '../../../../utils/apiUtils';
import { convertSqlToEntity } from '../../../../utils/entityUtils';
import { NotFoundException, BadRequestException } from '../../../../utils/exceptionUtils';

export default function(db: IDatabase<{}, any>) {
  async function getPlantById(req: Request<{ plantId: string }>, res: Response) {
    try {
      const plantId = strictStringOrThrow(req.params.plantId, 'Plant ID is required and cannot be empty.');
      const rows = await dbGetPlantById(db, plantId);

      return rows.length === 1
        ? res.status(200).json(convertSqlToEntity('TypeEntityPlant', rows[0]))
        : res.status(404).json(NotFoundException('Could not find plant.'));
    } catch (err) {
      return res.status(400).json(BadRequestException(apiFormatError(err)));
    }
  };

  return {
    getPlantById,
  };
}

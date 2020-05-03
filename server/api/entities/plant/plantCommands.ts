import { Request, Response } from 'express';
import { IDatabase } from 'pg-promise';

import { dbCreateNewPlant } from './plantDb';
import { apiFormatError, strictStringOrThrow } from '../../../../utils/apiUtils';
import { getGuid } from '../../../../utils/stringUtils';
import { BadRequestException } from '../../../../utils/exceptionUtils';
import { TypePlant } from '../../../../types/plantTypes';

export default function (db: IDatabase<{}, any>) {
  async function createNewPlant(req: Request<{ userId: string }>, res: Response) {
    try {
      const userId = strictStringOrThrow(req.params.userId, 'User ID is required and cannot be empty.');
      const plantName = strictStringOrThrow(req.body.plantName, 'Plant name is required and cannot be empty.');
      const plantCategory = strictStringOrThrow(req.body.plantCategory, 'Plant category is required and cannot be empty.');
      const datePlanted = strictStringOrThrow(req.body.datePlanted, 'Date planted is required and cannot be empty.');
      const newPlant: TypePlant = {
        plantId: getGuid('plant'),
        plantName,
        plantCategory,
        userId,
        status: 'enabled',
        datePlanted,
        dateCreated: `${Date.now() / 1000}`,
      };

      const plantCreated = await dbCreateNewPlant(db, newPlant);
      return plantCreated
        ? res.status(200).json({ ...newPlant })
        : res.status(404).json(BadRequestException('Could not create plant.'));
    } catch (err) {
      return res.status(400).json(BadRequestException(apiFormatError(err)));
    }
  }

  return {
    createNewPlant,
  };
}

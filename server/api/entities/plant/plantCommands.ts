import { Request, Response } from 'express';
import { IDatabase } from 'pg-promise';

import { dbCreateNewPlant } from './plantDb';
import { apiFormatError, strictStringOrThrow, stringUndefinedOrThrow } from '../../../../utils/apiUtils';
import { getGuid } from '../../../../utils/stringUtils';
import { BadRequestException } from '../../../../utils/exceptionUtils';
import { timeGetNowToUtc } from '../../../../utils/numberUtils';
import { TypeEntityPlant } from '../../../../types/entityTypes';

export default function (db: IDatabase<{}, any>) {
  async function createNewPlant(req: Request<{ userId: string }>, res: Response) {
    try {
      const userId = strictStringOrThrow(req.params.userId, 'User ID is required and cannot be empty.');
      const plantName = strictStringOrThrow(req.body.plantName, 'Plant name is required and cannot be empty.');
      const plantCategory = strictStringOrThrow(
        req.body.plantCategory,
        'Plant category is required and cannot be empty.',
      );
      const datePlantedMaybe = stringUndefinedOrThrow(
        req.body.datePlanted,
        'Optional value for date planted must be a string.',
      );

      const newPlant: TypeEntityPlant = {
        type: 'TypeEntityPlant',
        id: getGuid('plant'),
        userId,
        plantName,
        category: plantCategory,
        status: 'enabled',
        dateCreated: timeGetNowToUtc(),
        datePlanted: datePlantedMaybe ? parseInt(datePlantedMaybe, 10) : undefined,
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

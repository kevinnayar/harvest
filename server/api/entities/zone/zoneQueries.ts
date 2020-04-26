import { Request, Response } from 'express';
import { IDatabase } from 'pg-promise';
import { dbGetZoneByZipcode } from './zoneDb';
import { apiFormatError, predicateOrThrow } from '../../../../utils/apiUtils';
import { convertSqlToEntityZone } from '../../../../utils/entityUtils';
import { NotFoundException, BadRequestException } from '../../../../utils/exceptionUtils';

export default function(db: IDatabase<{}, any>) {
  async function getZoneByZipcode(req: Request<{ zipcode: string }>, res: Response) {
    try {
      const isZipcode = (value: string) =>
        typeof value === 'string' && value.length === 5 && !Number.isNaN(parseInt(value, 10));
      const zipcode = predicateOrThrow(
        isZipcode,
        req.params.zipcode,
        'Zipcode is missing or in invalid format.',
      );
      const rows = await dbGetZoneByZipcode(db, zipcode);

      return rows.length === 1
        ? res.status(200).json(convertSqlToEntityZone(rows[0]))
        : res.status(404).json(NotFoundException(`Could not find zone for zipcode: ${zipcode}.`));
    } catch (err) {
      return res.status(400).json(BadRequestException(apiFormatError(err)));
    }
  }

  return {
    getZoneByZipcode,
  };
}
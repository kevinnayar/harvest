import { Request, Response } from 'express';
import { IDatabase } from 'pg-promise';
import { apiFormatError, strictStringOrThrow } from '../../../../utils/apiUtils';
import { UnauthorizedException } from '../../../../utils/exceptionUtils';

export default function (db: IDatabase<{}, any>) {
  async function getUserById(req: Request<{ userId: string }>, res: Response) {
    try {
      const userId = strictStringOrThrow(req.params.userId, 'User ID is required and cannot be empty.');      
      return res.status(200).json({userId});
    } catch (err) {
      return res.status(401).json(UnauthorizedException(apiFormatError(err)));
    }
  }

  return {
    getUserById,
  };
}

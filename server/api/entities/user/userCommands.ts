import * as jsonwebtoken from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';
import { Request, Response } from 'express';
import { IDatabase } from 'pg-promise';
import config from '../../../../client/config';
import { apiFormatError, strictStringOrThrow, trueOrThrow } from '../../../../utils/apiUtils';
import { UnauthorizedException } from '../../../../utils/exceptionUtils';

const region = config.cognito.AWS_REGION;
const userpoolId = config.cognito.AWS_COGNITO_POOL_ID;
const keysUrlPrefix = `https://cognito-idp.${region}.amazonaws.com/${userpoolId}`;
const keysUrl = `${keysUrlPrefix}/.well-known/jwks.json`;

interface DecodedBody {
  sub: string;
  exp: number;
  iss: string;
  username: string;
}

const client = jwksClient({
  cache: true,
  jwksUri: keysUrl,
});

function getKey(header: jsonwebtoken.JwtHeader, callback: jsonwebtoken.SigningKeyCallback) {
  client.getSigningKey(header.kid!, (err: Error, key: jwksClient.SigningKey) => {
    if (err) return callback(err);
    callback(null, key.getPublicKey());
  });
}

function isTokenExpired(exp: number): boolean {
  const now = new Date();
  const seconds = Math.floor(now.getTime() / 1000);
  return exp < seconds; 
}

export default function (db: IDatabase<{}, any>) {
  async function getUserById(req: Request<{ userId: string }>, res: Response) {
    try {
      const token = strictStringOrThrow(
        req.headers.authorization,
        'Authorization header is invalid or non-existent.',
      );
      const jwtToken = strictStringOrThrow(
        token.replace('Bearer ', ''),
        'JWT Token is required and cannot be empty.',
      );
      const payload: DecodedBody = await new Promise((resolve, reject) => {
        jsonwebtoken.verify(jwtToken, getKey, (err: Error, decoded) => {
          if (err) return reject(err);
          resolve(<DecodedBody>decoded);
        });
      });

     const notExpired: boolean = trueOrThrow(
       !isTokenExpired(payload.exp),
       'Token is expired.',
     );
     const issuerMatch: boolean = trueOrThrow(
       payload.iss === keysUrlPrefix,
       'Token issuer does not match client.',
     );

      console.log({ payload, notExpired, issuerMatch });
      
      return res.status(200).json({success: 'ok'});
    } catch (err) {
      return res.status(401).json(UnauthorizedException(apiFormatError(err)));
    }
  }

  return {
    getUserById,
  };
}

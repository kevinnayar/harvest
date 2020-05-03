import * as AWS from 'aws-sdk';
import { Request, Response } from 'express';
import { IDatabase } from 'pg-promise';

import config from '../../../../client/config';

import { dbCreateNewUser } from './userDb';
import { apiFormatError, strictStringOrThrow } from '../../../../utils/apiUtils';
import { BadRequestException } from '../../../../utils/exceptionUtils';
import { TypeUserState, TypeUser } from '../../../../types/userTypes';

export default function (db: IDatabase<{}, any>) {
  async function createNewUser(req: Request, res: Response) {
    try {
      let userCreated = false;
      
      const username = strictStringOrThrow(req.body.email, 'email is required and cannot be empty.');
      // const password = strictStringOrThrow(req.body.password, 'password is required and cannot be empty.');
      const firstName = strictStringOrThrow(req.body.firstName, 'firstName is required and cannot be empty.');
      const lastName = strictStringOrThrow(req.body.lastName, 'lastName is required and cannot be empty.');

      const cognito = new AWS.CognitoIdentityServiceProvider();
      const signupParams: AWS.CognitoIdentityServiceProvider.AdminCreateUserRequest = {
        UserPoolId: config.cognito.AWS_COGNITO_POOL_ID,
        Username: username,
        DesiredDeliveryMediums: ['EMAIL'],
        ForceAliasCreation: false,
        UserAttributes: [
          { Name: 'email', Value: username },
          { Name: 'email_verified', Value: 'false' },
          { Name: 'given_name', Value: firstName },
          { Name: 'family_name', Value: lastName },
        ],
      };
      
      const userId: string = await cognito.adminCreateUser(signupParams).promise().then(data => data.User.Username);

      const newUser: TypeUser = {
        userId,
        firstName,
        lastName,
        status: 'enabled',
        role: 'basic',
        email: username,
        confirmed: false,
        dateCreated: `${(Date.now() / 1000)}`,
      };
      userCreated = await dbCreateNewUser(db, newUser);

      const user: TypeUserState = {
        userGuid: userId,
        email: username,
        authenticated: false,
        confirmed: false,
        cognitoSession: null,
      };
      
      return userCreated
        ? res.status(200).json({...user})
        : res.status(404).json(BadRequestException('Could not create user.'));
    } catch (err) {
      return res.status(400).json(BadRequestException(apiFormatError(err)));
    }
  };

  return {
    createNewUser,
  };
}

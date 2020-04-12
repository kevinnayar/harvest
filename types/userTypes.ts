import { TypeBaseDispatch, TypeApiXferStatus } from './baseTypes';

export const USER_AUTH_LOGIN_REQUESTED = 'USER_AUTH_LOGIN_REQUESTED';
export const USER_AUTH_LOGIN_SUCCEEDED = 'USER_AUTH_LOGIN_SUCCEEDED';
export const USER_AUTH_LOGIN_FAILED = 'USER_AUTH_LOGIN_FAILED';

export const USER_AUTH_LOGOUT_REQUESTED = 'USER_AUTH_LOGOUT_REQUESTED';
export const USER_AUTH_LOGOUT_SUCCEEDED = 'USER_AUTH_LOGOUT_SUCCEEDED';
export const USER_AUTH_LOGOUT_FAILED = 'USER_AUTH_LOGOUT_FAILED';

interface IUserLoginKeys {
  USER_AUTH_LOGIN_REQUESTED: 'USER_AUTH_LOGIN_REQUESTED';
  USER_AUTH_LOGIN_SUCCEEDED: 'USER_AUTH_LOGIN_SUCCEEDED';
  USER_AUTH_LOGIN_FAILED: 'USER_AUTH_LOGIN_FAILED';
}
interface IUserLogoutKeys {
  USER_AUTH_LOGOUT_REQUESTED: 'USER_AUTH_LOGOUT_REQUESTED';
  USER_AUTH_LOGOUT_SUCCEEDED: 'USER_AUTH_LOGOUT_SUCCEEDED';
  USER_AUTH_LOGOUT_FAILED: 'USER_AUTH_LOGOUT_FAILED';
}

export type TypeUserLoginDispatch = TypeBaseDispatch & {
  type: keyof IUserLoginKeys;
};
export type TypeUserLogoutDispatch = TypeBaseDispatch & {
  type: keyof IUserLogoutKeys;
};

export type TypeUserDispatch = TypeUserLoginDispatch | TypeUserLogoutDispatch;

export type TypeUserState = {
  userGuid: null | string;
  email: null | string;
  authenticated: boolean;
  confirmed: boolean;
};

export type TypeUserReducer = {
  userAuthLoginXferStatus: TypeApiXferStatus;
  userAuthLogoutXferStatus: TypeApiXferStatus;
  userState: TypeUserState;
};

export type TypeUserCredentials = {
  email: string;
  password: string;
};

export type TypeUserEntity = {
  type: 'TypeUserEntity';
  id: string;
  userName: string;
  imageUrl?: string;
  dateCreated?: number;
};





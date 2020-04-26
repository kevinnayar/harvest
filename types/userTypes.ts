import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { TypeBaseDispatch, TypeApiXferStatus } from './baseTypes';

export const USER_AUTH_CHECK_REQUESTED = 'USER_AUTH_CHECK_REQUESTED';
export const USER_AUTH_CHECK_SUCCEEDED = 'USER_AUTH_CHECK_SUCCEEDED';
export const USER_AUTH_CHECK_FAILED = 'USER_AUTH_CHECK_FAILED';

export const USER_AUTH_LOGIN_REQUESTED = 'USER_AUTH_LOGIN_REQUESTED';
export const USER_AUTH_LOGIN_SUCCEEDED = 'USER_AUTH_LOGIN_SUCCEEDED';
export const USER_AUTH_LOGIN_FAILED = 'USER_AUTH_LOGIN_FAILED';

export const USER_AUTH_LOGOUT_REQUESTED = 'USER_AUTH_LOGOUT_REQUESTED';
export const USER_AUTH_LOGOUT_SUCCEEDED = 'USER_AUTH_LOGOUT_SUCCEEDED';
export const USER_AUTH_LOGOUT_FAILED = 'USER_AUTH_LOGOUT_FAILED';

export const USER_AUTH_SIGNUP_REQUESTED = 'USER_AUTH_SIGNUP_REQUESTED';
export const USER_AUTH_SIGNUP_SUCCEEDED = 'USER_AUTH_SIGNUP_SUCCEEDED';
export const USER_AUTH_SIGNUP_FAILED = 'USER_AUTH_SIGNUP_FAILED';

export const USER_AUTH_CONFIRM_SIGNUP_REQUESTED = 'USER_AUTH_CONFIRM_SIGNUP_REQUESTED';
export const USER_AUTH_CONFIRM_SIGNUP_SUCCEEDED = 'USER_AUTH_CONFIRM_SIGNUP_SUCCEEDED';
export const USER_AUTH_CONFIRM_SIGNUP_FAILED = 'USER_AUTH_CONFIRM_SIGNUP_FAILED';

export const USER_AUTH_FORGOT_PASSWORD_REQUESTED = 'USER_AUTH_FORGOT_PASSWORD_REQUESTED';
export const USER_AUTH_FORGOT_PASSWORD_SUCCEEDED = 'USER_AUTH_FORGOT_PASSWORD_SUCCEEDED';
export const USER_AUTH_FORGOT_PASSWORD_FAILED = 'USER_AUTH_FORGOT_PASSWORD_FAILED';

export const USER_AUTH_FORGOT_PASSWORD_SUBMIT_REQUESTED = 'USER_AUTH_FORGOT_PASSWORD_SUBMIT_REQUESTED';
export const USER_AUTH_FORGOT_PASSWORD_SUBMIT_SUCCEEDED = 'USER_AUTH_FORGOT_PASSWORD_SUBMIT_SUCCEEDED';
export const USER_AUTH_FORGOT_PASSWORD_SUBMIT_FAILED = 'USER_AUTH_FORGOT_PASSWORD_SUBMIT_FAILED';

interface IUserCheckKeys {
  USER_AUTH_CHECK_REQUESTED: 'USER_AUTH_CHECK_REQUESTED';
  USER_AUTH_CHECK_SUCCEEDED: 'USER_AUTH_CHECK_SUCCEEDED';
  USER_AUTH_CHECK_FAILED: 'USER_AUTH_CHECK_FAILED';
}
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
interface IUserSignupKeys {
  USER_AUTH_SIGNUP_REQUESTED: 'USER_AUTH_SIGNUP_REQUESTED';
  USER_AUTH_SIGNUP_SUCCEEDED: 'USER_AUTH_SIGNUP_SUCCEEDED';
  USER_AUTH_SIGNUP_FAILED: 'USER_AUTH_SIGNUP_FAILED';
}
interface IUserConfirmSignupKeys {
  USER_AUTH_CONFIRM_SIGNUP_REQUESTED: 'USER_AUTH_CONFIRM_SIGNUP_REQUESTED';
  USER_AUTH_CONFIRM_SIGNUP_SUCCEEDED: 'USER_AUTH_CONFIRM_SIGNUP_SUCCEEDED';
  USER_AUTH_CONFIRM_SIGNUP_FAILED: 'USER_AUTH_CONFIRM_SIGNUP_FAILED';
}
interface IUserForgotPasswordKeys {
  USER_AUTH_FORGOT_PASSWORD_REQUESTED: 'USER_AUTH_FORGOT_PASSWORD_REQUESTED';
  USER_AUTH_FORGOT_PASSWORD_SUCCEEDED: 'USER_AUTH_FORGOT_PASSWORD_SUCCEEDED';
  USER_AUTH_FORGOT_PASSWORD_FAILED: 'USER_AUTH_FORGOT_PASSWORD_FAILED';
}
interface IUserForgotPasswordSubmitKeys {
  USER_AUTH_FORGOT_PASSWORD_SUBMIT_REQUESTED: 'USER_AUTH_FORGOT_PASSWORD_SUBMIT_REQUESTED';
  USER_AUTH_FORGOT_PASSWORD_SUBMIT_SUCCEEDED: 'USER_AUTH_FORGOT_PASSWORD_SUBMIT_SUCCEEDED';
  USER_AUTH_FORGOT_PASSWORD_SUBMIT_FAILED: 'USER_AUTH_FORGOT_PASSWORD_SUBMIT_FAILED';
}

export type TypeUserCheckDispatch = TypeBaseDispatch & {
  type: keyof IUserCheckKeys;
};
export type TypeUserLoginDispatch = TypeBaseDispatch & {
  type: keyof IUserLoginKeys;
};
export type TypeUserLogoutDispatch = TypeBaseDispatch & {
  type: keyof IUserLogoutKeys;
};
export type TypeUserSignupDispatch = TypeBaseDispatch & {
  type: keyof IUserSignupKeys;
};
export type TypeUserConfirmSignupDispatch = TypeBaseDispatch & {
  type: keyof IUserConfirmSignupKeys;
};
export type TypeUserForgotPasswordDispatch = TypeBaseDispatch & {
  type: keyof IUserForgotPasswordKeys;
};
export type TypeUserForgotPasswordSubmitDispatch = TypeBaseDispatch & {
  type: keyof IUserForgotPasswordSubmitKeys;
};

export type TypeUserDispatch =
  | TypeUserCheckDispatch
  | TypeUserLoginDispatch
  | TypeUserLogoutDispatch
  | TypeUserSignupDispatch
  | TypeUserConfirmSignupDispatch
  | TypeUserForgotPasswordDispatch
  | TypeUserForgotPasswordSubmitDispatch;

export type TypeUserState = {
  userGuid: null | string;
  email: null | string;
  authenticated: boolean;
  confirmed: boolean;
  cognitoSession: null | CognitoUserSession;
};

export type TypeUserCredentials = {
  email: string;
  password: string;
};

export type TypeUserSignupInfo = TypeUserCredentials & {
  firstName: string;
  lastName: string;
};

export type TypeUserConfirmSignupInfo = {
  username: string;
  code: string;
};

export type TypeUserForgotPasswordSubmit = {
  username: string;
  code: string;
  password: string;
};

export type TypeUserReducer = {
  userAuthCheckXferStatus: TypeApiXferStatus;
  userAuthLoginXferStatus: TypeApiXferStatus;
  userAuthLogoutXferStatus: TypeApiXferStatus;
  userAuthSignupXferStatus: TypeApiXferStatus;
  userAuthConfirmSignupXferStatus: TypeApiXferStatus;
  userAuthForgotPasswordStatus: TypeApiXferStatus;
  userAuthForgotPasswordSubmitStatus: TypeApiXferStatus;
  userState: TypeUserState;
};




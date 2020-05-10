import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import { ISignUpResult, CognitoUser } from 'amazon-cognito-identity-js';
import {
  TypeUserState,
  TypeUserCredentials,
  TypeUserSignupInfo,
  TypeUserConfirmSignupInfo,
  TypeUserForgotPasswordSubmit,
  USER_AUTH_CHECK_REQUESTED,
  USER_AUTH_CHECK_SUCCEEDED,
  USER_AUTH_CHECK_FAILED,
  TypeUserCheckDispatch,
  USER_AUTH_LOGIN_REQUESTED,
  USER_AUTH_LOGIN_SUCCEEDED,
  USER_AUTH_LOGIN_FAILED,
  TypeUserLoginDispatch,
  USER_AUTH_LOGOUT_REQUESTED,
  USER_AUTH_LOGOUT_SUCCEEDED,
  USER_AUTH_LOGOUT_FAILED,
  TypeUserLogoutDispatch,
  USER_AUTH_SIGNUP_REQUESTED,
  USER_AUTH_SIGNUP_SUCCEEDED,
  USER_AUTH_SIGNUP_FAILED,
  TypeUserSignupDispatch,
  USER_AUTH_CONFIRM_SIGNUP_REQUESTED,
  USER_AUTH_CONFIRM_SIGNUP_SUCCEEDED,
  USER_AUTH_CONFIRM_SIGNUP_FAILED,
  TypeUserConfirmSignupDispatch,
  USER_AUTH_FORGOT_PASSWORD_REQUESTED,
  USER_AUTH_FORGOT_PASSWORD_SUCCEEDED,
  USER_AUTH_FORGOT_PASSWORD_FAILED,
  TypeUserForgotPasswordDispatch,
  USER_AUTH_FORGOT_PASSWORD_SUBMIT_REQUESTED,
  USER_AUTH_FORGOT_PASSWORD_SUBMIT_SUCCEEDED,
  USER_AUTH_FORGOT_PASSWORD_SUBMIT_FAILED,
  TypeUserForgotPasswordSubmitDispatch,
} from '../../../types/userTypes';
import config from '../../config';
import { apiResponseHandler } from '../../../utils/apiUtils';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.AWS_REGION,
    userPoolId: config.cognito.AWS_COGNITO_POOL_ID,
    identityPoolId: config.cognito.AWS_COGNITO_IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.AWS_COGNITO_APP_CLIENT_ID,
  },
});

export function userAuthCheck() {
  return async (dispatch: (action: TypeUserCheckDispatch) => void) => {
    dispatch({
      type: USER_AUTH_CHECK_REQUESTED,
    });

    try {
      const cognitoUser: CognitoUser & { attributes: { email: string } } = await Auth.currentAuthenticatedUser().then((user) => user);
      const payload: TypeUserState = {
        userGuid: cognitoUser.getUsername(),
        email: cognitoUser.attributes.email,
        authenticated: true,
        confirmed: true,
        cognitoSession: cognitoUser.getSignInUserSession(),
      };
      dispatch({
        type: USER_AUTH_CHECK_SUCCEEDED,
        payload,
      });
    } catch (error) {
      dispatch({
        type: USER_AUTH_CHECK_FAILED,
        error,
      });
    }
  };
}

export function userAuthLogin(userCredentials: TypeUserCredentials) {
  return async (dispatch: (action: TypeUserLoginDispatch) => void) => {
    dispatch({
      type: USER_AUTH_LOGIN_REQUESTED,
    });

    try {
      const cognitoUser: CognitoUser = await Auth.signIn(userCredentials.email, userCredentials.password);
      const payload: TypeUserState = {
        userGuid: cognitoUser.getUsername(),
        email: userCredentials.email,
        authenticated: true,
        confirmed: true,
        cognitoSession: cognitoUser.getSignInUserSession(),
      };
      dispatch({
        type: USER_AUTH_LOGIN_SUCCEEDED,
        payload,
      });
    } catch (error) {
      dispatch({
        type: USER_AUTH_LOGIN_FAILED,
        error,
      });
    }
  };
}

export function userAuthLogout() {
  return async (dispatch: (action: TypeUserLogoutDispatch) => void) => {
    dispatch({
      type: USER_AUTH_LOGOUT_REQUESTED,
    });

    try {
      await Auth.signOut();
      dispatch({
        type: USER_AUTH_LOGOUT_SUCCEEDED,
      });
    } catch (error) {
      dispatch({
        type: USER_AUTH_LOGOUT_FAILED,
        error,
      });
    }
  };
}

export function userAuthSignup(userSignupInfo: TypeUserSignupInfo) {
  return async (dispatch: (action: TypeUserSignupDispatch) => void) => {
    dispatch({
      type: USER_AUTH_SIGNUP_REQUESTED,
    });

    try {
      // const signupResult: ISignUpResult = await Auth.signUp({
      //   username: userSignupInfo.email,
      //   password: userSignupInfo.password,
      //   attributes: {
      //     given_name: userSignupInfo.firstName,
      //     family_name: userSignupInfo.lastName,
      //   },
      // }).then(data => data);
      // const payload: TypeUserState = {
      //   userGuid: signupResult.userSub,
      //   email: null,
      //   authenticated: false,
      //   confirmed: signupResult.userConfirmed,
      //   cognitoSession: null,
      // };

      // await fetch(`${config.apiUrl}/api/users/${userId}`, {
      //   method: 'post',
      //   headers: new Headers({
      //     Authorization: `Bearer ${jwtToken}`,
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   }),
      // });

      const payload: TypeUserState = await fetch(`${config.apiUrl}/api/users/create`, {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(userSignupInfo),
      })
        .then(apiResponseHandler)
        .then((response) => {
          const userState: TypeUserState = { ...response };
          return userState;
        })
        .catch((error) => {
          throw error;
        });

      dispatch({
        type: USER_AUTH_SIGNUP_SUCCEEDED,
        payload,
      });
    } catch (error) {
      dispatch({
        type: USER_AUTH_SIGNUP_FAILED,
        error,
      });
    }
  };
}

export function userAuthConfirmSignup(userConfirmSignupInfo: TypeUserConfirmSignupInfo) {
  return async (dispatch: (action: TypeUserConfirmSignupDispatch) => void) => {
    dispatch({
      type: USER_AUTH_CONFIRM_SIGNUP_REQUESTED,
    });

    try {
      const { username, code } = userConfirmSignupInfo;
      await Auth.confirmSignUp(username, code);
      dispatch({
        type: USER_AUTH_CONFIRM_SIGNUP_SUCCEEDED,
      });
    } catch (error) {
      dispatch({
        type: USER_AUTH_CONFIRM_SIGNUP_FAILED,
        error,
      });
    }
  };
}

export function userAuthForgotPassword(username: string) {
  return async (dispatch: (action: TypeUserForgotPasswordDispatch) => void) => {
    dispatch({
      type: USER_AUTH_FORGOT_PASSWORD_REQUESTED,
    });

    try {
      await Auth.forgotPassword(username);
      dispatch({
        type: USER_AUTH_FORGOT_PASSWORD_SUCCEEDED,
      });
    } catch (error) {
      dispatch({
        type: USER_AUTH_FORGOT_PASSWORD_FAILED,
        error,
      });
    }
  };
}

export function userAuthForgotPasswordSubmit(userForgotPasswordSubmit: TypeUserForgotPasswordSubmit) {
  return async (dispatch: (action: TypeUserForgotPasswordSubmitDispatch) => void) => {
    dispatch({
      type: USER_AUTH_FORGOT_PASSWORD_SUBMIT_REQUESTED,
    });

    try {
      const { username, code, password } = userForgotPasswordSubmit;
      await Auth.forgotPasswordSubmit(username, code, password);
      dispatch({
        type: USER_AUTH_FORGOT_PASSWORD_SUBMIT_SUCCEEDED,
      });
    } catch (error) {
      dispatch({
        type: USER_AUTH_FORGOT_PASSWORD_SUBMIT_FAILED,
        error,
      });
    }
  };
}
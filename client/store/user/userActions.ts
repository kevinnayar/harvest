import {
  TypeUserCredentials,
  TypeUserState,
  USER_AUTH_LOGIN_REQUESTED,
  USER_AUTH_LOGIN_SUCCEEDED,
  USER_AUTH_LOGIN_FAILED,
  TypeUserLoginDispatch,
  USER_AUTH_LOGOUT_REQUESTED,
  USER_AUTH_LOGOUT_SUCCEEDED,
  USER_AUTH_LOGOUT_FAILED,
  TypeUserLogoutDispatch,
} from '../../../types/userTypes';

export function userAuthLogin(userCredentials: TypeUserCredentials) {
  return async (dispatch: (action: TypeUserLoginDispatch) => void) => {
    dispatch({
      type: USER_AUTH_LOGIN_REQUESTED,
    });

    try {
      console.log(
        `Pretending to use email: ${userCredentials.email} and password: ${userCredentials.password}`,
      );
      const payload: TypeUserState = {
        userGuid: 'user_123456',
        email: userCredentials.email,
        authenticated: true,
        confirmed: true,
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

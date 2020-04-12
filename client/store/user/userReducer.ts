import { apiXferInit, apiXferRequested, apiXferSucceeded, apiXferFailed } from '../../../utils/reduxUtils';
import {
  USER_AUTH_LOGIN_REQUESTED,
  USER_AUTH_LOGIN_SUCCEEDED,
  USER_AUTH_LOGIN_FAILED,
  USER_AUTH_LOGOUT_REQUESTED,
  USER_AUTH_LOGOUT_SUCCEEDED,
  USER_AUTH_LOGOUT_FAILED,
  TypeUserState,
  TypeUserReducer,
  TypeUserDispatch,
} from '../../../types/userTypes';

const unAuthedUserState: TypeUserState = {
  userGuid: null,
  email: null,
  authenticated: false,
  confirmed: false,
};

const initialState: TypeUserReducer = {
  userAuthLoginXferStatus: apiXferInit(),
  userAuthLogoutXferStatus: apiXferInit(),
  userState: unAuthedUserState,
};

export default function authReducer(
  state: TypeUserReducer = initialState,
  action: TypeUserDispatch,
): TypeUserReducer {
  switch (action.type) {
    // USER_AUTH_LOGIN
    case USER_AUTH_LOGIN_REQUESTED: {
      return {
        ...state,
        userAuthLoginXferStatus: apiXferRequested(),
      };
    }
    case USER_AUTH_LOGIN_SUCCEEDED: {
      const { userGuid, email, authenticated, confirmed } = action.payload;
      return {
        ...state,
        userAuthLoginXferStatus: apiXferSucceeded(),
        userState: { userGuid, email, authenticated, confirmed },
      };
    }
    case USER_AUTH_LOGIN_FAILED: {
      return {
        ...state,
        userAuthLoginXferStatus: apiXferFailed(action.error),
        userState: unAuthedUserState,
      };
    }

    // USER_AUTH_LOGOUT
    case USER_AUTH_LOGOUT_REQUESTED: {
      return {
        ...state,
        userAuthLogoutXferStatus: apiXferRequested(),
      };
    }
    case USER_AUTH_LOGOUT_SUCCEEDED: {
      return {
        ...state,
        userAuthLogoutXferStatus: apiXferSucceeded(),
        userState: unAuthedUserState,
      };
    }
    case USER_AUTH_LOGOUT_FAILED: {
      return {
        ...state,
        userAuthLogoutXferStatus: apiXferFailed(action.error),
      };
    }

    // default
    default:
      return state;
  }
}

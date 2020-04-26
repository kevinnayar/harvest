import { apiXferInit, apiXferRequested, apiXferSucceeded, apiXferFailed } from '../../../utils/apiUtils';
import {
  USER_AUTH_CHECK_REQUESTED,
  USER_AUTH_CHECK_SUCCEEDED,
  USER_AUTH_CHECK_FAILED,
  USER_AUTH_LOGIN_REQUESTED,
  USER_AUTH_LOGIN_SUCCEEDED,
  USER_AUTH_LOGIN_FAILED,
  USER_AUTH_LOGOUT_REQUESTED,
  USER_AUTH_LOGOUT_SUCCEEDED,
  USER_AUTH_LOGOUT_FAILED,
  USER_AUTH_SIGNUP_REQUESTED,
  USER_AUTH_SIGNUP_SUCCEEDED,
  USER_AUTH_SIGNUP_FAILED,
  USER_AUTH_CONFIRM_SIGNUP_REQUESTED,
  USER_AUTH_CONFIRM_SIGNUP_SUCCEEDED,
  USER_AUTH_CONFIRM_SIGNUP_FAILED,
  USER_AUTH_FORGOT_PASSWORD_REQUESTED,
  USER_AUTH_FORGOT_PASSWORD_SUCCEEDED,
  USER_AUTH_FORGOT_PASSWORD_FAILED,
  USER_AUTH_FORGOT_PASSWORD_SUBMIT_REQUESTED,
  USER_AUTH_FORGOT_PASSWORD_SUBMIT_SUCCEEDED,
  USER_AUTH_FORGOT_PASSWORD_SUBMIT_FAILED,
  TypeUserState,
  TypeUserReducer,
  TypeUserDispatch,
} from '../../../types/userTypes';

const unAuthedUserState: TypeUserState = {
  userGuid: null,
  email: null,
  authenticated: false,
  confirmed: false,
  cognitoSession: null,
};

const initialState: TypeUserReducer = {
  userAuthCheckXferStatus: apiXferInit(),
  userAuthLoginXferStatus: apiXferInit(),
  userAuthLogoutXferStatus: apiXferInit(),
  userAuthSignupXferStatus: apiXferInit(),
  userAuthConfirmSignupXferStatus: apiXferInit(),
  userAuthForgotPasswordStatus: apiXferInit(),
  userAuthForgotPasswordSubmitStatus: apiXferInit(),
  userState: unAuthedUserState,
};

export default function authReducer(
  state: TypeUserReducer = initialState,
  action: TypeUserDispatch,
): TypeUserReducer {
  switch (action.type) {
    // USER_AUTH_CHECK
    case USER_AUTH_CHECK_REQUESTED: {
      return {
        ...state,
        userAuthCheckXferStatus: apiXferRequested(),
      };
    }
    case USER_AUTH_CHECK_SUCCEEDED: {
      return {
        ...state,
        userAuthCheckXferStatus: apiXferSucceeded(),
        userState: action.payload,
      };
    }
    case USER_AUTH_CHECK_FAILED: {
      return {
        ...state,
        userAuthCheckXferStatus: apiXferFailed(action.error),
        userState: unAuthedUserState,
      };
    }

    // USER_AUTH_LOGIN
    case USER_AUTH_LOGIN_REQUESTED: {
      return {
        ...state,
        userAuthLoginXferStatus: apiXferRequested(),
      };
    }
    case USER_AUTH_LOGIN_SUCCEEDED: {
      return {
        ...state,
        userAuthLoginXferStatus: apiXferSucceeded(),
        userState: action.payload,
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

    // USER_AUTH_SIGNUP
    case USER_AUTH_SIGNUP_REQUESTED: {
      return {
        ...state,
        userAuthSignupXferStatus: apiXferRequested(),
      };
    }
    case USER_AUTH_SIGNUP_SUCCEEDED: {
      return {
        ...state,
        userAuthSignupXferStatus: apiXferSucceeded(),
        userState: action.payload,
      };
    }
    case USER_AUTH_SIGNUP_FAILED: {
      return {
        ...state,
        userAuthSignupXferStatus: apiXferFailed(action.error),
        userState: unAuthedUserState,
      };
    }

    // USER_AUTH_CONFIRM_SIGNUP
    case USER_AUTH_CONFIRM_SIGNUP_REQUESTED: {
      return {
        ...state,
        userAuthConfirmSignupXferStatus: apiXferRequested(),
      };
    }
    case USER_AUTH_CONFIRM_SIGNUP_SUCCEEDED: {
      return {
        ...state,
        userAuthConfirmSignupXferStatus: apiXferSucceeded(),
      };
    }
    case USER_AUTH_CONFIRM_SIGNUP_FAILED: {
      return {
        ...state,
        userAuthConfirmSignupXferStatus: apiXferFailed(action.error),
      };
    }

    // USER_AUTH_FORGOT_PASSWORD
    case USER_AUTH_FORGOT_PASSWORD_REQUESTED: {
      return {
        ...state,
        userAuthForgotPasswordStatus: apiXferRequested(),
      };
    }
    case USER_AUTH_FORGOT_PASSWORD_SUCCEEDED: {
      return {
        ...state,
        userAuthForgotPasswordStatus: apiXferSucceeded(),
      };
    }
    case USER_AUTH_FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        userAuthForgotPasswordStatus: apiXferFailed(action.error),
      };
    }

    // USER_AUTH_FORGOT_PASSWORD_SUBMIT
    case USER_AUTH_FORGOT_PASSWORD_SUBMIT_REQUESTED: {
      return {
        ...state,
        userAuthForgotPasswordSubmitStatus: apiXferRequested(),
      };
    }
    case USER_AUTH_FORGOT_PASSWORD_SUBMIT_SUCCEEDED: {
      return {
        ...state,
        userAuthForgotPasswordSubmitStatus: apiXferSucceeded(),
      };
    }
    case USER_AUTH_FORGOT_PASSWORD_SUBMIT_FAILED: {
      return {
        ...state,
        userAuthForgotPasswordSubmitStatus: apiXferFailed(action.error),
      };
    }

    // default
    default:
      return state;
  }
}

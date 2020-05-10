import { useDispatch, useSelector } from 'react-redux';
import { CognitoUserSession, CognitoAccessToken } from 'amazon-cognito-identity-js';
import { userAuthCheck, userAuthLogin, userAuthLogout } from '../../store/user/userActions';
import { TypeAppReducer, TypeApiXferStatus } from '../../../types/baseTypes';
import { TypeUserCredentials, TypeUserState } from '../../../types/userTypes';

function useAuth() {
  const userState = useSelector<TypeAppReducer, TypeUserState>(state => state.user.userState);

  const cognitoSession = useSelector<TypeAppReducer, null | CognitoUserSession>((state) => state.user.userState.cognitoSession);
  const accessToken: null | CognitoAccessToken = cognitoSession ? cognitoSession.getAccessToken() : null;
  const jwtToken: null | string = accessToken ? accessToken.getJwtToken() : null;
  const userId: null | string = accessToken ? accessToken.payload.username : null;

  const authCheckXferStatus = useSelector<TypeAppReducer, TypeApiXferStatus>((state) => state.user.userAuthCheckXferStatus);
  const authLoginXferStatus = useSelector<TypeAppReducer, TypeApiXferStatus>((state) => state.user.userAuthLoginXferStatus);
  const authLogoutXferStatus = useSelector<TypeAppReducer, TypeApiXferStatus>((state) => state.user.userAuthLogoutXferStatus);

  const dispatch = useDispatch();
  const onAuthCheck = () => dispatch(userAuthCheck());
  const onLogin = (userCredentials: TypeUserCredentials) => dispatch(userAuthLogin(userCredentials));
  const onLogout = () => dispatch(userAuthLogout());

  return {
    userState,
    jwtToken,
    userId,
    authCheckXferStatus,
    authLoginXferStatus,
    authLogoutXferStatus,
    onAuthCheck,
    onLogin,
    onLogout,
  };
}

export default useAuth;

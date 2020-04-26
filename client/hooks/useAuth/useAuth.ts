import { useDispatch, useSelector } from 'react-redux';
import { userAuthCheck, userAuthLogin, userAuthLogout } from '../../store/user/userActions';
import { TypeAppReducer, TypeApiXferStatus } from '../../../types/baseTypes';
import { TypeUserCredentials, TypeUserState } from '../../../types/userTypes';

function useAuth() {
  const userState = useSelector<TypeAppReducer, TypeUserState>(state => state.user.userState);

  const authCheckXferStatus = useSelector<TypeAppReducer, TypeApiXferStatus>((state) => state.user.userAuthCheckXferStatus);
  const authLoginXferStatus = useSelector<TypeAppReducer, TypeApiXferStatus>((state) => state.user.userAuthLoginXferStatus);
  const authLogoutXferStatus = useSelector<TypeAppReducer, TypeApiXferStatus>((state) => state.user.userAuthLogoutXferStatus);

  const dispatch = useDispatch();
  const onAuthCheck = () => dispatch(userAuthCheck());
  const onLogin = (userCredentials: TypeUserCredentials) => dispatch(userAuthLogin(userCredentials));
  const onLogout = () => dispatch(userAuthLogout());

  return {
    userState,
    authCheckXferStatus,
    authLoginXferStatus,
    authLogoutXferStatus,
    onAuthCheck,
    onLogin,
    onLogout,
  };
}

export default useAuth;

import { useDispatch, useSelector } from 'react-redux';

import { userAuthLogin, userAuthLogout } from '../../store/user/userActions';
import { TypeAppReducer } from '../../../types/baseTypes';
import { TypeUserCredentials, TypeUserState } from '../../../types/userTypes';

function useAuth() {
  const userState = useSelector<TypeAppReducer, TypeUserState>(state => state.user.userState);
  const isAuthenticated = useSelector<TypeAppReducer, boolean>(state => state.user.userState.authenticated);
  
  const dispatch = useDispatch();
  const onLogin = (userCredentials: TypeUserCredentials) => dispatch(userAuthLogin(userCredentials));
  const onLogout = () => dispatch(userAuthLogout());

  return {
    userState,
    isAuthenticated,
    redirectPath: '/home',
    onLogin,
    onLogout,
  };
}

export default useAuth;

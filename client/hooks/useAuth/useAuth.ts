import { useDispatch, useSelector } from 'react-redux';

import { userAuthLogin, userAuthLogout } from '../../store/user/userActions';
import { TypeAppReducer } from '../../../types/baseTypes';
import { TypeUserCredentials, TypeUserState } from '../../../types/userTypes';

function useAuth() {
  const dispatch = useDispatch();
  const userState = useSelector<TypeAppReducer, TypeUserState>(state => state.user.userState);
  const isAuthenticated = useSelector<TypeAppReducer, boolean>(state => state.user.userState.authenticated);

  function handleLogin(userCredentials: TypeUserCredentials) {
    dispatch(userAuthLogin(userCredentials));
  }

  function handleLogout() {
    dispatch(userAuthLogout());
  }

  return {
    userState,
    isAuthenticated,
    redirectPath: '/home',
    onLogin: handleLogin,
    onLogout: handleLogout,
  };
}

export default useAuth;

import { useDispatch, useSelector } from 'react-redux';
import { userAuthSignup, userAuthConfirmSignup } from '../../store/user/userActions';
import { TypeAppReducer, TypeApiXferStatus } from '../../../types/baseTypes';
import { TypeUserSignupInfo, TypeUserConfirmSignupInfo, TypeUserState } from '../../../types/userTypes';

function useAuth() {
  const userState = useSelector<TypeAppReducer, TypeUserState>(state => state.user.userState);
  const signupXferStatus = useSelector<TypeAppReducer, TypeApiXferStatus>((state) => state.user.userAuthSignupXferStatus);
  const signupConfirmXferStatus = useSelector<TypeAppReducer, TypeApiXferStatus>((state) => state.user.userAuthConfirmSignupXferStatus);

  const dispatch = useDispatch();
  const onSignup = (userSignupInfo: TypeUserSignupInfo) => dispatch(userAuthSignup(userSignupInfo));
  const onSignupConfirm = (userConfirmSignupInfo: TypeUserConfirmSignupInfo) => dispatch(userAuthConfirmSignup(userConfirmSignupInfo));
  
  return {
    userState,
    signupXferStatus,
    signupConfirmXferStatus,
    onSignup,
    onSignupConfirm,
  };
}

export default useAuth;

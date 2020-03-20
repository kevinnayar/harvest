import * as React from 'react';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router';
import Login from '../../components/Login/Login';
import { userAuthLogin } from '../../store/user/userActions';

import { TypeApiXferStatus, TypeAppReducer } from '../../types/baseTypes';
import { TypeUserState, TypeUserCredentials } from '../../types/userTypes';

type TypeProps = RouteProps & {
  redirectPath: void | string;
  userState: TypeUserState;
  loginStatus: TypeApiXferStatus;
  login: (userCredentials: TypeUserCredentials) => void;
};

function AuthContainer(props: TypeProps) {
  const locationState: { from?: string } = props.location?.state ?? { from: '/home' };
  const redirectPath: string =
    locationState.from === undefined ||
    (locationState.from !== undefined && (locationState.from === '/auth' || locationState.from === '/'))
      ? '/app'
      : locationState.from;

  return (
    <Login
      redirectPath={redirectPath}
      userState={props.userState}
      loginStatus={props.loginStatus}
      login={props.login}
    />
  );
}

function mapStateToProps(state: TypeAppReducer) {
  return {
    loginStatus: state.user.userAuthLoginXferStatus,
    userState: state.user.userState,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    login: (userCredentials: TypeUserCredentials) => {
      dispatch(userAuthLogin(userCredentials));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);

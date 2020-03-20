import * as React from 'react';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router';
import Home from '../../components/Home/Home';
import { userAuthLogout } from '../../store/user/userActions';

import { TypeApiXferStatus, TypeAppReducer } from '../../types/baseTypes';
import { TypeUserState } from '../../types/userTypes';

type TypeProps = RouteProps & {
  redirectPath: void | string;
  userState: TypeUserState;
  logoutStatus: TypeApiXferStatus;
  logout: () => void;
};

function HomeContainer(props: TypeProps) {
  return (
    <Home
      userState={props.userState}
      logoutStatus={props.logoutStatus}
      logout={props.logout}
    />
  );
}

function mapStateToProps(state: TypeAppReducer) {
  return {
    logoutStatus: state.user.userAuthLogoutXferStatus,
    userState: state.user.userState,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    logout: () => {
      dispatch(userAuthLogout());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

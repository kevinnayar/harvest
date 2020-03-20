import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { TypeApiXferStatus } from '../../types/baseTypes';
import { TypeUserState } from '../../types/userTypes';

type TypeLogoutProps = {
  userState: TypeUserState;
  logoutStatus: TypeApiXferStatus;
  logout: () => void;
};

const Logout = React.memo((props: TypeLogoutProps) => {
  if (!props.userState.authenticated) return <Redirect to="/auth" />;

  return (
    <div>
      <h1>Welcome!</h1>
      <h3>You are logged in as:</h3>
      <ul>
        <li>User: {props.userState.userGuid}</li>
        <li>Email: {props.userState.email}</li>
      </ul>
      <button onClick={props.logout}>Logout</button>
    </div>
  );
});

export default Logout;

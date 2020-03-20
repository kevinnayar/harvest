import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { TypeApiXferStatus } from '../../types/baseTypes';
import { TypeUserState, TypeUserCredentials } from '../../types/userTypes';

type TypeLoginProps = {
  userState: TypeUserState;
  redirectPath: string;
  loginStatus: TypeApiXferStatus;
  login: (userCredentials: TypeUserCredentials) => void;
};

const Login = React.memo((props: TypeLoginProps) => {
  if (props.userState.authenticated) return <Redirect to={props.redirectPath} />;

  const credentials: TypeUserCredentials = {
    email: 'test@test.com',
    password: 'Passw0rd!',
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={e => props.login(credentials)}>Login</button>
    </div>
  );
});

export default Login;

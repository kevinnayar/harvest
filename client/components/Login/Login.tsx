import * as React from 'react';
import { Redirect } from 'react-router-dom';

import useRedirectPath from '../../hooks/useRedirectPath/useRedirectPath';
import useAuth from '../../hooks/useAuth/useAuth';

const Login = () => {
  const redirectPath = useRedirectPath();
  const { onLogin, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect to={redirectPath} />;
  }

  const credentials = {
    email: 'test@test.com',
    password: 'Passw0rd!',
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={(e) => onLogin(credentials)}>Login</button>
    </div>
  );
};

export default Login;

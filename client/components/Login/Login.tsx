import * as React from 'react';
import { Redirect } from 'react-router-dom';

import useRedirectPath from '../../hooks/useRedirectPath/useRedirectPath';
import useAuth from '../../hooks/useAuth/useAuth';

const Login = () => {
  const redirectPath = useRedirectPath();
  const { isAuthenticated, onLogin } = useAuth();

  if (isAuthenticated) return <Redirect to={redirectPath} />;

  return (
    <div>
      <h1>Welcome!</h1>
      <button type="button" onClick={(_e) => onLogin({ email: 'test@test.com', password: 'Passw0rd!' })}>Login</button>
    </div>
  );
};

export default Login;

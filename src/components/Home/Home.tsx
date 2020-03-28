import * as React from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth/useAuth';

const Home = () => {
  const { isAuthenticated, onLogout, userState } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/auth" />;
  }

  return (
    <div>
      <h1>Welcome!</h1>
      <h3>You are logged in as:</h3>
      <ul>
        <li>User: {userState.userGuid}</li>
        <li>Email: {userState.email}</li>
      </ul>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Home;

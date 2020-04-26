import * as React from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth/useAuth';
import { CognitoUserSession, CognitoAccessToken } from 'amazon-cognito-identity-js';
import config from '../../config';

async function testApi(session: CognitoUserSession) {
  const accessToken: CognitoAccessToken = session.getAccessToken();
  const jwtToken: string = accessToken.getJwtToken();
  const userId: string = accessToken.payload.username;
  console.log({jwtToken, userId});

  await fetch(`${config.apiUrl}/api/users/${userId}`, {
    method: 'post',
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  });

  return undefined;
}

const Home = () => {
  const { onLogout, userState } = useAuth();

  if (!userState.authenticated) return <Redirect to="/auth" />;

  return (
    <div>
      <h1>Welcome!</h1>
      <h3>You are logged in as:</h3>
      <ul>
        <li>User: {userState.userGuid}</li>
        <li>Email: {userState.email}</li>
      </ul>
      <button type="button" onClick={onLogout}>Logout</button>
      <button type="button" onClick={(_e) => testApi(userState.cognitoSession)}>Test API</button>
    </div>
  );
};

export default Home;

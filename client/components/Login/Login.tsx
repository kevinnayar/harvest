import * as React from 'react';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import useRedirectPath from '../../hooks/useRedirectPath/useRedirectPath';
import useAuth from '../../hooks/useAuth/useAuth';

import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { Block, BlockProps } from 'baseui/block';
import { Notification, KIND } from 'baseui/notification';
import { $StyleProp } from 'styletron-react';

import { TypeApiXferStatus } from '../../../types/baseTypes';
import { TypeUserCredentials } from '../../../types/userTypes';

const LoginForm = (props: {
  email: string;
  password: string;
  authLoginXferStatus: TypeApiXferStatus;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  onLogin: (userCredentials: TypeUserCredentials) => void;
}) => {
  const centerStyle: $StyleProp<BlockProps> = { textAlign: 'center' };
  const marginStyle: $StyleProp<BlockProps> = { marginBottom: '30px' };

  return (
    <form>
      <Block $style={{ ...marginStyle }}>
        <FormControl label={() => 'Email'}>
          <Input
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              props.setEmail(target.value);
            }}
          />
        </FormControl>
        <FormControl label={() => 'Password'}>
          <Input
            type="password"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              props.setPassword(target.value);
            }}
          />
        </FormControl>
        <Block $style={{ ...centerStyle, ...marginStyle }}>
          <Button
            disabled={!props.email || !props.password}
            type="button"
            isLoading={props.authLoginXferStatus.requested}
            onClick={(_e) => props.onLogin({ email: props.email, password: props.password })}
          >
            Login
          </Button>
        </Block>
      </Block>
    </form>
  );
};

const LoginError = (props: { error: string }) => (
  <Notification
    kind={KIND.negative}
    overrides={{
      Body: {
        style: () => {
          return {
            margin: '0 auto',
          };
        },
      },
      InnerContainer: {
        style: () => {
          return {
            margin: '0 auto',
          };
        },
      },
    }}
  >
    {() => props.error}
  </Notification>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirectPath = useRedirectPath();
  const { userState, authLoginXferStatus, onAuthCheck, onLogin } = useAuth();

  useEffect(() => {
    if (!userState.authenticated) {
      onAuthCheck();
    }
  }, [userState]);

  if (userState.authenticated) return <Redirect to={redirectPath} />;

  return (
    <Block width="100%" maxWidth="760px">
      <LoginForm
        email={email}
        password={password}
        authLoginXferStatus={authLoginXferStatus}
        setEmail={setEmail}
        setPassword={setPassword}
        onLogin={onLogin}
      />
      {authLoginXferStatus.failed && <LoginError error={authLoginXferStatus.error} />}
    </Block>
  );
};

export default Login;

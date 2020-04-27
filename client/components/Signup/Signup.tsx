import * as React from 'react';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import useRedirectPath from '../../hooks/useRedirectPath/useRedirectPath';
import useSignup from '../../hooks/useSignup/useSignup';

import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Paragraph2 } from 'baseui/typography';
import { Button } from 'baseui/button';
import { Block, BlockProps } from 'baseui/block';
import { Notification, KIND } from 'baseui/notification';
import { $StyleProp } from 'styletron-react';

import { TypeUserSignupInfo, TypeUserConfirmSignupInfo } from '../../../types/userTypes';

const SignupConfirmForm = (props: {
  isLoading: boolean;
  email: string;
  code: string;
  setCode: (value: string) => void;
  onSignupConfirm: (userConfirmSignupInfo: TypeUserConfirmSignupInfo) => void;
}) => {
  const centerStyle: $StyleProp<BlockProps> = { textAlign: 'center' };
  const marginStyle: $StyleProp<BlockProps> = { marginBottom: '30px' };

  return (
    <form>
      <Block $style={{ ...marginStyle }}>
        <Paragraph2 $style={{ ...centerStyle }}>
          We've sent you an email at {props.email}.
        </Paragraph2>
        <Paragraph2 $style={{ ...centerStyle, ...marginStyle }}>
          Check your email and enter the confirmation code below.
        </Paragraph2>
        <FormControl label={() => 'Code'}>
          <Input
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              props.setCode(target.value);
            }}
          />
        </FormControl>
        <Block $style={{ ...centerStyle, ...marginStyle }}>
          <Button
            disabled={!props.code}
            type="button"
            isLoading={props.isLoading}
            onClick={(_e) => props.onSignupConfirm({ username: props.email, code: props.code })}
          >
            Confirm
          </Button>
        </Block>
      </Block>
    </form>
  );
};

const SignupForm = (props: {
  isLoading: boolean;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  onSignup: (userSignupInfo: TypeUserSignupInfo) => void;
}) => {
  const centerStyle: $StyleProp<BlockProps> = { textAlign: 'center' };
  const marginStyle: $StyleProp<BlockProps> = { marginBottom: '30px' };
  const { email, password, firstName, lastName } = props;

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
        <FormControl label={() => 'First Name'}>
          <Input
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              props.setFirstName(target.value);
            }}
          />
        </FormControl>
        <FormControl label={() => 'Last Name'}>
          <Input
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              props.setLastName(target.value);
            }}
          />
        </FormControl>
        <Block $style={{ ...centerStyle, ...marginStyle }}>
          <Button
            disabled={!props.email || !props.password || !props.firstName || !lastName}
            type="button"
            isLoading={props.isLoading}
            onClick={(_e) => props.onSignup({ email, password, firstName, lastName })}
          >
            Signup
          </Button>
        </Block>
      </Block>
    </form>
  );
};

const SignupError = (props: { error: string }) => (
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

type ViewState = 'SIGNUP' | 'CONFIRM';

const Signup = () => {
  const [view, setView] = useState<ViewState>('SIGNUP');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [code, setCode] = useState('');

  const redirectPath = useRedirectPath();
  const { userState, onSignup, signupXferStatus, onSignupConfirm, signupConfirmXferStatus } = useSignup();

  if (userState.authenticated) return <Redirect to={redirectPath} />;

  useEffect(() => { if (signupXferStatus.succeeded) setView('CONFIRM'); }, [signupXferStatus]);

  return (
    <Block width="100%" maxWidth="760px">
      {view === 'SIGNUP' && (
        <Block>
          <SignupForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            firstName={firstName}
            setFirstName={setFirstName}
            setLastName={setLastName}
            lastName={lastName}
            isLoading={signupXferStatus.requested}
            onSignup={onSignup}
          />
          {signupXferStatus.failed && <SignupError error={signupXferStatus.error} />}
        </Block>
      )}
      {view === 'CONFIRM' && (
        <Block>
          <SignupConfirmForm
            isLoading={signupConfirmXferStatus.requested}
            email={email}
            code={code}
            setCode={setCode}
            onSignupConfirm={onSignupConfirm}
          />
          {signupConfirmXferStatus.failed && <SignupError error={signupConfirmXferStatus.error} />}
        </Block>
      )}
    </Block>
  );
};

export default Signup;

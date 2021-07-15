import { useMutation } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Message, Icon, Input } from 'semantic-ui-react';
import { UserContext } from '../../context/userContext/UserProvider';
import { RESEND } from '../../graphql';
import useVerify from '../../utils/hooks/verify';

const Verification = () => {
  const { user } = useContext(UserContext);
  const [disabled, setDisabled] = useState(true);
  const [code, setCode] = useState('');
  const [verify, { loading: verifyLoading, data: verifyData }] = useVerify();

  const [resend, { loading: resendLoading, data: resendData }] = useMutation(
    RESEND,
    {
      onCompleted: (data) => console.log(data),
      onError: (error) => console.log(error),
    }
  );

  useEffect(() => {
    if (!user.emailVerified) setDisabled(false);
  }, []);

  return (
    <div className="verification">
      <h2>
        Welcome to Project<i className="accent">Art</i>
      </h2>
      <p className="verification__extra">
        One more step to go <span className="accent">{user.username}</span>!
      </p>
      <p>Please enter your code</p>

      <div>
        <Input
          className="verification__input themeForm"
          maxLength="4"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <Button.Group className="verification__btnGroup">
        <Button
          disabled={disabled || verifyLoading}
          color="orange"
          basic
          onClick={() =>
            verify({
              variables: {
                code: code.toString(),
              },
            })
          }
          animated="fade"
          loading={verifyLoading}
          className="verification__btnGroup__verify"
        >
          <Button.Content visible>verify?</Button.Content>
          <Button.Content hidden>verify!</Button.Content>
        </Button>

        <Button
          disabled={disabled || verifyLoading}
          color="red"
          basic
          onClick={() => resend()}
          animated="fade"
          loading={resendLoading}
        >
          <Button.Content visible>resend?</Button.Content>
          <Button.Content hidden>resend!</Button.Content>
        </Button>
      </Button.Group>

      {verifyLoading && (
        <Message icon>
          <Icon name="circle notched" loading />
          <Message.Content>
            <Message.Header>Just a sec</Message.Header>
            Verifying your account
          </Message.Content>
        </Message>
      )}
      {verifyData && (
        <Message positive icon>
          <Icon name="check" />
          <Message.Content>
            <Message.Header>All done</Message.Header>
            Account verified!
          </Message.Content>
        </Message>
      )}
      {resendLoading && (
        <Message positive icon>
          <Icon name="circle notched" loading />
          <Message.Content>
            <Message.Header>Just a sec</Message.Header>
            Resending code
          </Message.Content>
        </Message>
      )}
      {resendData && !verifyData && (
        <Message positive icon>
          <Icon name="check" />
          <Message.Content>
            <Message.Header>All done</Message.Header>
            Code on its way!
          </Message.Content>
        </Message>
      )}
    </div>
  );
};

export default Verification;

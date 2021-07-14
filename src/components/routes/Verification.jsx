import React, { useContext, useEffect, useState } from 'react';
import { Button, Message, Icon } from 'semantic-ui-react';
import { UserContext } from '../../context/userContext/UserProvider';
import useVerify from '../../utils/hooks/verify';

const Verification = () => {
  const { user } = useContext(UserContext);
  const [disabled, setDisabled] = useState(true);
  const [verify, { loading, data }] = useVerify();

  useEffect(() => {
    if (!user.emailVerified) setDisabled(false);
  }, []);

  return (
    <div className="verification">
      <h2>
        Welcome to Project<i className="accent">Art</i>!
      </h2>
      <p className="verification__extra">
        One more step to go <span className="accent">{user.username}</span>
      </p>

      <Button
        disabled={disabled || loading}
        color="orange"
        onClick={() => verify()}
        animated="fade"
        className="verification__btn"
      >
        <Button.Content visible>verify?</Button.Content>
        <Button.Content hidden>verify!</Button.Content>
      </Button>

      {loading && (
        <Message icon>
          <Icon name="circle notched" loading />
          <Message.Content>
            <Message.Header>Just a sec</Message.Header>
            Verifying your account
          </Message.Content>
        </Message>
      )}
      {data && (
        <Message positive icon>
          <Icon name="check" />
          <Message.Content>
            <Message.Header>All done</Message.Header>
            Account verified!
          </Message.Content>
        </Message>
      )}
    </div>
  );
};

export default Verification;

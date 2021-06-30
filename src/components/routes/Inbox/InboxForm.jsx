import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { Form, Icon, Button } from 'semantic-ui-react';
import { InboxContext } from '../../../context/InboxProvider';
import { SEND_MESSAGE } from '../../../graphql';

const InboxForm = () => {
  const { selectedUser } = useContext(InboxContext);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const [sendMessage, { data, error }] = useMutation(SEND_MESSAGE, {
    variables: {
      toUserID: selectedUser,
      content: message,
    },
    onCompleted: () => {
      console.log(data);
    },
    onError: () => {
      console.log(error);
    },
  });

  const handleSubmit = () => {
    sendMessage();
  };

  return (
    <div className="inboxComponent__chat__inboxForm">
      <Form size="large" onSubmit={handleSubmit} noValidate>
        {/* <Segment stacked> */}
        <Form.Input
          fluid
          placeholder="username"
          type="text"
          error={errors.username || errors.usernameInUse}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setErrors({});
          }}
        >
          <input className="inboxComponent__chat__inboxForm__input" />
          <Button type="button" onClick={() => {}}>
            <Icon name="paper plane" style={{ margin: 0 }} />
          </Button>
        </Form.Input>

        {/* </Segment> */}
      </Form>
    </div>
  );
};

export default InboxForm;

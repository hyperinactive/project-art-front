import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { Form, Icon, Button } from 'semantic-ui-react';
import { InboxContext } from '../../../context/InboxProvider';
import { SEND_MESSAGE } from '../../../graphql';

const InboxForm = () => {
  const { selectedUser } = useContext(InboxContext);

  const [message, setMessage] = useState({
    content: '',
    length: 0,
  });

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    variables: {
      toUserID: selectedUser,
      content: message,
    },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.length > 128 || message.content.trim() === '') return;

    sendMessage();
    setMessage({
      content: '',
      length: 0,
    });
  };

  return (
    <div className="inboxComponent__chat__inboxForm">
      <Form size="large" onSubmit={handleSubmit} noValidate>
        {/* <Segment stacked> */}
        <Form.Input
          className="themeForm"
          fluid
          placeholder="send a message"
          type="text"
          value={message.content}
          onChange={(e) => {
            setMessage({
              content: e.target.value,
              length: e.target.value.length,
            });
          }}
        >
          <input className="inboxComponent__chat__inboxForm__input" />
          <p
            className={`inboxComponent__chat__inboxForm__messageLength ${
              message.length > 128 ? 'error' : ''
            }`}
          >{`${message.length}/128`}</p>

          <Button type="submit" color="orange">
            <Icon name="paper plane" style={{ margin: 0 }} />
          </Button>
        </Form.Input>

        {/* </Segment> */}
      </Form>
    </div>
  );
};

export default InboxForm;

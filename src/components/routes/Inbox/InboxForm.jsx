/* eslint-disable no-param-reassign */
import React, { useContext, useState } from 'react';
import { Form, Icon, Button } from 'semantic-ui-react';

import { InboxContext } from '../../../context/inboxContext/InboxProvider';
import useSendMessage from '../../../utils/hooks/sendMessage';

const InboxForm = () => {
  const { selectedUser } = useContext(InboxContext);

  // TODO: have the custom hook manage the state as well
  // does that make sense?
  const [message, setMessage] = useState({
    content: '',
    length: 0,
  });

  const [sendMessage] = useSendMessage(selectedUser, message);

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

import React, { useState } from 'react';
import { Form, Button, Transition } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import useCreateComment from '../../../utils/hooks/createComment';

const CommentForm = ({ postID }) => {
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});
  const [submitComment] = useCreateComment(postID, comment, setErrors);

  return (
    <div className="commentForm" style={{ marginTop: 30, textAlign: 'center' }}>
      <Transition.Group>
        <Form
          reply
          noValidate
          onSubmit={() => {
            submitComment();
            setComment('');
          }}
        >
          <Form.Field>
            <Form.Input
              placeholder="tell me what you think"
              value={comment}
              error={errors.body || errors.bodyLength}
              onChange={(e) => {
                setComment(e.target.value);
                setErrors({});
              }}
            />
            <Button
              content="Add Reply"
              labelPosition="right"
              icon="edit"
              color="orange"
              type="submit"
              fluid
            />
          </Form.Field>
        </Form>
      </Transition.Group>
    </div>
  );
};

CommentForm.propTypes = {
  postID: PropTypes.string.isRequired,
};

export default CommentForm;

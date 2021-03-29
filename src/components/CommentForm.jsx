import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { cloneDeep } from 'lodash';
import { Form, Button, Transition } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { CREATE_COMMENT, GET_COMMENTS } from '../graphql';

const CommentForm = ({ postID }) => {
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});
  const [submitComment] = useMutation(CREATE_COMMENT, {
    variables: {
      postID,
      body: comment,
    },
    update: (cache, result) => {
      const cacheData = cache.readQuery({
        query: GET_COMMENTS,
        variables: {
          postID,
        },
      });

      const cacheDataClone = cloneDeep(cacheData);

      cacheDataClone.getComments = [
        ...cacheData.getComments,
        result.data.createComment,
      ];

      cache.writeQuery({
        query: GET_COMMENTS,
        variables: {
          postID,
        },
        data: {
          getComments: cacheDataClone.getComments,
        },
      });
    },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });
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

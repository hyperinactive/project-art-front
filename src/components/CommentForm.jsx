import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { cloneDeep } from 'lodash';
import { Form, Button, Transition } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { CREATE_COMMENT, GET_POST } from '../graphql';

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
        query: GET_POST,
        variables: {
          postID,
        },
      });

      const cacheDataClone = cloneDeep(cacheData);

      cacheDataClone.getPost = [
        ...cacheData.getPost.comments,
        result.data.createPost,
      ];

      cache.writeQuery({
        query: GET_POST,
        variables: {
          postID,
        },
        data: {
          getPost: cacheDataClone,
        },
      });
    },
    onError: (err) => {
      console.log(err.graphQLErrors[0]);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });
  return (
    <div className="commentForm">
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
              // TODO: set up the error handlers for comments
              // TODO: actually, the whole error thingy needs a retouch
            />
            <Button
              content="Add Reply"
              labelPosition="right"
              icon="edit"
              color="orange"
              type="submit"
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

import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

import { gql, useMutation } from '@apollo/client';

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      username
      createdAt
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;

const PostForm = () => {
  const [body, setBody] = useState('');

  // we've been using the server errors and translated them into client ones, but here we'll just use the client
  // eslint-disable-next-line no-unused-vars
  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: {
      body,
    },
    update: (_, result) => {
      console.log(result);
      setBody('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
  };

  return (
    <div className="postForm">
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <Form.Input
            placeholder="tell me smth new"
            name="body"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
          <Button type="submit" color="orange">
            Submit
          </Button>
        </Form.Field>
      </Form>
    </div>
  );
};

export default PostForm;

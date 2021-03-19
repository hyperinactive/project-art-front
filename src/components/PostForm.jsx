import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { cloneDeep } from 'lodash';
import { useMutation } from '@apollo/client';

import { CREATE_POST, GET_POSTS } from '../graphql';

const PostForm = () => {
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});

  // we've been using the server errors and translated them into client ones, but here we'll just use the client
  // eslint-disable-next-line no-unused-vars
  const [createPost] = useMutation(CREATE_POST, {
    variables: {
      body,
    },
    // we're gonna ask proxy to look for our items in the apollo client
    update: (cache, result) => {
      // the result of the CREATE_POST will go into result
      // gql returns an obj with data: { createPosts: { <our data> } }
      // so our response is in result.data.getPosts

      // take a look in the cache via proxy.readQuery
      // provide it with a query
      const cacheData = cache.readQuery({
        query: GET_POSTS,
      });

      // getPosts is read-only...
      // so we need a copy of the obj <- mutating the cache IS NOT CONSIDERED A GOOD PRACTICE
      const cacheDataClone = cloneDeep(cacheData);
      cacheDataClone.getPosts = [
        result.data.createPost,
        ...cacheDataClone.getPosts,
      ];

      // we're updating cacheData with new posts

      // write new data into the cache
      cache.writeQuery({
        query: GET_POSTS,
        data: cacheDataClone,
      });
      setBody('');
    },
    onError: (err) => {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
  };

  return (
    <div className="postForm" style={{ textAlign: 'center' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <Form.Input
            placeholder="tell me smth new"
            name="body"
            value={body}
            type="text"
            error={errors.body}
            onChange={(e) => {
              setBody(e.target.value);
              setErrors({});
            }}
          />
          <Button type="submit" color="orange">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {Object.keys(errors).length > 0 && (
        <Message
          error
          header="Errors with the submission"
          list={Object.values(errors).map((value) => (
            <li key={value}>{value}</li>
          ))}
        />
      )}
    </div>
  );
};

export default PostForm;

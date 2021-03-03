import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { cloneDeep } from 'lodash';

import { useMutation } from '@apollo/client';

import { CREATE_POST, GET_POSTS_QUERY } from '../graphql';

const PostForm = () => {
  const [body, setBody] = useState('');

  // we've been using the server errors and translated them into client ones, but here we'll just use the client
  // eslint-disable-next-line no-unused-vars
  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: {
      body,
    },
    // we're gonna ask proxy to look for our items in the apollo client
    update: (proxy, result) => {
      // the result of the CREATE_POST will go into result
      // gql returns an obj with data: { createPosts: { <our data> } }
      // so our response is in result.data.getPosts

      // take a look in the cache via proxy.readQuery
      // provide it with a query
      const cacheData = proxy.readQuery({
        query: GET_POSTS_QUERY,
      });

      // getPosts is read-only...
      // so we need a copy of the obj <- mutating the cache IS NOT CONSIDERED A GOOD PRACTICE
      const cacheDataClone = cloneDeep(cacheData);
      cacheDataClone.getPosts = [
        ...cacheDataClone.getPosts,
        result.data.createPost,
      ];

      // we're updating cacheData with new posts

      // write new data into the cache
      proxy.writeQuery({
        query: GET_POSTS_QUERY,
        data: cacheDataClone,
      });
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

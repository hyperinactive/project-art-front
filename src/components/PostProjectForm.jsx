import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
// import { cloneDeep } from 'lodash';
import { useMutation } from '@apollo/client';
import PropType from 'prop-types';

import { CREATE_PROJECT_POST, GET_PROJECT } from '../graphql';

const PostProjectForm = ({ project }) => {
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});

  const [createPost] = useMutation(CREATE_PROJECT_POST, {
    variables: {
      projectID: project.id,
      body,
    },
    update: (cache, result) => {
      const cacheData = cache.readQuery({
        query: GET_PROJECT,
        variables: {
          projectID: project.id,
        },
      });

      console.log(result);
      console.log(cacheData);
      // const cacheDataClone = cloneDeep(cacheData);
      // cacheDataClone.getPosts = [
      //   result.data.createProjectPost,
      //   ...cacheDataClone.getProject.posts,
      // ];

      // cache.writeQuery({
      //   query: GET_PROJECT,
      //   data: cacheDataClone,
      // });
      setBody('');
    },
    onError: (err) => {
      console.log(err);
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    onCompleted: (data) => {
      console.log(data);
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

PostProjectForm.propTypes = {
  project: PropType.shape({
    id: PropType.string.isRequired,
    name: PropType.string.isRequired,
    description: PropType.string.isRequired,
  }).isRequired,
};

export default PostProjectForm;

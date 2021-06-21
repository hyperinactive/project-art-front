/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import { Button, Form, Message, Image } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { useDropzone } from 'react-dropzone';
import PropType from 'prop-types';

import { cloneDeep } from '@apollo/client/utilities';
import { CREATE_PROJECT_POST, GET_POSTS_FEED } from '../../../../../graphql';

const PostProjectForm = ({ project }) => {
  // STATES
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});
  // NOTE: honestly it could've just been a single state but whatev, this readable af
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  // ----------------------------------------------------------------------------------------

  // DROPZONE
  // useCallback will return a memoized version of the callback that only changes if one of the inputs has changed
  // createObjectURL will create a temp url we can use to preview the image
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const url = URL.createObjectURL(file);

    setPreviewImage(url);
    setImageFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  // ----------------------------------------------------------------------------------------

  const [createPost] = useMutation(CREATE_PROJECT_POST, {
    update: (cache, { data: { createProjectPost } }) => {
      // const cacheData = cache.readQuery({
      //   query: GET_POSTS_FEED,

      //   variables: {
      //     projectID: project.id,
      //   },
      // });

      // const cacheDataClone = cloneDeep(cacheData);
      // cacheDataClone.getPostsFeed.posts = [
      //   ...cacheDataClone.getPostsFeed.posts,
      //   createProjectPost,
      // ];

      // cache.writeQuery({
      //   query: GET_POSTS_FEED,
      //   variables: {
      //     projectID: project.id,
      //   },
      //   data: cacheDataClone.getPostsFeed.posts,
      // });
      cache.modify({
        fields: {
          getPostsFeed: (previous) => {
            const previousClone = cloneDeep(previous);
            // cannot apppend new posts to a null, so check for it
            if (previousClone.posts === null) {
              previousClone.posts = [];
            }
            previousClone.posts = [...previousClone.posts, createProjectPost];
            console.log(previousClone);
            return previousClone;
          },
        },
      });
    },
    onError: (err) => {
      console.log({ err });
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    onCompleted: () => {
      setBody('');
      setImageFile(null);
      setPreviewImage(null);
    },
  });

  // ----------------------------------------------------------------------------------------

  const handleSubmit = () => {
    createPost({
      variables: {
        projectID: project.id,
        body,
        image: imageFile,
      },
    });
    setBody('');
    setPreviewImage(null);
    setImageFile(null);
  };

  return (
    <div className="postForm" style={{ textAlign: 'center' }}>
      <>
        <div
          style={{
            padding: 50,
            background: '#ededed',
            marginBottom: 15,
          }}
          {...getRootProps()}
          className={`dropzone ${isDragActive && 'isActive'}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : previewImage ? (
            <Image centered src={previewImage} style={{ width: 300 }} />
          ) : (
            <p>Drag an image here or click me!</p>
          )}
        </div>
        {Object.keys(errors).includes('allowedType') && (
          <Message negative>
            <p>File type not allowed</p>
          </Message>
        )}
      </>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
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

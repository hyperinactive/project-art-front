import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import PropType from 'prop-types';

import { cloneDeep } from '@apollo/client/utilities';
import { CREATE_PROJECT_POST } from '../../../../../graphql';
import ImageController from '../../../../shared/ImageController';

const PostFormModal = ({ project }) => {
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

  // ----------------------------------------------------------------------------------------

  const [createPost] = useMutation(CREATE_PROJECT_POST, {
    update: (cache, { data: { createProjectPost } }) => {
      cache.modify({
        fields: {
          getPostsFeed: (previous) => {
            const previousClone = cloneDeep(previous);
            // cannot apppend new posts to a null, so check for it
            if (previousClone.posts === null) {
              previousClone.posts = [];
            }
            previousClone.posts = [...previousClone.posts, createProjectPost];
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
    <div className="project__postForm" style={{ textAlign: 'center' }}>
      <div className="project__postForm__controller">
        <ImageController
          errors={errors}
          previewImage={previewImage}
          setImageFile={setImageFile}
          setPreviewImage={setPreviewImage}
        />
      </div>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Form.Field>
          <Form.Input
            className="themeForm"
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

PostFormModal.propTypes = {
  project: PropType.shape({
    id: PropType.string.isRequired,
    name: PropType.string.isRequired,
    description: PropType.string.isRequired,
  }).isRequired,
};

export default PostFormModal;

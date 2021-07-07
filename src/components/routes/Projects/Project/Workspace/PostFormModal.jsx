/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, Form, Icon, Modal } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import PropType from 'prop-types';
import { cloneDeep } from '@apollo/client/utilities';

import { CREATE_PROJECT_POST } from '../../../../../graphql';
import ImageController from '../../../../shared/ImageController';

const PostFormModal = ({ project }) => {
  // STATES
  // const [body, setBody] = useState('');
  // const [errors, setErrors] = useState({});
  // // NOTE: honestly it could've just been a single state but whatev, this readable af
  // const [previewImage, setPreviewImage] = useState(null);
  // const [imageFile, setImageFile] = useState(null);
  const [state, setState] = useState({
    open: false,
    body: '',
    errors: {},
    previewImage: null,
    imageFile: null,
  });

  // quick and dirty, I'm  very tired
  const previewDispatch = (data) => {
    console.log('did the thing - preview');
    setState({
      ...state,
      previewImage: data,
    });
  };

  const imageDispatch = (data) => {
    console.log('did the thing - image');
    setState({
      ...state,
      imageFile: data,
    });
  };
  // ----------------------------------------------------------------------------------------

  // DROPZONE
  // useCallback will return a memoized version of the callback that only changes if one of the inputs has changed
  // createObjectURL will create a temp url we can use to preview the image

  // ----------------------------------------------------------------------------------------

  const [createPost] = useMutation(CREATE_PROJECT_POST, {
    update: (cache, { data: { createProjectPost } }) => {
      cache.modify({
        fields: {
          getFeed: (previous) => {
            const previousClone = cloneDeep(previous);
            // cannot apppend new posts to a null, so check for it
            if (previousClone.posts === null) {
              previousClone.posts = [];
            }
            previousClone.posts = [
              ...previousClone.posts,
              ...createProjectPost,
            ];
            return previousClone;
          },
        },
      });
    },
    onError: (err) => {
      console.log({ err });
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
      setState({
        ...state,
        errors: err.graphQLErrors[0].extensions.exception.errors,
      });
    },
    onCompleted: () => {
      setState({
        ...state,
        body: '',
        imageFile: null,
        previewImage: null,
      });
      // setBody('');
      // setImageFile(null);
      // setPreviewImage(null);
    },
  });

  // ----------------------------------------------------------------------------------------

  const handleSubmit = () => {
    createPost({
      variables: {
        projectID: project.id,
        body: state.body,
        image: state.imageFile,
      },
    });
    setState({
      ...state,
      body: '',
      previewImage: null,
      imageFile: null,
    });
    // setBody('');
    // setPreviewImage(null);
    // setImageFile(null);
  };

  return (
    <div className="postFromModal">
      <Modal
        dimmer="blurring"
        onClose={() =>
          setState({
            ...state,
            open: false,
          })
        }
        onOpen={() =>
          setState({
            ...state,
            open: true,
          })
        }
        open={state.open}
        trigger={
          <Button circular color="orange" style={{ margin: 0 }}>
            <Icon name="paper plane" style={{ margin: 0, padding: 0 }} />
          </Button>
        }
      >
        <Modal.Header>Share your thoughts!</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div
              className="postFromModal__description"
              style={{ textAlign: 'center' }}
            >
              <div className="project__postForm__controller">
                <ImageController
                  errors={state.errors}
                  previewImage={state.previewImage}
                  setImageFile={imageDispatch}
                  setPreviewImage={previewDispatch}
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
                    value={state.body}
                    type="text"
                    error={state.errors.body}
                    onChange={(e) => {
                      setState({
                        ...state,
                        body: e.target.value,
                        errors: {},
                      });
                      // setBody(e.target.value);
                      // setErrors({});
                    }}
                  />
                  <Button type="submit" color="orange">
                    Submit
                  </Button>
                </Form.Field>
              </Form>
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() =>
              setState({
                ...state,
                open: false,
              })
            }
          >
            Cancel
          </Button>
          <Button
            onClick={() =>
              setState({
                ...state,
                open: false,
              })
            }
            positive
          >
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );

  // return (
  // <div className="project__postForm" style={{ textAlign: 'center' }}>
  //   <div className="project__postForm__controller">
  //     <ImageController
  //       errors={state.errors}
  //       previewImage={state.previewImage}
  //       setImageFile={state.setImageFile}
  //       setPreviewImage={state.setPreviewImage}
  //     />
  //   </div>

  //   <Form
  //     onSubmit={(e) => {
  //       e.preventDefault();
  //       handleSubmit();
  //     }}
  //   >
  //     <Form.Field>
  //       <Form.Input
  //         className="themeForm"
  //         placeholder="tell me smth new"
  //         name="body"
  //         value={state.body}
  //         type="text"
  //         error={state.errors.body}
  //         onChange={(e) => {
  //           setState({
  //             ...state,
  //             body: e.target.value,
  //             errors: {},
  //           });
  //           // setBody(e.target.value);
  //           // setErrors({});
  //         }}
  //       />
  //       <Button type="submit" color="orange">
  //         Submit
  //       </Button>
  //     </Form.Field>
  //   </Form>
  // </div>
  // );
};

PostFormModal.propTypes = {
  project: PropType.shape({
    id: PropType.string.isRequired,
    name: PropType.string.isRequired,
    description: PropType.string.isRequired,
  }).isRequired,
};

export default PostFormModal;

import React, { useState } from 'react';
import { Button, Form, Icon, Modal } from 'semantic-ui-react';
import PropType from 'prop-types';

import ImageController from '../../../../shared/ImageController';
import useCreatePost from '../../../../../utils/hooks/createPost';

const PostFormModal = ({ project }) => {
  const [state, setState] = useState({
    open: false,
    body: '',
    errors: {},
    previewImage: null,
    imageFile: null,
  });

  const [createPost] = useCreatePost(setState);

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
      open: false,
    });
  };

  return (
    <div className="postFromModal">
      <Modal
        closeIcon
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
                <ImageController state={state} setState={setState} />
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
                    // error={state.errors.body}
                    onChange={(e) => {
                      setState({
                        ...state,
                        body: e.target.value,
                        errors: {},
                      });
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
      </Modal>
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

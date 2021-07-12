import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import CommentForm from './CommentForm';
import CommentsFeed from './CommentsFeed';

const CommentsModal = ({ postID }) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      closeIcon
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={
        <Button fluid basic color="red">
          comments
        </Button>
      }
    >
      <Modal.Header>Modal Header</Modal.Header>
      <Modal.Content>
        <CommentForm postID={postID} />
        <CommentsFeed postID={postID} />
      </Modal.Content>
    </Modal>
  );
};

CommentsModal.propTypes = {
  postID: PropTypes.string.isRequired,
};

export default CommentsModal;

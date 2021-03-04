import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { DELETE_POST } from '../graphql';

const DeleteButton = ({ postID }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  console.log(postID);

  const [deltePost] = useMutation(DELETE_POST, {
    variables: {
      postID,
    },
    update(result) {
      console.log(result);
      setConfirmOpen(false);
    },
    onError({ error }) {
      console.log(error);
    },
  });

  return (
    <div className="deleteButton">
      <Button
        color="orange"
        floated="right"
        onClick={() => {
          setConfirmOpen(true);
        }}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      {/* Confirm component has a field called open which tell it to appear or stay hidden */}
      {/* onConfirm delete the post, the client is sure of it */}
      {/* onCancel close the modal */}
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deltePost}
      />
    </div>
  );
};

DeleteButton.propTypes = {
  postID: PropTypes.string.isRequired,
};

export default DeleteButton;

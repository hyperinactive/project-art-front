/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { DELETE_POST, GET_POSTS } from '../graphql';

const DeleteButton = ({ postID, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      postID,
    },
    update(cache, result) {
      setConfirmOpen(false);

      const cacheData = cache.readQuery({
        query: GET_POSTS,
      });

      const filteredCache = {};
      filteredCache.getPosts = cacheData.getPosts.filter(
        (item) => item.id !== postID
      );

      cache.writeQuery({
        query: GET_POSTS,
        data: filteredCache,
      });

      // SinglePost renders DeleteButton and if user deletes from a post page
      // need to redirect them somewhere, home for now...
      // if DeleteButton isn't rendered by SinglePost no callback will be given
      if (callback) {
        callback();
      }
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
        onConfirm={deletePost}
      />
    </div>
  );
};

DeleteButton.defaultProps = {
  callback: () => {},
};

DeleteButton.propTypes = {
  postID: PropTypes.string.isRequired,
  callback: PropTypes.func,
};

export default DeleteButton;

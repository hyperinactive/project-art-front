/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { DELETE_COMMENT, DELETE_POST, GET_POSTS, GET_POST } from '../graphql';

const DeleteButton = (props) => {
  const { postID, commentID, callback, type } = props;
  const [confirmOpen, setConfirmOpen] = useState(false);

  // ok, want this component to delete both comments and posts
  // need a dynamic variable based on the type of stuff it deletes
  const dynamicMutation = type === 'post' ? DELETE_POST : DELETE_COMMENT;

  const [dynamicDelete] = useMutation(dynamicMutation, {
    variables: {
      postID,
      commentID,
    },

    // NOTE: perhaps because deleteComment returns a comment the cache doesn't update post?
    update(cache, result) {
      setConfirmOpen(false);

      if (type === 'post') {
        const cacheData = cache.readQuery({
          query: GET_POSTS,
        });
        console.log(cache);

        const filteredCache = {};
        filteredCache.getPosts = cacheData.getPosts.filter(
          (item) => item.id !== postID
        );
        cache.writeQuery({
          query: GET_POSTS,
          data: {
            getPosts: filteredCache,
          },
        });
      } else {
        console.log(cache);

        // WTFFFFFFFFF
        // the cache keys aren't the same for all components?
        // the parent component works with it just fine, but deleteButton doesn't?
        // TODO
        // ----------------------------------------------------------------------------
        // const cacheData = cache.readQuery({
        //   query: GET_POST,
        // });
        // if (cache.getPosts) {
        //   console.log('has getPosts');
        // }
        // if (cache.getPost) {
        //   console.log('has getPost');
        // }
        // console.log(cache);
        // console.log(cacheData);
        // ----------------------------------------------------------------------------
        // const filteredCache = {};
        // filteredCache.getPosts = cacheData.getPosts.map((item) => {
        //   if (item.id === postID) {
        //     // find the comment and remove it from the cache
        //     item.comments = item.comments.filter(
        //       (comment) => comment.id !== commentID
        //     );
        //   }
        //   return item;
        // });
        // console.log(filteredCache);
        // cache.writeQuery({
        //   query: GET_POSTS,
        //   data: filteredCache,
        // });
      }

      // SinglePost renders DeleteButton and if user deletes from a post page
      // need to redirect them somewhere, home for now...
      // if DeleteButton isn't rendered by SinglePost no callback will be given
      if (callback) {
        callback();
      }
    },
    // NOTE: refetchQueries gets the job done
    // downside: extra calls to the server
    // need to figure out why the cache doesn't detect changes in posts after comment deletion
    refetchQueries: [{ query: GET_POSTS }],
    // onError() {
    //   console.log('error');
    //   console.log(error);
    //   console.log(type);
    //   console.log(postID);
    //   console.log(commentID);
    // },
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
        onConfirm={dynamicDelete}
      />
    </div>
  );
};

DeleteButton.defaultProps = {
  callback: () => {},
  postID: '',
  commentID: '',
};

DeleteButton.propTypes = {
  postID: PropTypes.string,
  commentID: PropTypes.string,
  callback: PropTypes.func,
  type: PropTypes.string.isRequired,
};

export default DeleteButton;

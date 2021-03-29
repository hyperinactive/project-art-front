/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Loader } from 'semantic-ui-react';
import PlainComment from '../../PlainComment';
import CommentForm from '../../CommentForm';
import { GET_COMMENTS } from '../../../graphql';

const Comments = ({ user, postID }) => {
  const placeholder = 'placeholder';
  const [loadComments, { loading, data }] = useLazyQuery(GET_COMMENTS, {
    variables: {
      postID,
    },
    pollInterval: 1500,
    onCompleted: () => {
      console.log(data);
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div className="comments">
      <CommentForm fluid postID={postID} />
      {loading ? (
        <Loader size="huge" active>
          Computing, things, beep bop
        </Loader>
      ) : (
        user &&
        data &&
        data.getComments &&
        data.getComments.map((comment) => (
          <PlainComment
            key={comment.id}
            postID={postID}
            commentID={comment.id}
            props={comment}
            user={user}
          />
        ))
      )}
    </div>
  );
};

export default Comments;

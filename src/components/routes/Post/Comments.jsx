/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import PlainComment from '../../PlainComment';
import CommentForm from '../../CommentForm';
import useLoadComments from '../../../utils/hooks/loadComments';

const Comments = ({ user, postID }) => {
  const [loadComments, { data, loading }] = useLoadComments(postID);

  // TODO: cleanup
  useEffect(() => {
    loadComments();
  }, [loadComments]);

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

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import useLoadComments from '../../../utils/hooks/loadComments';
import PlainComment from '../../PlainComment';
import LoaderComponent from '../../shared/LoaderComponent';

const CommentsFeed = ({ postID }) => {
  const [loadComments, { data, loading }] = useLoadComments(postID);

  // TODO: cleanup
  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div className="commentsFeed">
      {loading ? (
        <LoaderComponent />
      ) : (
        data &&
        data.getComments &&
        data.getComments.map((comment) => (
          <PlainComment
            key={comment.id}
            postID={postID}
            commentID={comment.id}
            props={comment}
          />
        ))
      )}
    </div>
  );
};

CommentsFeed.propTypes = {
  postID: PropTypes.string.isRequired,
};

export default CommentsFeed;

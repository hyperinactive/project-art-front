/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useState } from 'react';
import { Image, Icon, Menu } from 'semantic-ui-react';
import { useParams, Link } from 'react-router-dom';

import LoaderComponent from '../../shared/LoaderComponent';
import { baseURL, defaultAvatar } from '../../../appConfig';
import { UserContext } from '../../../context/userContext/UserProvider';
import Comments from './Comments';
import useLoadPost from '../../../utils/hooks/loadPost';
import useDeletePost from '../../../utils/hooks/deletePost';
import PostCard from '../../PostCard';
import PostProfileCard from './PostProfileCard';

const isMemeber = (members, fUser) =>
  members.find((member) => member.id === fUser.id) !== undefined;

const Post = () => {
  const params = useParams();
  const { postID } = params;
  const { user } = useContext(UserContext);
  const [projectID, setProjectID] = useState(null);

  const [deletePost] = useDeletePost(projectID, postID);

  // TODO: continue with polling?
  // very useful
  // data is undefined till it's fetched, so to destructure it, provide the default value of an empty object
  const [pollPost, { data, loading }] = useLoadPost(postID, setProjectID);

  useEffect(() => {
    pollPost();
  }, []);

  return (
    <div className="post">
      {loading ? (
        <LoaderComponent />
      ) : data &&
        data.getPost &&
        data.getPost.project &&
        isMemeber(data.getPost.project.members, user) ? (
        <>
          <div className="post__left">
            <PostCard post={data.getPost} projectID={projectID} />
            <div className="post__left__comments">
              <Comments user={user} postID={data.getPost.id} />
            </div>
          </div>
          <div className="post__right">
            <PostProfileCard
              user={data.getPost.user}
              likeCount={data.getPost.likeCount}
              commentCount={data.getPost.commentCount}
            />
          </div>
        </>
      ) : (
        <div>not a member</div>
      )}
    </div>
  );
};

export default Post;

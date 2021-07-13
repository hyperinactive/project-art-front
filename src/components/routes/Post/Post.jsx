/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import LoaderComponent from '../../shared/LoaderComponent';
import { baseURL } from '../../../appConfig';
import { UserContext } from '../../../context/userContext/UserProvider';
import useLoadPost from '../../../utils/hooks/loadPost';
import useDeletePost from '../../../utils/hooks/deletePost';
import PostProfileCard from './PostProfileCard';
import CommentsModal from './CommentsModal';
import LikeButton from '../../shared/LikeButton';

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
            <Card fluid className="post__left__card">
              {data.getPost.imageURL && (
                <Card.Content>
                  <Image
                    className="post__left__card__image"
                    size="big"
                    src={`${baseURL}/files/${data.getPost.imageURL}`}
                    alt="some alt"
                  />
                </Card.Content>
              )}
              <Card.Content style={{ textAlign: 'left', fontSize: 16 }}>
                <p className="post__left__card__date">
                  {moment(data.getPost.createdAt).fromNow()}
                </p>
                <p className="post__left__card__content">{data.getPost.body}</p>
              </Card.Content>
            </Card>
            <div className="post__left__extra">
              <LikeButton post={data.getPost} user={user} />
              <CommentsModal postID={postID} />
            </div>
          </div>
          <div className="post__right">
            <PostProfileCard
              user={data.getPost.user}
              likeCount={data.getPost.likeCount}
              commentCount={data.getPost.commentCount}
              likes={data.getPost.likes}
              comments={data.getPost.comments}
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

/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Image, Label } from 'semantic-ui-react';

import { baseURL, defaultAvatar } from '../../../appConfig';
import { UserContext } from '../../../context/userContext/UserProvider';

const PostProfileCard = ({
  user: postUser,
  likeCount,
  commentCount,
  likes,
  comments,
}) => {
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes]);

  useEffect(() => {
    if (comments.find((comment) => comment.username === user.username)) {
      setCommented(true);
    } else {
      setCommented(false);
    }
  }, [comments]);

  return (
    <div className="postProfileCard">
      <Menu vertical>
        <Menu.Item>
          <Image
            src={
              postUser.imageURL
                ? `${baseURL}/files/${postUser.imageURL}`
                : defaultAvatar
            }
            rounded
            as={Link}
            to={`/user/${postUser.id}`}
            size="medium"
            float="right"
          />
        </Menu.Item>
        <Menu.Item>
          <h5>{postUser.username}</h5>
        </Menu.Item>
        <Menu.Item>
          <p>{postUser.status}</p>
        </Menu.Item>
        <Menu.Item name="likes">
          <Label color={liked ? 'orange' : null}>{likeCount}</Label>
          likes
        </Menu.Item>
        <Menu.Item name="comments">
          <Label color={commented ? 'red' : null}>{commentCount}</Label>
          comments
        </Menu.Item>
      </Menu>
    </div>
  );
};

PostProfileCard.defaultProps = {
  likes: [],
  comments: [],
};

PostProfileCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    status: PropTypes.string,
    imageURL: PropTypes.string,
  }).isRequired,
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  likes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })
  ),
};

export default PostProfileCard;

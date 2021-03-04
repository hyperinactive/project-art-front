import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './LikeButton.css';

import { LIKE_POST } from '../graphql';

// props post and user
// destructure and get id likeCount likes from post
// user is user
const LikeButton = ({ post: { id, likeCount, likes }, user }) => {
  const [liked, setLiked] = useState(false);

  // happens once per component render
  // if the post is already likes, set the bool to true and viceversa
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  });

  const [likePost] = useMutation(LIKE_POST, {
    // we're looking for postID on the server but we've got id in the client
    variables: { postID: id },
  });

  // eslint-disable-next-line no-nested-ternary
  const likeButton = user ? (
    liked ? (
      <Button color="orange">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="orange" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="orange" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <div className="likeButton">
      <Button as="div" labelPosition="right" onClick={likePost}>
        {likeButton}
        <Label basic color="orange" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </div>
  );
};

LikeButton.defaultProps = {
  post: PropTypes.shape({
    id: '',
    likes: [],
    likeCount: 0,
  }),
  user: PropTypes.shape({
    username: '',
  }),
};

LikeButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
      })
    ),
    likeCount: PropTypes.number.isRequired,
  }),
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
};

export default LikeButton;

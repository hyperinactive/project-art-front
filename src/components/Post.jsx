/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Image, Label, Card, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// destructuring directly from the props
const Post = ({
  post: {
    id,
    createdAt,
    username,
    body,
    likeCount,
    likes,
    commentCount,
    comments,
  },
}) => {
  const likeHandle = (e) => {
    // e.stopPropagation(); // didn't work cause we're using links, prevernDefault does work though
    e.preventDefault();
  };
  const commentHandle = (e) => {
    // e.stopPropagation();
    e.preventDefault();
  };

  return (
    // const { id, username, body, createdAt, likeCount, commentCount, likes } = props.posts;
    <Card as={Link} to={`posts/${id}`}>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png" // TODO: placeholder
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" onClick={likeHandle}>
          <Button color="orange" basic>
            <Icon name="heart" />
            Heart
          </Button>
          <Label basic color="orange" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={commentHandle}>
          <Button color="red" basic>
            <Icon name="comments" />
            Heart
          </Button>
          <Label basic color="red" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};

// prop types
Post.defaultProps = {
  comments: [],
  likes: [],
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  likes: PropTypes.array,
  comments: PropTypes.array,
};

export default Post;

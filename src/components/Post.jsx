/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import moment from 'moment';
import { Image, Label, Card, Icon } from 'semantic-ui-react';
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
}) => (
  // const { id, username, body, createdAt, likeCount, commentCount, likes } = props.posts;
  <Card>
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
      <div>some content</div>
    </Card.Content>
  </Card>
);

Post.propTypes = {
  post: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  likes: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
};

export default Post;

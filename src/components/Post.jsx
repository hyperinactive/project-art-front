/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Image, Label, Card, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { UserContext } from '../context/UserProvider';

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

  const { user } = useContext(UserContext);

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
          </Button>
          <Label basic color="orange" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right">
          <Button color="red" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="red" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button
            as="div"
            color="orange"
            floated="right"
            onClick={(e) => {
              e.preventDefault();
              console.log('Delete me!');
            }}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

// prop types
Post.defaultProps = {
  post: {},
  id: '',
  username: '',
  createdAt: '',
  body: '',
  likeCount: 0,
  commentCount: 0,
  likes: [],
  comments: [],
};

Post.propTypes = {
  post: PropTypes.object,
  id: PropTypes.string,
  username: PropTypes.string,
  createdAt: PropTypes.string,
  body: PropTypes.string,
  likeCount: PropTypes.number,
  commentCount: PropTypes.number,
  likes: PropTypes.array,
  comments: PropTypes.array,
};

export default Post;

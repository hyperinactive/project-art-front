import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { Comment, Icon } from 'semantic-ui-react';
import DeleteButton from './shared/DeleteButton';

const PlainComment = ({
  props: { id, createdAt, username, body },
  user,
  postID,
}) => (
  <div className="plainComment" style={{ margin: 20 }}>
    {/* <Card fluid>
      <Card.Content>
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
    </Card> */}
    {/* NOTE: Comment Groups allow for comment nesting */}
    <Comment>
      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
      <Comment.Content>
        <Comment.Author as="a">{username}</Comment.Author>
        <Comment.Metadata>
          <div style={{ display: 'inline' }}>{moment(createdAt).fromNow()}</div>
          <div style={{ display: 'inline', margin: 10 }}>2 days ago</div>
          <div style={{ display: 'inline' }}>
            <Icon name="star" />5 Faves
          </div>
        </Comment.Metadata>
        <Comment.Text>{body}</Comment.Text>
        {/* so many options */}
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
          <Comment.Action>Save</Comment.Action>
          <Comment.Action>Hide</Comment.Action>
          <Comment.Action>
            <Icon name="expand" />
            Full-screen
          </Comment.Action>
          <Comment.Action>
            {user && user.username === username && (
              <DeleteButton postID={postID} commentID={id} type="comment" />
            )}
          </Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  </div>
);

PlainComment.defaultProps = {
  user: null,
};

PlainComment.propTypes = {
  props: PropTypes.shape({
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
  postID: PropTypes.string.isRequired,
};

export default PlainComment;

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { Card, Image, Dropdown } from 'semantic-ui-react';
import DeleteButton from './shared/DeleteButton';
import { defaultAvatar, baseURL } from '../appConfig';

const PlainComment = ({
  props: {
    id,
    createdAt,
    body,
    user: { id: postUserID, username, imageURL },
  },
  user,
  postID,
}) => (
  <div
    className="plainComment"
    style={{ marginTop: 15, marginBottom: 15, color: 'black' }}
  >
    <Card fluid>
      <Card.Content>
        <div style={{ float: 'right' }}>
          <Dropdown
            icon="ellipsis vertical"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Dropdown.Menu>
              <Dropdown.Item text="Delete" />
              <Dropdown.Item text="Edit" />
              <Dropdown.Item text="Share" />
              {user && user.id === postUserID && (
                <Dropdown.Item>
                  <DeleteButton postID={postID} commentID={id} type="comment" />
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Image
          avatar
          size="massive"
          floated="left"
          src={imageURL ? `${baseURL}/files/${imageURL}` : defaultAvatar}
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>

        <Card.Content>
          <Card.Description>{body}</Card.Description>
        </Card.Content>
      </Card.Content>
    </Card>
    {/* NOTE: Comment Groups allow for comment nesting */}
  </div>
);

PlainComment.defaultProps = {
  user: null,
};

PlainComment.propTypes = {
  props: PropTypes.shape({
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      imageURL: PropTypes.string,
    }).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    imageURL: PropTypes.string,
  }),
  postID: PropTypes.string.isRequired,
};

export default PlainComment;

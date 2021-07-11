import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Image, Icon } from 'semantic-ui-react';

import { baseURL, defaultAvatar } from '../../../appConfig';

const PostProfileCard = ({ user, likeCount, commentCount }) => (
  <div className="postProfileCard">
    <Menu vertical>
      <Menu.Item>
        <Image
          src={
            user.imageURL ? `${baseURL}/files/${user.imageURL}` : defaultAvatar
          }
          rounded
          as={Link}
          to={`/user/${user.id}`}
          size="medium"
          float="right"
        />
      </Menu.Item>
      <Menu.Item>
        <h5>{user.username}</h5>
      </Menu.Item>
      <Menu.Item>
        <p>{user.status}</p>
      </Menu.Item>
      <Menu.Item>
        <p>
          <Icon name="heart" color="orange" />
          {likeCount}
        </p>
      </Menu.Item>
      <Menu.Item>
        <p>
          <Icon name="comments" color="red" />
          {commentCount}
        </p>
      </Menu.Item>
    </Menu>
  </div>
);

PostProfileCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    status: PropTypes.string,
    imageURL: PropTypes.string,
  }).isRequired,
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
};

export default PostProfileCard;

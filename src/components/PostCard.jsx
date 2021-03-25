/* eslint-disable react/forbid-prop-types */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Image,
  Transition,
  Card,
  Icon,
  Button,
  Dropdown,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { UserContext } from '../context/UserProvider';
import LikeButton from './shared/LikeButton/LikeButton';
import DeleteButton from './shared/DeleteButton';

// destructuring directly from the props
const PostCard = ({
  post: {
    id,
    createdAt,
    username,
    body,
    likeCount,
    likes,
    commentCount,
    imageURL,
    user: postUser,
  },
}) => {
  const { user } = useContext(UserContext);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        margin: 'auto',
      }}
      className="postCard"
    >
      <Transition.Group>
        <Card fluid>
          <Card.Content>
            <Image
              floated="left"
              circular
              size="mini"
              src={
                postUser.imageURL
                  ? `http://localhost:4000/files/${postUser.imageURL}`
                  : `${process.env.PUBLIC_URL}/defaultAvatar.jpeg`
              }
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                float: 'left',
                textAlign: 'left',
              }}
            >
              <h3 style={{ margin: 0 }}>{postUser.username}</h3>
              <p style={{ color: '#6f6f6f' }}>{moment(createdAt).fromNow()}</p>
              <p>{body}</p>
            </div>
            {user && user.username === username ? (
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
                    <Dropdown.Item>
                      <DeleteButton postID={id} type="post" />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/* <DeleteButton postID={id} type="post" /> */}
              </div>
            ) : (
              <div style={{ float: 'right' }}>
                <Dropdown
                  icon="ellipsis vertical"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Dropdown.Menu>
                    <Dropdown.Item text="Share" />
                    <Dropdown.Item text="Report" />
                    <Dropdown.Item>
                      <DeleteButton postID={id} type="post" />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/* <DeleteButton postID={id} type="post" /> */}
              </div>
            )}
          </Card.Content>
          {imageURL && (
            <Card.Content>
              <Image
                size="medium"
                src={
                  imageURL
                    ? `http://localhost:4000/files/${imageURL}`
                    : 'https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                }
              />
            </Card.Content>
          )}

          <Card.Content extra>
            <div className="ui two buttons">
              <LikeButton post={{ id, likes, likeCount }} user={user} />
              <Button color="red" basic as={Link} to={`/posts/${id}`}>
                <Icon name="comments" />
                {commentCount}
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Transition.Group>
    </div>
  );
};

// prop types
PostCard.defaultProps = {
  post: {},
  id: '',
  username: '',
  createdAt: '',
  body: '',
  likeCount: 0,
  commentCount: 0,
  likes: [],
};

PostCard.propTypes = {
  post: PropTypes.object,
  id: PropTypes.string,
  username: PropTypes.string,
  createdAt: PropTypes.string,
  body: PropTypes.string,
  likeCount: PropTypes.number,
  commentCount: PropTypes.number,
  likes: PropTypes.array,
};

export default PostCard;

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

import { UserContext } from '../context/userContext/UserProvider';
import LikeButton from './shared/LikeButton';
import DeleteButton from './shared/DeleteButton';
import { baseURL, defaultAvatar } from '../appConfig';

const PostCard = ({ post }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="postCard">
      <Transition.Group>
        <Card fluid>
          <Card.Content>
            <Image
              floated="left"
              circular
              size="mini"
              src={
                post.user.imageURL
                  ? `${baseURL}/files/${post.user.imageURL}`
                  : defaultAvatar
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
              <h3 style={{ margin: 0 }}>{post.user.username}</h3>
              <p style={{ color: '#6f6f6f' }}>
                {moment(post.createdAt).fromNow()}
              </p>
              <p>{post.body}</p>
            </div>
            {user && user.username === post.username ? (
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
                      <DeleteButton postID={post.id} type="post" />
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
                      <DeleteButton postID={post.id} type="post" />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/* <DeleteButton postID={id} type="post" /> */}
              </div>
            )}
          </Card.Content>
          {post.imageURL && (
            <Card.Content>
              <img
                className="postCard__image"
                src={
                  post.imageURL
                    ? `${baseURL}/files/${post.imageURL}`
                    : defaultAvatar
                }
                alt="post"
              />
            </Card.Content>
          )}

          <Card.Content extra>
            <div className="ui two buttons">
              <LikeButton post={post} user={user} />
              <Button color="red" basic as={Link} to={`/posts/${post.id}`}>
                <Icon name="comments" />
                {post.commentCount}
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
  post: {
    id: '',
    username: '',
    createdAt: '',
    body: '',
    imageURL: '',
    likeCount: 0,
    commentCount: 0,
    likes: [],
    user: {},
  },
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    createdAt: PropTypes.string,
    body: PropTypes.string,
    imageURL: PropTypes.string,
    likeCount: PropTypes.number,
    commentCount: PropTypes.number,
    likes: PropTypes.arrayOf(
      PropTypes.shape({
        username: PropTypes.string,
        createdAt: PropTypes.string,
      })
    ),
    user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
      imageURL: PropTypes.string,
      status: PropTypes.string,
    }),
  }),
};

export default PostCard;

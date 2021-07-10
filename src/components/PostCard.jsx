import React, { useContext } from 'react';
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
import { baseURL, defaultAvatar } from '../appConfig';
import useDeletePost from '../utils/hooks/deletePost';
import Share from './routes/Post/Share';

const PostCard = ({ post, projectID }) => {
  const { user } = useContext(UserContext);
  const [deletePost] = useDeletePost(projectID, post.id);

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

            <div style={{ float: 'right' }}>
              <Dropdown
                pointing="right"
                icon="ellipsis vertical"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <Dropdown.Menu>
                  {user && user.username === post.username && (
                    <>
                      <Dropdown.Item
                        text="Delete"
                        onClick={() => deletePost(projectID, post.id)}
                      />
                      <Dropdown.Item text="Edit" />
                    </>
                  )}
                  <Dropdown.Item>
                    <Share
                      postID={post.id}
                      imageURL={post.user.imageURL}
                      commentCount={post.commentCount}
                      likeCount={post.likeCount}
                    />
                  </Dropdown.Item>
                  <Dropdown.Item text="Report" />
                </Dropdown.Menu>
              </Dropdown>
            </div>
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
              <Button color="red" basic>
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
  projectID: PropTypes.string.isRequired,
};

export default PostCard;

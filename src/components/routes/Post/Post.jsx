import React, { useContext, useEffect } from 'react';
import { Grid, Image, Card, Icon, Dropdown, Menu } from 'semantic-ui-react';
import moment from 'moment';
import { useHistory, useParams, Redirect, Link } from 'react-router-dom';

import LoaderComponent from '../../shared/LoaderComponent';
import { baseURL, defaultAvatar } from '../../../appConfig';
import { UserContext } from '../../../context/userContext/UserProvider';
import Comments from './Comments';
import LikeButton from '../../shared/LikeButton';
import DeleteButton from '../../shared/DeleteButton';
import useLoadPost from '../../../utils/hooks/loadPost';

const isMemeber = (members, fUser) =>
  members.find((member) => member.id === fUser.id) !== undefined;

const Post = () => {
  const history = useHistory();
  const params = useParams();
  const { postID } = params;
  const { user } = useContext(UserContext);

  // TODO: continue with polling?
  const [pollPost, { data, loading }] = useLoadPost(postID);
  const redirect = () => history.push('/');

  useEffect(() => {
    pollPost();
  }, []);

  let postMarkup;
  if (loading) {
    postMarkup = <LoaderComponent />;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      likes,
      likeCount,
      imageURL,
      commentCount,
      user: postUser,
    } = data.getPost;

    postMarkup =
      data && data.getPost && isMemeber(data.getPost.project.members, user) ? (
        <div className="post">
          <Grid style={{ marginTop: 20 }}>
            <Grid.Row centered>
              <Grid.Column width={8}>
                <Grid.Row centered>
                  <Card fluid>
                    {imageURL && (
                      <Card.Content style={{ textAlign: 'center' }}>
                        <Image
                          rounded
                          size="medium"
                          src={`${baseURL}/files/${imageURL}`}
                        />
                      </Card.Content>
                    )}
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
                            {user && user.username === username && (
                              <DeleteButton
                                postID={id}
                                type="post"
                                callback={redirect}
                              />
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <Card.Header>{username}</Card.Header>
                      <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                      <Card.Description>{body}</Card.Description>
                    </Card.Content>
                    <hr />
                    <Card.Content extra>
                      <LikeButton user={user} post={{ id, likeCount, likes }} />
                    </Card.Content>
                  </Card>
                </Grid.Row>
                <Grid.Row>
                  <Comments user={user} postID={id} />
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={2}>
                <Menu vertical>
                  <Menu.Item>
                    <Image
                      src={
                        postUser.imageURL
                          ? `${baseURL}/files/${postUser.imageURL}`
                          : defaultAvatar
                      }
                      rounded
                      as={Link}
                      to={`/user/${postUser.id}`}
                      size="medium"
                      float="right"
                    />
                  </Menu.Item>
                  <Menu.Item>
                    <h5>{postUser.username}</h5>
                  </Menu.Item>
                  <Menu.Item>
                    <p>{postUser.status}</p>
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
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      ) : (
        <Redirect to="/" />
      );
  }

  return (
    <div className="singlePost">{user ? postMarkup : <Redirect to="/" />}</div>
  );
};

// TODO: PropTypes
// TODO: tbh this whole component needs help...

export default Post;

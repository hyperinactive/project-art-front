/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect } from 'react';
import { Grid, Image, Card, Icon, Dropdown, Menu } from 'semantic-ui-react';
import moment from 'moment';
import { useParams, Link } from 'react-router-dom';

import LoaderComponent from '../../shared/LoaderComponent';
import { baseURL, defaultAvatar } from '../../../appConfig';
import { UserContext } from '../../../context/userContext/UserProvider';
import Comments from './Comments';
import LikeButton from '../../shared/LikeButton';
import useLoadPost from '../../../utils/hooks/loadPost';

const isMemeber = (members, fUser) =>
  members.find((member) => member.id === fUser.id) !== undefined;

const Post = () => {
  const params = useParams();
  const { postID } = params;
  const { user } = useContext(UserContext);

  // TODO: continue with polling?
  // very useful
  // data is undefined till it's fetched, so to destructure it, provide the default value of an empty object
  const [
    pollPost,
    {
      data: {
        getPost: {
          id,
          project,
          imageURL,
          username,
          createdAt,
          body,
          likes,
          likeCount,
          commentCount,
        } = {},
      } = {},
      loading,
    },
  ] = useLoadPost(postID);

  useEffect(() => {
    pollPost();
  }, []);

  return (
    <div className="post">
      {loading ? (
        <LoaderComponent />
      ) : project && isMemeber(project.members, user) ? (
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
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <Card.Header>{username}</Card.Header>
                      <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                      <Card.Description>{body}</Card.Description>
                    </Card.Content>
                    <hr />
                    <Card.Content extra>
                      <LikeButton
                        user={user}
                        post={{
                          id,
                          likeCount,
                          likes,
                        }}
                      />
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
                        user.imageURL
                          ? `${baseURL}/files/${user.imageURL}`
                          : defaultAvatar
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
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      ) : (
        <div>not a member</div>
      )}
    </div>
  );
};

export default Post;

/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useContext } from 'react';
import { Grid, Loader, Image, Card, Icon, Dropdown } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { useHistory, useParams, Redirect, Link } from 'react-router-dom';
import { GET_POST } from '../../../graphql';
import { defaultAvatar } from '../../../appConfig';
import { UserContext } from '../../../context/UserProvider';
import Comments from './Comments';
import LikeButton from '../../shared/LikeButton/LikeButton';
import DeleteButton from '../../shared/DeleteButton';

const isMemeber = (members, fUser) =>
  members.find((member) => member.id === fUser.id) !== undefined;

const SinglePost = () => {
  const history = useHistory();
  const params = useParams();
  const { postID } = params;
  const { user } = useContext(UserContext);

  // TODO: continue with polling?
  const { loading, data } = useQuery(GET_POST, {
    variables: {
      postID,
    },
    pollInterval: 1500,
    onCompleted: () => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const redirect = () => history.push('/');

  let postMarkup;
  if (loading) {
    postMarkup = <Loader />;
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
                        src={`${process.env.REACT_APP_BASE_URL}/files/${imageURL}`}
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
              <Image
                src={
                  postUser.imageURL
                    ? `${process.env.REACT_APP_BASE_URL}/files/${postUser.imageURL}`
                    : defaultAvatar
                }
                rounded
                as={Link}
                to={`/user/${postUser.id}`}
                size="medium"
                float="right"
              />
              <h5>{postUser.username}</h5>
              <p>{postUser.status}</p>
              <p>
                <Icon name="heart" color="orange" />
                {likeCount}
              </p>
              <p>
                <Icon name="comments" color="red" />
                {commentCount}
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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

export default SinglePost;

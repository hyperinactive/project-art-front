/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import {
  Grid,
  Loader,
  Image,
  Card,
  Button,
  Icon,
  Label,
} from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { GET_POST } from '../graphql';

import { UserContext } from '../context/UserProvider';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

const SinglePost = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { postID } = props.match.params;
  const { user } = useContext(UserContext);
  let getPost;

  const { loading, data } = useQuery(GET_POST, {
    variables: {
      postID,
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const redirect = () => props.history.push('/');

  let postMarkup;
  if (loading) {
    postMarkup = <Loader />;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = data.getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="medium"
            />
          </Grid.Column>
          <Grid.Column>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={console.log('comment')}
                >
                  <Button color="orange" basic>
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="orange" pointing="left" />
                </Button>
                {user && user.username === username && (
                  <DeleteButton postID={id} callback={redirect} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return <div className="singlePost">{postMarkup}</div>;
};

export default SinglePost;

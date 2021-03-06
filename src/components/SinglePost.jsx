/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
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
import { GET_POST } from '../graphql';

import { UserContext } from '../context/UserProvider';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import PlainComment from './PlainComment';

const SinglePost = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { postID } = props.match.params;
  const { user } = useContext(UserContext);

  const { loading, data } = useQuery(GET_POST, {
    variables: {
      postID,
    },
    onCompleted(cache) {
      console.log(cache);
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
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="medium"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={8}>
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
                  <DeleteButton postID={id} type="post" callback={redirect} />
                )}
              </Card.Content>
            </Card>
            {comments.map((comment) => (
              <PlainComment
                key={comment.id}
                postID={postID}
                commentID={comment.id}
                props={comment}
                user={user}
              />
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return <div className="singlePost">{postMarkup}</div>;
};

// TODO: PropTypes
// TODO: tbh this whole component needs help...

export default SinglePost;

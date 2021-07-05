import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Grid, Input, Image, Header } from 'semantic-ui-react';

import LoaderComponent from '../shared/LoaderComponent';
import ElementList from '../shared/ElementList';
import { UserContext } from '../../context/UserProvider';
import { GET_FRIENDS } from '../../graphql';
import { GET_USERS } from '../../graphql/userGQL';
import { baseURL, defaultAvatar } from '../../appConfig';

const Friends = () => {
  const { user } = useState(UserContext);
  const history = useHistory();

  if (user === null) history.push('/login');

  const [searchTerm, setSearchTerm] = useState('');

  const { data, loading, error } = useQuery(GET_FRIENDS, {
    onCompleted: () => {
      console.log(data.getFriends);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { data: userData, loading: userLoading } = useQuery(GET_USERS, {
    pollInterval: 5000,
    onCompleted: () => {
      console.log(userData.getUsers);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  if (loading) return <LoaderComponent />;
  if (error) return <h1>Error</h1>;

  return (
    <div>
      <div className="spacerDiv" style={{ padding: 20 }} />
      <Grid centered columns={2} divided>
        <Grid.Column width={13}>
          <Input
            placeholder="search and destory"
            icon="search"
            style={{ margin: 20, display: 'inline-block' }}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />

          <Grid.Row>
            {userLoading ? (
              <LoaderComponent />
            ) : (
              <Grid doubling columns={5}>
                {userData &&
                  userData.getUsers &&
                  [...userData.getUsers]
                    .sort((a, b) => {
                      const al = a.username.toLowerCase();
                      const bl = b.username.toLowerCase();

                      if (al > bl) return 1;
                      return -1;
                    })
                    .filter((currentUser) =>
                      currentUser.username
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((member) => (
                      <Grid.Column key={member.id}>
                        <div style={{ textAlign: 'center' }}>
                          <Image
                            rounded
                            size="tiny"
                            src={
                              member.imageURL
                                ? `${baseURL}/files/${member.imageURL}`
                                : defaultAvatar
                            }
                            as={Link}
                            to={`/user/${member.id}`}
                          />

                          <p>{member.username}</p>
                        </div>
                      </Grid.Column>
                    ))}
              </Grid>
            )}
          </Grid.Row>
        </Grid.Column>

        <Grid.Column width={2}>
          <Header className="headline">My friends</Header>
          <Grid.Row>
            <div
              style={{
                textAlign: 'center',
              }}
            />
            <ElementList elements={data.getFriends} type="user" />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Friends;

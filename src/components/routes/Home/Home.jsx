import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { Grid, Image, Loader } from 'semantic-ui-react';

import { UserContext } from '../../../context/UserProvider';
import { GET_FRIENDS, GET_USER_PROJECTS } from '../../../graphql';
import './Home.css';

const Home = () => {
  const { user } = useContext(UserContext);

  const { data, loading, error } = useQuery(GET_FRIENDS);
  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useQuery(GET_USER_PROJECTS, {
    onError(err) {
      console.log(err);
    },
  });

  if (error || projectError) return <h1>Error</h1>;
  // here, we're using the loading bool to tell us if the data is being fetched
  // if so we're gonna display the loading component
  // if not we're displaying the posts
  return (
    <div className="home" style={{ marginTop: 50 }}>
      <Grid centered columns={3} divided>
        {user ? (
          <>
            <h2>Welcome {user.username}</h2>
            <Grid.Row>
              {loading ? (
                <Loader size="huge" active>
                  Computing, things, beep bop
                </Loader>
              ) : (
                <Grid.Column width={2}>
                  <Grid.Row>
                    <div
                      style={{
                        background: '#e8e8e8',
                        borderRadius: 10,
                        textAlign: 'center',
                      }}
                    >
                      {data &&
                        data.getFriends &&
                        data.getFriends.map((friend) => (
                          <Grid.Row key={friend.id}>
                            <div style={{ paddingBottom: 10, paddingTop: 10 }}>
                              <Image
                                avatar
                                size="tiny"
                                src={
                                  friend.imageURL ||
                                  `${process.env.PUBLIC_URL}/defaultAvatar.jpeg`
                                }
                              />
                            </div>
                          </Grid.Row>
                        ))}
                    </div>
                  </Grid.Row>
                </Grid.Column>
              )}

              <Grid.Column width={12}>Workspace</Grid.Column>
              <Grid.Column width={2}>
                {projectLoading ? (
                  <Loader size="huge" active>
                    Computing, things, beep bop
                  </Loader>
                ) : (
                  <Grid.Row centered>
                    {projectData &&
                      projectData.getUserProjects &&
                      projectData.getUserProjects.map((project) => (
                        <Grid.Row key={project.id}>
                          <Image
                            rounded
                            size="tiny"
                            src={`${process.env.PUBLIC_URL}/defaultAvatar.jpeg`}
                          />
                        </Grid.Row>
                      ))}
                  </Grid.Row>
                )}
              </Grid.Column>
            </Grid.Row>
          </>
        ) : (
          // TODO: get projects and friends
          <>
            <h2>
              Welcome to project-
              <i style={{ color: 'brown' }}>art</i>!
            </h2>
            <Grid.Row>
              <Image size="small" src={`${process.env.PUBLIC_URL}/hello.gif`} />
            </Grid.Row>
          </>
        )}
      </Grid>
    </div>
  );
};

export default Home;

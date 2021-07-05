import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { Grid, Loader, Header, Card } from 'semantic-ui-react';
import { UserContext } from '../../../context/UserProvider';
import { GET_FRIENDS, GET_USER_PROJECTS } from '../../../graphql';
import ElementList from '../../shared/ElementList';
import Notifications from './Notifications';

// TODO: UserWorkspace needs to be cleaned up after another user logs
const UserWorkspace = () => {
  const { user } = useContext(UserContext);

  const { data, loading } = useQuery(GET_FRIENDS, {
    onCompleted: () => {
      console.log(data.getFriends);
    },
  });
  const { data: projectData, loading: projectLoading } = useQuery(
    GET_USER_PROJECTS,
    {
      onCompleted: () => {
        console.log(projectData);
      },
      onError(err) {
        console.log(err);
      },
    }
  );

  // if (error || projectError) return <h1>Error</h1>;

  return (
    <div className="userWorkspace">
      <Grid centered columns={3} divided>
        <div className="greetings headline">
          <h2>
            Welcome <span className="accentText">{user.username}</span>
          </h2>
        </div>

        <Grid.Row>
          {loading ? (
            <Loader size="huge" active>
              Computing, things, beep bop
            </Loader>
          ) : (
            <Grid.Column width={2}>
              <Header className="headline">Friends</Header>
              <Grid.Row>
                <div
                  style={{
                    textAlign: 'center',
                  }}
                />
                <ElementList elements={data.getFriends} type="user" />
              </Grid.Row>
            </Grid.Column>
          )}

          <Grid.Column width={11}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Header className="headline">User feed</Header>
              <Notifications />
              <div style={{ textAlign: 'center' }}>
                <Card centered>
                  <Card.Content>
                    <Card.Header>This is the user feed demo!</Card.Header>
                    <Card.Description>
                      (which is under construction)
                    </Card.Description>
                    <Card.Meta>(which I will get to, yeah...)</Card.Meta>
                  </Card.Content>
                </Card>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={2}>
            <Header className="headline">Projects</Header>
            {projectLoading ? (
              <Loader size="huge" active>
                Computing, things, beep bop
              </Loader>
            ) : (
              projectData && (
                <ElementList
                  elements={projectData.getUserProjects}
                  type="projects"
                />
              )
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default UserWorkspace;

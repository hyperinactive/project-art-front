import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { Grid, Loader, Image } from 'semantic-ui-react';
import { UserContext } from '../../../context/UserProvider';
import { GET_FRIENDS, GET_USER_PROJECTS } from '../../../graphql';
import Members from '../../shared/Members';
import Notifications from './Notifications';
import { wip } from '../../../appConfig';

// TODO: UserWorkspace needs to be cleaned up after another user logs
const UserWorkspace = () => {
  const { user } = useContext(UserContext);

  const { data, loading, error } = useQuery(GET_FRIENDS, {
    onCompleted: () => {
      console.log(data.getFriends);
    },
  });
  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useQuery(GET_USER_PROJECTS, {
    onCompleted: () => {
      console.log(projectData);
    },
    onError(err) {
      console.log(err);
    },
  });

  if (error || projectError) return <h1>Error</h1>;

  return (
    <div className="userWorkspace">
      <Grid centered columns={3} divided>
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
                    textAlign: 'center',
                  }}
                />
                <Members members={data.getFriends} type="user" />
              </Grid.Row>
            </Grid.Column>
          )}

          <Grid.Column width={12}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Notifications />
              <Image src={wip} size="small" />
            </div>
          </Grid.Column>
          <Grid.Column width={2}>
            {projectLoading ? (
              <Loader size="huge" active>
                Computing, things, beep bop
              </Loader>
            ) : (
              projectData && (
                <Members
                  members={projectData.getUserProjects}
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

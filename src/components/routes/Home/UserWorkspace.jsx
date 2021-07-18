import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Button, Message } from 'semantic-ui-react';

import LoaderComponent from '../../shared/LoaderComponent';
import ElementList from '../../shared/ElementList';
import Notifications from './Notifications';
import { UserContext } from '../../../context/userContext/UserProvider';
import useLoadFriends from '../../../utils/hooks/loadFriends';
import useLoadProjects from '../../../utils/hooks/loadProjects';

// TODO: UserWorkspace needs to be cleaned up after another user logs
const UserWorkspace = () => {
  const { user } = useContext(UserContext);

  const [loadFriends, { data: friendsData, loading: friendsLoading }] =
    useLoadFriends();
  const [loadProjects, { data: projectData, loading: projectLoading }] =
    useLoadProjects();

  // TODO: cleanup
  useEffect(() => {
    loadFriends();
    loadProjects();
  }, []);

  return (
    <div className="userWorkspace">
      {user && !user.emailVerified ? (
        <div
          style={{
            paddingTop: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Message
            warning
            style={{ textAlign: 'center', width: 'fit-content' }}
          >
            <Message.Header>
              {`${user.username}, lets verify this account!`}
            </Message.Header>
            <p>A mail containing your verification code has been sent</p>
            <b>
              <Link to="/verify" className="accentMe" style={{ color: 'peru' }}>
                Verify me!
              </Link>
            </b>
          </Message>
        </div>
      ) : (
        <div className="greetings headline">
          <h2 style={{ textAlign: 'center' }}>
            Welcome <span className="accentText">{user.username}</span>
          </h2>
        </div>
      )}
      <Grid centered columns={3} divided className="masterGrid">
        <Grid.Row>
          {friendsLoading ? (
            <LoaderComponent />
          ) : (
            friendsData &&
            friendsData && (
              <Grid.Column width={2}>
                <Header className="headline">Friends</Header>
                <Grid.Row>
                  <div
                    style={{
                      textAlign: 'center',
                    }}
                  />
                  <ElementList elements={friendsData.getFriends} type="user" />
                </Grid.Row>
              </Grid.Column>
            )
          )}

          <Grid.Column width={11}>
            <div
              className="userWorkspace__userFeed"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Header className="headline">User feed</Header>
              <div style={{ margin: 10 }}>
                <Button
                  as={Link}
                  to="/projects"
                  icon="cube"
                  content="projects"
                />
                <Button as={Link} to="/inbox" icon="inbox" content="inbox" />
                <Button content="connect" icon="user" as={Link} to="/connect" />
              </div>
              <Notifications />
            </div>
          </Grid.Column>
          <Grid.Column width={2}>
            <Header className="headline">Projects</Header>
            {projectLoading ? (
              <LoaderComponent />
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

import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Card, Button, Message } from 'semantic-ui-react';

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
      <Grid centered columns={3} divided>
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
                <Link
                  to="/verify"
                  className="accentMe"
                  style={{ color: 'peru' }}
                >
                  Verify me!
                </Link>
              </b>
            </Message>
          </div>
        ) : (
          <div className="greetings headline">
            <h2>
              Welcome <span className="accentText">{user.username}</span>
            </h2>
          </div>
        )}

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

import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header, Button, Message, Transition } from 'semantic-ui-react';

import LoaderComponent from '../../shared/LoaderComponent';
import ElementList from '../../shared/ElementList';
import Notifications from './Notifications';
import { UserContext } from '../../../context/userContext/UserProvider';
import useLoadFriends from '../../../utils/hooks/loadFriends';
import useLoadProjects from '../../../utils/hooks/loadProjects';

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
      <div className="userWorkspace__wrapper">
        <div className="userWorkspace__wrapper__friends">
          <Header className="headline">Friends</Header>

          {friendsLoading ? (
            <LoaderComponent />
          ) : (
            friendsData &&
            friendsData && (
              <ElementList elements={friendsData.getFriends} type="user" />
            )
          )}
        </div>
        <div className="userWorkspace__wrapper__userFeed">
          <>
            <Header className="headline">User feed</Header>
            <div className="userWorkspace__wrapper__userFeed__buttons">
              <Button as={Link} to="/projects" icon="cube" content="projects" />
              <Button as={Link} to="/inbox" icon="inbox" content="inbox" />
              <Button content="connect" icon="user" as={Link} to="/connect" />
            </div>
            <Transition.Group>
              <Notifications />
            </Transition.Group>
          </>
        </div>
        <div className="userWorkspace__wrapper__projects">
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
        </div>
      </div>
    </div>
  );
};

export default UserWorkspace;

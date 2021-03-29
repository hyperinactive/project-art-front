import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import { NavigationContext } from '../context/NavigationProvider';

import { UserContext } from '../context/UserProvider';

const NavBar = () => {
  // const context = useContext(UserContext);
  const { user, logout } = useContext(UserContext);
  const { activeItem, setActiveItem } = useContext(NavigationContext);
  const history = useHistory();

  // when the page renders find out the path and highlight the right menu item
  useEffect(() => {
    const pathName = window.location.pathname.split('/');

    const path = !pathName[1] ? 'home' : pathName[1];
    setActiveItem(path);
  }, []);

  // if item's active property is true, it will be active (highlighted)
  // { name } deconstruct the current component calling the handleItemClick and take the name of it
  const handleItemClick = (e, { name }) => setActiveItem(name);

  // NOTE: as -> lets us use the component as some other component
  // useful for making links out of components
  // to -> basically href

  // if we got a logged-in user display the personalized component with the logout item
  const navBar = user ? (
    <Menu tabular stackable size="massive" color="orange">
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      >
        Home
      </Menu.Item>
      <Menu.Item
        name="user"
        active={activeItem === 'user'}
        onClick={handleItemClick}
        as={Link}
        to={`/user/${user.id}`}
      >
        {user.username}
      </Menu.Item>
      <Menu.Item
        name="projects"
        active={activeItem === 'projects'}
        onClick={handleItemClick}
        as={Link}
        to="/projects"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="logout"
          onClick={() => {
            logout();
            history.push('/');
            setActiveItem('home');
          }}
        />
      </Menu.Menu>
      <Menu.Item
        name="chat"
        active={activeItem === 'chat'}
        onClick={() => {
          console.log('OMEGALUL');
        }}
      >
        <Icon name="chat" style={{ margin: 0 }} />
      </Menu.Item>

      <Menu.Item
        name="settings"
        active={activeItem === 'settings'}
        onClick={handleItemClick}
        as={Link}
        to={`/settings/${user.id}`}
      >
        <Icon name="setting" style={{ margin: 0 }} />
      </Menu.Item>
    </Menu>
  ) : (
    <Menu tabular stackable size="massive" color="orange">
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Item
        name="projects"
        active={activeItem === 'projects'}
        onClick={handleItemClick}
        as={Link}
        to="/projects"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="register"
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
        <Menu.Item
          name="login"
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
      </Menu.Menu>
    </Menu>
  );

  return (
    <div className="navbar" style={{ paddingTop: 10 }}>
      {navBar}
    </div>
  );
};

export default NavBar;

import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { UserContext } from '../context/UserProvider';

const NavBar = () => {
  // const context = useContext(UserContext);
  const { user, logout } = useContext(UserContext);

  // TODO: active windows kind of breaks when links send users to it
  // to figure out which item should be highlighted we need to know on which page we are
  const [activeItem, setActiveItem] = useState('home');

  // when the page renders find out the path and highlight the right menu item
  useEffect(() => {
    const pathName = window.location.pathname.split('/');
    let path;
    if (user) {
      path = !pathName[1] ? user.username : pathName[1];
    } else {
      path = !pathName[1] ? 'home' : pathName[1];
    }
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
    <Menu pointing secondary size="massive" color="orange">
      <Menu.Item
        name={user.username}
        active={activeItem === user.username}
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
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="orange">
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

  return <div className="navbar">{navBar}</div>;
};

export default NavBar;

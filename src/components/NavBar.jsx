import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const NavBar = () => {
  // to figure out which item should be highlighted we need to know on which page we are
  const pathName = window.location.pathname.split('/');
  const path = !pathName[1] ? 'home' : pathName[1];

  const [activeItem, setActiveItem] = useState(path);

  // if item's active property is true, it will be active (highlighted)
  // { name } deconstruct the current component calling the handleItemClick and take the name of it
  const handleItemClick = (e, { name }) => setActiveItem(name);

  // NOTE: as -> lets us use the component as some other component
  // useful for making links out of components
  // to -> basically href
  return (
    <div>
      <Menu pointing secondary size="massive" color="orange">
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
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
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            active={activeItem === 'logout'}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default NavBar;

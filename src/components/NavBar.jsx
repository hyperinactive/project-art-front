import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Icon, Menu, Sticky, Dropdown, Image } from 'semantic-ui-react';
import { baseURL, defaultAvatar } from '../appConfig';

import { NavigationContext } from '../context/NavigationProvider';

import { UserContext } from '../context/UserProvider';

const NavBar = () => {
  // const context = useContext(UserContext);
  const { user, logout } = useContext(UserContext);
  const { activeItem, setActiveItem, temporaryTab, setTemporaryTab } =
    useContext(NavigationContext);
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

  const dropDownTrigger = (
    <span>
      <Image
        rounded
        size="mini"
        src={user ? `${baseURL}/files/${user.imageURL}` : defaultAvatar}
      />
    </span>
  );

  // NOTE: as -> lets us use the component as some other component
  // useful for making links out of components
  // to -> basically href

  // if we got a logged-in user display the personalized component with the logout item
  const navBar = user ? (
    <Menu size="massive" color="orange" className="navbar__menu">
      <Menu.Item
        className="navbar__menu__item"
        name="home"
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      >
        Home
      </Menu.Item>
      {/* <Menu.Item
        name="user"
        active={activeItem === 'user'}
        onClick={handleItemClick}
        as={Link}
        to={`/user/${user.id}`}
      >
        {user.username}
      </Menu.Item> */}
      <Menu.Item
        className="navbar__menu__item"
        name="projects"
        active={activeItem === 'projects'}
        onClick={handleItemClick}
        as={Link}
        to="/projects"
      />
      <Menu.Item
        className="navbar__menu__item"
        name="connect"
        active={activeItem === 'connect'}
        onClick={handleItemClick}
        as={Link}
        to="/connect"
      />
      {temporaryTab && (
        <Menu.Item
          className={`navbar__menu__item tempTab ${
            activeItem === temporaryTab.name
              ? 'tempTab--active'
              : 'tempTab--inactive'
          }`}
          name={temporaryTab.name.toLowerCase()}
          active={activeItem.toLowerCase() === temporaryTab.name.toLowerCase()}
          onClick={handleItemClick}
          as={Link}
          to={temporaryTab.link}
        >
          {temporaryTab.name}

          <div style={{ marginLeft: 20 }}>
            <Icon
              name="close"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setTemporaryTab(null);
                history.push('/');
                setActiveItem('home');
              }}
            />
          </div>
        </Menu.Item>
      )}

      <Menu.Menu position="right">
        <Menu.Item className="navbar__menu__item">
          <Dropdown icon={null} trigger={dropDownTrigger}>
            <Dropdown.Menu>
              <Dropdown.Item
                name="inbox"
                as={Link}
                to="/inbox"
                onClick={handleItemClick}
              >
                <Icon name="inbox" style={{ margin: 0 }} />
                Inbox
              </Dropdown.Item>
              <Dropdown.Item
                name="settings"
                as={Link}
                to={`/settings/${user.id}`}
                onClick={handleItemClick}
              >
                <Icon name="setting" />
                Settings
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setTemporaryTab(null);
                  logout();
                  history.push('/');
                  setActiveItem('home');
                }}
              >
                <Icon name="close" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>

        {/* <Menu.Item
          className="navbar__menu__item"
          name="logout"
          onClick={() => {
            setTemporaryTab(null);
            logout();
            history.push('/');
            setActiveItem('home');
          }}
        /> */}
      </Menu.Menu>
      {/* <Menu.Item
        className="navbar__menu__item"
        name="chat"
        active={activeItem === 'chat'}
        onClick={handleItemClick}
        as={Link}
        to="/chat"
      >
        <Icon name="inbox" style={{ margin: 0 }} />
      </Menu.Item> */}

      {/* <Menu.Item
        className="navbar__menu__item"
        name="settings"
        active={activeItem === 'settings'}
        onClick={handleItemClick}
        as={Link}
        to={`/settings/${user.id}`}
      >
        <Icon name="setting" style={{ margin: 0 }} />
      </Menu.Item> */}
    </Menu>
  ) : (
    <Menu size="massive" color="orange" className="navbar__menu">
      <Menu.Item
        className="navbar__menu__item"
        name="home"
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Item
        className="navbar__menu__item"
        name="projects"
        active={activeItem === 'projects'}
        onClick={handleItemClick}
        as={Link}
        to="/projects"
      />
      <Menu.Menu position="right">
        <Menu.Item
          className="navbar__menu__item"
          name="register"
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
        <Menu.Item
          className="navbar__menu__item"
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
    <div className="navbar" style={{ paddingTop: 10, marginBottom: 15 }}>
      <Sticky>
        <div>{navBar}</div>
      </Sticky>
    </div>
  );
};

export default NavBar;

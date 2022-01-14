/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBarSearch from './search/NavBarSearch';
import logoutAction from '../redux/actions/user/logout';
import defaultProfile from '../assets/images/avat1.png';
import Logo from '../assets/images/Logo.png';
import Icon from './Icon';
import ToolTipData from './notification/notificationTooltip';
import activityAction from '../redux/actions/activities/notificationActivities';

const NavBar = ({
  profile,
  data,
  logoutAction: logout,
  login,
  activityAction: action,
  notificationActivities,
}) => {
  const history = useHistory();
  const [showToolTip, setShowToolTip] = useState(false);
  const [status, setStatus] = useState('initial');
  const [activities, setActivities] = useState([]);
  const [errorStatus, setErrorStatus] = useState(null);
  useEffect(() => {
    if (login.status === 'user_logout_success') {
      localStorage.removeItem('UBUSIZI_USER_TOKEN');
      localStorage.removeItem('UBUSIZI_USER_ID');
      localStorage.removeItem('UBUSIZI_USER_DATA');
      localStorage.removeItem('UBUSIZI_USER_PIC');
      return history.push('/accounts/login');
    }
    if (notificationActivities.status === 'error') {
      setErrorStatus(notificationActivities.error.status);
    }

    if (notificationActivities.status === 'success') {
      setActivities(notificationActivities.data);
      setStatus('success');
    }

    return undefined;
  }, [login, notificationActivities]);
  const handleLogout = () => {
    logout();
  };
  const id = localStorage.getItem('UBUSIZI_USER_ID');
  const picture = typeof data.picture === 'undefined' ? 'none' : data.picture;
  const username = typeof data.username === 'undefined' ? '' : data.username;
  const handleSubmit = (e) => {
    e.preventDefault();
    action();
    if (showToolTip) {
      setShowToolTip(false);
    } else {
      setShowToolTip(true);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-white navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="logo" style={{ width: 80, height: 50 }} />
        </Link>

        {profile === 'profile' ? (
          <span className="show-nav-uname d-none">Profile</span>
        ) : (
            <NavBarSearch />
          )}
        <ul className="navbar-nav ml-auto logged-in-nav">
          <li className="nav-item mr-3">
            <NavLink
              exact
              to="/"
              className="nav-link smooth-transition"
              activeClassName="active"
              title="Homepage"
            >
              <Icon name="home" height={24} width={24} />
              <span className="d-none ml-2 nav-sm-link">Home</span>
            </NavLink>
          </li>
          <li className="nav-item mr-3">
            <span
              className="nav-link myfont smooth-transition"
              onClick={handleSubmit}
              activeClassName="active"
            >
              <Icon name="heart2" height={24} width={24} />
              <span className="d-none ml-2 nav-sm-link">Activity</span>
            </span>
          </li>
          <ToolTipData
            showToolTip={showToolTip}
            data={activities}
            error={errorStatus}
            page={null}
            loadMore={null}
            fetchMore={null}
            allUsersLoaded={null}
          />
          <li className="nav-item">
            <NavLink
              className="nav-link smooth-transition d-none nav-search-link"
              to="/user/search"
              activeClassName="active"
              exact
              title="Search"
            >
              <Icon name="search" height={20} width={20} />
              <span className="d-none ml-2 nav-sm-link">Search</span>
            </NavLink>
          </li>
          <li className="nav-item mr-3 add-post-link">
            <NavLink
              className="nav-link smooth-transition"
              to="/add-post"
              activeClassName="active"
              exact
              title="Add New Post"
            >
              <Icon name="plus" height={24} width={24} />
              <span className="d-none ml-2 nav-sm-link">Add Post</span>
            </NavLink>
          </li>
          <li className="nav-item sm-nav-pic d-none mr-3">
            <Link
              className="nav-link smooth-transition"
              to={username ? `/${username}` : '/username'}
              onClick={() => {
                  history.push(`/${username}`);
                  window.location.reload();
                }}
              activeClassName="active"
              exact
              title="My Profile"
            >
              <span className="display-pic-nav">
                <span className="navbar-profile-pic">
                  <span className="">
                    <span
                      className="navbar-profile-img"
                      style={
                        picture === 'none'
                          ? { backgroundImage: `url(${defaultProfile})` }
                          : { backgroundImage: `url(${picture})` }
                      }
                    />
                  </span>
                </span>
              </span>
            </Link>
          </li>
          <li className="nav-item mr-3 lg-nav-pic">
            <Link
              className="nav-link smooth-transition dropdown"
              to="#"
              activeClassName="active"
              exact
              title="My Profile"
              id="dropdownMenu"
              data-toggle="dropdown"
            >
              <span className="display-pic-nav">
                <span className="navbar-profile-pic">
                  <span className="">
                    <span
                      className="navbar-profile-img"
                      style={
                        picture === 'none'
                          ? { backgroundImage: `url(${defaultProfile})` }
                          : { backgroundImage: `url(${picture})` }
                      }
                    />
                  </span>
                </span>

                <span className="navbar-username">{username}</span>
              </span>
            </Link>
            <div className="dropdown-menu dropdown-menu-right">
              <Link
                className="dropdown-item"
                to={username ? `/${username}` : '/username'}
                onClick={() => {
                  history.push(`/${username}`);
                  window.location.reload();
                }}
                title="My Profile"
              >
                <FontAwesomeIcon
                  icon={['fas', 'user-circle']}
                  className="icon-size mr-2"
                />
                Profile
              </Link>
              <Link
                className="dropdown-item"
                to="/user/settings"
                title="Settings"
              >
                <FontAwesomeIcon
                  icon={['fas', 'cog']}
                  className="icon-size mr-2"
                />
                Settings
              </Link>
              <div className="dropdown-divider" />
              <Link
                className="dropdown-item"
                to="#"
                title="Logout"
                onClick={handleLogout}
              >
                <FontAwesomeIcon
                  icon={['fas', 'sign-out-alt']}
                  className="icon-size mr-2"
                />
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  logoutAction: PropTypes.func.isRequired,
  login: PropTypes.objectOf(PropTypes.any).isRequired,
  activityAction: PropTypes.func.isRequired,
  notificationActivities: PropTypes.objectOf(PropTypes.any).isRequired,
  profile: PropTypes.string.isRequired,
};

const mapStateToProps = ({ login, notificationActivities }) => ({
  login,
  notificationActivities,
});

export default connect(mapStateToProps, { logoutAction, activityAction })(
  NavBar
);

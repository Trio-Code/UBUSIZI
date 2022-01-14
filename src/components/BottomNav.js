/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import logoutAction from '../redux/actions/user/logout';
import Icon from './Icon';

const NavBar = ({ data, logoutAction: logout, login }) => {
  const history = useHistory();
  useEffect(() => {
    if (login.status === 'user_logout_success') {
      localStorage.removeItem('UBUSIZI_USER_TOKEN');
      localStorage.removeItem('UBUSIZI_USER_ID');
      localStorage.removeItem('UBUSIZI_USER_DATA');
      return history.push('/accounts/login');
    }
    return undefined;
  }, [login]);

  return (
    <nav className="navbar navbar-expand-lg bottom-main-nav d-none fixed-bottom bg-white navbar-light">
      <div className="container">
        <ul className="nav bottom-nav justify-content-center">
          <li className="nav-item mr-3">
            <NavLink
              exact
              to="/"
              className="nav-link smooth-transition"
              activeClassName="active"
              title="Homepage"
            >
              <span className="d-block bottom-icon text-center">
                <Icon name="home" height={24} width={24} />
              </span>
              <span className="text-center nav-sm-link">Home</span>
            </NavLink>
          </li>

          <li className="nav-item mr-3">
            <NavLink
              className="nav-link smooth-transition"
              to="/account/activity"
              activeClassName="active"
              exact
              title="Activity"
            >
              <span className="d-block bottom-icon text-center">
                <Icon name="heart2" height={24} width={24} />
              </span>
              <span className="text-center nav-sm-link">Activity</span>
            </NavLink>
          </li>

          <li className="nav-item mr-3">
            <NavLink
              className="nav-link smooth-transition"
              to="/add-post"
              activeClassName="active"
              exact
              title="Add New Post"
            >
              <span className="d-block bottom-icon text-center">
                <Icon name="plus" height={24} width={24} />
              </span>
              <span className="text-center nav-sm-link">Post</span>
            </NavLink>
          </li>

          <li className="nav-item mr-3">
            <Link
              className="nav-link smooth-transition bottom-acct-link"
              to="/user/settings"
              activeClassName="active"
              exact
              title="Account"
            >
              <span className="d-block bottom-icon-acct-div text-center">
                <FontAwesomeIcon
                  icon={['fas', 'user-alt']}
                  className="bottom-acct-icon"
                />
              </span>
              <span className="text-center nav-sm-link">Account</span>
            </Link>
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
};

const mapStateToProps = ({ login }) => ({ login });

export default connect(mapStateToProps, { logoutAction })(NavBar);

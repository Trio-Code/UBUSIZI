/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logoutAction from '../redux/actions/user/logout';

const Settings = ({ logoutAction: logout, login }) => {
  const history = useHistory();
  useEffect(() => {
    if (login.status === 'user_logout_success') {
      localStorage.removeItem('UBUSIZI_USER_TOKEN');
      localStorage.removeItem('UBUSIZI_USER_ID');
      localStorage.removeItem('UBUSIZI_USER_DATA');
      localStorage.removeItem('UBUSIZI_USER_PIC');
      return history.push('/accounts/login');
    }
    return undefined;
  }, [login]);

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="text-center border rounded settings bg-white">
      <p className="set-text">
        <FontAwesomeIcon icon={['fas', 'cog']} className="setting-icon mr-2" />
        Settings
      </p>
      <p className="text-secondary text-sec">
        Here you can edit and change your account and profile
      </p>
      <span className="divider" />
      <span className="settings-link">
        <Link className="" to="/users/edit/profile">
          Edit Profile
        </Link>
      </span>
      <hr />
      <span className="divider" />
      <span className="settings-link">
        <Link className="" to="/users/edit/change-password">
          Change Password
        </Link>
      </span>
      <span className="divider sett-link-divider" />
      <span className="settings-link sett-link d-none">
        <Link className="" to="#" onClick={handleLogout}>
          Logout
        </Link>
      </span>
    </div>
  );
};

Settings.propTypes = {
  logoutAction: PropTypes.func.isRequired,
  login: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ login }) => ({ login });

export default connect(mapStateToProps, { logoutAction })(Settings);

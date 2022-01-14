import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logoutAction from '../redux/actions/admin/logout';
import Logo from '../assets/images/avat1.png';

const SideBar = ({ logoutAction: logout, admin }) => {
  const history = useHistory();
  useEffect(() => {
    if (admin.status === 'admin_logout_success') {
      localStorage.removeItem('UBUSIZI_ADMIN_TOKEN');
      return history.push('/admin/login');
    }
    return undefined;
  }, [admin]);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav
      className="col-md-2 d-none d-md-block sidebar"
      style={{ backgroundColor: '#f6f5fa' }}
    >
      <div className="sidebar-sticky">
        <div className="sidebar-img text-center mt-5">
          <p>
            <img src={Logo} alt="Logo" width="150" height="150" />
          </p>
        </div>
        <ul className="nav flex-column dash-nav">
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              to="/admin/home"
              activeClassName="active"
            >
              <span className="">
                <FontAwesomeIcon icon={['fas', 'home']} />
              </span>
              <span className="ml-2">Overview</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              to="/admin/reports/posts"
              activeClassName="active"
            >
              <span className="">
                <FontAwesomeIcon icon={['fas', 'flag']} />
              </span>
              <span className="ml-2">Posts Reports</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              to="/admin/reports/accounts"
              activeClassName="active"
            >
              <span className="">
                <FontAwesomeIcon icon={['fas', 'flag']} />
              </span>
              <span className="ml-2">Accounts Reports</span>
            </NavLink>
          </li>
          <li className="nav-item ml-3">
            <button
              type="button"
              className="btn btn-warning py-6 mt-3"
              onClick={handleLogout}
            >
              Logout{' '}
              <FontAwesomeIcon
                icon={['fas', 'sign-out-alt']}
                className="ml-2"
              />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

SideBar.propTypes = {
  logoutAction: PropTypes.func.isRequired,
  admin: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ admin }) => ({ admin });

export default connect(mapStateToProps, { logoutAction })(SideBar);

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Logo from '../../components/usage/Logo';
import loginAction from '../../redux/actions/admin/login';

const Login = ({ loginAction: login, admin }) => {
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordShown, setPasswordShow] = useState(false);

  const togglEye = isPasswordShown ? 'Hide' : 'Show';

  const showLoginPassword = () => {
    setPasswordShow(!isPasswordShown);
  };
  useEffect(() => {
    if (localStorage.getItem('UBISIZI_ADMIN_TOKEN')) {
      return history.push('/admin/home');
    }

    if (admin.status === 'admin_login_success') {
      setSubmitting(false);
      setUsername('');
      setPassword('');
      setError('');

      localStorage.setItem('UBUSIZI_ADMIN_TOKEN', admin.token);
      return history.push('/admin/home');
    }

    if (admin.status === 'admin_login_error') {
      setSubmitting(false);
      return setError(admin.error.message);
    }

    return undefined;
  }, [admin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };

    if (!username || !password) {
      return setError('All fields are required');
    }
    setError('');
    setSubmitting(true);
    return login(data);
  };

  return (
    <div className="wrapper">
      <div className="container-fluid">
        <div className="admin-form-div" style={{ backgroundColor: '#fafafa' }}>
          <div className="form-content pt-3 pb-5 bg-white">
            <Logo />
            <form className="user-form mt-3 px-5">
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control gray-input no-shadow"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <div className="input-group">
                  <input
                    type={isPasswordShown ? 'text' : 'password'}
                    className="form-control gray-input gray-pwd-input no-shadow"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text append-style cursor-pointer font-weight-bold"
                      onClick={showLoginPassword}
                    >
                      {togglEye}
                    </span>
                  </div>
                </div>
              </div>
              {error ? (
                <p className="text-danger text-center font-weight-bold text-font-15">
                  {error}
                </p>
              ) : null}
              <div className="form-group">
                {submitting ? (
                  <button
                    className="btn btn-warning form-control"
                    disabled
                    type="button"
                  >
                    <span className="spinner-border spinner-border-sm d-block mx-auto" />
                  </button>
                ) : (
                  <button
                    className="btn btn-warning form-control py-1 font-weight-bold text-font-15"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Log In
                  </button>
                )}
              </div>
              <p className="text-center text-font-15 mt-4 text-secondary">
                Login as admin to proceed to the dashboard.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
  admin: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ admin }) => ({ admin });

export default connect(mapStateToProps, { loginAction })(Login);

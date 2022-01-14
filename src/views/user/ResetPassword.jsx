/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Footer from '../../components/Footer';
import Logo from '../../components/usage/Logo';
import validator from '../../helpers/validator';
import newPasswordAction from '../../redux/actions/user/newPassword';

const ResetPassword = ({
  location,
  newPasswordAction: newAction,
  newPassword,
}) => {
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setPasswordShow] = useState(false);
  const [changePath, setChangePath] = useState(true);

  useEffect(() => {
    const reseting = location.search.indexOf('?token=') !== -1;
    const successPage = location.search.indexOf('?reset=success') !== -1;
    if (!reseting && !(successPage && resetSuccess)) {
      return history.push('/accounts/login');
    }

    if (newPassword.status === 'success') {
      setSubmitting(false);
      setError('');
      setPassword('');
      setResetSuccess(true);
      if (changePath) {
        setChangePath(false);
        return history.replace(`${location.pathname}?reset=success`);
      }
    }

    if (newPassword.status === 'error') {
      setSubmitting(false);
      return setError(newPassword.error.message);
    }

    return undefined;
  }, [newPassword]);

  const togglEye = isPasswordShown ? 'Hide' : 'Show';

  const showLoginPassword = () => {
    setPasswordShow(!isPasswordShown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      password,
    };

    const validationErrors = await validator({ password });
    if (validationErrors.length > 0) return setError(validationErrors);

    const urlToken = location.search.slice(
      location.search.indexOf('?token=') + 7,
      location.search.length
    );

    setError('');
    setSubmitting(true);
    return newAction(data, urlToken);
  };

  return (
    <div className="wrapper">
      <div className="container-fluid">
        <div
          className="new-pwd-form-div pb-5"
          style={{ backgroundColor: '#fafafa' }}
        >
          <div className="form-content py-3 bg-white">
            <Logo />
            {resetSuccess ? (
              <>
                <span
                  className="text-center text-secondary d-block mb-2"
                  style={{ fontSize: 50 }}
                >
                  <FontAwesomeIcon icon={['fas', 'check-circle']} />
                </span>
                <h5
                  className="section-title text-uppercase text-center py-0 px-3 m-0 text-secondary font-weight-bold"
                  style={{ fontSize: 18 }}
                >
                  Reseting Password Completed
                </h5>
                <p
                  className="text-secondary font-smooth font-italic text-center mt-2 px-2"
                  style={{ fontSize: 14.5 }}
                >
                  Your password was reset successfully, proceed to login!
                </p>
                <div className="text-center">
                  <Link
                    to="/accounts/login"
                    className="btn btn-warning font-weight-bold text-white font-smooth mt-3 px-4"
                    style={{ fontSize: 15, borderRadius: 20 }}
                  >
                    Go To Login
                  </Link>
                </div>
              </>
            ) : (
              <form className="user-form mt-5 px-5">
                <div className="form-group mt-4">
                  <div className="input-group">
                    <input
                      type={isPasswordShown ? 'text' : 'password'}
                      className="form-control gray-input gray-pwd-input no-shadow"
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      maxLenght={25}
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
                      Reset Password
                    </button>
                  )}
                </div>
                <p className="text-center text-font-15 mt-4 mb-2 text-secondary">
                  Provide a new password to proceed.
                </p>
              </form>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

ResetPassword.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  newPasswordAction: PropTypes.func.isRequired,
  newPassword: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ newPassword }) => ({ newPassword });

export default connect(mapStateToProps, { newPasswordAction })(ResetPassword);

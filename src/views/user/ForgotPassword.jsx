/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../../components/Footer';
import Logo from '../../components/usage/Logo';
import resetPasswordAction from '../../redux/actions/user/resetPassword';

const Login = ({ resetPasswordAction: resetAction, resetPassword }) => {
  const history = useHistory();
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [account, setAccount] = useState('');

  useEffect(() => {
    if (localStorage.getItem('UBUSIZI_USER_TOKEN')) {
      return history.push('/');
    }

    if (resetPassword.status === 'success') {
      setStatus('success');
      setError('');
      setAccount('');
      return history.push('/user/success?action=reset-password');
    }

    if (resetPassword.status === 'error') {
      setStatus('');
      return setError(resetPassword.error.message);
    }

    return undefined;
  }, [resetPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { account };

    setError('');
    setStatus('submitting');
    return resetAction(data);
  };

  return (
    <div className="wrapper">
      <div className="container-fluid">
        <div
          className="forgot-pwd-form-div"
          style={{ backgroundColor: '#fafafa' }}
        >
          <div className="form-content py-3 bg-white">
            <Logo />
            <form className="user-form mt-3 px-5">
              <p className="text-center text-font-15 mt-2 text-secondary">
                Provide your email / username to recieve a reset password link.
              </p>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control gray-input no-shadow"
                  placeholder="Username or email"
                  value={account}
                  onChange={(e) => {
                    setAccount(e.target.value);
                  }}
                />
              </div>

              {error ? (
                <p className="text-danger text-center font-weight-bold text-font-15">
                  {error}
                </p>
              ) : null}
              <div className="form-group">
                {status === 'submitting' ? (
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
                    Proceed
                  </button>
                )}
              </div>
            </form>
          </div>
          <div className="member-content py-3 text-center mt-3">
            <span className="text-center text-secondary text-font-15 mr-2">
              Remembered your password?
            </span>
            <Link
              to="/accounts/login"
              className="font-weight-bold text-font-15"
              style={{ color: '#306799' }}
            >
              Log in
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

Login.propTypes = {
  resetPasswordAction: PropTypes.func.isRequired,
  resetPassword: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ resetPassword }) => ({ resetPassword });

export default connect(mapStateToProps, { resetPasswordAction })(Login);

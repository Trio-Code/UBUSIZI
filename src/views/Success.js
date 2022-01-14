/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Error from '../components/usage/Error';
import clearResetPwdAction from '../redux/actions/user/clearResetPwd';
import clearSignUpAction from '../redux/actions/user/clearSignUp';

const Success = ({
  location,
  resetPassword,
  user,
  clearResetPwdAction: clearResetPwd,
  clearSignUpAction: clearSignUp,
}) => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [status, setStatus] = useState('initial');

  useEffect(() => {
    const verifying = location.search.indexOf('?action=verify-account') !== -1;
    const reseting = location.search.indexOf('?action=reset-password') !== -1;
    if (!verifying && !reseting) {
      return history.push('/accounts/login');
    }
    if (verifying) {
      setTitle('Verify Your Account');
      setDescr(
        'Your account was created successfully, now go to your email to verify this account! (The email may take a while, please be patient.)'
      );
    } else {
      setTitle('Pasword Reset successfully');
      setDescr(
        'Your password was reset successfully, now go to your email to complete this process! (The email may take a while, please be patient.)'
      );
    }
    if (status === 'initial') {
      clearResetPwd();
      clearSignUp();
      setStatus('running');
    }
    if (resetPassword.status === 'clear_reset_password') {
      return console.log('Cleared Forgot Password');
    }
    if (user.status === 'clear_sign_up') {
      return console.log('Cleared Sign Up');
    }

    return undefined;
  }, []);

  return (
    <div className="success-page">
      <Error
        title={title}
        description={descr}
        icon="check-circle"
        marginTop="0"
      />
      <Link
        to="/accounts/login"
        className="btn btn-secondary font-weight-bold text-white mt-4 px-4"
        style={{ fontSize: 14, borderRadius: 20 }}
      >
        Go To Login
      </Link>
    </div>
  );
};

Success.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  resetPassword: PropTypes.objectOf(PropTypes.any).isRequired,
  clearResetPwdAction: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  clearSignUpAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ resetPassword, user }) => ({ resetPassword, user });

export default connect(mapStateToProps, {
  clearResetPwdAction,
  clearSignUpAction,
})(Success);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PostPP from '../assets/images/avat1.png';
import changePasswordAction from '../redux/actions/user/changePassword';

const ChangePassword = ({
  changePasswordAction: changeAction,
  changePassword,
  info,
}) => {
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);
  const [successAction, setSuccessAction] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('UBUSIZI_USER_TOKEN')) {
      return history.push('/accounts/login');
    }

    if (changePassword.status === 'change_password_success') {
      setSubmitting(false);
      setError([]);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSuccessAction(true);
      document.getElementById('my-form').reset();
    }

    if (changePassword.status === 'change_password_error') {
      setSubmitting(false);
      return setError([changePassword.error.message]);
    }

    return undefined;
  }, [changePassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      return setError('All fields are required');
    }

    if (newPassword !== confirmPassword) {
      return setError("The new password and confirmation password don't match");
    }

    if (successAction) {
      setSuccessAction(false);
    }

    const data = {
      oldPassword,
      newPassword,
    };
    setError('');
    setSubmitting(true);
    return changeAction(data);
  };

  const clearForm = () => {
    setSuccessAction(false);
  };

  return (
    <div className="font-weight-bold font-size">
      <div className="row user">
        <label className="control-label col-sm-3 alignment">
          <img
            src={info.picture !== 'none' ? info.picture : PostPP}
            alt="owner"
            width="40"
            height="40"
            className="mt-n2 d-inline rounded-circle border mr-0"
          />
        </label>
        <div className="col-sm-3">
          <p>{info.username}</p>
        </div>
      </div>
      <div className="separator" />
      <form className="form-horizontal" id="my-form">
        {successAction ? (
          <div className="alert alert-primary alert-dismissible mt-4 fade show">
            <button type="button" className="close" onClick={clearForm}>
              &times;
            </button>
            <strong className="d-block">
              <FontAwesomeIcon
                icon={['fas', 'check-circle']}
                className="mr-1"
              />
              Success!
            </strong>
            <span className="alert-txt mt-2">
              Password Changed Successfully!
            </span>
          </div>
        ) : null}
        <div className="form-group row">
          <label className="control-label col-sm-3 alignment" htmlFor="oldpwd">
            Old Password
          </label>
          <div className="col-sm-9">
            <input
              type="password"
              className="form-control"
              id="oldpwd"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="control-label col-sm-3 alignment" htmlFor="newpwd">
            New Password
          </label>
          <div className="col-sm-9">
            <input
              type="password"
              className="form-control"
              id="newpwd"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            className="control-label col-sm-3 alignment"
            htmlFor="confirm-newpwd"
          >
            Confirm New Password
          </label>
          <div className="col-sm-9">
            <input
              type="password"
              className="form-control"
              id="confirm-newpwd"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        {error ? (
          <div className="form-groupe row">
            <label className="control-label col-sm-3" />
            <div className="col-sm-9">
              <p className="text-danger font-weight-bold text-font-15">
                {error}
              </p>
            </div>
          </div>
        ) : null}
        <div className="form-group row">
          <label className="control-label col-sm-3" />
          {submitting ? (
            <div className="col-sm-9">
              <button
                type="submit"
                className="btn btn-warning font-size font-weight-bold spinner-button"
                disabled
              >
                <span className="spinner-border spinner-border-sm d-block" />
              </button>
            </div>
          ) : (
            <div className="col-sm-9">
              <button
                type="submit"
                className="btn btn-primary font-size font-weight-bold"
                onClick={handleSubmit}
              >
                Change Password
              </button>
            </div>
          )}
        </div>
        <div className="form-group row">
          <label className="control-label col-sm-3" />
          <div className="col-sm-9 mr-0">
            <Link
              to="/change-password"
              className="btn btn-unique text-primary alignment-reverse"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

ChangePassword.propTypes = {
  changePasswordAction: PropTypes.func.isRequired,
  changePassword: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ changePassword }) => ({ changePassword });

export default connect(mapStateToProps, { changePasswordAction })(
  ChangePassword
);

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../../components/Footer';
import Logo from '../../components/usage/Logo';
import UserNavbar from '../../components/UserNavbar';
import BottomNav from '../../components/BottomNav';
import NavBar from '../../components/NavBar';
import reportAccountAction from '../../redux/actions/report/reportAccount';

const AccountReport = ({
  match,
  reportAccountAction: reportAction,
  reportAccount,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [successAction, setSuccessAction] = useState(false);
  const [reason, setReason] = useState('');
  const [loggedInData, setLoggedInData] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userToken = localStorage.getItem('UBUSIZI_USER_TOKEN');
    const userPic = localStorage.getItem('UBUSIZI_USER_PIC');
    const userData = localStorage.getItem('UBUSIZI_USER_DATA');

    if (!userToken || !userPic) {
      setIsLoggedIn(false);
    } else {
      setLoggedInData(userData);
    }

    if (reportAccount.status === 'success') {
      setSuccessAction(true);
      setSubmitting(false);
      setError('');
      setReason('');
      document.getElementById('my-form').reset();
    }

    if (reportAccount.status === 'error') {
      setSubmitting(false);
      setError(reportAccount.error.message);
    }
    return undefined;
  }, [reportAccount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { reason };

    if (successAction) {
      setSuccessAction(false);
    }
    setSubmitting(true);
    return reportAction(match.params.userId, data);
  };

  const clearForm = () => {
    setSuccessAction(false);
  };

  return (
    <div className="wrapper">
      {isLoggedIn ? (
        <>
          <UserNavbar data={loggedInData} />
          <BottomNav data={loggedInData} />
        </>
      ) : (
        <NavBar />
      )}
      <div className="container-fluid">
        <div className="form-div" style={{ backgroundColor: '#fafafa' }}>
          <div className="form-content py-3 bg-white">
            <Logo />
            <form className="user-form mt-3 px-5" id="my-form">
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control gray-input caption-text-area  no-shadow"
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Reason for reporting"
                />
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
                    className="btn btn-warning btn-danger form-control font-weight-bold text-font-15"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Report
                  </button>
                )}
              </div>
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
                    Account Reported Successfully!
                  </span>
                </div>
              ) : null}
            </form>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

AccountReport.propTypes = {
  reportAccountAction: PropTypes.func.isRequired,
  reportAccount: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.string.isRequired,
};

const mapStateToProps = ({ reportAccount }) => ({ reportAccount });

export default connect(mapStateToProps, { reportAccountAction })(AccountReport);

/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import verificationRequestAction from '../../redux/actions/poetVerification/verificationRequest';
import Footer from '../../components/Footer';
import Logo from '../../components/usage/Logo';
import UserNavbar from '../../components/UserNavbar';
import BottomNav from '../../components/BottomNav';
import NavBar from '../../components/NavBar';

const VerificationRequest = ({
  verificationRequestAction: verificationAction,
  verificationRequest,
}) => {
  const [content1, setContent1] = useState('');
  const [content2, setContent2] = useState('');
  const [content3, setContent3] = useState('');
  const [reason, setReason] = useState('');
  const [successAction, setSuccessAction] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loggedInData, setLoggedInData] = useState('');

  useEffect(() => {
    const userToken = localStorage.getItem('UBUSIZI_USER_TOKEN');
    const userPic = localStorage.getItem('UBUSIZI_USER_PIC');
    const userData = localStorage.getItem('UBUSIZI_USER_DATA');

    if (!userToken || !userPic) {
      setIsLoggedIn(false);
    } else {
      setLoggedInData(userData);
    }
    if (verificationRequest.status === 'success') {
      setSuccessAction(true);
      setSubmitting(false);
      setContent1('');
      setContent2('');
      setContent3('');
      setReason('');
      setError('');
      document.getElementById('my-form').reset();
    }
    if (verificationRequest.status === 'error') {
      setError(verificationRequest.error.message);
      setSubmitting(false);
      setSuccessAction(false);
    }
  }, [verificationRequest]);

  const handleFileChange1 = (e) => {
    e.target.files[0] ? setContent1(e.target.files[0]) : null;
  };
  const handleFileChange2 = (e) => {
    e.target.files[0] ? setContent2(e.target.files[0]) : null;
  };
  const handleFileChange3 = (e) => {
    e.target.files[0] ? setContent3(e.target.files[0]) : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content1) {
      return setError('File 1 is mandatory');
    }
    if (!reason) {
      return setError(
        'You must provide a description for your verification request'
      );
    }

    const payload = new FormData();
    payload.append('content1', content1);
    payload.append('reason', reason);
    if (content2) {
      payload.append('content2', content2);
    }
    if (content3) {
      payload.append('content3', content3);
    }
    if (successAction) {
      setSuccessAction(false);
    }
    setError('');
    setSubmitting(true);
    return verificationAction(payload);
  };

  const content1Name = content1 ? content1.name : '';
  const content2Name = content2 ? content2.name : '';
  const content3Name = content3 ? content3.name : '';

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
        <div className="" style={{ backgroundColor: '#fafafa' }}>
          <div className="font-size-18 col-md-9 text-center mx-auto bg-white rounded">
            <Logo />
            <div id="ver-forms" className="mt-3 mb-5 verif-form">
              <span className="text-secondary font-size-15 font-weight-bold">
                You must be a verified poet to be allowed to post
              </span>
              <p className="col-md-9 mx-auto font-size-15 text-secondary">
                To be verified as a poet you will need to give one or more poems of yours and a description for your verification request.
              </p>
              <form className="form-horizontal pb-3" id="my-form">
                <span className="text-secondary font-size-15 font-weight-bold">
                  Verification request description
                </span>
                <div className="form-group row">
                  <label
                    className="control-label col-sm-3 alignment"
                    htmlFor="reason"
                  >
                    Description
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control reason-box"
                      id="reason"
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>
                </div>
                <span className="text-secondary font-size-15 font-weight-bold">
                  Your reference files
                </span>
                <div className="form-group row">
                  <label className="pt-1 control-label col-sm-3 alignment mr-3">
                    <span className="upload-btn font-weight-bold">
                      <input
                        type="file"
                        id="content1"
                        name="user[image]"
                        multiple={false}
                        required
                        accept=".mp4,.avi,.mkv,.png,.jpg,.docx,.pdf"
                        onChange={handleFileChange1}
                      />
                      <label
                        htmlFor="content1"
                        className="control-label border rounded box-color font-weight-bold"
                      >
                        Upload File 1
                      </label>
                    </span>
                  </label>
                  <span className="text-dark text-font-15 text-center song-indicator rounded py-2 col-sm-5">
                    {content1
                      ? content1Name.length > 50
                        ? `${content1Name.slice(0, 50)}__`
                        : content1Name
                      : 'File 1 goes here (Mandatory)'}
                    {}
                  </span>
                </div>
                <div className="form-group row">
                  <label className="pt-1 control-label col-sm-3 alignment mr-3">
                    <span className="upload-btn font-weight-bold">
                      <input
                        type="file"
                        id="content2"
                        name="user[image]"
                        multiple={false}
                        required
                        onChange={handleFileChange2}
                      />
                      <label
                        htmlFor="content2"
                        className="control-label border rounded box-color font-weight-bold"
                      >
                        Upload File 2
                      </label>
                    </span>
                  </label>
                  <span className="text-dark text-font-15 text-center song-indicator rounded py-2 col-sm-5">
                    {content2
                      ? content2Name.length > 50
                        ? `${content2Name.slice(0, 50)}__`
                        : content2Name
                      : 'File 2 goes here (Optional)'}
                    {}
                  </span>
                </div>
                <div className="form-group row">
                  <label className="pt-1 control-label col-sm-3 alignment mr-3">
                    <span className="upload-btn font-weight-bold">
                      <input
                        type="file"
                        id="content3"
                        name="user[image]"
                        multiple={false}
                        required
                        onChange={handleFileChange3}
                      />
                      <label
                        htmlFor="content3"
                        className="control-label border rounded box-color font-weight-bold"
                      >
                        Upload File 3
                      </label>
                    </span>
                  </label>
                  <span className="text-dark text-font-15 text-center song-indicator rounded py-2 col-sm-5">
                    {content3
                      ? content3Name.length > 50
                        ? `${content3Name.slice(0, 50)}__`
                        : content3Name
                      : 'File 3 goes here (Optional)'}
                    {}
                  </span>
                </div>
                <div className="form-group row">
                  <label className="control-label col-sm-3" />
                  <div className="col-sm-9">
                    {submitting ? (
                      <button
                        type="button"
                        className="btn btn-warning font-size-16 font-weight-bold float-left submitting-btn"
                        disabled
                      >
                        <span className="spinner-border spinner-border-sm d-block my-1" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-warning font-size-16 font-weight-bold float-left px-4"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
                {error ? (
                  <div className="alert alert-danger alert-dismissible mt-3 fade show">
                    <button
                      type="button"
                      className="close"
                      onClick={() => setError('')}
                    >
                      &times;
                    </button>
                    <strong className="d-block">
                      <FontAwesomeIcon
                        icon={['fas', 'times-circle']}
                        className="mr-1"
                      />
                      Error!
                    </strong>
                    <span className="alert-txt mt-2">{error}</span>
                  </div>
                ) : null}
                {successAction ? (
                  <div className="alert alert-primary alert-dismissible mt-3 fade show">
                    <button
                      type="button"
                      className="close"
                      onClick={() => setSuccessAction(false)}
                    >
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
                      Verification Requested Successfully!
                    </span>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

VerificationRequest.propTypes = {
  verificationRequestAction: PropTypes.func.isRequired,
  verificationRequest: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ verificationRequest }) => ({ verificationRequest });

export default connect(mapStateToProps, { verificationRequestAction })(
  VerificationRequest
);

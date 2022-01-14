/* eslint-disable no-unused-expressions */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserNavbar from '../../components/UserNavbar';
import Logo from '../../components/usage/Logo';
import addPostAction from '../../redux/actions/post/addPost';

export const ProceedPost = ({ addPost, addPostAction: addAction }) => {
  const history = useHistory();
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successAction, setSuccessAction] = useState(false);
  // const [loggedInPic, setLoggedInPic] = useState('');
  const [error, setError] = useState('');
  const [proceedData, setProceedData] = useState({});
  const [loggedInData, setLoggedInData] = useState({});
  const [caption, setCaption] = useState('');

  useEffect(() => {
    const userToken = localStorage.getItem('UBUSIZI_USER_TOKEN');
    // const userPic = localStorage.getItem('UBUSIZI_USER_PIC');
    const userData = localStorage.getItem('UBUSIZI_USER_DATA');
    if (!userToken || !userData) {
      return history.push('/accounts/login');
    }
    setLoggedInData(JSON.parse(userData));
    // setLoggedInPic(userPic);
    if (!localStorage.getItem('UBUSIZI_POST_VID_PROCEED')) {
      return history.push('/add-post');
    }
    const savedData = localStorage.getItem('UBUSIZI_POST_VID_PROCEED');
    setProceedData(JSON.parse(savedData));
    setSubmitting(false);
    setSuccessAction(false);

    if (addPost.status === 'success') {
      setSubmitting(false);
      setSuccessAction(true);
      setFile(null);
      setProceedData('');
      history.push('/');
    }

    if (addPost.status === 'error') {
      setSubmitting(false);
      return setError([addPost.error.message]);
    }
    return undefined;
  }, [addPost]);

  const handleFileChange = (e) => {
    e.target.files[0] ? setFile(e.target.files[0]) : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      return setError('Please upload a video!');
    }
    const payload = new FormData();
    if (caption) {
      payload.append('type', proceedData.type);
      payload.append('caption', proceedData.caption);
      payload.append('content', file);
    } else {
      payload.append('type', proceedData.type);
      payload.append('content', file);
    }
    if (successAction) {
      setSuccessAction(false);
    }
    setError('');
    setSubmitting(true);
    return addAction(payload);
  };
  const handleBack = (e) => {
    e.preventDefault();
    localStorage.removeItem('UBUSIZI_POST_VID_PROCEED');
    return history.push('/add-post');
  };

  const fileName = file ? file.name : '';

  return (
    <div className="wrapper">
      <UserNavbar data={loggedInData} />
      <div className="container">
        <div
          className="post-form-div mb-4"
          style={{ backgroundColor: '#fafafa' }}
        >
          <div className="form-content py-3 bg-white">
            <Logo marginTop={15} />
            <p className="text-center text-secondary font-weight-bold px-3">
              Upload and post your video.
            </p>
            <form className="user-form mt-3 px-5">
              <p className="text-dark text-font-15 text-center song-indicator py-2 px-3">
                {file
                  ? fileName.length > 50
                    ? `${fileName.slice(0, 50)}__`
                    : fileName
                  : 'Your File goes here'}
                {}
              </p>
              <input
                type="file"
                id="videoFile"
                name="user[image]"
                multiple={false}
                accept=".mp4,.avi,.mkv"
                required
                onChange={handleFileChange}
              />
              <label
                htmlFor="videoFile"
                className="file-label mt-2 text-white text-font-15 cursor-pointer bg-primary"
              >
                Upload Video
              </label>
              <div className="form-group mt-3">
                <textarea
                  type="text"
                  className="form-control gray-input caption-text-area  no-shadow"
                  placeholder="Caption"
                  maxLength="189"
                  onChange={(e) => {
                    setCaption(e.target.value);
                  }}
                  value={caption}
                />
                <span className="text-secondary sec-text">
                  The caption is optional!
                </span>
              </div>
              {error ? (
                <div className="alert alert-danger alert-dismissible mt-4 fade show">
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
                <div className="alert alert-primary alert-dismissible mt-4 fade show">
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
                    Post Added Successfully!
                  </span>
                </div>
              ) : null}
              <div className="form-group mt-4">
                {submitting ? (
                  <button
                    type="button"
                    className="text-white btn btn-secondary px-5 mt-2 cursor-disabled"
                    style={{ borderRadius: 20 }}
                    disabled
                  >
                    Adding
                  </button>
                ) : (
                  <button
                    className="text-white mt-2 btn btn-warning text-font-15 form-control"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Add Post
                  </button>
                )}
                <button
                  className="text-white btn btn-secondary mt-2 text-font-15 form-control"
                  type="button"
                  onClick={handleBack}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

ProceedPost.propTypes = {
  addPostAction: PropTypes.func.isRequired,
  addPost: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ addPost }) => ({ addPost });

export default connect(mapStateToProps, { addPostAction })(ProceedPost);

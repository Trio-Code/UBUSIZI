/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserNavbar from '../../components/UserNavbar';
import Logo from '../../components/usage/Logo';
import validator from '../../helpers/validator';
import addPostAction from '../../redux/actions/post/addPost';

export const ProceedPost = ({ addPost, addPostAction: addAction }) => {
  const history = useHistory();
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successAction, setSuccessAction] = useState(false);
  // const [loggedInPic, setLoggedInPic] = useState('');
  const [error, setError] = useState('');
  const [color, setColor] = useState('');
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
    // setLoggedInPic(userPic);
    setLoggedInData(JSON.parse(userData));
    if (!localStorage.getItem('UBUSIZI_POST_TXT_PROCEED')) {
      return history.push('/add-post');
    }
    const savedData = localStorage.getItem('UBUSIZI_POST_TXT_PROCEED');
    setProceedData(JSON.parse(savedData));
    setSubmitting(false);
    setSuccessAction(false);

    if (addPost.status === 'success') {
      setSubmitting(false);
      setSuccessAction(true);
      setContent('');
      setColor('');
      setCaption('');
      setProceedData('');
      history.push('/');
    }

    if (addPost.status === 'error') {
      setSubmitting(false);
      return setError([addPost.error.message]);
    }
    return undefined;
  }, [addPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;
    if (caption) {
      data = {
        type: proceedData.type,
        caption: proceedData.caption,
        color,
        content,
      };
    } else {
      data = {
        type: proceedData.type,
        color,
        content,
      };
    }
    if (!color) {
      return setError('Please add a Text Background!');
    }
    const validationErrors = await validator({ content });
    if (validationErrors.length > 0) return setError(validationErrors);
    if (successAction) {
      setSuccessAction(false);
    }
    setError('');
    setSubmitting(true);
    return addAction(data);
  };
  const handleBack = (e) => {
    e.preventDefault();
    localStorage.removeItem('UBUSIZI_POST_TXT_PROCEED');
    return history.push('/add-post');
  };

  return (
    <div className="wrapper">
      <UserNavbar data={loggedInData} />
      <div className="container">
        <div
          className="post-form-div mb-4"
          style={{ backgroundColor: '#fafafa' }}
        >
          <div className="form-content py-3 bg-white">
            <Logo />
            <p className="text-center text-secondary font-weight-bold px-3">
              Add post content to proceed.
            </p>
            <form className="user-form mt-3 px-5">
              <div className="form-group mt-3">
                <textarea
                  type="text"
                  className="form-control gray-input content-text-area no-shadow"
                  placeholder="Content"
                  minLength="15"
                  maxLength="255"
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  value={content}
                />
              </div>
              <div className="form-group mt-3 text-center radio-content-div">
                <label className="font-weight-bold text-dark text-font-15 d-block">
                  Choose Background
                </label>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input custom-radio-dark"
                    id="dark"
                    name="textRadio"
                    onChange={() => {
                      setColor('Dark');
                    }}
                    value={color}
                  />
                  <label
                    className="custom-control-label custom-label-dark"
                    htmlFor="dark"
                  >
                    Dark
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input custom-radio-green"
                    id="green"
                    name="textRadio"
                    onChange={() => {
                      setColor('Green');
                    }}
                  />
                  <label
                    className="custom-control-label custom-label-green"
                    htmlFor="green"
                  >
                    Green
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input custom-radio-blue"
                    id="blue"
                    name="textRadio"
                    onChange={() => {
                      setColor('Blue');
                    }}
                  />
                  <label
                    className="custom-control-label custom-label-blue"
                    htmlFor="blue"
                  >
                    Blue
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input custom-radio-red"
                    id="red"
                    name="textRadio"
                    onChange={() => {
                      setColor('Red');
                    }}
                  />
                  <label
                    className="custom-control-label custom-label-red"
                    htmlFor="red"
                  >
                    Red
                  </label>
                </div>
              </div>
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

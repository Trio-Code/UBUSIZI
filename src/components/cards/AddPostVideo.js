/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import DefaultImg from '../../assets/images/upload.png';
import addPostAction from '../../redux/actions/post/addPost';
import fetchCategoriesAction from '../../redux/actions/category/fetchCategories';

const AddPostVideo = ({
  type,
  addPostAction: addAction,
  addPost,
  fetchCategoriesAction: categoryAction,
  fetchCategories,
}) => {
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successAction, setSuccessAction] = useState(false);
  const [error, setError] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('initial');
  const history = useHistory();

  useEffect(() => {
    if (status === 'initial') {
      categoryAction();
      setStatus('fetched');
    }

    if (addPost.status === 'success') {
      setSubmitting(false);
      setSuccessAction(true);
      setFile(null);
      window.location.reload();
      window.location.replace('/');
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
    if (!category) {
      return setError('Please choose a category!');
    }
    const payload = new FormData();
    if (caption) {
      payload.append('type', type);
      payload.append('caption', caption);
      payload.append('content', file);
      payload.append('category', category);
    } else {
      payload.append('type', type);
      payload.append('content', file);
      payload.append('category', category);
    }
    if (successAction) {
      setSuccessAction(false);
    }
    setError('');
    setSubmitting(true);
    return addAction(payload);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const fileName = file ? file.name : '';

  return (
    <div>
      <div className="row">
        <div className="col-md-8 my-2 text-right pl-5">
          <div className="">
            <div className="pst-img-div vid-pst-img">
              <img
                className="image rounded add-pst-img"
                src={DefaultImg}
                alt="uploaded content"
              />
            </div>
            <p className="text-dark text-font-15 text-center song-indicator py-2 px-3">
              {file
                ? fileName.length > 50
                  ? `${fileName.slice(0, 50)}__`
                  : fileName
                : 'Your File goes here'}
              {}
            </p>
            <div className="pst-img-btn-content text-left ml-5 my-3">
              {submitting ? (
                <button
                  type="button"
                  disabled
                  className="btn btn-secondary btn-warning font-weight-bold cursor-disabled"
                >
                  Adding...
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-warning btn-warning font-weight-bold"
                  onClick={handleSubmit}
                >
                  Post Poem
                </button>
              )}
              <span className="upload-btn font-weight-bold">
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
                  className="mx-3 border rounded box-color font-weight-bold"
                >
                  Upload Video
                </label>
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-4 ml-auto py-3">
          <div className="dropdown">
            <span className="the-weight">Category</span> <br />
            <select
              className="custom-select"
              value={category}
              onChange={handleCategory}
            >
              <option value="" selected disabled hidden>
                Choose a Category
              </option>
              {fetchCategories.data
                ? fetchCategories.data.map((cat) => (
                    <option value={cat._id}>{cat.categoryName}</option>
                  ))
                : null}
            </select>
          </div>
          <div className="py-4">
            <textarea
              className="form-control box-color pst-caption-box"
              placeholder="Caption..."
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
        </div>
      </div>
      {error ? (
        <div className="alert alert-danger alert-dismissible mt-3 fade show">
          <button type="button" className="close" onClick={() => setError('')}>
            &times;
          </button>
          <strong className="d-block">
            <FontAwesomeIcon icon={['fas', 'times-circle']} className="mr-1" />
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
            <FontAwesomeIcon icon={['fas', 'check-circle']} className="mr-1" />
            Success!
          </strong>
          <span className="alert-txt mt-2">Post Added Successfully!</span>
        </div>
      ) : null}
    </div>
  );
};

AddPostVideo.propTypes = {
  addPostAction: PropTypes.func.isRequired,
  addPost: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchCategories: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchCategoriesAction: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = ({ addPost, fetchCategories }) => ({
  addPost,
  fetchCategories,
});

export default connect(mapStateToProps, {
  addPostAction,
  fetchCategoriesAction,
})(AddPostVideo);

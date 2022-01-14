/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import DefaultImg from '../../assets/images/default.png';
import addPostAction from '../../redux/actions/post/addPost';
import validator from '../../helpers/validator';
import fetchCategoriesAction from '../../redux/actions/category/fetchCategories';

const AddPostImage = ({
  type,
  addPostAction: addAction,
  addPost,
  fetchCategoriesAction: categoryAction,
  fetchCategories,
}) => {
  const [img, setImg] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successAction, setSuccessAction] = useState(false);
  const [error, setError] = useState('');
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
      setImg('');
      setCaption('');
      setCategory('');
      setError('');
    }

    if (addPost.status === 'error') {
      setSubmitting(false);
      return setError(addPost.error.message);
    }
    return undefined;
  }, [addPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!img) {
      return setError('Please upload an Image!');
    }
    if (!category) {
      return setError('Please choose a category!');
    }
    const payload = new FormData();
    if (caption) {
      payload.append('type', type);
      payload.append('caption', caption);
      payload.append('content', img);
      payload.append('category', category);
    } else {
      payload.append('type', type);
      payload.append('content', img);
      payload.append('category', category);
    }
    const validationErrors = await validator({ img });
    if (validationErrors.length > 0) return setError(validationErrors);
    if (successAction) {
      setSuccessAction(false);
    }
    setError('');
    setSubmitting(true);
    return addAction(payload);
  };

  const handleFileChange = (e) => {
    e.target.files[0] ? setImg(e.target.files[0]) : null;
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-8 my-2 text-right pl-5">
          <div className="">
            <div className="pst-img-div">
              <img
                className="image rounded add-pst-img"
                src={img ? URL.createObjectURL(img) : DefaultImg}
                alt="uploaded content"
              />
            </div>
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
                  id="postImg"
                  name="user[image]"
                  multiple={false}
                  required
                  accept=".png,.jpg"
                  className="mx-3 border rounded box-color font-weight-bold"
                  onChange={handleFileChange}
                />
                <label htmlFor="postImg">+ Select Image</label>
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-4 ml-auto py-3">
          <div className="dropdown">
            <span className="the-weight">Category</span> <br />
            <select
              className="custom-select "
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
            onClick={() => {
              setSuccessAction(false);
            }}
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

AddPostImage.propTypes = {
  addPostAction: PropTypes.func.isRequired,
  addPost: PropTypes.objectOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
  fetchCategories: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchCategoriesAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ addPost, fetchCategories }) => ({
  addPost,
  fetchCategories,
});

export default connect(mapStateToProps, {
  addPostAction,
  fetchCategoriesAction,
})(AddPostImage);

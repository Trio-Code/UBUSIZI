/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import addPostAction from '../../redux/actions/post/addPost';
import fetchCategoriesAction from '../../redux/actions/category/fetchCategories';
import validator from '../../helpers/validator';

const AddTextFields = ({
  type,
  addPostAction: addAction,
  addPost,
  fetchCategoriesAction: categoryAction,
  fetchCategories,
}) => {
  const [content, setContent] = useState('');
  const [caption, setCaption] = useState('');
  const [color, setColor] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [font, setFont] = useState('');
  const [align, setAlign] = useState('text-left');
  const [submitting, setSubmitting] = useState(false);
  const [successAction, setSuccessAction] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('initial');

  useEffect(() => {
    if (status === 'initial') {
      categoryAction();
      setStatus('fetched');
    }

    if (addPost.status === 'success') {
      setSubmitting(false);
      setSuccessAction(true);
      setContent('');
      setColor('');
      setCaption('');
      setTitle('');
      setCategory('');
      setFont('');
      setError('');
    }

    if (addPost.status === 'error') {
      setSubmitting(false);
      return setError(addPost.error.message);
    }
    return undefined;
  }, [addPost, fetchCategories, font, color]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;
    if (caption) {
      data = {
        type,
        caption,
        color,
        content,
        font,
        category,
        title,
        align,
      };
    } else {
      data = {
        type,
        color,
        content,
        font,
        category,
        title,
        align,
      };
    }
    if (!color) {
      return setError('Please add a Text Background!');
    }
    if (!category) {
      return setError('Please choose a category!');
    }
    if (!title) {
      return setError('Please add a title your poem!');
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

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div>
      <div className="row mx-auto">
        <form className="col-md-9">
          <div className="form-group pt-2">
            <div className="py-1">
              <input
                type="text"
                className={
                  font
                    ? `form-control  box-color input-sm  ${align} font-${font}`
                    : `form-control box-color ${align} input-sm`
                }
                placeholder="Title..."
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="py-1">
              <textarea
                className={
                  color === 'dark' || color === 'gray'
                    ? `form-control box-color the-text-field text-light ${align} font-${font} bg-color-${color}`
                    : `form-control box-color text-dark ${align} the-text-field font-${font} bg-color-${color}`
                }
                placeholder="Type your poem here..."
                minLength="100"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                rows={8}
              />
            </div>
            <div className="py-1">
              <textarea
                className="form-control box-color pst-caption-box"
                placeholder="Caption..."
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
          </div>
        </form>
        <div className="col-md-3 py-3 categ-choose-div">
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
          <div className="pt-3 text-center">
            <span className="font-weight-bold">Text align style</span>
            <div className="display-inline pt-3">
              <label
                className="align-container lbox-container px-2"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title="Align-left"
              >
                <input
                  type="radio"
                  name="alignRadio"
                  onChange={() => setAlign('text-left')}
                />
                <span className="lbox-checkmark">
                  <FontAwesomeIcon icon={['fas', 'align-left']} />
                </span>
              </label>
              <label
                className="align-container lbox-container px-2"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title="Align-justify"
              >
                <input
                  type="radio"
                  name="alignRadio"
                  onChange={() => setAlign('text-justify')}
                />
                <span className="lbox-checkmark">
                  <FontAwesomeIcon icon={['fas', 'align-justify']} />
                </span>
              </label>
              <label
                className="align-container lbox-container px-2"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title="Align-center"
              >
                <input
                  type="radio"
                  name="alignRadio"
                  onChange={() => setAlign('text-center')}
                />
                <span className="lbox-checkmark">
                  <FontAwesomeIcon icon={['fas', 'align-center']} />
                </span>
              </label>
              <label
                className="align-container lbox-container px-2"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title="Align-right"
              >
                <input
                  type="radio"
                  name="alignRadio"
                  onChange={() => setAlign('text-right')}
                />
                <span className="lbox-checkmark">
                  <FontAwesomeIcon icon={['fas', 'align-right']} />
                </span>
              </label>
            </div>
          </div>
          <div className="pt-3 text-center">
            <span className="font-weight-bold">Font Style</span>
            <div className="display-inline pt-3">
              <label className="fbox-container">
                <input
                  type="radio"
                  name="fontRadio"
                  onChange={() => setFont('ubuntu')}
                />
                <span className="fbox-checkmark font-ubuntu" />
              </label>
              <label className="fbox-container">
                <input
                  type="radio"
                  name="fontRadio"
                  onChange={() => setFont('brush-script')}
                />
                <span className="fbox-checkmark font-brush-script" />
              </label>
              <label className="fbox-container">
                <input
                  type="radio"
                  name="fontRadio"
                  onChange={() => setFont('french-script')}
                />
                <span className="fbox-checkmark font-french-script" />
              </label>
              <br />
              <div className="font-separator" />
              <label className="fbox-container">
                <input
                  type="radio"
                  name="fontRadio"
                  onChange={() => setFont('sansita-swashed')}
                />
                <span className="fbox-checkmark font-sansita-swashed" />
              </label>
              <label className="fbox-container">
                <input
                  type="radio"
                  name="fontRadio"
                  onChange={() => setFont('garamond')}
                />
                <span className="fbox-checkmark font-garamond" />
              </label>
              <label className="fbox-container">
                <input
                  type="radio"
                  name="fontRadio"
                  onChange={() => setFont('acme')}
                />
                <span className="fbox-checkmark font-acme" />
              </label>
            </div>
          </div>
          <div className="pt-3 text-center">
            <span className="font-weight-bold text-set-change">
              Background color
            </span>
            <div className="custom-control custom-radio custom-control-inline color-rad-div">
              <label className="tbox-container">
                <input
                  type="radio"
                  name="colorRadio"
                  onChange={() => setColor('light-orange')}
                />
                <span className="tbox-checkmark bg-color-light-orange" />
              </label>
              <label className="tbox-container">
                <input
                  type="radio"
                  name="colorRadio"
                  onChange={() => setColor('orange')}
                />
                <span className="tbox-checkmark bg-color-orange" />
              </label>
              <label className="tbox-container">
                <input
                  type="radio"
                  name="colorRadio"
                  onChange={() => setColor('blue')}
                />
                <span className="tbox-checkmark bg-color-blue" />
              </label>
              <label className="tbox-container">
                <input
                  type="radio"
                  name="colorRadio"
                  onChange={() => setColor('gray')}
                />
                <span className="tbox-checkmark bg-color-gray" />
              </label>
              <label className="tbox-container">
                <input
                  type="radio"
                  name="colorRadio"
                  onChange={() => setColor('pink')}
                />
                <span className="tbox-checkmark bg-color-pink" />
              </label>
            </div>
            <br />
            <div className="ml-auto custom-control custom-radio custom-control-inline color-rad-div">
              <label className="tbox-container">
                <input
                  type="radio"
                  name="colorRadio"
                  onChange={() => setColor('green')}
                />
                <span className="tbox-checkmark bg-color-green" />
              </label>
              <label className="tbox-container">
                <input
                  type="radio"
                  name="colorRadio"
                  onChange={() => setColor('light-red')}
                />
                <span className="tbox-checkmark bg-color-light-red" />
              </label>
              <label className="tbox-container">
                <input
                  type="radio"
                  name="colorRadio"
                  onChange={() => setColor('sky-blue')}
                />
                <span className="tbox-checkmark bg-color-sky-blue" />
              </label>
              <label className="tbox-container">
                <input
                  type="radio"
                  name="colorRadio"
                  onChange={() => setColor('dark')}
                />
                <span className="tbox-checkmark bg-color-dark" />
              </label>
              <label className="tbox-container">
                <input
                  type="radio"
                  name="colorRadio"
                  onChange={() => setColor('purple')}
                />
                <span className="tbox-checkmark bg-color-purple" />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="row pb-3 ml-3">
        {submitting ? (
          <button
            type="button"
            className="btn btn-secondary btn-warning font-weight-bold cursor-disabled"
            disabled
          >
            Adding...
          </button>
        ) : (
          <button
            type="submit"
            className="btn btn-warning btn-warning font-weight-bold"
            onClick={handleSubmit}
          >
            Post Poem
          </button>
        )}
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

AddTextFields.propTypes = {
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
})(AddTextFields);

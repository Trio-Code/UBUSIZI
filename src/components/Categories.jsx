/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prefer-const */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fetchCategoryAction from '../redux/actions/category/fetchCategories';

const Category = ({ fetchCategoryAction: fetchAction, fetchCategories }) => {
  const [status, setStatus] = useState('initial');
  const [result, setResult] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (status === 'initial') {
      fetchAction();
      if (fetchCategories.status === 'success') {
        setResult(fetchCategories.data);
        setStatus('success');
      }
    }
    return undefined;
  }, [fetchCategories]);

  let data;
  data = result.map((results) => (
    <>
      <div
        className="col-2 cursor-pointer"
        onClick={() =>
          history.push(`/posts/categories?cat=${results._id}&page=1&limit=200`)
        }
      >
        <div className="categ-content">
          <img
            src={results.coverPhoto}
            className="categ-home-img"
            alt="category"
          />
          <div>
            <p className="text-center font-weight-bold fsize">
              {results.categoryName}
            </p>
          </div>
        </div>
      </div>
    </>
  ));

  return (
    <div className="jumbotron category mt-2">
      <div className="row category-row">{data}</div>
    </div>
  );
};
Category.propTypes = {
  fetchCategoryAction: PropTypes.func.isRequired,
  fetchCategories: PropTypes.objectOf(PropTypes.any).isRequired,
};
const mapStateToProps = ({ fetchCategories }) => ({
  fetchCategories,
});
export default connect(mapStateToProps, {
  fetchCategoryAction,
})(Category);

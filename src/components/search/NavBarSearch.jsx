/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ToolTipData from './ToolTipData';
import searchUserAction from '../../redux/actions/search/searchUser';

const NavBarSearch = ({ searchUserAction: fetchAction, searchUser }) => {
  const [resultsPage, setResultsPage] = useState(1);
  const [allUsersLoaded, setAllUsersLoaded] = useState(false);
  const [errorStatus, setErrorStatus] = useState('initial');
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [fetchMore, setFetchMore] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [resultsData, setResultsData] = useState([]);
  const [query, setQuery] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');
  const [showToolTip, setShowToolTip] = useState(false);

  useEffect(() => {
    if (loading && searchUser.status === 'error') {
      const { error } = searchUser;
      if (error.status === 400 || error.status === 404) {
        if (resultsPage === 1) {
          setAllUsersLoaded(false);
          setShowToolTip(true);
          setShowLoader(false);
        } else {
          setAllUsersLoaded(true);
          setShowLoader(false);
        }
      }

      if (error.status === 500) {
        if (resultsPage === 1) {
          setDisableButton(false);
          setShowToolTip(true);
        } else {
          setShowLoader(false);
          setFetchMore(false);
          setShowToolTip(false);
        }
      }
      setFetchMore(false);
      setLoading(false);
      setShowLoader(false);
      setErrorStatus(searchUser.error.status);
    }
    if (loading && searchUser.status === 'success') {
      setResultsData([...searchUser.results]);
      setFetchMore(false);
      setShowLoader(false);

      setLoading(true);
      setDisableButton(true);
      setShowToolTip(true);
    }

    return undefined;
  }, [searchUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setShowLoader(true);
    setCurrentQuery(query);
    setErrorStatus('');
    if (showToolTip) {
      setShowToolTip(false);
    }
    return fetchAction(query, resultsPage);
  };

  const loadMore = (e) => {
    e.preventDefault();
    if (!allUsersLoaded) {
      fetchAction(query, resultsPage + 1);
      setResultsPage(resultsPage + 1);
      setShowLoader(true);
      setFetchMore(true);
    }
  };

  const clearQuery = (e) => {
    e.preventDefault();
    setQuery('');
  };

  const handleChange = (e) => {
    if (resultsData.length || errorStatus) {
      setErrorStatus('');
      setResultsData([]);
    }
    if (showToolTip) {
      setShowToolTip(false);
    }

    setQuery(e.target.value);
    const alt = e.target.value;
    setLoading(true);
    setShowLoader(true);
    setCurrentQuery(alt);
    setErrorStatus('');
    if (showToolTip) {
      setShowToolTip(false);
    }
    return fetchAction(alt, resultsPage);
  };

  return (
    <ul className="navbar-nav mx-auto search-nav">
      <form className="d-block">
        <div className="input-group">
          <input
            className="form-control gray-input gray-search-input no-shadow"
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleChange}
          />
          <div className="input-group-append">
            {showLoader ? (
              <button className="btn btn-success search-nav-btn" type="button">
                <span
                  className="spinner-border spinner-border-sm text-secondary mt-0"
                  style={{ display: 'inline-block' }}
                />
              </button>
            ) : query && query === currentQuery && disableButton ? (
              <button
                className="btn btn-success search-nav-btn"
                type="button"
                onClick={clearQuery}
              >
                <FontAwesomeIcon icon={['fas', 'times-circle']} />
              </button>
            ) : (
              <button
                className="btn btn-success search-nav-btn"
                type="button"
              />
            )}
          </div>
        </div>
      </form>
      <ToolTipData
        showToolTip={showToolTip}
        data={resultsData}
        error={errorStatus}
        page={resultsPage}
        loadMore={loadMore}
        fetchMore={fetchMore}
        allUsersLoaded={allUsersLoaded}
      />
    </ul>
  );
};

NavBarSearch.propTypes = {
  searchUserAction: PropTypes.func.isRequired,
  searchUser: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ searchUser }) => ({ searchUser });

export default connect(mapStateToProps, {
  searchUserAction,
})(NavBarSearch);

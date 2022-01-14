/* eslint-disable operator-linebreak */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserNavbar from '../../components/UserNavbar';
import Navbar from '../../components/NavBar';
import SearchBox from '../../components/search/SearchBox';
import SearchWelcome from '../../components/search/SearchWelcome';
import SearchResults from '../../components/search/SearchResults';
import SearchNoResults from '../../components/search/SearchNoResults';
import searchUserAction from '../../redux/actions/search/searchUser';

const Search = ({ searchUserAction: fetchAction, searchUser }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loggedInPic, setLoggedInPic] = useState('');
  const [resultsPage, setResultsPage] = useState(1);
  const [allUsersLoaded, setAllUsersLoaded] = useState(false);
  const [errorStatus, setErrorStatus] = useState('initial');
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [fetchMore, setFetchMore] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [resultsData, setResultsData] = useState([]);
  const [query, setQuery] = useState('');
  const [initiated, setInitiated] = useState(false);
  const [searching, setSearching] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  useEffect(() => {
    const userToken = localStorage.getItem('UBUSIZI_USER_TOKEN');
    const userPic = localStorage.getItem('UBUSIZI_USER_PIC');

    if (!userToken || !userPic) {
      setIsLoggedIn(false);
    } else {
      setLoggedInPic(userPic);
    }
    if (loading && searchUser.status === 'error') {
      const { error } = searchUser;
      if (error.status === 400) {
        if (resultsPage === 1) {
          setAllUsersLoaded(false);
          setShowLoader(false);
          setSearching(false);
          setDisableButton(true);
        } else {
          setAllUsersLoaded(true);
          setShowLoader(false);
          setSearching(false);
        }
      }

      if (error.status === 500) {
        if (resultsPage === 1) {
          setDisableButton(false);
        } else {
          setShowLoader(false);
          setSearching(false);
          setFetchMore(false);
        }
      }
      setFetchMore(false);
      setLoading(false);
      setShowLoader(false);
      setSearching(false);
      setErrorStatus(searchUser.error.status);
    }
    if (loading && searchUser.status === 'success') {
      setResultsData([...resultsData, ...searchUser.results]);
      setFetchMore(false);
      setShowLoader(false);
      setSearching(false);
      setLoading(true);
      setDisableButton(true);
    }
    return undefined;
  }, [searchUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setInitiated(true);
    setShowLoader(true);
    setSearching(true);
    setCurrentQuery(query);
    setErrorStatus('');
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
      setInitiated(false);
    }

    setQuery(e.target.value);
    setDisableButton(false);
  };

  const DisplayData = ({ children }) => {
    let data;
    if (errorStatus && resultsPage === 1) {
      if (errorStatus === 400) {
        data = (
          <SearchNoResults
            title={`No search results retrieved for "${currentQuery}"`}
          />
        );
      } else {
        data = (
          <SearchNoResults title="Ooops! Your internet connection is slow, please try again later." />
        );
      }
    } else if (searching) {
      data = (
        <div className="no-results-content">
          <p className="text-center px-2 text-font-15 font-weight-bold">
            <span className="spinner-border spinner-border-sm text-dark mr-2 mt-2" />
            {`Searching for "${currentQuery}"`}
          </p>
        </div>
      );
    } else {
      data = <>{children}</>;
    }
    return data;
  };

  return (
    <div className="wrapper">
      {isLoggedIn ? <UserNavbar profilePic={loggedInPic} /> : <Navbar />}
      <div className="container-fluid">
        <SearchBox
          handleSubmit={handleSubmit}
          clearQuery={clearQuery}
          handleChange={handleChange}
          disableButton={disableButton}
          query={query}
          currentQuery={currentQuery}
          showLoader={showLoader}
        />
        <div className="search-content">
          {initiated ? (
            <DisplayData>
              <SearchResults data={resultsData} />
              {allUsersLoaded ||
              (errorStatus === 400 && resultsPage === 1) ||
              (errorStatus === 400 && resultsPage !== 1) ||
              (resultsData.length < 2 &&
                resultsPage === 1) ? null : fetchMore ? (
                <p className="text-center px-2 text-font-15 font-weight-bold">
                  <span className="spinner-border spinner-border-sm text-dark mr-2 mt-2" />
                  Loading More...
                </p>
              ) : (
                <div className="text-center">
                  <button
                    className="btn btn-warning font-weight-bold mt-2 text-white px-3 py-1 text-font-15"
                    type="button"
                    onClick={loadMore}
                  >
                    Load More
                  </button>
                </div>
              )}
            </DisplayData>
          ) : (
            <SearchWelcome />
          )}
        </div>
      </div>
    </div>
  );
};

Search.propTypes = {
  searchUserAction: PropTypes.func.isRequired,
  searchUser: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ searchUser }) => ({ searchUser });

export default connect(mapStateToProps, {
  searchUserAction,
})(Search);

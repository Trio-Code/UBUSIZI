/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserNavbar from '../../components/UserNavbar';
import BottomNav from '../../components/BottomNav';
import Navbar from '../../components/NavBar';
import PostCard from '../../components/cards/PostCard';
import UserSidebar from '../../components/UserSidebar';
import Loader from '../../components/Loader';
import DisplayError from '../../components/DisplayError';
import FeedsAction from '../../redux/actions/post/feeds';
import Category from '../../components/Categories';

const Home = ({ FeedsAction: action, feeds }) => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loggedInData, setLoggedInData] = useState({});
  const [status, setStatus] = useState('initial');
  const [resultsData, setResultData] = useState([]);
  const [resultsPage, setResultsPage] = useState(1);
  const [fetchMore, setFetchMore] = useState(false);
  const [allUsersLoaded, setAllUsersLoaded] = useState(false);
  const [errorStatus, setErrorStatus] = useState('initial');
  useEffect(() => {
    const userToken = localStorage.getItem('UBUSIZI_USER_TOKEN');
    const userData = localStorage.getItem('UBUSIZI_USER_DATA');
    if (!userToken || !userData) {
      setIsLoggedIn(false);
      return history.push('/accounts/login');
    }
    setLoggedInData(JSON.parse(userData));
    if (status === 'initial') {
      action(resultsPage);
      setStatus('fetching');
      setErrorStatus('');
    }

    if (feeds.status === 'success') {
      if (feeds.data.length > 0) {
        setStatus('success');
      } else {
        setStatus('no_data');
      }
      setResultData([...feeds.data]);
      setFetchMore(false);
    }

    if (feeds.status === 'error') {
      const { error } = feeds;
      if (error.status === 400 || error.status === 404) {
        if (resultsPage === 1) {
          setAllUsersLoaded(false);
          setStatus('no_data');
        } else {
          setAllUsersLoaded(true);
        }
      }
      if (error.status === 500) {
        if (resultsPage === 1) {
          setStatus('network_error');
        } else {
          setFetchMore(false);
          setStatus('network_error');
        }
      }
      setFetchMore(false);
      setErrorStatus(feeds.error.status);
    }
    return undefined;
  }, [feeds]);
  const loadMore = (e) => {
    e.preventDefault();
    if (!allUsersLoaded) {
      action(resultsPage + 1);
      setResultsPage(resultsPage + 1);
      setFetchMore(true);
    }
  };
  const data = resultsData.map((result) => (
    <PostCard type={result.type} key={result._id} results={result} />
  ));
  const DisplayData = ({ children }) => {
    let datas;
    switch (status) {
      case 'success':
        datas = <>{children}</>;
        break;
      case 'fetching':
        datas = <Loader marginTop="20%" />;
        break;
      case 'no_data':
        datas = (
          <div
            className="success-error-page text-center"
            style={{ marginTop: 30 }}
          >
            <h3 className="mt-2 text-dark font-weight-bold">
              No posts on your feed
            </h3>

            <p
              className="text-dark font-smooth text-center mb-3 px-2"
              style={{ fontSize: 15.5 }}
            >
              Add a post or follow someone to be able to view posts on your
              feed!
            </p>
            <div className="my-5">
              <a
                className="text-warning text-center font-weight-bold"
                href="/add-post"
              >
                Add a post
              </a>
            </div>
          </div>
        );
        break;
      case 'network_error':
        datas = (
          <DisplayError
            title="No Internet Connection!"
            desc="Your network is slow / down, please try again later!"
            marginTop="20%"
          />
        );
        break;

      case 'unknown_error':
        datas = (
          <DisplayError
            title="Unexpected Error!"
            desc="Oops! Something unexpected occured, please try again later."
            marginTop="20%"
          />
        );
        break;

      default:
        datas = <Loader marginTop="20%" />;
        break;
    }
    return datas;
  };

  return (
    <div className="wrapper">
      {isLoggedIn ? (
        <>
          <UserNavbar data={loggedInData} />
          <BottomNav data={loggedInData} />
        </>
      ) : (
        <Navbar />
      )}
      <div className="move-top">
        <div className="container change-cont">
          <div className="body-content">
            <div className="m-bottom">
              <Category />
              <div className="mt-4">
                <div className="row">
                  <div className="col-md-9">
                    <DisplayData>
                      {data}
                      {allUsersLoaded ||
                      (errorStatus === 400 && resultsPage === 1) ||
                      (errorStatus === 400 && resultsPage !== 1) ||
                      (resultsData.length < 3 &&
                        resultsPage === 1) ? null : fetchMore ? (
                        <p className="text-center px-2 text-font-15 font-weight-bold">
                          <span className="spinner-border spinner-border-sm text-dark mr-2 mt-2" />
                          Loading More...
                        </p>
                      ) : (
                        <div className="text-center mb-3">
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
                  </div>
                  <div className="col-md-3 ">
                    <UserSidebar data={loggedInData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Home.propTypes = {
  FeedsAction: PropTypes.func.isRequired,
  feeds: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ feeds }) => ({
  feeds,
});
export default connect(mapStateToProps, { FeedsAction })(Home);

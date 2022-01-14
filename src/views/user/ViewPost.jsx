/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserNavbar from '../../components/UserNavbar';
import SinglePostImg from '../../components/post/SinglePost';
import SinglePostTxt from '../../components/post/SinglePostTxt';
import SinglePostVid from '../../components/post/SinglePostVid';
import SinglePostSm from '../../components/post/SinglePostSm';
import MorePosts from '../../components/post/MorePosts';
import fetchPostAction from '../../redux/actions/post/fetchPost';
import DisplayError from '../../components/DisplayError';
import Loader from '../../components/Loader';
import fetchMorePostsAction from '../../redux/actions/post/fetchMorePosts';
import BottomNav from '../../components/BottomNav';

const ViewPost = ({
  match,
  fetchMorePostsAction: postsAction,
  fetchPostAction: fetchAction,
  fetchMore,
  fetchPost,
}) => {
  const history = useHistory();
  const [loggedInData, setLoggedInData] = useState({});
  const [postsData, setPostsData] = useState({});
  const [postsStatus, setPostsStatus] = useState('initial');
  const [results, setResults] = useState({});
  const [status, setStatus] = useState('initial');

  useEffect(() => {
    const userToken = localStorage.getItem('UBUSIZI_USER_TOKEN');
    const userData = localStorage.getItem('UBUSIZI_USER_DATA');

    if (!userToken || !userData) {
      return history.push('/accounts/login');
    }
    setLoggedInData(JSON.parse(userData));

    if (status === 'initial') {
      fetchAction(match.params.postId);
      setStatus('fetching');
    }

    if (fetchPost.status === 'success') {
      setStatus('success');
      setResults(fetchPost.data);
      if (postsStatus === 'initial') {
        postsAction(fetchPost.data.owner.username);
        setPostsStatus('fetching');
      }
    }

    if (fetchPost.status === 'error') {
      const { error } = fetchPost;
      if (error.status === 500) {
        setStatus('network_error');
      }
      setStatus('unknown_error');
    }
    if (fetchMore.status === 'success') {
      setPostsStatus('success');
      const fetchData = fetchMore.data.posts.filter(
        (elt) => elt._id !== match.params.postId
      );
      setPostsData(fetchData.slice(0, 6));
    }
    if (fetchMore.status === 'error') {
      const { error } = fetchMore;
      if (error.status === 404) {
        return setPostsStatus('no_data');
      }
      if (error.status === 500) {
        return setPostsStatus('network_error');
      }
      setPostsStatus('unknown_error');
    }
    return undefined;
  }, [fetchPost, fetchMore]);
  const DisplayData = ({ children }) => {
    let data;
    switch (status) {
      case 'success':
        data = <>{children}</>;
        break;
      case 'fetching':
        data = <Loader marginTop="30%" />;
        break;
      case 'network_error':
        data = (
          <DisplayError
            title="No Internet Connection!"
            desc="Your network is slow / down, please try again later!"
            marginTop="25%"
          />
        );
        break;

      case 'unknown_error':
        data = (
          <DisplayError
            title="Unexpected Error!"
            desc="Oops! Something unexpected occured, please try again later."
            marginTop="25%"
          />
        );
        break;

      default:
        data = <Loader marginTop="30%" />;
        break;
    }
    return data;
  };
  const DisplayPosts = ({ children }) => {
    let data;
    switch (postsStatus) {
      case 'success':
        data = <>{children}</>;
        break;
      case 'fetching':
        data = (
          <div className="pb-3">
            <Loader marginTop="30%" />
          </div>
        );
        break;
      case 'no_data':
        data = (
          <div className="pb-3">
            <DisplayError
              title="No Data Found!"
              desc="There are no other posts"
              marginTop="25%"
            />
          </div>
        );
        break;
      case 'network_error':
        data = (
          <div className="pb-3">
            <DisplayError
              title="No Internet Connection!"
              desc="Your network is slow / down, please try again later!"
              marginTop="25%"
            />
          </div>
        );
        break;

      case 'unknown_error':
        data = (
          <div className="pb-3">
            <DisplayError
              title="Unexpected Error!"
              desc="Oops! Something unexpected occured, please try again later."
              marginTop="25%"
            />
          </div>
        );
        break;

      default:
        data = (
          <div className="pb-3">
            <Loader marginTop="30%" />
          </div>
        );
        break;
    }
    return data;
  };

  return (
    <div className="wrapper">
      <UserNavbar data={loggedInData} />
      <BottomNav data={loggedInData} />
      <div className="move-top">
        <div className="container">
          <div className="body-content">
            <DisplayData>
              {results.type === 'Text' ? (
                <SinglePostTxt
                  results={results}
                  loggedInData={loggedInData}
                  view="single"
                  postId={match.params.postId}
                />
              ) : results.type === 'Image' ? (
                <SinglePostImg
                  results={results}
                  loggedInData={loggedInData}
                  postId={match.params.postId}
                  view="single"
                />
              ) : (
                <SinglePostVid
                  results={results}
                  loggedInData={loggedInData}
                  postId={match.params.postId}
                  view="single"
                />
              )}
              <SinglePostSm
                results={results}
                loggedInData={loggedInData}
                view="single"
                type={results.type}
              />
            </DisplayData>

            {status === 'success' ? (
              <>
                <div className="post-line-separator" />
                <div className="more-post-dnone">
                  <DisplayPosts>
                    <MorePosts results={results} data={postsData} />
                  </DisplayPosts>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

ViewPost.propTypes = {
  fetchPost: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchMore: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchPostAction: PropTypes.func.isRequired,
  fetchMorePostsAction: PropTypes.func.isRequired,
  match: PropTypes.string.isRequired,
};

const mapStateToProps = ({ fetchPost, fetchMore }) => ({
  fetchPost,
  fetchMore,
});

export default connect(mapStateToProps, {
  fetchPostAction,
  fetchMorePostsAction,
})(ViewPost);

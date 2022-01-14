/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserNavbar from '../../components/UserNavbar';
import Navbar from '../../components/NavBar';
import BottomNav from '../../components/BottomNav';
import PostCard from '../../components/cards/PostCard';
import DisplayError from '../../components/DisplayError';
import Loader from '../../components/Loader';
import ProfileHeader from '../../components/ProfileHeader';
import SmProfileHeader from '../../components/SmProfileHeader';
import OtherProfileHeader from '../../components/OtherProfileHeader';
import SmOtherProfileHeader from '../../components/SmOtherProfileHeader';
import fetchProfileAction from '../../redux/actions/user/fetchProfile';
import Icon from '../../components/Icon';

const Profile = ({
  match,
  fetchProfile,
  fetchProfileAction: profileAction,
}) => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [status, setStatus] = useState('initial');
  const [resultsData, setResultsData] = useState({});
  const [user, setUser] = useState('');
  const [userposts, setUserPosts] = useState([]);
  const [type, setType] = useState('all');
  const [postsStatus, setPostsStatus] = useState('initial');

  useEffect(() => {
    const name = JSON.parse(localStorage.getItem('UBUSIZI_USER_DATA'));
    if (match.params.username === name.username) {
      const userToken = localStorage.getItem('UBUSIZI_USER_TOKEN');
      const userData = localStorage.getItem('UBUSIZI_USER_DATA');
      if (!userToken || !userData) {
        setIsLoggedIn(false);
        return history.push('/accounts/login');
      }
      resultsData.isUser = true;
    } else {
      setUser('notme');
    }

    if (status === 'initial') {
      profileAction(match.params.username);
      setStatus('fetching');
    }
    if (fetchProfile.status === 'success') {
      setStatus('success');
      setUserPosts(fetchProfile.results.posts);
      if (fetchProfile.results.posts.length === 0) {
        setPostsStatus('no_data');
      } else {
        setPostsStatus('success');
      }
      setResultsData(fetchProfile.results);
    }
    if (fetchProfile.status === 'error') {
      const { error } = fetchProfile;
      if (error.status === 404) {
        return setStatus('no_data');
      }
      if (error.status === 500) {
        return setStatus('network_error');
      }
      setStatus('unknown_error');
    }
    return undefined;
  }, [fetchProfile]);
  const refetch = () => {
    profileAction(match.params.username);
    setStatus('fetching');
  };
  let userInfo;
  if (resultsData) {
    const { username, profilePicture } = resultsData;
    userInfo = { username, profilePicture };
  }
  const res = userposts.map((result) => (
    <div className="col-4 col-lg-4 col-md-4 col-sm-4">
      <div className="profile-post-card">
        <PostCard
          data={result}
          info={userInfo}
          deletePost="deletePost"
          type={result.type}
          key={result._id}
          results={result}
          profile="profile"
          refetch={refetch}
        />
      </div>
    </div>
  ));
  const text = userposts.map((result) =>
    result.type === 'Text' ? (
      <div className="col-4">
        <div className="profile-post-card">
          <PostCard
            data={result}
            info={userInfo}
            deletePost="deletePost"
            type={result.type}
            key={result._id}
            results={result}
            profile="profile"
            refetch={refetch}
          />
        </div>
      </div>
    ) : null
  );

  const image = userposts.map((result) =>
    result.type === 'Image' ? (
      <div className="col-4">
        <div className="profile-post-card">
          <PostCard
            data={result}
            info={userInfo}
            deletePost="deletePost"
            type={result.type}
            key={result._id}
            results={result}
            profile="profile"
            refetch={refetch}
          />
        </div>
      </div>
    ) : null
  );
  const video = userposts.map((result) =>
    result.type === 'Video' ? (
      <div className="col-4">
        <div className="profile-post-card">
          <PostCard
            data={result}
            info={userInfo}
            deletePost="deletePost"
            type={result.type}
            key={result._id}
            results={result}
            profile="profile"
            refetch={refetch}
          />
        </div>
      </div>
    ) : null
  );
  let poemNo;
  for (let i = 0; i < res.length; i++) {
    poemNo = res[i];
    if (res[i]) {
      break;
    }
  }
  let textNo;
  for (let i = 0; i < text.length; i++) {
    textNo = text[i];
    if (text[i]) {
      break;
    }
  }
  let imageNo;
  for (let i = 0; i < image.length; i++) {
    imageNo = image[i];
    if (image[i]) {
      break;
    }
  }

  let videoNo = video[0];
  for (let i = 0; i < video.length; i++) {
    videoNo = video[i];
    if (video[i]) {
      break;
    }
  }
  const DisplayData = ({ children }) => {
    let data;
    switch (status) {
      case 'success':
        data = <>{children}</>;
        break;
      case 'fetching':
        data = <Loader marginTop="30%" />;
        break;
      case 'no_data':
        data = (
          <DisplayError
            title="No Data Found!"
            desc="The user you're trying to find, doesn't exist!"
            marginTop="25%"
          />
        );
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
  const DisplayData2 = ({ children }) => {
    let data;
    switch (postsStatus) {
      case 'success':
        data = <>{children}</>;
        break;
      case 'no_data':
        data = (
          <div className="pad-bottom-prof">
            <DisplayError title="No posts added yet!" desc="" marginTop="10%" />
          </div>
        );
        break;

      default:
        data = <Loader marginTop="30%" />;
        break;
    }
    return data;
  };
  return (
    <div className="wrapper">
      {isLoggedIn ? (
        <>
          <UserNavbar
            profile="profile"
            data={JSON.parse(localStorage.getItem('UBUSIZI_USER_DATA'))}
          />
          <BottomNav
            profile="profile"
            data={JSON.parse(localStorage.getItem('UBUSIZI_USER_DATA'))}
          />
        </>
      ) : (
        <Navbar />
      )}
      <div className="move-top">
        <div className="container change-cont">
          <div className="">
            <DisplayData>
              {user !== 'notme' ? (
                <div
                  className="border mt-4 shadow-lg bg-white"
                  style={{ borderRadius: 10 }}
                >
                  <ProfileHeader data={resultsData} />
                  <SmProfileHeader data={resultsData} />
                </div>
              ) : (
                <div
                  className="border mt-4 shadow-lg bg-white"
                  style={{ borderRadius: 10 }}
                >
                  <OtherProfileHeader data={resultsData} />
                  <SmOtherProfileHeader data={resultsData} />
                </div>
              )}
              <div className="mt-4 ml-3 profile-nav-select text-center">
                <button
                  type="button"
                  className={type === 'all' ? 'btn  underline' : 'btn '}
                  onClick={() => {
                    setType('all');
                  }}
                  activeClassName="active"
                >
                  <Icon name="allPosts" height={24} width={24} />
                  <span className="ml-2 font-weight-bold">
                    All
                    <span className="ml-2 poem-dnone">Poems</span>
                  </span>
                </button>
                <button
                  type="button"
                  className={type === 'text' ? 'btn  underline' : 'btn '}
                  onClick={() => {
                    setType('text');
                  }}
                  activeClassName="active"
                >
                  <Icon name="text" height={24} width={24} />
                  <span className="ml-2 font-weight-bold">Text</span>
                </button>
                <button
                  type="button"
                  className={type === 'image' ? 'btn  underline' : 'btn '}
                  onClick={() => {
                    setType('image');
                  }}
                  activeClassName="active"
                >
                  <Icon name="image" height={24} width={24} />
                  <span className="ml-2 font-weight-bold">Images</span>
                </button>
                <button
                  type="button"
                  className={type === 'video' ? 'btn  underline' : 'btn '}
                  onClick={() => {
                    setType('video');
                  }}
                  activeClassName="active"
                >
                  <Icon name="video" height={30} width={30} />
                  <span className="ml-2 font-weight-bold">Videos</span>
                </button>
              </div>
              <hr className="mt-0" />
              <DisplayData2>
                {type === 'video' ? (
                  <div className="user-posts-content">
                    {videoNo === null ? (
                      <p className="text-center font-16 mt-5 font-weight-bolder">
                        {' '}
                        No video posts found
                      </p>
                    ) : (
                      <div className="row mt-3 box">{video}</div>
                    )}
                  </div>
                ) : type === 'text' ? (
                  <div className="user-posts-content">
                    {textNo === null ? (
                      <p className="text-center font-16 mt-5 font-weight-bolder">
                        {' '}
                        No text post found
                      </p>
                    ) : (
                      <div className="row mt-3 box">{text}</div>
                    )}
                  </div>
                ) : type === 'image' ? (
                  <div className="user-posts-content">
                    {imageNo === null ? (
                      <p className="text-center font-16  mt-5 font-weight-bolder">
                        {' '}
                        No Image posts found
                      </p>
                    ) : (
                      <div className="row mt-3 box">{image}</div>
                    )}
                  </div>
                ) : (
                  <div className="user-posts-content">
                    {poemNo === null ? (
                      <p className="text-center font-16  mt-5 font-weight-bolder">
                        {' '}
                        No poems found
                      </p>
                    ) : (
                      <div className="row mt-3 box">{res}</div>
                    )}
                  </div>
                )}
              </DisplayData2>
            </DisplayData>
          </div>
        </div>
      </div>
    </div>
  );
};
Profile.propTypes = {
  fetchProfileAction: PropTypes.func.isRequired,
  fetchProfile: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.string.isRequired,
};
const mapStateToProps = ({ fetchProfile }) => ({
  fetchProfile,
});
export default connect(mapStateToProps, { fetchProfileAction })(Profile);

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserNavbar from '../../components/UserNavbar';
import Navbar from '../../components/NavBar';
import Category from '../../components/search/category-search/Categories';
import searchCategoryAction from '../../redux/actions/search/searchCategory';
import Loader from '../../components/Loader';
import DisplayError from '../../components/DisplayError';
import PostCard from '../../components/cards/PostCard';
import Icon from '../../components/Icon';
import BottomNav from '../../components/BottomNav';

const SearchCategory = ({
  location,
  searchCategoryAction: searchAction,
  searchCategory,
}) => {
  const [status, setStatus] = useState('initial');
  const [userposts, setUserPosts] = useState([]);
  const [type, setType] = useState('all');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loggedInData, setLoggedInData] = useState({});
  const query = location.search.slice(5, 29);
  const q = query;
  const history = useHistory();
  useEffect(() => {
    const userToken = localStorage.getItem('UBUSIZI_USER_TOKEN');
    const userData = localStorage.getItem('UBUSIZI_USER_DATA');

    if (!userToken || !userData) {
      setIsLoggedIn(false);
      return history.push('/accounts/login');
    }
    setLoggedInData(JSON.parse(userData));
    if (status === 'initial') {
      searchAction(q);
      setStatus('fetching');
    }

    if (searchCategory.status === 'success') {
      setStatus('success');
      setUserPosts(searchCategory.results);
    }

    if (searchCategory.status === 'error') {
      const { error } = searchCategory;
      if (error.status === 404) {
        return setStatus('no_data');
      }
      if (error.status === 500) {
        return setStatus('network_error');
      }
      setStatus('unknown_error');
    }
    return undefined;
  }, [searchCategory]);

  const DisplayData = ({ children }) => {
    let datas;
    switch (status) {
      case 'success':
        datas = <>{children}</>;
        break;
      case 'fetching':
        datas = <Loader marginTop="20%" />;
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
      case 'no_data':
        datas = (
          <DisplayError
            title="No Data Found!"
            desc="The are no posts matching that category!"
            marginTop="25%"
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
  const res = userposts.map((result) => (
    <div className="col-4">
      <div className="profile-post-card">
        <PostCard
          data={result}
          info={result.owner}
          type={result.type}
          key={result._id}
          results={result}
          profile="profile"
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
            info={result.owner}
            type={result.type}
            key={result._id}
            results={result}
            profile="profile"
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
            info={result.owner}
            type={result.type}
            key={result._id}
            results={result}
            profile="profile"
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
            info={result.owner}
            type={result.type}
            key={result._id}
            results={result}
            profile="profile"
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
            <Category category={q} />
            <div className="">
              <div className="mt-4 ml-3 profile-nav-select with-category text-center">
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
              <DisplayData>
                <hr className="mt-0" />
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
              </DisplayData>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SearchCategory.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  searchCategory: PropTypes.objectOf(PropTypes.any).isRequired,
  searchCategoryAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ searchCategory }) => ({ searchCategory });

export default connect(mapStateToProps, { searchCategoryAction })(
  SearchCategory
);

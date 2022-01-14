/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserNavbar from '../../components/UserNavbar';
import AddTextFields from '../../components/cards/AddTextFields';
import AddPostimage from '../../components/cards/AddPostImage';
import AddPostVideo from '../../components/cards/AddPostVideo';
import fetchProfileAction from '../../redux/actions/user/fetchProfile';
import Icon from '../../components/Icon';
import BottomNav from '../../components/BottomNav';

export const AddPost = ({
  fetchProfileAction: profileAction,
  fetchProfile,
}) => {
  const history = useHistory();
  const [type, setType] = useState('Text');
  const [loggedInData, setLoggedInData] = useState('');
  const [status, setStatus] = useState('initial');
  const [resultsData, setResultsData] = useState({});

  useEffect(() => {
    const userToken = localStorage.getItem('UBUSIZI_USER_TOKEN');
    const userData = localStorage.getItem('UBUSIZI_USER_DATA');

    if (!userToken || !userData) {
      return history.push('/accounts/login');
    }
    setLoggedInData(JSON.parse(userData));

    if (status === 'initial') {
      profileAction(JSON.parse(userData).username);
      setStatus('fetching');
    }
    if (fetchProfile.status === 'success') {
      setResultsData(fetchProfile.results);
    }

    if (fetchProfile.results.isPoet === 'false') {
      history.push('/verification/request');
    }

    return undefined;
  }, [fetchProfile, type]);

  const textClick = () => {
    setType('Text');
    const text = document.getElementById('text');
    text.classList.remove('d-none');
    document.getElementById('text-btn').classList.add('clicked');
    document.getElementById('image-btn').classList.remove('clicked');
    document.getElementById('video-btn').classList.remove('clicked');
    const image = document.getElementById('image');
    image.classList.add('d-none');
    const video = document.getElementById('video');
    video.classList.add('d-none');
  };

  const imageClick = () => {
    setType('Image');
    document.getElementById('image-btn').classList.add('clicked');
    document.getElementById('text-btn').classList.remove('clicked');
    document.getElementById('video-btn').classList.remove('clicked');
    const image = document.getElementById('image');
    image.classList.remove('d-none');
    const text = document.getElementById('text');
    text.classList.add('d-none');
    const video = document.getElementById('video');
    video.classList.add('d-none');
  };

  const videoClick = () => {
    setType('Video');
    document.getElementById('video-btn').classList.add('clicked');
    document.getElementById('image-btn').classList.remove('clicked');
    document.getElementById('text-btn').classList.remove('clicked');
    const video = document.getElementById('video');
    video.classList.remove('d-none');
    const image = document.getElementById('image');
    image.classList.add('d-none');
    const text = document.getElementById('text');
    text.classList.add('d-none');
  };

  return (
    <div className="wrapper">
      <UserNavbar data={loggedInData} />
      <BottomNav data={loggedInData} />
      <div className="move-top">
        <div className="separator" />
        <div className="col-md-8 mx-auto addpost-header shadow">
          <div className="text-center">
            <h3 className="font-weight-bold">Post a Poem</h3>
            <p className="the-weight">
              Choose from the following options <br /> To post a poem choose
              text, image or video
            </p>
          </div>
          <div className="text-center add-pst-nav-select">
            <span
              className="button mx-5 clicked"
              id="text-btn"
              onClick={textClick}
            >
              <Icon name="text" height={22} width={22} />
              <span className="px-2 font-size-18">Text</span>
            </span>
            <span className="button mx-5" id="image-btn" onClick={imageClick}>
              <Icon name="image" height={24} width={24} />
              <span className="px-2 font-size-18">Image</span>
            </span>
            <span className="button mx-5" id="video-btn" onClick={videoClick}>
              <Icon name="video" height={24} width={24} />
              <span className="px-2 font-size-18">Video</span>
            </span>
          </div>
        </div>
        <div className="col-md-8 mx-auto addpost-body shadow pb-3 mb-3">
          <div className="" id="text">
            <AddTextFields type={type} />
          </div>
          <div className="d-none" id="image">
            <AddPostimage type={type} />
          </div>
          <div className="d-none" id="video">
            <AddPostVideo type={type} />
          </div>
        </div>
      </div>
    </div>
  );
};

AddPost.propTypes = {
  fetchProfileAction: PropTypes.func.isRequired,
  fetchProfile: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ fetchProfile }) => ({ fetchProfile });

export default connect(mapStateToProps, { fetchProfileAction })(AddPost);

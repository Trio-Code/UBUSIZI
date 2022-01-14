/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import userAvat from '../../assets/images/avat1.png';
import young from '../../assets/young.jpg';

const CommentCardActivity = ({ data }) => {
  const user = data.description.split(' ');
  const username = user[0];
  const [isLoaded, setIsLoaded] = useState(true);
  const loadVideo = () => {
    setIsLoaded(false);
  };
  return (
    <div className="card-display">
      <div className="text-font-15 user-sidebar-text-content cards-separator ">
        <div className="d-flex justify-content-center align-items-center">
          <Link to={`/${username}`}>
            <span className="search-img-display">
              <span className="">
                <span
                  className="search-img"
                  style={{
                    backgroundImage: `url(${
                      data.userPi
                        ? data.userPi === 'none'
                          ? userAvat
                          : data.userPic
                        : userAvat
                    })`,
                  }}
                />
              </span>
            </span>
          </Link>
        </div>
        <span className=" row ml-2 display-user-sb-content boarder py-3 " style={{ width: 500 }}>
          <span className="col-10">
            <span className="text-dark text-left font-weight-bold">
              <Link to={`/${username}`} className="usernames">
                {username}
              </Link>
            </span>
            <div className=" des-width text-secondary text-left" style={{ fontSize: 13 }}>
              <Link to={`/post/${data.postId}`} className="usernames">
                {data.description}
              </Link>
            </div>
          </span>
          <span className="followbtn col-auto float-right">
            <Link to={`/post/${data.postId}`} className="usernames">
              {data.postType === 'Text' ? (
                <span className=" mb-5">
                  <div className={`text-div bg-color-${data.color} text-white`}>
                    <p>
                      {data.postContent}
                    </p>
                  </div>
                </span>
              ) : data.postType === 'Image' ? (
                <span className="activity-img-display mb-5">
                  <span className="">
                    <span
                      className="activity-img"
                      style={{
                        backgroundImage: `url(${data.postContent})`,
                      }}
                    />
                  </span>
                </span>
              ) : data.postType === 'Video' ? (
                <span className=" mb-5">
                  <div className="text-div  text-white">

                    <ReactPlayer
                      url={data.postContent}
                      onReady={loadVideo}
                      playing={false}
                      muted
                      loop={false}
                      controls={false}
                      volume={0.5}
                      width="60%"
                      height="100%"
                      className="my-react-player ml-3"
                    />
                  </div>
                </span>
              ) : null}

            </Link>
          </span>
        </span>

      </div>
    </div>
  );
};

CommentCardActivity.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CommentCardActivity;

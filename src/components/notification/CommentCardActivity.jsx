/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import userAvat from '../../assets/images/avat1.png';
import young from '../../assets/young.jpg';

const NotificationActivitiescard = ({ data }) => {
  const user = data.description.split(' ');
  const username = user[0];
  return (
    <div className="card-display">
      <div className="text-font-15 user-sidebar-text-content cards-separator">
        <div className="d-flex justify-content-center align-items-center ">
          <Link to={`/${username}`}>
            <span className="search-img-display">
              <span className="">
                <span
                  className="search-img"
                  style={{
                    backgroundImage: `url(${
                      data.userPic
                        ? data.userPic === 'none'
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
        <span className="ml-2 display-user-sb-content boarder py-3 " style={{ width: 500 }}>
          <span className="text-light-dark text-left font-weight-bold">
            <Link to={`/${username}`} className="usernames">
              {username}
            </Link>
          </span>
          <span className="text-secondary text-left" style={{ fontSize: 13 }}>
            <Link to={`/post/${data.postId}`} className="usernames">
              {data.description}
            </Link>
          </span>
          <span className="followbtn">
            <Link to={`/post/${data.postId}`} className="usernames">
              {data.postType === 'Text' ? (
                <span className="activity-img-display mb-5">
                  <div className={`text-div bg-color-${data.color} text-white`} >
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
              ) : null}

            </Link>
          </span>
        </span>

      </div>
    </div>
  );
};

NotificationActivitiescard.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default NotificationActivitiescard;

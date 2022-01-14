/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import userAvat from '../../assets/images/avat1.png';

const SearchResultCard = ({ user, id }) => {
  const history = useHistory();
  return (
    <div className="card-display">
      <div className="text-font-15 user-sidebar-text-content cards-separator">
        <div className="d-flex justify-content-center align-items-center">
          <Link to={`/${user.username}`} onClick={() => { history.push(`/${user.username}`); window.location.reload(); }}>
            <span className="search-img-display">
              <span className="">
                <span
                  className="search-img"
                  style={{
                    backgroundImage: `url(${
                      user.profilePicture
                        ? user.profilePicture === 'none'
                          ? userAvat
                          : user.profilePicture
                        : userAvat
                    })`,
                  }}
                />
              </span>
            </span>
          </Link>
        </div>
        <span className="ml-2 display-user-sb-content">
          <span className="text-light-dark text-left font-weight-bold">
            <Link to={`/${user.username}`} onClick={() => { history.push(`/${user.username}`); window.location.reload(); }} className="usernames">
              {user.username}
            </Link>
          </span>
          <span className="text-secondary text-left" style={{ fontSize: 13 }}>
            {user.fullname}
          </span>
        </span>
      </div>
    </div>
  );
};

SearchResultCard.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
};

export default SearchResultCard;

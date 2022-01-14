/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostPP from '../assets/images/avat1.png';
import fetchSuggestionsAction from '../redux/actions/suggestions/fetchSuggestions';

const UserSidebar = ({
  data,
  fetchSuggestionsAction: action,
  fetchSuggestions,
}) => {
  const [status, setStatus] = useState('initial');
  const [resultsData, setResultsData] = useState([]);
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener('scroll', onScroll);

    if (status === 'initial') {
      action();
      setStatus('fetching');
    }

    if (fetchSuggestions.status === 'success') {
      setStatus('success');
      setResultsData(fetchSuggestions.data);
    }

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop, fetchSuggestions]);
  const info = data;
  let picture;
  if (info.picture === 'none') {
    picture = PostPP;
  } else {
    picture = info.picture;
  }
  const { username, fullname } = info;

  return (
    <div
      className={
        scrollTop > 190 ? 'user-sidebar change-top-size' : 'user-sidebar'
      }
    >
      <Link to={username ? `/${username}` : '/username'} title="My Profile">
        <div className=" header text-font-15 font-weight-bold shadow user-sidebar-text-content ">
          <div className="staff2 ml-2">
            <div className="">
              <div
                className="img"
                style={{ backgroundImage: `url(${picture})` }}
              />
            </div>
          </div>
          <span className="ml-3 display-user-sb-content">
            <span
              className="text-dark font-weight-bold "
              style={{ fontSize: 18 }}
            >
              {username
                ? username.length >= 11
                  ? `${username.slice(0, 8)}...`
                  : username
                : null}
            </span>
            <span className="text-secondary" style={{ fontSize: 13 }}>
              {fullname
                ? fullname.length > 14
                  ? `${fullname.slice(0, 12)}...`
                  : fullname
                : null}
            </span>
          </span>
        </div>
      </Link>
      <div className=" mt-3 recent d-block ">
        <span
          className="text-secondary font-weight-bold "
          style={{ fontSize: 15 }}
        >
          Suggestions for you
        </span>
        {typeof resultsData !== 'undefined'
          ? resultsData.map((results) => (
              <Link
                className="dropdown-item"
                to={results.username ? `/${results.username}` : '/username'}
              >
                <div className="row mt-1 ">
                  <div className="col-3">
                    <div className="staff3">
                      <div className="">
                        <div
                          className="img"
                          style={
                            results.profilePicture !== 'none'
                              ? {
                                  backgroundImage: `url(${results.profilePicture})`,
                                }
                              : { backgroundImage: `url(${PostPP})` }
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-9 mt-1">
                    <span className="display-user-sb-content">
                      <span
                        className="text-secondary font-weight-bold "
                        style={{ fontSize: 14 }}
                      >
                        {results.username
                          ? results.username.length > 17
                            ? `${results.username.slice(0, 14)}...`
                            : results.username
                          : null}
                      </span>
                      <span className="text-secondary" style={{ fontSize: 13 }}>
                        {`${results.firstname} ${results.lastname}`
                          ? `${results.firstname} ${results.lastname}`.length >
                            19
                            ? `${`${results.firstname} ${results.lastname}`.slice(
                                0,
                                16
                              )}...`
                            : `${results.firstname} ${results.lastname}`
                          : null}
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))
          : null}
      </div>
      <div className="d-block mt-4">
        <ul className="nav user-sb-nav mt-5">
          <li className="nav-item mr-2">
            <Link
              className="nav-link text-uppercase font-weight-bold"
              to="/about"
            >
              About Us
            </Link>
          </li>
          <li className="nav-item ml-2">
            <Link
              className="nav-link text-uppercase font-weight-bold"
              to="/privacy-policy"
            >
              Privacy
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link text-uppercase font-weight-bold"
              to="/terms"
            >
              Terms
            </Link>
          </li>
        </ul>
        <p className="">
          &copy;
          {` ${new Date().getFullYear()} UBUSIZI FROM IMPERIUM RW.`}
        </p>
      </div>
    </div>
  );
};
UserSidebar.PropType = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchSuggestionsAction: PropTypes.func.isRequired,
  fetchSuggestions: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ fetchSuggestions }) => ({ fetchSuggestions });

export default connect(mapStateToProps, { fetchSuggestionsAction })(
  UserSidebar
);

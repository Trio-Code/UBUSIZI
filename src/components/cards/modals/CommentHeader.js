/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import defaultPic from '../../../assets/images/avat1.png';
import DeletePost from './deletePost';

const CommentHeader = ({
  view, page, results, deletePost, refetch, modalName
}) => {
  const userLoggedIn = JSON.parse(localStorage.getItem('UBUSIZI_USER_DATA'));
  let owner;
  if (typeof results !== 'undefined') {
    owner = results.owner;
  }
  return (
    <div className="profile-modal-comment-body-header px-2 py-3">
      <div className="row">
        <div className="col-8">
          <img src={typeof owner !== 'undefined' ? (owner.profilePicture === 'none' ? defaultPic : results.owner.profilePicture) : null} alt="profile-pic" className="circle" />
          <Link
            className="ml-2 post-card-header-text text-font-15 link-light-dark font-weight-bold"
            to={typeof owner !== 'undefined' ? (`/${owner.username}`) : ('user/userId')}
          >
            {typeof owner !== 'undefined' ? owner.username : 'john_doe'}
          </Link>
        </div>
        <div className="col-4 text-right">
          <div className="dropdown">
            <span
              className="mr-2 mt-1 drop-icon cursor-pointer link-light-dark"
              data-toggle="dropdown"
            >
              <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
            </span>
            <div className="dropdown-menu post-card-drop-menu pt-0 dropdown-menu-right">
              <Link
                to={`/report/post/${results._id}`}
                exact
                className="dropdown-item text-danger font-weight-bold text-font-15 border-bottom-secondary py-2"
              >
                Report
              </Link>
              {view === 'single' || page === 'more' ? null : (
                <Link
                  to={typeof results !== 'undefined' ? (`/post/${results._id}`) : ('posts/postId')}
                  exact
                  className="dropdown-item text-secondary text-font-15 py-2"
                >
                  Go To Post
                </Link>
              )}

              <Link
                to={typeof owner !== 'undefined' ? (`/${owner.username}`) : ('user/userId')}
                exact
                className="dropdown-item text-secondary text-font-15 py-2"
              >
                Go To User
              </Link>
              {deletePost === 'deletePost' && (userLoggedIn.username === owner.username) ? (
                <div className="">
                  <a className="btn dropdown-item text-danger text-font-15 py-2" data-toggle="modal" href={`#deletePostModal${results._id}`}>Delete post</a>
                </div>
              ) : null}
            </div>
            <span>
              <DeletePost id={results._id} refetch={refetch} modalName={modalName} />
            </span>

          </div>
        </div>
      </div>
    </div>
  );
};

CommentHeader.propTypes = {
  view: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  deletePost: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default CommentHeader;

/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import CommenterCard from './CommenterCard';
import Icon from '../../Icon';

const LikersModal = ({ results }) => {
  let commentee;
  let comments;
  if (results) {
    comments = results.comments;
    commentee = results.commentsNo;
  }
  const closeModal = () => {
    $('#myCommentsModal').modal('hide');
  };

  return (
    <>
      {commentee === 0 ? (
        <span className="text-secondary comments-link smooth-transition text-font-15 font-weight-bold">
          <Icon name="messageSquare" height={24} width={24} />
          No comments available
        </span>
      ) : (
        <Link
          className="text-secondary comments-link smooth-transition text-font-15 font-weight-bold"
          to="#"
          exact
          data-toggle="modal"
          data-target="#myCommentsModal"
        >
          <Icon name="messageSquare" height={24} width={24} />
          {` ${
            typeof commentee !== 'undefined' ? commentee.toLocaleString() : 0
          } comments`}
        </Link>
      )}
      <div
        className="modal fade likers-modal with-comment"
        id="myCommentsModal"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="mx-auto">
                <h3 className="">Comments</h3>
              </div>

              <button type="button" className="close" onClick={closeModal}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="comment-modal-content">
                <div className="post-owner-div">
                  <CommenterCard
                    userPicture={
                      typeof results !== 'undefined' &&
                      typeof results.owner !== 'undefined'
                        ? results.owner.profilePicture
                        : null
                    }
                    ownerName={
                      typeof results !== 'undefined' &&
                      typeof results.owner !== 'undefined'
                        ? results.owner.username
                        : null
                    }
                    caption={
                      typeof results !== 'undefined' && results.caption
                        ? results.caption
                        : null
                    }
                    user="owner"
                  />
                </div>
                <div className="other-commenters-div">
                  {typeof results !== 'undefined'
                    ? typeof comments !== 'undefined' &&
                      results.comments !== 'none'
                      ? comments.map((comment) => (
                          <CommenterCard
                            picture={comment.user.profilePicture}
                            username={comment.user.username}
                            comment={comment.comment}
                            userPicture={results.owner.profilePicture}
                            user={results.owner.username}
                            createdAt={comment.createdAt}
                          />
                        ))
                      : 'No Comments!'
                    : null}
                </div>
              </div>
              <div className="comment-form">
                <form className="">
                  <div className="form-group">
                    <div className="input-group mb-3">
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Add a comment"
                      />
                      <div className="input-group-append">
                        <button className="input-group-text" type="button">
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

LikersModal.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default LikersModal;

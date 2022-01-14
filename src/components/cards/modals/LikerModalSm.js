/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import LikerCard from './LikerCard';

const LikersModal = ({ results }) => {
  const closeModal = () => {
    $('#myLikersModal').modal('hide');
  };
  let likee;
  let likes;
  if (results) {
    likes = results.likes;
    const { likesNo } = results;
    if (likesNo) {
      likee = likesNo;
    }
  }
  return (
    <>
      <div className="modal fade likers-modal" id="myLikersModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="mx-auto">
                <h3 className="">Likes</h3>
              </div>

              <button type="button" className="close" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              {typeof results !== 'undefined'
                ? typeof likes !== 'undefined' && results.likes !== 'none'
                  ? likes[0].likes.map((like) => (
                    <LikerCard
                      picture={like.profilePicture}
                      username={like.username}
                    />
                  ))
                  : 'No Likes!'
                : null}
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

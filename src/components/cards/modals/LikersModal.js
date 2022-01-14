/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import LikerCard from './LikerCard';

const LikersModal = ({
 modal, data, id, results
}) => {
  const closeModal = () => {
    $(`#likersBodyModal${id}`).modal('hide');
  };
  return (
    <>
      <div
        className="modal fade likers-modal with-liker"
        id={`likersBodyModal${id}`}
      >
        <div className="modal-dialog modal-sm modal-dialog-centered">
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
              {modal === 'modal'
                ? typeof data !== 'undefined'
                  ? typeof data.likes !== 'undefined' && data.likes !== 'none'
                    ? data.likes.map((like) => (
                        <LikerCard
                          picture={typeof like.user !== 'undefined' ? like.user.profilePicture : like.profilePicture}
                          username={typeof like.user !== 'undefined' ? like.user.username : like.username}
                          fullname={typeof like.user !== 'undefined' ? like.user.fullname : like.fullname}
                        />
                      ))
                    : 'No Likes'
                  : null
                : typeof results !== 'undefined'
                ? typeof results.likes !== 'undefined'
                  ? typeof results.likes[0].likes !== 'undefined'
                    ? results.likes[0].likes.map((like) => (
                        <LikerCard
                          picture={like.profilePicture}
                          username={like.username}
                          fullname={like.fullname}
                        />
                      ))
                    : 'No Likes'
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
  id: PropTypes.string.isRequired,
  modal: PropTypes.string.isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default LikersModal;

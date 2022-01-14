/* eslint-disable indent */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import generatePostedAt from '../../../helpers/generatePostedAt';
import LikersModal from './LikersModal';
import likePostAction from '../../../redux/actions/likes/likePost';
import unlikePostAction from '../../../redux/actions/likes/unlikePost';
import Icon from '../../Icon';

const CommentHeader = ({
  modal,
  data,
  id,
  postId,
  results,
  likePostAction: likeAction,
  likePost,
  unlikePostAction: unlikeAction,
  unlikePost,
}) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const [addLike, setAddLike] = useState(false);
  const [reduceLike, setReduceLike] = useState(false);
  const [currentBtn, setCurrentBtn] = useState('');

  useEffect(() => {
    if (likePost.status === 'success') {
      return setAddLike(true);
    }
    if (unlikePost.status === 'success') {
      return setReduceLike(true);
    }
    return undefined;
  }, [likePost, unlikePost]);

  const postID = modal === 'modal' ? id : postId;

  const handleLike = (e) => {
    e.preventDefault();
    setLikeStatus(true);
    setCurrentBtn('modal-liking');
    setReduceLike(false);
    return likeAction(postID);
  };

  const handleUnlike = (e) => {
    e.preventDefault();
    setLikeStatus(false);
    setCurrentBtn('modal-unliking');
    setAddLike(false);
    return unlikeAction(postID);
  };

  const likes = data ? data.totalLikes : 4500;
  const changeLikes = currentBtn === 'modal-liking'
      ? likes !== 0
        ? likes
        : likes + 1
      : currentBtn === 'modal-unliking'
      ? likes !== 0
        ? likes - 1
        : likes
      : likes;

  return (
    <div className="profile-modal-comment-body-footer px-2 pt-2 pb-2">
      {currentBtn === 'modal-liking'
      || (data.isLiked && currentBtn !== 'modal-unliking')
      || likeStatus ? (
        <span
          className="mr-3 post-footer-icon text-danger cursor-pointer"
          onClick={handleUnlike}
        >
          <Icon
            name="heart_full"
            width={24}
            height={24}
            color="#dd4b39"
          />
        </span>
      ) : (
        <span
          className="mr-3 post-footer-icon text-light-icon cursor-pointer"
          onClick={handleLike}
        >
          <Icon name="heart" height={24} width={24} />
        </span>
      )}
      <span className="post-footer-icon text-light-icon cursor-pointer">
        <Icon name="messageSquare" height={24} width={24} />
      </span>
      {/* LIKES */}
      <span className="d-block">
        {typeof likes === 'undefined' || likes === 0 ? (
          <Link className="text-dark mt-1 likes-link smooth-transition text-font-15 font-weight-bold no-click">
            {typeof changeLikes === 'undefined' || changeLikes === 0
              ? 'No Likes!'
              : `Liked by ${changeLikes.toLocaleString()} people.`}
          </Link>
        ) : (
          <Link
            className="text-dark mt-1 likes-link smooth-transition text-font-15 font-weight-bold"
            to="#"
            exact
            data-toggle="modal"
            data-target={
              typeof changeLikes === 'undefined' || changeLikes === 0
                ? '#noModalOpen'
                : `#likersBodyModal${id}`
            }
          >
            {typeof changeLikes === 'undefined' || changeLikes === 0
              ? 'No Likes!'
              : `Liked by ${changeLikes.toLocaleString()} people.`}
          </Link>
        )}
        <LikersModal modal={modal} data={data} results={results} id={id} />
      </span>
      <span
        className="d-block font-weight-bold text-dark footer-date-display mt-2"
        style={{ fontSize: 13 }}
      >
        {generatePostedAt(data.createdAt)}
      </span>
    </div>
  );
};

CommentHeader.propTypes = {
  id: PropTypes.string.isRequired,
  modal: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  likePostAction: PropTypes.func.isRequired,
  likePost: PropTypes.objectOf(PropTypes.any).isRequired,
  unlikePostAction: PropTypes.func.isRequired,
  unlikePost: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ likePost, unlikePost }) => ({
  likePost,
  unlikePost,
});
export default connect(mapStateToProps, {
  likePostAction,
  unlikePostAction,
})(CommentHeader);

/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import generatePostedAt from '../../helpers/generatePostedAt';
import LikersModal from './modals/LikerModalSm';
import CommenterModal from './modals/CommenterModal';
import likePostAction from '../../redux/actions/likes/likePost';
import unlikePostAction from '../../redux/actions/likes/unlikePost';
import Icon from '../Icon';

const CardFooter = ({
  results,
  view,
  likePostAction: likeAction,
  likePost,
  unlikePostAction: unlikeAction,
  unlikePost,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
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

  const postID = results ? results._id : '';

  const handleLike = (e) => {
    e.preventDefault();
    setLikeStatus(true);
    setCurrentBtn('liking');
    setReduceLike(false);
    return likeAction(postID);
  };

  const handleUnlike = (e) => {
    e.preventDefault();
    setLikeStatus(false);
    setCurrentBtn('unliking');
    setAddLike(false);
    return unlikeAction(postID);
  };

  const likes = results ? results.likesNo : 4500;
  const comments = results ? results.commentsNo : 100;
  const caption = results ? results.caption : 'Lorem';

  const changeLikes = currentBtn === 'liking'
    ? likes !== 0
      ? likes
      : likes + 1
    : currentBtn === 'unliking'
      ? likes !== 0
        ? likes - 1
        : likes
      : likes;
  const setCaption = typeof caption !== 'undefined' && caption !== 'undefined' ? caption : '';
  const toggleMore = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="post-card-footer-content px-3 py-2 bg-white">
      <div>
        <span className=" mb-2">
          {view === 'single' ? (
            typeof likes === 'undefined' || likes === 0 ? (
              <Link className="text-secondary  mt-1 likes-link smooth-transition text-font-15 font-weight-bold no-click">
                {typeof changeLikes === 'undefined' || changeLikes === 0
                  ? '0 Likes!'
                  : ` ${changeLikes.toLocaleString()}Likes `}
              </Link>
            ) : (
              <>
                <Link
                  className="text-secondary  mt-1 likes-link smooth-transition text-font-15 font-weight-bold"
                  to="#"
                  exact
                  data-toggle="modal"
                  data-target={
                  typeof changeLikes === 'undefined' || changeLikes === 0
                    ? '#noModalOpen'
                    : '#myLikersModal'
                }
                >
                  {typeof changeLikes === 'undefined' || changeLikes === 0
                    ? '0 Likes!'
                    : `${changeLikes.toLocaleString()} Likes`}
                </Link>
                <LikersModal results={results} />
              </>
            )
          ) : typeof changeLikes === 'undefined' || changeLikes === 0 ? (
            <Link className="text-secondary  mt-1 likes-link smooth-transition text-font-15 font-weight-bold no-click">
              0 Likes
            </Link>
          ) : (
            <Link
              className="text-secondary  mt-1 likes-link smooth-transition text-font-15 font-weight-bold"
              to={`/post/${postID}`}
              exact
            >
              {` ${
                typeof changeLikes === 'undefined'
                  ? 0
                  : changeLikes.toLocaleString()
              } likes`}
            </Link>
          )}
        </span>
        <span className="ml-1">|</span>
        <span className=" ml-1">
          {view === 'single' ? (
            <CommenterModal results={results} />
          ) : comments === 0 ? (
            <span className="text-secondary comments-link smooth-transition text-font-15 font-weight-bold">
              0 comments
            </span>
          ) : (
            <Link
              className="text-secondary comments-link smooth-transition text-font-15 font-weight-bold"
              to={`/post/${postID}`}
              exact
            >
              {`${
                typeof comments === 'undefined' ? 0 : comments.toLocaleString()
              } comments`}
            </Link>
          )}
        </span>
      </div>
      <hr />
      {currentBtn === 'liking'
      || (results.isLiked && currentBtn !== 'unliking')
      || likeStatus ? (
        <span
          className="mr-3 post-footer-icon mb-2 text-danger cursor-pointer"
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
      <Link
        className="mr-2 post-footer-icon text-light-icon cursor-pointer smooth-transition"
        to={`/post/${postID}`}
        title="View Post"
        exact
      >
        <Icon name="messageSquare" height={24} width={24} />
      </Link>
    </div>
  );
};
CardFooter.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  view: PropTypes.string.isRequired,
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
})(CardFooter);

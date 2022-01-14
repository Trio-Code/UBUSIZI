/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentHeader from './CommentHeader';
import CommentBody from './CommentBody';
import CommentFooter from './ModalCommentFooter';
import DisplayVideo from './DisplayVideo';
import DisplayThumbnail from './DisplayThumbnail';
import commentAction from '../../../redux/actions/comment/comment';

const VidCardBody = ({
  data: datas, info, id, page, results, commentAction: action, postcomment, refetch, deletePost
}) => {
  const userLoggedIn = JSON.parse(localStorage.getItem('UBUSIZI_USER_DATA'));
  datas.owner = info;
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');
  const [modalcomment,setModalComment]=useState('no comment');

  let newcomment = {
    _id: '',
    comment: '',
    user: {
      id: '',
      profilePicture: '',
      username: ''
    },
    createdAt: '500'

  };

  useEffect(() => {
    if(modalcomment==='commentvid'){
      if (postcomment.status === 'success') {
        setStatus('success');
        newcomment = {
          ...newcomment,
          _id: 'ok2',
          comment,
          user: {
            id: 'ok2',
            profilePicture: userLoggedIn.picture,
            username: userLoggedIn.username,
          },
          createdAt: 'ok',
        };
        if (datas.comments === 'none') {
          datas.comments = [];
          datas.comments.push(newcomment);
        } else {
          datas.comments.push(newcomment);
        }
        setComment('');
        setModalComment('no comment');
      }}
    return undefined;
  }, [postcomment]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment !== '') {
      setStatus('submiting');
      const payload = { comment };
      action(payload, id);
    }
    setModalComment('commentvid');
  };
  return (
    <>
      <span
        className="cursor-pointer"
        data-toggle="modal"
        data-target={`#profileVidBodyModal${id}`}
      >
        <DisplayThumbnail data={datas} results={results} />
      </span>
      <div className="modal fade profile-modal" id={`profileVidBodyModal${id}`}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body prof-body">
              <div className="row">
                <div className="col-7">
                  <div className="profile-modal-post-body">
                    <DisplayVideo results={results} />
                  </div>
                </div>
                <div className="col-5">
                  <div className="profile-modal-comment-body">
                    <CommentHeader
                      modal="modal"
                      data={datas}
                      results={results}
                      page={page}
                      deletePost={deletePost}
                      refetch={refetch}
                      modalName={`#profileTxtBodyModal${id}`}
                    />
                    <CommentBody modal="modal" data={datas} results={results} />
                    <CommentFooter
                      modal="modal"
                      data={datas}
                      results={results}
                      id={id}
                    />
                  </div>
                  <div className="comment-form">
                    <form className="">
                      <div className="form-group">
                        <div className="input-group mb-3">
                          <textarea
                            type="text"
                            className="form-control"
                            placeholder="Add a comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <div className="input-group-append">
                            {status === 'submiting' ? (
                              <button
                                className="input-group-text"
                                type="button"
                                disabled
                              >
                                Posting
                              </button>
                            ) : (
                              <button
                                className="input-group-text"
                                type="button"
                                onClick={handleSubmit}
                              >
                                Post
                              </button>
                            )}

                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

VidCardBody.propTypes = {
  id: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  info: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  commentAction: PropTypes.func.isRequired,
  postcomment: PropTypes.objectOf(PropTypes.any).isRequired,
  refetch: PropTypes.func.isRequired,
  deletePost: PropTypes.string.isRequired,
};
const mapStateToProps = ({ postcomment }) => ({ postcomment });

export default connect(mapStateToProps, { commentAction })(VidCardBody);

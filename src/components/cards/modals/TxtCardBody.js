/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentHeader from './CommentHeader';
import CommentBody from './CommentBody';
import CommentFooter from './CommentFooter';
import commentAction from '../../../redux/actions/comment/comment';

const TextCardBody = ({
  data,
  info,
  id,
  css,
  page,
  results,
  commentAction: action,
  postcomment,
  refetch,
  deletePost,
}) => {
  const userLoggedIn = JSON.parse(localStorage.getItem('UBUSIZI_USER_DATA'));
  data.owner = info;
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');
  const [modalcomment,setModalComment]=useState('no comment');
  let newcomment = {
    _id: '',
    comment: '',
    user: {
      id: '',
      profilePicture: '',
      username: '',
    },
    createdAt: '',
  };

  useEffect(() => {
    if(modalcomment==='commenttxt'){
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
      if (data.comments === 'none') {
        data.comments = [];
        data.comments.push(newcomment);
      } else {
        data.comments.push(newcomment);
      }
      setComment('');
      setModalComment('no comment');
    }}
    return undefined;
  }, [postcomment]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment != '') {
      setStatus('submiting');
      const payload = { comment };
      action(payload, id);
    }
    setModalComment('commenttxt');
  };
  const len = data.content.length;
  const myParagraphs = data.content.split('\n\n');
  const stanza = myParagraphs.map((myParagraph) => (
    <p className={`font-${results.font}`}>{myParagraph}</p>
  ));

  return (
    <>
      <div
        className={`cursor-pointer bg-color-${data.color} font-${data.font} ${css}`}
        data-toggle="modal"
        data-target={`#profileTxtBodyModal${id}`}
      >
        <p className="text-left post-text-display-text" style={{ height: 300 }}>
          {`${len > 220 ? `${data.content.slice(0, 220)}...` : data.content}`}
          {len > 220 ? <p className="text-center mt-3"> Read more</p> : null}
        </p>
      </div>
      <div className="modal fade profile-modal" id={`profileTxtBodyModal${id}`}>
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
                    <div
                      className={`profile-modal-text-display-div font-${results.font
                        } bg-color-${data.color.toLowerCase()} text-white`}
                    >
                      <div
                        className={
                          data.align === 'text-center'
                            ? ' singlePostLineWidth alignDivCenter  '
                            : data.align === 'text-right'
                              ? ' singlePostLineWidth singlePostAlignDivRight '
                              : ' singlePostLineWidth'
                        }
                      >
                        <p
                          className={`${data.align}  cursor-pointer profile-modal-text-display-par post-text-111-to-350`}
                        >
                          <h4
                            className={` ${data.align} font-weight-bold text-font-20`}
                          >
                            {data.title}
                          </h4>

                          {stanza}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-5">
                  <div className="profile-modal-comment-body">
                    <CommentHeader
                      modal="modal"
                      data={data}
                      results={results}
                      page={page}
                      deletePost={deletePost}
                      refetch={refetch}
                      modalName={`#profileTxtBodyModal${id}`}
                    />
                    <CommentBody modal="modal" data={data} results={results} />
                    <CommentFooter
                      modal="modal"
                      data={data}
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

TextCardBody.propTypes = {
  id: PropTypes.string.isRequired,
  css: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  info: PropTypes.objectOf(PropTypes.any).isRequired,
  commentAction: PropTypes.func.isRequired,
  postcomment: PropTypes.objectOf(PropTypes.any).isRequired,
  refetch: PropTypes.func.isRequired,
  deletePost: PropTypes.string.isRequired,
};
const mapStateToProps = ({ postcomment }) => ({ postcomment });

export default connect(mapStateToProps, { commentAction })(TextCardBody);

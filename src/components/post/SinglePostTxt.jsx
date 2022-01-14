/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentHeader from '../cards/modals/CommentHeader';
import CommentBody from '../cards/modals/CommentBody';
import CommentFooter from '../cards/modals/CommentFooter';
import commentAction from '../../redux/actions/comment/comment';

const SinglePostSm = ({
  view, results, postId, commentAction: action, postcomment
}) => {
  const info = JSON.parse(localStorage.getItem('UBUSIZI_USER_DATA'));
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');
  const [singleComment, setSingleComment]=useState('no comment')
  let newcomment = {
    _id: '',
    comment: '',
    user: {
      id: '',
      profilePicture: '',
      username: ''
    },
    createdAt: ''

  };

  useEffect(() => {
    if(singleComment==='single comment'){
    if (postcomment.status === 'success') {
      setStatus('success');
      newcomment = {
        ...newcomment,
        _id: 'oks',
        comment,
        user: {
          id: 'ok',
          profilePicture: info.picture,
          username: info.username
        },
        createdAt: 'ok'
      };
      if (results.comments === 'none') {
        results.comments = [];
        results.comments.push(newcomment);
      } else {
        results.comments.push(newcomment);
      }

      setComment('');
      setSingleComment('no comment');
    }}
    return undefined;
  }, [postcomment]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment != '') {
      setStatus('submiting');
      const payload = { comment };
      action(payload, postId);
      setSingleComment('single comment');
    }
  };
  const myParagraphs = results.content.split('\n\n');
  const stanza = myParagraphs.map((myParagraph) => (
    <p className={`font-${results.font}`}>{myParagraph}</p>
  ));
  return (
    <div className="single-post-display-content mt-4">
      <div className="row-post-div-separator">
        <div className="row">
          <div className="col-7">
            <div className="profile-modal-post-body">
              <div className={`profile-modal-text-display-div bg-color-${results.color.toLowerCase()} font-${results.font}`}>
                <div className={results.align === 'text-center' ? ' singlePostLineWidth alignDivCenter  ' : results.align === 'text-right' ? ' singlePostLineWidth singlePostAlignDivRight ' : ' singlePostLineWidth'}>
                  <p className={`bg-color-${results.color} ${results.align} text-white font-weight-bold cursor-pointer profile-modal-text-display-par post-text-111-to-350`}>
                    <h4 className="font-weight-bold  ml-2 mt-2 text-font-20">{results.title}</h4>

                    {stanza}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="profile-modal-comment-body">
              <CommentHeader view={view} results={results} />
              <CommentBody results={results} />
              <CommentFooter results={results} postId={postId} />
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
  );
};

SinglePostSm.propTypes = {
  view: PropTypes.string.isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  postId: PropTypes.string.isRequired,
  commentAction: PropTypes.func.isRequired,
  postcomment: PropTypes.objectOf(PropTypes.any).isRequired,
};
const mapStateToProps = ({ postcomment }) => ({ postcomment });
export default connect(mapStateToProps, { commentAction })(SinglePostSm);

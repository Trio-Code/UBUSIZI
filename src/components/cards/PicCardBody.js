import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ModalBody from './modals/PicCardBody';
import PostPP from '../../assets/images/post-pic.png';

const TextCardBody = ({
  data,
  info,
  css,
  results,
  compt,
  id,
  page,
  refetch,
  deletePost,
}) => (
  <div>
    <div className={css}>
      <div className="post-card-res-img">
        <div className="lg-card-body-display">
          {compt === 'profile' ? (
            <ModalBody
              data={data}
              info={info}
              deletePost={deletePost}
              results={results}
              id={id}
              page={page}
              refetch={refetch}
            />
          ) : (
            <img
              src={results ? results.content : PostPP}
              alt="lg-card-post-img"
              className="card-res-img"
            />
          )}
        </div>
        <div className="sm-card-body-display d-none">
          {compt === 'profile' ? (
            <Link to={data ? `/post/${data._id}` : '/post/postId'}>
              <img
                src={results ? results.content : PostPP}
                alt="sm-card-post-img"
                className="card-res-img"
              />
            </Link>
          ) : (
            <img
              src={results ? results.content : PostPP}
              alt="sm-card-post-img"
              className="card-res-img"
            />
          )}
        </div>
      </div>
    </div>
  </div>
);

TextCardBody.propTypes = {
  css: PropTypes.string.isRequired,
  deletePost: PropTypes.string.isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  compt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default TextCardBody;

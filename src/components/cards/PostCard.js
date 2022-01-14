/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader';
import Cardfooter from './CardFooter';
import TextCardBody from './TextCardBody';
import PicCardBody from './PicCardBody';
import VideoCardBody from './VideoCardBody';
import VideoCardBodyProfile from './videoCardBodyProfile';

const PostCard = ({
  data, info, type, profile, results,
  view, page, refetch, deletePost
}) => {
  let len;
  if (data != undefined) {
    len = results.content.length;
  }
  return (
    <div>
      {profile === 'profile' ? (
        <div className="post-card-content mb-5">
          <div className="post-card-body">
            {type === 'Text' ? (
              <TextCardBody
                css={`text-white txt-card py-2 px-3`}
                results={results}
                data={data}
                compt="profile"
                id={data._id}
                page={page}
                info={info}
                refetch={refetch}
                deletePost={deletePost}
              />
            ) : type === 'Image' ? (
              <PicCardBody
                css="pic-card "
                results={results}
                data={data}
                compt="profile"
                id={data._id}
                page={page}
                info={info}
                refetch={refetch}
                deletePost={deletePost}
              />
            ) : (
                  <VideoCardBodyProfile
                    css="video-card "
                    results={results}
                    data={data}
                    compt="profile"
                    id={data._id}
                    page={page}
                    info={info}
                    refetch={refetch}
                    deletePost={deletePost}
                  />
                )}
          </div>
        </div>
      ) : (
          <div className="post-card-content mb-5">
            <div className="post-card-header">
              <CardHeader results={results} view={view} />
            </div>
            <div className="post-card-body">
              {type === 'Text' ? (
                <TextCardBody
                  css={`text-card-body-content bottom-shadow bg-color-${results.color.toLowerCase()} font-${results.font
                    } text-white py-2 px-3`}
                  results={results}
                />
              ) : type === 'Image' ? (
                <PicCardBody css="pic-card-body-content" results={results} />
              ) : (
                    <VideoCardBody css="video-card-body-content" results={results} />
                  )}
              {type === 'Text' ? (
                len > 500 ? (
                  <div className="down" />
                ) : null
              ) : null}
            </div>
            <Cardfooter results={results} view={view} />
          </div>
        )}
    </div>
  );
};

PostCard.propTypes = {
  type: PropTypes.string.isRequired,
  deletePost: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  view: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default PostCard;

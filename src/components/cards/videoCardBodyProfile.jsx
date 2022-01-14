import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ModalBody from './modals/VidCardBody';
import Video from '../../assets/images/vid.mp4';

const VideoCardBody = ({
  data,
  info,
  css,
  compt,
  id,
  page,
  results,
  refetch,
  deletePost,
}) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const loadVideo = () => {
    setIsLoaded(false);
  };
  return (
    <div className={css}>
      {isLoaded ? (
        <div className="text-center post-loader-div">
          <div className="spinner-border text-primary text-center" />
        </div>
      ) : null}
      <div className="video-profile-lg-display">
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
          <ReactPlayer
            url={results ? results.content : Video}
            onReady={loadVideo}
            playing={false}
            muted
            loop={false}
            controls
            volume={0.5}
            width="100%"
            height="100%"
            className="my-react-player"
          />
        )}
      </div>
      <div className="video-profile-sm-display d-none">
        {compt === 'profile' ? (
          <Link to={data ? `/post/${data._id}` : '/post/postId'}>
            <ReactPlayer
              url={results ? results.content : Video}
              onReady={loadVideo}
              playing={false}
              muted
              loop={false}
              controls={false}
              volume={0.5}
              width="100%"
              height="100%"
              className="my-react-player"
            />
          </Link>
        ) : (
          <ReactPlayer
            url={results ? results.content : Video}
            onReady={loadVideo}
            playing={false}
            muted
            loop={false}
            controls
            volume={0.5}
            width="100%"
            height="100%"
            className="my-react-player"
          />
        )}
      </div>
    </div>
  );
};
VideoCardBody.propTypes = {
  css: PropTypes.string.isRequired,
  compt: PropTypes.string.isRequired,
  deletePost: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  info: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  refetch: PropTypes.func.isRequired,
};
export default VideoCardBody;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import Video from '../../../assets/images/vid.mp4';

const VideoCardBody = ({ data, results }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const loadVideo = () => {
    setIsLoaded(false);
  };
  return (
    <div className="profile-modal-display-thumb-div">
      {isLoaded ? (
        <div className="text-center post-loader-div">
          <div className="spinner-border text-primary text-center" />
        </div>
      ) : null}
      <ReactPlayer
        url={data ? data.content : Video}
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
    </div>
  );
};
VideoCardBody.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default VideoCardBody;

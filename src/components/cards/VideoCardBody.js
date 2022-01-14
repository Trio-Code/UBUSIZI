import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import Video from '../../assets/images/vid.mp4';

const VideoCardBody = ({ css, results }) => {
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
      <ReactPlayer
        url={results ? results.content : Video}
        onReady={loadVideo}
        playing={false}
        muted
        controls
        loop={false}
        volume={0.5}
        width="100%"
        height={400}
      />
    </div>
  );
};
VideoCardBody.propTypes = {
  css: PropTypes.string.isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default VideoCardBody;

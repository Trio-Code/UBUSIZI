/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoCardBody = ({ content }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const loadVideo = () => {
    setIsLoaded(false);
  };
  return (
    <div className="mx-auto d-block border report-size mt-2 shadow-lg">
      {isLoaded ? (
        <div className="text-center">
          <div className="spinner-border text-primary text-center" />
        </div>
      ) : null}
      <ReactPlayer
        url={content}
        onReady={loadVideo}
        playing="true"
        loop
        volume={0.5}
        width="100%"
        height={180}
      />
    </div>
  );
};
export default VideoCardBody;

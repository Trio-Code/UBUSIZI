/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable operator-linebreak */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import NotificationActivitiescard from './notificationActivitiescard';
import CommentCardActivity from './CommentCardActivity';
import LikeCardActivity from './LikeCardActivity';
import Loader from '../Loader';

const ToolTipData = ({
  showToolTip,
  data = [],
  error,
}) => {
  const [collapseDiv, setcollapseDiv] = useState(false);
  const collapseToolTip = () => {
    setcollapseDiv(true);
  };

  if (collapseDiv && !showToolTip) {
    setcollapseDiv(false);
  }

  return (
    <div
      className={`activity-my-tooltip-content ${
        showToolTip
          ? collapseDiv
            ? 'hide-tooltip'
            : 'show-tooltip'
          : 'hide-tooltip'
      }`}
    >
      <span className="activity-my-tool-icon">
        <FontAwesomeIcon icon={['fas', 'caret-up']} />
      </span>
      <div className="my-tooltip-text pt-2">
        <span
          className="text-right text-secondary close-tool-tip-btn mr-2 cursor-pointer"
          onClick={collapseToolTip}
        >
          <FontAwesomeIcon icon={['fas', 'times-circle']} />
        </span>
        <div className="px-3 tooltip-card-div">
          
          {data.length === 0 && error === null ? (<Loader marginTop="10%" />) :
            data.length === 0 && error == 500 ? (
              <p className="text-center text-dark text-font-15 font-weight-bold px-2 mt-5">
                <FontAwesomeIcon icon={['fas', 'info-circle']} className="mr-2" />
                Ooops! Your internet connection is inactive, please try again later.
              </p>
            ) : data.length === 0 && error == 404 ? (
              <p className="text-center text-dark text-font-15 font-weight-bold px-2 mt-5">
                <FontAwesomeIcon icon={['fas', 'info-circle']} className="mr-2" />
                No Activities  found!
              </p>
            ) :

              data.map((result) => (
                result.type === 'Comment' ? (<CommentCardActivity data={result} />) : result.type === 'Follow' ? (<NotificationActivitiescard data={result} />) : result.type === 'Like' ? (<LikeCardActivity data={result} />) : null
              ))}

        </div>

      </div>
    </div>
  );
};
ToolTipData.propTypes = {
  showToolTip: PropTypes.bool.isRequired,
  error: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    )
  ).isRequired,
};

export default ToolTipData;

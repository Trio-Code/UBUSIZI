/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useHistory } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import UserNavbar from '../../components/UserNavbar';
import NotificationActivitiescard from '../../components/notification/MobilenotificationActivityCard';
import CommentCardActivity from '../../components/notification/MobilecommentCardActivity';
import LikeCardActivity from '../../components/notification/MobileLikeCardActivity';
import Loader from '../../components/Loader';
import activityAction from '../../redux/actions/activities/notificationActivities';

const Notification = ({
  activityAction: action,
  notificationActivities,
}) => {
  const history = useHistory();
  const [loggedInData, setLoggedInData] = useState({});
  const [status, setStatus] = useState('initial');
  const [data, setData] = useState([]);
  const [error, setErrorStatus] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem('UBUSIZI_USER_TOKEN');
    const userData = localStorage.getItem('UBUSIZI_USER_DATA');
    if (!userToken || !userData) {
      history.push('/accounts/login');
    }
    setLoggedInData(JSON.parse(userData));
    if (status === 'initial') {
      action();
      if (notificationActivities.status === 'error') {
        setErrorStatus(notificationActivities.error.status);
      }
      if (notificationActivities.status === 'success') {
        setData(notificationActivities.data);
        setStatus('success');
      }
    }
    return undefined;
  }, [notificationActivities]);

 

  return (
    <div className="wrapper ">
      <div className="fixed-top activity-Header">
        <h3 className="ml-2 mt-3">Activity</h3>
      </div>

      <div className="my-tooltip-text pt-2 mt-5">
        <div className="px-3 tooltip-card-div">

          {
         data.length === 0 && error === null ? (<Loader marginTop="10%" />) :
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
         )  : data.map((result) => (
            result.type === 'Comment' ? (<CommentCardActivity data={result} />) : result.type === 'Follow' ? (<NotificationActivitiescard data={result} />) : result.type === 'Like' ? (<LikeCardActivity data={result} />) : null
          ))}

        </div>

      </div>
      <BottomNav data={loggedInData} />

    </div>
  );
};

Notification.propTypes = {
  activityAction: PropTypes.func.isRequired,
  notificationActivities: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ notificationActivities }) => ({ notificationActivities });

export default connect(mapStateToProps, { activityAction })(
  Notification
);

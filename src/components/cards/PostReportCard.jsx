/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import TextReport from './TextReport';
import ImageReport from './ImageReport';
import VideoReport from './VideoReport';
import Logo from '../../assets/images/avat1.png';

const PostReportCard = ({ data = [] }) => {
  const reports = data.map((report) => (
    <div className="col-4 mb-4" key={report._id}>
      <div className="card">
        <span className="font-weight-bold mx-2 mt-2">Post:</span>
        <div>
          {(report.post.type === 'Text') ? (
            <TextReport content={report.post.content} />
          ) : report.post.type === 'Image' ? (
            <ImageReport content={report.post.content} />
          ) : (
            <VideoReport content={report.post.content} />
          )}
        </div>
        <div className="card-body">
          <p className="mb-4" style={{ fontSize: 15 }}>
            <span className="font-weight-bold">Reason:</span>
            <span className="text-muted pl-1">{report.reason.toUpperCase()}</span>
          </p>
          <div className="row my-2">
            <div className="col-2">
              <span className="navbar-profile-pic">
                <span className="">
                  <span
                    className="navbar-profile-img"
                    style={{ backgroundImage: `url(${report.owner.profilePicture === 'none' ? Logo : report.owner.profilePicture})` }}
                  />
                </span>
              </span>

            </div>
            <div className="col-10">
              {/* <span className="font-weight-bold">Post Owner:</span> */}
              <span className="text-muted" style={{ fontSize: 12 }}>{`${report.owner.username.toUpperCase()} (Owner)`}</span>
            </div>
          </div>
          <div className="row ml-0.5">
            <div className="col-2">
              <span className="navbar-profile-pic">
                <span className="">
                  <span
                    className="navbar-profile-img"
                    style={{ backgroundImage: `url(${report.reporter.profilePicture === 'none' ? Logo : report.reporter.profilePicture})` }}
                  />
                </span>
              </span>

            </div>
            <div className="col-10">
              {/* <span className="font-weight-bold">reporter:</span> */}
              <span className="text-muted" style={{ fontSize: 12 }}>{`${report.reporter.username.toUpperCase()} (Reporter)`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
  return <div className="row">{reports}</div>;
};
PostReportCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    )
  ).isRequired,
};

export default PostReportCard;

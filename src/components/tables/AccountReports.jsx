import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../assets/images/avat1.png';

const Table = ({ data = [] }) => (
  <div className="mt-5">
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">N0.</th>
            <th scope="col">Account</th>
            <th scope="col">Reporter</th>
            <th scope="col">Reason</th>
          </tr>
        </thead>
        <tbody>
          {data.map((report, index) => (
            <tr key={report._id}>
              <td>{index + 1}</td>
              <td>
                <div className="row">
                  <div className="col-2">
                    <span className="navbar-profile-pic">
                      <span className="">
                        <span
                          className="navbar-profile-img"
                          style={{ backgroundImage: `url(${report.account.profilePicture === 'none' ? Logo : report.account.profilePicture})` }}
                        />
                      </span>
                    </span>
                  </div>
                  <div className="col-10">
                    {/* <span className="font-weight-bold">Post Owner:</span> */}
                    <span className="text-muted" style={{ fontSize: 12 }}>{report.account.username.toUpperCase()}</span>
                  </div>
                </div>
              </td>
              <td>
                <div className="row">
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
                    {/* <span className="font-weight-bold">Post Owner:</span> */}
                    <span className="text-muted" style={{ fontSize: 12 }}>{report.reporter.username.toUpperCase()}</span>
                  </div>
                </div>
              </td>
              <td>{report.reason.toUpperCase()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    )
  ).isRequired,
};
export default Table;

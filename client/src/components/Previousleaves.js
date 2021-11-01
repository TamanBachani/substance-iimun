import React, {useEffect, useContext} from 'react'
import LeaveContext from '../context/leaves/LeaveContext'
import LoadingContext from "../context/loading/LoadingContext";
import Spinner from "./Spinner";
import '../stylesheets/previous.css'
import ReactTimeAgo from "react-time-ago";


const Previousleaves = () => {
  const { approved, rejected, fetchLeavesForAdmin } = useContext(LeaveContext)
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(true)
    fetchLeavesForAdmin("approved", setLoading);
    fetchLeavesForAdmin('rejected', setLoading)
    // eslint-disable-next-line
  }, [])
  return (
    <div className="prev-bg">
      <h1 className="previous-title">
        All previously Approved/Rejected Leaves
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="prev-container">
          <div className="prev-info">
            <h2 className="appr">Approved ({approved.length})</h2>
            {approved.length !== 0 ? (
              approved.map((leave) => {
                return (
                  <div key={leave._id} className="prev-mail green">
                    <h4 className="prev-name">
                      <span className="time-ago-prev">
                        <ReactTimeAgo
                          date={leave.created}
                          timeStyle="twitter"
                        />
                      </span>
                      {leave.name}
                    </h4>
                    <h5 className="prev-subject">{leave.subject}</h5>
                    <p className="prev-message">{leave.message}</p>
                    {leave.admin_feedback && (
                      <div>
                        <p id="feedback">Feedback</p>
                        <p className="prev-feedback">"{leave.admin_feedback}"</p>
                      </div>
                    )}
                  </div>
                );
              })
              ) : (
                <div>No approved leaves</div>
                )}
          </div>
          <div className="prev-info">
            <h2 className="appr">Rejected ({rejected.length})</h2>
            {rejected.length !== 0 ? (
              rejected.map((leave) => {
                return (
                  <div key={leave._id} className="prev-mail red">
                    <h4 className="prev-name">
                      <span className="time-ago-prev">
                        <ReactTimeAgo
                          date={leave.created}
                          timeStyle="twitter"
                        />
                      </span>
                      {leave.name}
                    </h4>
                    <h5 className="prev-subject">{leave.subject}</h5>
                    <p className="prev-message">{leave.message}</p>
                    {leave.admin_feedback &&<div><p id="feedback">Feedback</p>
                    <p className="prev-feedback">"{leave.admin_feedback}"</p></div>}
                  </div>
                );
              })
              ) : (
                <div>No rejected leaves</div>
                )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Previousleaves

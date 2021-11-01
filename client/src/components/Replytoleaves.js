import React, {useEffect, useContext, useState} from 'react'
import '../stylesheets/deal-with-leaves.css'
import LeaveContext from '../context/leaves/LeaveContext'
import LoadingContext from "../context/loading/LoadingContext";
import Spinner from "./Spinner";
import ReactTimeAgo from "react-time-ago";

const Replytoleaves = () => {
  const { fetchLeavesForAdmin, pending, reply } = useContext(LeaveContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const [adminFeedback, setAdminFeedback] = useState('')

  useEffect(() => {
    setLoading(true)
    fetchLeavesForAdmin('pending', setLoading)
    // eslint-disable-next-line
  }, [])

  const handleReply = (id, status, feedback) => {
    reply(id, status, feedback);
    setAdminFeedback('')
  }

  return (
    <div className='reply-page'>
    <h1 className='pending'><b>Leaves that are currently pending</b></h1>
    <main>
      {loading?<Spinner/>:pending.length!==0?pending.map((leave) => {
        return (
          <div className="card" key={leave._id}>
            <div className="card-padding">
              <h4 className="name">
                <span className="name-span">{leave.name}</span>
                <span className='time-ago'>
              <ReactTimeAgo
                date={leave.created}
                timeStyle="twitter"
              />
            </span>
              </h4>
              <h5 className="subject">{leave.subject}</h5>
              <p className="mail">{leave.message}</p>
              <form>
                <label htmlFor="feedback">Feedback</label>
                <textarea
                  type="text"
                  id="feedback"
                  name="admin_feedback"
                  placeholder="This field is not compulsory"
                  onChange={(e) => setAdminFeedback(e.target.value)}
                  value={adminFeedback}
                />
              </form>
            </div>
            <div className="btns">
              <button
                title="Approve"
                className="approved"
                onClick={() => {
                  handleReply(leave._id, "approved", adminFeedback);
                }}
              >
                <i className="fas fa-check-circle fa-lg"></i>
              </button>
              <button
                title="Reject"
                className="rejected"
                onClick={() => {
                  handleReply(leave._id, "rejected", adminFeedback);
                }}
              >
                <i className="fas fa-times-circle fa-lg"></i>
              </button>
            </div>
          </div>
        );
      }) : <div>
      <p className='no-pending'>No pending leaves</p>
      </div>}
        
      </main>
      </div>
  )
}

export default Replytoleaves

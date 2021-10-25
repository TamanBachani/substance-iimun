import React, {useEffect, useContext} from 'react'
import '../stylesheets/deal-with-leaves.css'
import LeaveContext from '../context/leaves/LeaveContext'
import LoadingContext from "../context/loading/LoadingContext";
import Spinner from "./Spinner";

const Replytoleaves = () => {
  const { fetchLeavesForAdmin, pending, reply } = useContext(LeaveContext);
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(true)
    fetchLeavesForAdmin('pending', setLoading)
    // eslint-disable-next-line
  }, [])

  const handleReply = (id, status) => {
    reply(id, status);
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
              </h4>
              <h5 className="subject">
                {leave.subject}
              </h5>
              <p className="mail">{leave.message}</p>
            </div>
            <div className="btns">
              <button className="approved" onClick={() => { handleReply(leave._id, 'approved') }}>
                <i className="fas fa-check-circle fa-lg"></i>
              </button>
              <button className="rejected" onClick={() => { handleReply(leave._id, 'rejected') }}>
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

import React, {useContext, useEffect} from 'react'
import LeaveContext from '../context/leaves/LeaveContext';
import LoadingContext from '../context/loading/LoadingContext';
import Spinner from './Spinner';

// importing stylesheet
import '../stylesheets/apply-check.css'


const Checkleave = () => {
  const { allLeaves, fetchAllLeaves } = useContext(LeaveContext)
  const {loading, setLoading} = useContext(LoadingContext)

  useEffect(() => {
    let mount = true;
    if(mount){setLoading(true)
      fetchAllLeaves(setLoading);
    }
    return () => {
      mount=false
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className='check-page'>
      <h1 className='check-heading'>Check The Status of your Leaves</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="all-leaves">
          {allLeaves.length === 0 ? (
            <div className='text-center'>
              <h3 className='no-leaves'>No leaves to display</h3>
            </div>
          ) : (
            allLeaves.map((leave, index) => {
              return (
                <div
                  key={index}
                  className={
                    leave.status === "approved"
                      ? "check-card green-card"
                      : leave.status === "rejected"
                      ? "check-card red-card"
                      : "check-card yellow-card"
                  }
                >
                  <div className="check-card-padding">
                    <h4 className="check-subject">{leave.subject}</h4>
                    <p className="check-msg">{leave.message}</p>
                    <p className="check-status">{leave.status}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default Checkleave

import React, {useContext} from 'react'
import internContext from '../context/interns/internContext';
import LeaveContext from '../context/leaves/LeaveContext';
import LoadingContext from '../context/loading/LoadingContext';
import { useHistory } from 'react-router';
import AlertContext from '../context/alerts/AlertContext';

// importing stylesheet
import '../stylesheets/apply-check.css'

const Applyforleave = () => {
  let history = useHistory();
  const { applyLeave, leave, onChange } = useContext(LeaveContext)
  const { details } = useContext(internContext)
  const { setLoading } = useContext(LoadingContext)
  const { showAlert } = useContext(AlertContext)
  

  const handleApply = (e) => {
    e.preventDefault();
    const { name, sub_id } = details;
    const { subject, message } = leave;
    applyLeave({ name, sub_id, subject, message }, setLoading, showAlert, history)
    // history.push('/checkLeaveStatus')
  }

  return (
    <section className="apply-page">
      <h1 className="apply-heading">Apply For a Leave</h1>
      <div className="form-reside">
        <form onSubmit={handleApply}>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <input
              type="text"
              placeholder="Leave Subject"
              className="form-control"
              id="subject"
              aria-describedby="subject"
              name="subject"
              value={leave.subject}
              onChange={onChange}
              required
              minLength={5}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              type="text"
              placeholder="Leave Message"
              className="form-control"
              id="message"
              name="message"
              value={leave.message}
              onChange={onChange}
              required
              minLength={5}
            />
          </div>
          <div className="btn-container">
            <button type="submit" className="apply-btn">
              Apply
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Applyforleave;

import { useState } from 'react';
import LeaveContext from './LeaveContext'
import { Redirect } from 'react-router-dom';
const LeaveState = (props) => {
  const emptyLeave = {
    subject: "",
    message: "",
    status: ""
  };
  const [leave, setLeave] = useState(emptyLeave);
  const [allLeaves, setallLeaves] = useState([]);
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);

  const onChange = (e) => {
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };


  const applyLeave = async ({ name, sub_id, subject, message }, setLoading, showAlert, history) => {
    const response = await fetch("/leaves/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
      },
      body: JSON.stringify({ subject, message }),
    });
    const status = response.status;
    if (status === 200) {
      // const res = await response.json()
      <Redirect to='checkLeaveStatus' />
      history.push('/checkLeaveStatus')
      setLeave(emptyLeave)
      fetchAllLeaves(setLoading);
      // console.log(res);
    }
    else if (status >= 400) {
      const res = await response.json()
      if (res.error === "You already submiited this application for leave") {
        setLeave(emptyLeave)
        showAlert("danger", "You already submiited this application for leave")
      }
    }
  };

  const fetchAllLeaves = async (setLoading) => {
    const response = await fetch("/leaves/status", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    setLoading(false);
    const status = response.status;
    if (status === 200) {
      const res = await response.json();
      if (!Array.isArray(res)) {
        setallLeaves([])
        
      }
      else {
        setallLeaves(res)
      }
    }
  }

  const fetchLeavesForAdmin = async (type, setloading) => {
    const adminAuthToken = localStorage.getItem("auth-token");
    const response = await fetch(`/leaves/all/${type}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": adminAuthToken,
      },
    });
    setloading(false);
    let res
    if (!response.status === 500) {
      res = await response.json()
    }
    else {
      res = [];
    }
    if (response.status === 200) {
      if (type === 'pending') {
        let pendingArray = [];
        if (res.length > 0 && Array.isArray(res)) {
          res.forEach(element => {
          const { intern, subject, message, status, _id } = element;
          const { name } = intern;
          pendingArray.push({ name, subject, message, status, _id })
        });}
        setPending(pendingArray)
      }
      else if (type === 'approved') {
        let pendingArray = [];
        if (res.length > 0 && Array.isArray(res)) {
          res.forEach(element => {
            const { intern, subject, message, status, _id } = element;
            const { name } = intern;
            pendingArray.push({ name, subject, message, status, _id })
          });
        }
        setApproved(pendingArray)
      }
      else if (type === 'rejected') {
        let pendingArray = [];
        if (res.length > 0 && Array.isArray(res)) {
          res.forEach(element => {
            const { intern, subject, message, status, _id } = element;
            const { name } = intern;
            pendingArray.push({ name, subject, message, status, _id })
          });
        }
        setRejected(pendingArray)
      }
    }
  }

  const reply = async (id, status) => {
    await fetch(`/leaves/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ status }),
    });
    let newArray = pending.filter((leave) => {
      return leave._id !== id
    })
    setPending(newArray)
  }
  
  const value = {
    leave,
    setLeave,
    onChange,
    applyLeave,
    allLeaves,
    setallLeaves,
    fetchAllLeaves,
    fetchLeavesForAdmin,
    pending,
    reply,
    approved,
    rejected
  };
  return (
    <LeaveContext.Provider value={value}>
      {props.children}
    </LeaveContext.Provider>
  );
};

export default LeaveState

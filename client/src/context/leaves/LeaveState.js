import { useState } from "react";
import LeaveContext from "./LeaveContext";
// import { Redirect } from 'react-router-dom';
const LeaveState = (props) => {
  const emptyLeave = {
    subject: "",
    message: "",
    status: "",
    admin_feedback: "",
  };
  const [leave, setLeave] = useState(emptyLeave);
  const [allLeaves, setallLeaves] = useState([]);
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);

  const onChange = (e) => {
    setLeave({ ...leave, [e.target.name]: e.target.value});
  };

  const applyLeave = async (
    { subject, message },
    setLoading,
    showAlert,
    history
  ) => {
    const response = await fetch("/leaves/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ subject, message }),
    });
    const status = response.status;
    if (status === 200) {
      // const res = await response.json()
      history.push("/checkLeaveStatus");
      setLeave(emptyLeave);
      fetchAllLeaves(setLoading);
      // console.log(res);
    } else if (status >= 400) {
      const res = await response.json();
      if (res.error === "You already submiited this application for leave") {
        setLeave(emptyLeave);
        showAlert("danger", "You already submiited this application for leave");
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
        setallLeaves([]);
      } else {
        res.reverse();
        res.forEach((item) => {
          item.created = new Date(item.created)
        })
        setallLeaves(res);
      }
    }
  };

  const fetchLeavesForAdmin = async (type, setloading) => {
    const adminAuthToken = localStorage.getItem("auth-token");
    const response = await fetch(`/leaves/all/${type}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "auth-token": adminAuthToken,
      },
    });
    setloading(false);
    const res = await response.json();
    if (response.status === 200) {
      if (type === "pending") {
        let pendingArray = [];
        if (res.length > 0 && Array.isArray(res)) {
          res.forEach((element) => {
            const { intern, subject, message, status, _id, admin_feedback } =
              element;
            let { created } = element;
            const { name } = intern;
            created = new Date(created);
            pendingArray.push({
              name,
              subject,
              message,
              status,
              _id,
              created,
              admin_feedback,
            });
          });
        }
        pendingArray.reverse();
        setPending(pendingArray);
      } else if (type === "approved") {
        let pendingArray = [];
        if (res.length > 0 && Array.isArray(res)) {
          res.forEach((element) => {
            const { intern, subject, message, status, _id, admin_feedback } =
              element;
            const { name } = intern;
            let { created } = element;
            created = new Date(created);
            pendingArray.push({
              name,
              subject,
              message,
              status,
              _id,
              created,
              admin_feedback,
            });
          });
        }
        pendingArray.reverse();
        setApproved(pendingArray);
      } else if (type === "rejected") {
        let pendingArray = [];
        if (res.length > 0 && Array.isArray(res)) {
          res.forEach((element) => {
            const {
              intern,
              subject,
              message,
              status,
              _id,
              admin_feedback,
            } = element;
            const { name } = intern;
            let { created } = element;
            created = new Date(created);
            pendingArray.push({
              name,
              subject,
              message,
              status,
              _id,
              created,
              admin_feedback,
            });
          });
        }
        pendingArray.reverse();
        setRejected(pendingArray);
      }
    }
  };

  const reply = async (id, status, feedback) => {
    await fetch(`/leaves/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ status, admin_feedback: feedback }),
    });
    let newArray = pending.filter((leave) => {
      return leave._id !== id;
    });
    setPending(newArray);
  };

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
    rejected,
  };
  return (
    <LeaveContext.Provider value={value}>
      {props.children}
    </LeaveContext.Provider>
  );
};

export default LeaveState;

import Home from './components/Home'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { useContext, useEffect } from 'react';
import internContext from './context/interns/internContext';
import Applyforleave from './components/Applyforleave'
import Checkleave from './components/Checkleave';
import LeaveContext from './context/leaves/LeaveContext';
import Replytoleaves from './components/Replytoleaves';
import Previousleaves from './components/Previousleaves';
import Alert from './components/Alert';
import AlertContext from './context/alerts/AlertContext';
import Footer from './components/Footer';


function App() {
  const { setLoggedIn, getInternFromAuth, loggedIn, setDetails, setIsAdmin, isAdmin } = useContext(internContext);
  const { setLeave, setallLeaves } = useContext(LeaveContext)
  const {alert} = useContext(AlertContext)

  useEffect(() => {
    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      setLoggedIn(true);
      // console.log(authToken);
      getInternFromAuth(authToken);
    }
    else {
      setLoggedIn(false)
      setIsAdmin(false)
      setDetails({
        name: "",
        sub_id: "",
        role: "",
      });
      setLeave({ subject: "", message: "", status: "",  admin_feedback:"" })
      setallLeaves([])
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (loggedIn === false) {
      setDetails({
        name: "",
        sub_id: "",
        role: "",
      });
      setLeave({
        subject: "",
        message: "",
        status: "",
        admin_feedback: "",
      });
      setallLeaves([]);
    }
    // eslint-disable-next-line
  }, [loggedIn]);

  return (
    <>
      <Router>
        <Navbar/>
        <Alert alert={alert} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            {!loggedIn ? <Login /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/signup">
            {!loggedIn ? <Signup /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/applyForLeave">
            {loggedIn ? <Applyforleave /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/checkLeaveStatus">
            {loggedIn ? <Checkleave /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/replyToLeaves">
            {loggedIn && isAdmin ? <Replytoleaves /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/previousLeaves">
            {loggedIn && isAdmin ? <Previousleaves /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;

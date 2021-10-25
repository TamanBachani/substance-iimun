import React, {useContext} from 'react'
import '../stylesheets/navbar.css'
import { Link } from 'react-router-dom';
import internContext from '../context/interns/internContext';
import AlertContext from '../context/alerts/AlertContext';
import LeaveContext from '../context/leaves/LeaveContext';
import substanceLogo from '../images/logo1.png'

const Navbar = () => {
  const { logoutIntern, loggedIn, isAdmin } = useContext(internContext)
  const { showAlert } = useContext(AlertContext)
    const { pending } = useContext(LeaveContext);

  return (
    <>
      
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={substanceLogo} alt="" className="d-inline-block align-text-top logo" />
            SUBSTANCE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <i className="fas fa-bars"></i>
            </span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  disabled ={!loggedIn}
                >
                  Leaves
                  {!isAdmin?'':<div className='leave-notif'><span className='notif'>{pending.length}</span></div>}
                </Link>
                {isAdmin?(
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <Link className="dropdown-item" to="/replyToLeaves">
                        Reply to Leaves ({pending.length})
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/previousLeaves">
                        Check previous Leaves
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <Link className="dropdown-item" to="/applyForLeave">
                        Apply for a Leave
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/checkLeaveStatus">
                        Check Leave Status
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {loggedIn ? (
                <li className="nav-item">
                  <button className="nav-link logout" onClick={()=>logoutIntern(showAlert)}>
                    Logout
                  </button>
                </li>
              ) : (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Sign Up
                    </Link>
                  </li>
                </ul>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar

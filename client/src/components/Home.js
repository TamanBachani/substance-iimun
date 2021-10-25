import React, {useContext, useEffect} from 'react'
import '../stylesheets/home.css'
import internContext from '../context/interns/internContext'
import LeaveContext from '../context/leaves/LeaveContext'
import LoadingContext from '../context/loading/LoadingContext'

const Home = (props) => {
  const { loggedIn, details, isAdmin } = useContext(internContext);
  const { fetchLeavesForAdmin, pending } = useContext(LeaveContext);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    let mount = true;
    if (isAdmin && mount) {
      fetchLeavesForAdmin("pending", setLoading);
    }
    return () => {
      mount = false;
    };
    // eslint-disable-next-line
  }, [isAdmin]);

  return (
    <>
      {isAdmin && (
        <div
          className="alert alert-primary alert-dismissible fade show m-0"
          role="alert"
        >
          {pending.length ? (
            <strong>You have {pending.length} leave(s) to reply to!</strong>
          ) : (
            <strong>You have no leaves left to reply to!</strong>
          )}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      <section className="hero">
        <div className="hero-text">
          {loggedIn ? (
            <h1>Hi, {details.name}</h1>
          ) : (
            <h1>Substance warmly welcomes you!</h1>
          )}
          <p>Apply for Leaves | Check Status of Leaves</p>
        </div>
      </section>
      <section className="leave-info">
        <div className="leave-cards">
          <div className="leave-card">
            <i className="fab fa-2x fahome fa-draft2digital"></i>
            <p className="leave-text">2-Step Leave</p>
            <p className="leave-text2">
              Apply for a leave in 2 swift steps. Sign up, followed by a
              subject, and a message.{" "}
            </p>
          </div>
          <div className="leave-card">
            <i className="fas fa-2x fahome fa-tasks"></i>
            <p className="leave-text">Instant Status</p>
            <p className="leave-text2">
              Check the status of your leave in real time. Once approved, watch
              your leave shimmer in green like northern lights.
            </p>
          </div>
          <div className="leave-card">
            <i className="fas fa-2x fahome fa-paper-plane"></i>
            <p className="leave-text">You've Got Mail</p>
            <p className="leave-text2">
              Get quick, auto-generated mails as notifications when the leave
              has been dealt with.
            </p>
          </div>
        </div>
      </section>
      <section className="motto">
        <i className="fas fa-check"></i>
        <h2 className="convey">
          <em>
            <span>The motto</span>
            Just convey it
          </em>
        </h2>
      </section>
      <section className="on-the">
        <h2>Substance is evolving!</h2>
        <div className="on-the-things">
          <p>
            Whilst being the centerpiece behind the substantial working of the
            organization, Substance strives to follow it's creative ivy.
            Plucking it's C's from the Organization's principles, Substance
            believes in The C's:{" "}
            <span className="three-cs">
              Creativity, Coherence, and Consistency.
            </span>{" "}
            With the imminent influx of exams, the paramounting pressure of the
            world caving out, leaves are in fashion. So are websites. This one
            was made with love for the department, it's people, and their
            futures. Contribute to the journey, the evolution, by sending your feedback
            to the following ID: <br />
            <span
              title="Click to copy"
              className="id-for-feedback"
              onClick={() =>
                navigator.clipboard.writeText("tamanbachani.iimun@gmail.com")
              }
            >
              tamanbachani.iimun@gmail.com
            </span>
            <br />
            Follow the links to stay upto date with the happenings in Substance
            vis-à-vis YuvaBharat, The Blog, and The Magazine.{" "}
          </p>
          <div className="btn-tray">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="evolve-btn"
              href="https://youtube.com/playlist?list=PL3HhMTCWB-e97r_zUrIjxq8oX-SLxPxP6"
            >
              YuvaBharat
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="evolve-btn"
              href="https://new.iimun.in/blog/"
            >
              I.I.M.U.N. Blog
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="evolve-btn"
              href="https://new.iimun.in/media/magazine/index.html"
            >
              One World
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

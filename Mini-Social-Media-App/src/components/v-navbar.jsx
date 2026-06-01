import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = ({ user, setUser }) => {
  const logoutFunc = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
      useNavigate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {user ? (
        <div id="navbar" className="rounded-lg">
          <div className="dropdown">
            <i className="fa-solid fa-bars"></i>

            <div className="dropdown-content rounded-b-lg">
              <button>
                <Link to="/home">
                  <i className="fa-solid fa-home"></i>
                </Link>
              </button>

              <div className="mt-3">
                <button className="logout-button" onClick={logoutFunc}>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div id="navbar" className="rounded-lg">
          <div className="dropdown">
            <i className="fa-solid fa-bars"></i>

            <div className="dropdown-content rounded-b-lg">
              <button>
                <Link to="/home">
                  <i className="fa-solid fa-home"></i>
                </Link>
              </button>

              <button className="my-3">
                <Link to="/login">
                  <i class="fa-solid fa-arrow-right-to-bracket"></i>
                </Link>
              </button>

              <div>
                <button>
                  <Link to="/signup">
                    <i class="fa-solid fa-user-plus"></i>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

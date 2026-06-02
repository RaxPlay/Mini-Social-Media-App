import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const Signup = ({ user, setUser }) => {
  const navigate = useNavigate;
  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
    date_of_birth: "",
  });

  const signupFunc = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/signup", signupForm);
      setUser(res.data);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-100">
      <form id="container" className="w-75 rounded-md" onSubmit={signupFunc}>
        <h2 className="bg-[#8f723b] p-2">Sign-Up</h2>

        <div className="p-3 my-4">
          <input
            type="text"
            placeholder="Username"
            value={signupForm.username}
            onChange={(e) => {
              setSignupForm({ ...signupForm, username: e.target.value });
            }}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={signupForm.email}
            onChange={(e) => {
              setSignupForm({ ...signupForm, email: e.target.value });
            }}
            required
            className="mt-3"
          />

          <div className="flex justify-center items-end gap-2 mt-3">
            <input
              type="password"
              placeholder="Password"
              value={signupForm.password}
              onChange={(e) => {
                setSignupForm({ ...signupForm, password: e.target.value });
              }}
              className="w-[53%]"
              required
            />
            <input
              type="date"
              placeholder="10/15/2010"
              value={signupForm.date_of_birth}
              onChange={(e) => {
                setSignupForm({ ...signupForm, date_of_birth: e.target.value });
              }}
              className="w-9.25"
              required
            />
          </div>

          <div>
            <button className="w-[70%] mt-3" onClick={signupFunc}>
              <i className="fa-solid fa-arrow-up"></i>
            </button>
          </div>

          <div className="mt-3 hover:underline">
            <Link to="/login" >
              Already Have An Account?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

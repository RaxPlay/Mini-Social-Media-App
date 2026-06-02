import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export const Login = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const loginFunc = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", loginForm);
      setUser(res.data);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-100">
      <form id="container" className="w-75 rounded-md" onSubmit={loginFunc}>
        <h2 className="bg-[#8f723b] p-2">Log-In</h2>

        <div className="p-3 my-4">
          <input
            type="email"
            placeholder="Email"
            value={loginForm.email}
            onChange={(e) => {
              setLoginForm({ ...loginForm, email: e.target.value });
            }}
            required
          />

          <div className="flex justify-center items-end gap-2 mt-3">
            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => {
                setLoginForm({ ...loginForm, password: e.target.value });
              }}
              className="w-[50%]"
              required
            />
            <button className="w-[16%]" onClick={loginFunc}>
              <i className="fa-solid fa-arrow-up"></i>
            </button>
          </div>
          <div className="mt-3 hover:underline">
            <Link to="/signup">Don't Have An Account?</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

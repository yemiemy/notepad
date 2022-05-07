import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const LOGIN_URL = "/auth/token/login/";

const LoginPage = () => {
  const { setAuth } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(
            LOGIN_URL,
            JSON.stringify({ 'username': user, 'password': password }),
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        // console.log(response.data);
        // console.log(JSON.stringify(response));
        const auth_token = response?.data?.auth_token
        sessionStorage.setItem("auth", JSON.stringify({user, auth_token}))
        setAuth({user, auth_token})
        // clear input fields
        setUser("");
        setPassword("");
        navigate(from, { replace: true })
    } catch (err) {
        if (!err?.response) {
          console.log(err);
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
            console.log(err.response?.status, err.response)
            setErrMsg("Invalid username or password");
        } else if (err.response?.status === 401) {
            setErrMsg("Unauthorised");
        } else {
            console.log(err.response?.status, err.response)
            setErrMsg("Login Failed");
        }
        errRef.current.focus();
    }
  };

  return (
    <section>
      <h1 className="login-header">Login</h1>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

        <form onSubmit={handleSubmit}>
            <div className="txt_field">
            <input
                type="text"
                name="username"
                required
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
            />
            <span></span>
            <label htmlFor="username">Username</label>
            </div>

            <div className="txt_field">
            <input
                type="password"
                name="password"
                required
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <span></span>
            <label htmlFor="password">Password</label>
            </div>

            <input type="submit" value="Login" />

            <div className="signup_link">
            Don't have an account?
            <Link to="/register"> Sign Up</Link>
            </div>
        </form>
    </section>
  );
};

export default LoginPage;

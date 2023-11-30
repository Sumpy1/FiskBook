import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Logo from "../assets/5.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute, signupRoute } from "../utils/APIRoutes";

export default function AuthPage() {
  const history = useHistory();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [loginData, setLoginData] = useState({
    loginUsername: "",
    loginPassword: "",
  });

  const [signupData, setSignupData] = useState({
    signupUsername: "",
    signupPassword: "",
    signupEmail: "",
    signupFirstName: "",
    signupLastName: "",
  });

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignupChange = (event) => {
    const { name, value } = event.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const validateLoginForm = () => {
    const { loginUsername, loginPassword } = loginData;
    if (loginUsername === "" || loginPassword === "") {
      toast.error("Username and password are required.", toastOptions);
      return false;
    }
    return true;
  };

  const validateSignupForm = () => {
    const {
      signupUsername,
      signupPassword,
      signupEmail,
      signupFirstName,
      signupLastName,
    } = signupData;
    if (
      signupUsername === "" ||
      signupPassword === "" ||
      signupEmail === "" ||
      signupFirstName === "" ||
      signupLastName === ""
    ) {
      toast.error("All fields are required for signup.", toastOptions);
      return false;
    }
    return true;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (validateLoginForm()) {
      const { loginUsername, loginPassword } = loginData;
      try {
        const response = await axios.post(loginRoute, {
          username: loginUsername,
          password: loginPassword,
        });
        const { data } = response;
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem("token", data.token);
          history.push("/");
        }
      } catch (error) {
        console.error("Login error", error);
      }
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    if (validateSignupForm()) {
      const {
        signupUsername,
        signupPassword,
        signupEmail,
        signupFirstName,
        signupLastName,
      } = signupData;
      try {
        const response = await axios.post(signupRoute, {
          username: signupUsername,
          password: signupPassword,
          email: signupEmail,
          first_name: signupFirstName,
          last_name: signupLastName,
        });
        const { data } = response;
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem("token", data.token);
          history.push("/");
        }
      } catch (error) {
        console.error("Signup error", error);
      }
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="card">
          <form onSubmit={handleLogin}>
            <div className="title">
              <img src={Logo} alt="" />
              Fiskbook login
            </div>
            <input
              placeholder="Username"
              type="text"
              name="loginUsername"
              value={loginData.loginUsername}
              onChange={handleLoginChange}
            />
            <br />
            <input
              placeholder="Password"
              type="password"
              name="loginPassword"
              value={loginData.loginPassword}
              onChange={handleLoginChange}
            />
            <br />
            <button type="submit">Login</button>
          </form>

          <form onSubmit={handleSignup}>
            <div className="title">Sign Up</div>
            <input
              className="input"
              placeholder="Username"
              type="text"
              name="signupUsername"
              value={signupData.signupUsername}
              onChange={handleSignupChange}
            />
            <br />
            <input
              placeholder="Password"
              type="password"
              name="signupPassword"
              value={signupData.signupPassword}
              onChange={handleSignupChange}
            />
            <br />
            <input
              placeholder="Email"
              type="text"
              name="signupEmail"
              value={signupData.signupEmail}
              onChange={handleSignupChange}
            />
            <br />
            <input
              placeholder="First name"
              type="text"
              name="signupFirstName"
              value={signupData.signupFirstName}
              onChange={handleSignupChange}
            />
            <br />
            <input
              placeholder="Last name"
              type="text"
              name="signupLastName"
              value={signupData.signupLastName}
              onChange={handleSignupChange}
            />
            <br />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

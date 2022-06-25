import React, { useEffect, useState } from "react";
//fontAwesome icon pack
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import GoogleLogin from "react-google-login";

function Login() {
  const [formInfo, setformInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    subscribe: true,
  });
  const [error, seterror] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, className } = e.target;
    if (className === "firstname") {
      setformInfo({ ...formInfo, firstname: value });
      seterror({ ...error, name: "" });
    } else if (className === "lastname") {
      setformInfo({ ...formInfo, lastname: value });
      seterror({ ...error, name: "" });
    } else if (className === "email") {
      setformInfo({ ...formInfo, email: value });
      seterror({ ...error, email: "" });
    } else if (className === "password") {
      setformInfo({ ...formInfo, password: value });
      seterror({ ...error, password: "" });
    } else if (className === "subscribe") {
      setformInfo({ ...formInfo, subscribe: !formInfo.subscribe });
    }
  };

  useEffect(() => {}, [formInfo, error]);

  const validation = () => {
    if (formInfo.firstname === "") {
      seterror({ ...error, name: "firstname cannot be empty" });
      return false;
    }
    if (formInfo.lastname === "") {
      seterror({ ...error, name: "Lastname cannot be empty" });
      return false;
    }
    if (
      formInfo.email.match(
        /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/gi
      ) === null
    ) {
      seterror({ ...error, email: "Enter a valid email address" });
      return false;
    }
    if (
      formInfo.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) == null
    ) {
      seterror({ ...error, password: "Enter a valid valid password" });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      console.log(formInfo);
      alert("login sucessful");
    }
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div className="login-wrapper">
      <div className="content">
        <div className="left-content">
          <h2 className="heading-two">
            The best offer <div className="blue">for your business</div>
          </h2>
          <div className="paragraph">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora
            at cupiditate quis eum maiores libero veritatis? Dicta facilis sint
            aliquid ipsum atque?
          </div>
        </div>
        <form className="right-content form" onSubmit={handleSubmit}>
          <div className="name">
            <input
              type="text"
              placeholder="First Name"
              className="firstname"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="lastname"
              onChange={handleChange}
            />
          </div>
          <span className="error">{error.name}</span>
          <input
            type="text"
            placeholder="Email Address"
            className="email"
            defaultValue={formInfo.email}
            onChange={handleChange}
          />
          <span className="error">{error.email}</span>
          <input
            type="password"
            placeholder="Password"
            className="password"
            onChange={handleChange}
          />
          <span className="error">{error.password}</span>
          <div
            className="error passwordinstructions"
            hidden={!error.password.length}
          >
            <div>Password should be atleast 8 characters</div>
            <div>password must contain atleast 1 number</div>
          </div>
          <label>
            <input
              type="checkbox"
              placeholder="Last Name"
              className="subscribe"
              onChange={handleChange}
              checked={formInfo.subscribe}
            />
            Subscribe to our newsletter
          </label>
          <button value="submit" className="signup">
            Sign Up
          </button>
          <div className="otheroptions">or sign up with : </div>
          <div className="icons">
            <FontAwesomeIcon icon={faFacebook} />
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              buttonText=""
              isSignedIn={true}
              style={{ color: "black", height: "10px", padding: "0" }}
              className="google"
            >
              <FontAwesomeIcon icon={faGoogle} />
            </GoogleLogin>
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faGithub} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

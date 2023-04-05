import React from "react";
import { useState } from "react";
import "../css/SignUp.css";

const Signup = ({ updateLayout }) => {
  const [isCompany, setIsCompany] = useState(false);

  const SignUpTitle = () => {
    return (
      <h2 className="d-flex justify-content-center fw-bold mt-3 ">Sign Up</h2>
    );
  };

  const UserSignUpForm = () => {
    return (
      <div className="input-form-user">
        <label className="label" htmlFor="userName">
          User name
        </label>
        <input
          className="form-control"
          type="text"
          id="userName"
          placeholder="Enter your name here"
        ></input>
      </div>
    );
  };

  const CompanySignUpForm = () => {
    return (
      <div>
        <div className="row">
          <div className="col input-form-company">
            <label className="label" htmlFor="companyName">
              Company name
            </label>
            <input
              className="form-control"
              type="text"
              id="companyName"
              placeholder="Enter company name here"
            ></input>
          </div>

          <div className="col input-form-company">
            <label className="label" htmlFor="website">
              Company website
            </label>
            <input
              className="form-control"
              type="website"
              id="website"
              placeholder="www.example.com"
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="col input-form-company">
            <label className="label" htmlFor="email">
              Email id
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              placeholder="example@email.com"
            ></input>
          </div>

          <div className="col input-form-company">
            <label className="label" htmlFor="contactNo">
              Contact number
            </label>
            <input
              className="form-control"
              type="text"
              id="contactNo"
              placeholder="0000-000-000"
            ></input>
          </div>
        </div>

        <div className="input-form-company">
          <label className="label" htmlFor="description">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Tell us something about your company ..."
          ></textarea>
        </div>
      </div>
    );
  };

  const CompanyCheckbox = () => {
    return (
      <div className="checkbox">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="isCompanySignup"
          checked={isCompany}
          onChange={isCompanyCheckBoxClicked}
        />
        <label className="label" htmlFor="isCompanySignup">
          Sign up as a product Manufacturing company
        </label>
      </div>
    );
  };

  const SignupBtn = () => {
    return (
      <div>
        <div className="d-flex justify-content-center fw-bold mx-1 my-1">
          <button
            type="button"
            className="btn btn-dark mx-4"
            onClick={signUpClick}
          >
            {isCompany ? "Company Sign up" : "Sign up to Product Chain"}
          </button>
        </div>
      </div>
    );
  };

  const isCompanyCheckBoxClicked = (event) => {
    setIsCompany(event.target.checked);
  };

  const verifyEmailClicked = () => {};

  const signUpClick = () => {};

  return (
    <div className="signup-input-box">
      <SignUpTitle />
      {isCompany ? <CompanySignUpForm /> : <UserSignUpForm />}
      <CompanyCheckbox />
      <SignupBtn />
    </div>
  );
};

export default Signup;
